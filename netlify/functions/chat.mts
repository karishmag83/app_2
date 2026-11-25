// Netlify Function (v2) for Karishma's AI. Routed from /api/chat in netlify.toml.
// Needs ANTHROPIC_API_KEY in the site's environment variables; optional CHAT_MODEL / CHAT_EFFORT.
import { handleChatRequest } from '../../server/chat/handler.ts'

export default async (req: Request, context: { ip?: string }) => handleChatRequest(req, context?.ip ?? 'anonymous')
