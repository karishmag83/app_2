/**
 * POST /api/chat — streams Karishma's AI replies from Claude as NDJSON lines:
 *   {"type":"text","text":"…"}   append text
 *   {"type":"reset"}             discard text so far (a fallback model took over)
 *   {"type":"replace","text":…}  replace everything with this text
 *   {"type":"done"}              finished
 *   {"type":"error","code":…}    failed mid-stream
 *
 * Shared by the Netlify function (production) and the Express dev server.
 * With no ANTHROPIC_API_KEY it answers 503 and the browser uses its on-device engine.
 */
import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from './knowledge.ts'
import { PROFILE } from '../../src/data/profile.ts'

type Effort = 'low' | 'medium' | 'high' | 'xhigh' | 'max'

const MODEL = process.env.CHAT_MODEL?.trim() || 'claude-opus-5-5'
const EFFORT: Effort = (['low', 'medium', 'high', 'xhigh', 'max'] as const).includes(process.env.CHAT_EFFORT as Effort)
  ? (process.env.CHAT_EFFORT as Effort)
  : 'low'
// Models that accept server-side fallback (re-runs a declined request on Anthropic's recommended model).
const SUPPORTS_FALLBACK = new Set(['claude-opus-5-5', 'claude-opus-5', 'claude-sonnet-5-5', 'claude-fable-5-1'])

// Abuse limits for a public endpoint.
const MAX_MESSAGES = 16
const MAX_MESSAGE_CHARS = 6000
const MAX_TOTAL_CHARS = 20000
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX_REQUESTS = 30

const REFUSAL_TEXT = `I can't help with that one. I'm happy to talk about Karishma's work, experience and case studies — or you can reach her at ${PROFILE.email}.`

const hits = new Map<string, number[]>()

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter(t => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (now - (times[times.length - 1] ?? 0) > RATE_WINDOW_MS) hits.delete(k)
  }
  return recent.length > RATE_MAX_REQUESTS
}

let client: Anthropic | null = null
function getClient(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) return null
  client ??= new Anthropic({ maxRetries: 1 })
  return client
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

function parseMessages(body: unknown): Anthropic.Beta.BetaMessageParam[] | null {
  if (!body || typeof body !== 'object') return null
  const raw = (body as { messages?: unknown }).messages
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES) return null

  const messages: Anthropic.Beta.BetaMessageParam[] = []
  let total = 0
  for (const m of raw) {
    if (!m || typeof m !== 'object') return null
    const { role, content } = m as { role?: unknown; content?: unknown }
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null
    const text = content.trim()
    if (!text) continue
    if (text.length > MAX_MESSAGE_CHARS) return null
    total += text.length
    messages.push({ role, content: text })
  }
  if (total > MAX_TOTAL_CHARS) return null
  // The conversation must open and close on a visitor message.
  while (messages.length && messages[0].role !== 'user') messages.shift()
  if (!messages.length || messages[messages.length - 1].role !== 'user') return null
  return messages
}

export async function handleChatRequest(req: Request, clientKey = 'anonymous'): Promise<Response> {
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' })

  const anthropic = getClient()
  if (!anthropic) return json(503, { error: 'not_configured' })
  if (isRateLimited(clientKey)) return json(429, { error: 'rate_limited' })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return json(400, { error: 'invalid_json' })
  }
  const messages = parseMessages(body)
  if (!messages) return json(400, { error: 'invalid_messages' })

  const upstream = anthropic.beta.messages.stream(
    {
      model: MODEL,
      max_tokens: 4096,
      ...(SUPPORTS_FALLBACK.has(MODEL)
        ? { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' as const }
        : {}),
      output_config: { effort: EFFORT },
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages,
    },
    { signal: req.signal },
  )

  const encoder = new TextEncoder()
  const body$ = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: Record<string, unknown>) => {
        try {
          controller.enqueue(encoder.encode(JSON.stringify(event) + '\n'))
        } catch {
          /* stream already closed by the visitor */
        }
      }
      try {
        for await (const event of upstream) {
          if (event.type === 'content_block_start' && event.content_block.type === 'fallback') {
            send({ type: 'reset' })
          } else if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            send({ type: 'text', text: event.delta.text })
          }
        }
        const final = await upstream.finalMessage()
        if (final.stop_reason === 'refusal') send({ type: 'replace', text: REFUSAL_TEXT })
        send({ type: 'done' })
      } catch (error) {
        if (!req.signal.aborted) {
          let code = 'upstream_error'
          if (error instanceof Anthropic.RateLimitError) code = 'rate_limited'
          else if (error instanceof Anthropic.AuthenticationError) code = 'auth_error'
          else if (error instanceof Anthropic.APIError) code = `api_${error.status ?? 'error'}`
          console.error('[chat] upstream failed:', code, error instanceof Error ? error.message : error)
          send({ type: 'error', code })
        }
      } finally {
        try {
          controller.close()
        } catch {
          /* already closed */
        }
      }
    },
    cancel() {
      upstream.abort()
    },
  })

  return new Response(body$, {
    status: 200,
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
