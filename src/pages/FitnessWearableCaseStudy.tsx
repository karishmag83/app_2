import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

// ─── Types ────────────────────────────────────────────────────────────────────
type AppTab = 'today' | 'activity' | 'health' | 'workouts'
type HealthTab = 'heartrate' | 'sleep' | 'stress'

// ─── Constants ────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'challenge', label: 'Challenge' },
  { id: 'research', label: 'Research' },
  { id: 'process', label: 'Process' },
  { id: 'solution', label: 'Solution' },
  { id: 'testing', label: 'Testing' },
  { id: 'results', label: 'Results' },
]

const BLUE = '#3B82F6'
const GREEN = '#10B981'
const NAVY = '#060D1A'
const ORANGE = '#F59E0B'
const RED = '#EF4444'
const PURPLE = '#8B5CF6'

// ─── Motion variants ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const BackArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
)

const HeartIcon = ({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

const ActivityIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
  </svg>
)

const MoonIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
  </svg>
)

const FlameIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z" />
  </svg>
)

const ZapIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </svg>
)

const RunIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
  </svg>
)

// ─── Status Bar & Dynamic Island ──────────────────────────────────────────────
const StatusBar = () => (
  <div className="flex items-center justify-between px-4 pt-1 pb-0" style={{ height: 20 }}>
    <span className="text-white font-semibold" style={{ fontSize: 11 }}>9:41</span>
    <div className="flex items-center gap-1">
      <svg width="12" height="10" viewBox="0 0 12 10" fill="white">
        <rect x="0" y="6" width="2" height="4" rx="0.5" />
        <rect x="3" y="4" width="2" height="6" rx="0.5" />
        <rect x="6" y="2" width="2" height="8" rx="0.5" />
        <rect x="9" y="0" width="2" height="10" rx="0.5" />
      </svg>
      <svg width="14" height="10" viewBox="0 0 14 10" fill="white">
        <rect x="0" y="3" width="11" height="6" rx="1" stroke="white" strokeWidth="1" fill="none" />
        <rect x="11.5" y="4" width="1.5" height="4" rx="0.5" fill="white" />
        <rect x="1" y="4" width="7" height="4" rx="0.5" fill="white" />
      </svg>
    </div>
  </div>
)

const DynamicIsland = () => (
  <div className="flex justify-center mt-1 mb-2">
    <div style={{ width: 120, height: 32, backgroundColor: '#000', borderRadius: 20 }} />
  </div>
)

// ─── Activity Ring Component ──────────────────────────────────────────────────
const ActivityRing = ({
  progress,
  color,
  size,
  strokeWidth,
  children,
}: {
  progress: number
  color: string
  size: number
  strokeWidth: number
  children?: React.ReactNode
}) => {
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const dash = circ * Math.min(progress, 1)
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {children && <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>}
    </div>
  )
}

// ─── Sparkline Chart ──────────────────────────────────────────────────────────
const Sparkline = ({ data, color, height = 40 }: { data: number[]; color: string; height?: number }) => {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const w = 100 / (data.length - 1)
  const points = data.map((v, i) => `${i * w},${height - ((v - min) / range) * height}`).join(' ')
  const area = `0,${height} ` + data.map((v, i) => `${i * w},${height - ((v - min) / range) * height}`).join(' ') + ` ${(data.length - 1) * w},${height}`
  return (
    <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
      <polygon points={area} fill={`${color}20`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Today Screen ─────────────────────────────────────────────────────────────
const TodayScreen = () => {
  const steps = 8432
  const stepGoal = 10000
  const stepPct = steps / stepGoal

  return (
    <div className="flex flex-col gap-3 px-3 py-2 overflow-y-auto" style={{ maxHeight: 530 }}>
      <div>
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>Saturday, Apr 19</p>
        <h2 className="text-white font-bold" style={{ fontSize: 16 }}>Good morning, Karishma</h2>
      </div>

      {/* Activity ring */}
      <div className="rounded-2xl p-3 flex items-center gap-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <ActivityRing progress={stepPct} color={BLUE} size={72} strokeWidth={7}>
          <div className="text-center">
            <p className="text-white font-bold" style={{ fontSize: 11, lineHeight: 1 }}>84%</p>
          </div>
        </ActivityRing>
        <div className="flex-1">
          <p className="text-white font-semibold" style={{ fontSize: 12 }}>Daily Steps</p>
          <p style={{ fontSize: 18, color: BLUE, fontWeight: 700, lineHeight: 1.2 }}>8,432</p>
          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>Goal: 10,000 steps</p>
          <div className="mt-1 rounded-full overflow-hidden" style={{ height: 4, backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <div style={{ width: `${stepPct * 100}%`, height: '100%', backgroundColor: BLUE, borderRadius: 99 }} />
          </div>
        </div>
      </div>

      {/* 4 metric cards */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: <HeartIcon size={12} color={GREEN} />, label: 'Heart Rate', value: '72', unit: 'BPM', color: GREEN, bg: `${GREEN}15`, border: `${GREEN}30` },
          { icon: <MoonIcon size={12} />, label: 'Sleep', value: '7h 23m', unit: '', color: BLUE, bg: `${BLUE}15`, border: `${BLUE}30` },
          { icon: <FlameIcon size={12} />, label: 'Calories', value: '1,847', unit: 'kcal', color: ORANGE, bg: `${ORANGE}15`, border: `${ORANGE}30` },
          { icon: <ZapIcon size={12} />, label: 'Recovery', value: '78', unit: '/100', color: PURPLE, bg: `${PURPLE}15`, border: `${PURPLE}30` },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-2xl p-2.5"
            style={{ backgroundColor: m.bg, border: `1px solid ${m.border}` }}
          >
            <div className="flex items-center gap-1 mb-1">
              <span style={{ color: m.color }}>{m.icon}</span>
              <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.label}</p>
            </div>
            <p className="font-bold" style={{ fontSize: 15, color: '#fff', lineHeight: 1 }}>{m.value}</p>
            {m.unit && <p style={{ fontSize: 8, color: m.color }}>{m.unit}</p>}
          </div>
        ))}
      </div>

      {/* Insight card */}
      <div className="rounded-2xl p-3" style={{ background: `linear-gradient(135deg, ${BLUE}30, ${GREEN}20)`, border: `1px solid ${BLUE}40` }}>
        <div className="flex items-center gap-1.5 mb-1">
          <span style={{ fontSize: 10 }}>💡</span>
          <p style={{ fontSize: 8, color: BLUE, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Today's Insight</p>
        </div>
        <p className="text-white font-semibold" style={{ fontSize: 11, lineHeight: 1.5 }}>You're well-rested. Good day for a hard workout.</p>
        <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Recovery score 78 · HRV 52ms · Sleep quality 82/100</p>
      </div>
    </div>
  )
}

// ─── Activity Screen ──────────────────────────────────────────────────────────
const ActivityScreen = () => {
  const stepData = [7200, 9100, 6800, 8432, 10200, 5400, 8432]
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const maxSteps = Math.max(...stepData)
  const activeMins = 124
  const targetMins = 150
  const donutPct = activeMins / targetMins
  const r = 28
  const circ = 2 * Math.PI * r

  return (
    <div className="flex flex-col gap-3 px-3 py-2 overflow-y-auto" style={{ maxHeight: 530 }}>
      <p className="text-white font-bold" style={{ fontSize: 15 }}>Activity</p>

      {/* Weekly active minutes donut */}
      <div className="rounded-2xl p-3 flex items-center gap-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="relative flex items-center justify-center" style={{ width: 72, height: 72 }}>
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
            <circle
              cx="36" cy="36" r={r}
              fill="none"
              stroke={GREEN}
              strokeWidth="7"
              strokeDasharray={`${circ * donutPct} ${circ}`}
              strokeLinecap="round"
              transform="rotate(-90 36 36)"
            />
          </svg>
          <div className="absolute text-center">
            <p style={{ fontSize: 12, color: '#fff', fontWeight: 700, lineHeight: 1 }}>{activeMins}</p>
            <p style={{ fontSize: 6, color: 'rgba(255,255,255,0.4)' }}>min</p>
          </div>
        </div>
        <div>
          <p className="text-white font-semibold" style={{ fontSize: 11 }}>Active Minutes</p>
          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{activeMins} / {targetMins} min this week</p>
          <p style={{ fontSize: 9, color: ORANGE, marginTop: 2 }}>26 min to weekly goal</p>
          <div className="flex items-center gap-1 mt-2">
            <span style={{ fontSize: 14 }}>🔥</span>
            <p style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>12-day streak</p>
          </div>
        </div>
      </div>

      {/* Step count bars */}
      <div className="rounded-2xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-white mb-2" style={{ fontSize: 10, fontWeight: 600 }}>7-Day Step Count</p>
        <div className="flex items-end gap-1" style={{ height: 52 }}>
          {stepData.map((val, i) => (
            <div key={i} className="flex flex-col items-center flex-1 gap-1">
              <div
                className="w-full"
                style={{
                  height: (val / maxSteps) * 42,
                  backgroundColor: i === 3 ? BLUE : `${BLUE}40`,
                  borderRadius: '3px 3px 0 0',
                }}
              />
              <span style={{ fontSize: 7, color: i === 3 ? BLUE : '#6B7280' }}>{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Move / Exercise / Stand rings */}
      <div className="rounded-2xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-white mb-2" style={{ fontSize: 10, fontWeight: 600 }}>Rings Today</p>
        <div className="flex items-center justify-around">
          {[
            { label: 'Move', val: 847, goal: 900, unit: 'cal', pct: 0.94, color: RED },
            { label: 'Exercise', val: 32, goal: 30, unit: 'min', pct: 1, color: GREEN },
            { label: 'Stand', val: 10, goal: 12, unit: 'hrs', pct: 0.83, color: BLUE },
          ].map((ring) => (
            <div key={ring.label} className="flex flex-col items-center gap-1">
              <ActivityRing progress={ring.pct} color={ring.color} size={44} strokeWidth={5}>
                <p style={{ fontSize: 7, color: '#fff', fontWeight: 700 }}>{ring.pct >= 1 ? '✓' : `${Math.round(ring.pct * 100)}%`}</p>
              </ActivityRing>
              <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>{ring.label}</p>
              <p style={{ fontSize: 7, color: ring.color }}>{ring.val} {ring.unit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Health Screen ─────────────────────────────────────────────────────────────
const HealthScreen = ({ healthTab, setHealthTab }: { healthTab: HealthTab; setHealthTab: (t: HealthTab) => void }) => {
  const hrData = [68, 72, 75, 70, 88, 102, 85, 74, 68, 71, 73, 76, 72, 69, 74, 78, 82, 77, 73, 70, 72, 74, 71, 72]
  const sleepData = [
    { awake: 8, light: 35, deep: 22, rem: 20 },
    { awake: 12, light: 40, deep: 18, rem: 15 },
    { awake: 6, light: 32, deep: 25, rem: 22 },
    { awake: 10, light: 38, deep: 20, rem: 18 },
    { awake: 5, light: 30, deep: 28, rem: 24 },
    { awake: 8, light: 36, deep: 21, rem: 19 },
    { awake: 7, light: 33, deep: 24, rem: 20 },
  ]
  const sleepDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const stressData = [42, 38, 55, 62, 48, 35, 40, 38, 44, 50, 58, 52, 45, 38, 42, 46, 40, 36, 42, 48, 44, 38, 40, 36]

  return (
    <div className="flex flex-col gap-3 px-3 py-2 overflow-y-auto" style={{ maxHeight: 530 }}>
      <p className="text-white font-bold" style={{ fontSize: 15 }}>Health</p>

      {/* Tab switcher */}
      <div className="flex rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {([
          { id: 'heartrate' as HealthTab, label: 'Heart Rate' },
          { id: 'sleep' as HealthTab, label: 'Sleep' },
          { id: 'stress' as HealthTab, label: 'Stress' },
        ] as { id: HealthTab; label: string }[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setHealthTab(t.id)}
            className="flex-1 py-1.5"
            style={{
              fontSize: 9,
              fontWeight: 600,
              backgroundColor: healthTab === t.id ? BLUE : 'transparent',
              color: healthTab === t.id ? '#fff' : 'rgba(255,255,255,0.4)',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {healthTab === 'heartrate' && (
          <motion.div key="hr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-2">
            <div className="rounded-2xl p-3" style={{ backgroundColor: `${RED}15`, border: `1px solid ${RED}30` }}>
              <div className="flex items-center justify-between mb-1">
                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Current BPM</p>
                <HeartIcon size={12} color={RED} />
              </div>
              <p className="font-bold" style={{ fontSize: 32, color: '#fff', lineHeight: 1 }}>72</p>
              <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Resting · Updated now</p>
              <div style={{ marginTop: 8 }}>
                <Sparkline data={hrData} color={RED} height={36} />
              </div>
              <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Last 24 hours</p>
            </div>
            <div className="rounded-2xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Heart Rate Zones</p>
              {[
                { label: 'Resting', range: '50–60', pct: 42, color: BLUE },
                { label: 'Fat Burn', range: '60–100', pct: 35, color: GREEN },
                { label: 'Cardio', range: '100–140', pct: 18, color: ORANGE },
                { label: 'Peak', range: '140+', pct: 5, color: RED },
              ].map((z) => (
                <div key={z.label} className="flex items-center gap-2 mb-1.5">
                  <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)', width: 44, flexShrink: 0 }}>{z.label}</p>
                  <div className="flex-1 rounded-full overflow-hidden" style={{ height: 5, backgroundColor: 'rgba(255,255,255,0.08)' }}>
                    <div style={{ width: `${z.pct}%`, height: '100%', backgroundColor: z.color, borderRadius: 99 }} />
                  </div>
                  <p style={{ fontSize: 7, color: z.color, width: 20, textAlign: 'right' }}>{z.pct}%</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {healthTab === 'sleep' && (
          <motion.div key="sleep" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-2">
            <div className="rounded-2xl p-3" style={{ backgroundColor: `${BLUE}15`, border: `1px solid ${BLUE}30` }}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Last Night</p>
                  <p className="font-bold" style={{ fontSize: 22, color: '#fff', lineHeight: 1 }}>7h 23m</p>
                </div>
                <div className="text-center">
                  <p style={{ fontSize: 22, color: BLUE, fontWeight: 700 }}>82</p>
                  <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>Sleep Score</p>
                </div>
              </div>
              {/* Sleep stages stacked bars */}
              <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>7-Night Sleep Stages</p>
              <div className="flex gap-1">
                {sleepData.map((d, i) => {
                  const total = d.awake + d.light + d.deep + d.rem
                  return (
                    <div key={i} className="flex-1 flex flex-col" style={{ height: 44, gap: 1 }}>
                      <div style={{ flex: d.awake / total, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px 2px 0 0' }} />
                      <div style={{ flex: d.light / total, backgroundColor: `${BLUE}60` }} />
                      <div style={{ flex: d.deep / total, backgroundColor: BLUE }} />
                      <div style={{ flex: d.rem / total, backgroundColor: PURPLE, borderRadius: '0 0 2px 2px' }} />
                    </div>
                  )
                })}
              </div>
              <div className="flex gap-1 mt-1" style={{ justifyContent: 'space-between' }}>
                {sleepDays.map((d) => <p key={d} style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)', flex: 1, textAlign: 'center' }}>{d}</p>)}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2">
                {[
                  { label: 'Awake', color: 'rgba(255,255,255,0.3)' },
                  { label: 'Light', color: `${BLUE}80` },
                  { label: 'Deep', color: BLUE },
                  { label: 'REM', color: PURPLE },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1">
                    <div style={{ width: 6, height: 6, borderRadius: 1, backgroundColor: l.color }} />
                    <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>{l.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {healthTab === 'stress' && (
          <motion.div key="stress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-2">
            <div className="rounded-2xl p-3" style={{ backgroundColor: `${PURPLE}15`, border: `1px solid ${PURPLE}30` }}>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Stress Level</p>
              <div className="flex items-end gap-3 mb-2">
                <p className="font-bold" style={{ fontSize: 32, color: '#fff', lineHeight: 1 }}>38</p>
                <p style={{ fontSize: 11, color: GREEN, fontWeight: 600, marginBottom: 4 }}>Low</p>
              </div>
              <Sparkline data={stressData} color={PURPLE} height={40} />
              <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Last 24 hours · Measured via HRV</p>
            </div>
            <div className="rounded-2xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>Stress Zones Today</p>
              {[
                { label: 'Rest', hours: '6.2h', color: GREEN },
                { label: 'Low', hours: '9.1h', color: BLUE },
                { label: 'Medium', hours: '6.8h', color: ORANGE },
                { label: 'High', hours: '1.9h', color: RED },
              ].map((z) => (
                <div key={z.label} className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: z.color }} />
                    <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>{z.label}</p>
                  </div>
                  <p style={{ fontSize: 9, color: z.color, fontWeight: 600 }}>{z.hours}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Workouts Screen ──────────────────────────────────────────────────────────
const WorkoutsScreen = () => {
  const recentWorkouts = [
    { name: 'Morning Run', icon: '🏃', dist: '5.2 km', dur: '28 min', cal: '312 kcal', date: 'Yesterday', color: GREEN },
    { name: 'Strength Training', icon: '💪', dist: '—', dur: '45 min', cal: '280 kcal', date: 'Thu', color: ORANGE },
    { name: 'HIIT Session', icon: '⚡', dist: '—', dur: '22 min', cal: '198 kcal', date: 'Wed', color: RED },
  ]

  return (
    <div className="flex flex-col gap-3 px-3 py-2 overflow-y-auto" style={{ maxHeight: 530 }}>
      <p className="text-white font-bold" style={{ fontSize: 15 }}>Workouts</p>

      {/* Start workout */}
      <button
        className="rounded-2xl py-4 flex flex-col items-center gap-1"
        style={{ background: `linear-gradient(135deg, ${BLUE}, ${GREEN})`, border: 'none', cursor: 'pointer' }}
      >
        <span style={{ fontSize: 24 }}>▶</span>
        <p className="text-white font-bold" style={{ fontSize: 13 }}>Start Workout</p>
        <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>GPS ready · Heart rate: 72 BPM</p>
      </button>

      {/* Quick start types */}
      <div className="grid grid-cols-5 gap-1">
        {[
          { label: 'Run', icon: '🏃' },
          { label: 'Cycle', icon: '🚴' },
          { label: 'Lift', icon: '🏋️' },
          { label: 'HIIT', icon: '⚡' },
          { label: 'Yoga', icon: '🧘' },
        ].map((w) => (
          <button
            key={w.label}
            className="rounded-xl py-2 flex flex-col items-center gap-1"
            style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
          >
            <span style={{ fontSize: 14 }}>{w.icon}</span>
            <p className="text-white" style={{ fontSize: 7 }}>{w.label}</p>
          </button>
        ))}
      </div>

      {/* Recent workouts */}
      <div>
        <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Recent</p>
        <div className="flex flex-col gap-2">
          {recentWorkouts.map((w) => (
            <div
              key={w.name}
              className="rounded-2xl p-3 flex items-center gap-3"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center justify-center" style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: `${w.color}20`, border: `1px solid ${w.color}40`, fontSize: 16 }}>
                {w.icon}
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold" style={{ fontSize: 10 }}>{w.name}</p>
                <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>{w.date} · {w.dur} · {w.cal}</p>
              </div>
              {w.dist !== '—' && <p style={{ fontSize: 10, color: w.color, fontWeight: 600 }}>{w.dist}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Phone Mockup ─────────────────────────────────────────────────────────────
const PhoneMockup = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('today')
  const [healthTab, setHealthTab] = useState<HealthTab>('heartrate')

  const tabs: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    { id: 'today', label: 'Today', icon: <ZapIcon size={18} /> },
    { id: 'activity', label: 'Activity', icon: <ActivityIcon size={18} /> },
    { id: 'health', label: 'Health', icon: <HeartIcon size={18} color="currentColor" /> },
    { id: 'workouts', label: 'Workouts', icon: <RunIcon size={18} /> },
  ]

  return (
    <div
      className="relative mx-auto select-none"
      style={{
        width: 300,
        height: 644,
        borderRadius: 48,
        backgroundColor: '#060D1A',
        border: '8px solid #0F1E30',
        boxShadow: `0 0 0 1px #1E3A5F, 0 40px 80px rgba(0,0,0,0.7), 0 0 60px ${BLUE}15, 0 0 120px ${GREEN}08`,
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      }}
    >
      <div className="flex flex-col h-full">
        <StatusBar />
        <DynamicIsland />

        <div className="flex-1 overflow-hidden" style={{ minHeight: 0 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === 'today' && <TodayScreen />}
              {activeTab === 'activity' && <ActivityScreen />}
              {activeTab === 'health' && <HealthScreen healthTab={healthTab} setHealthTab={setHealthTab} />}
              {activeTab === 'workouts' && <WorkoutsScreen />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom tab bar */}
        <div
          className="flex items-center"
          style={{
            backgroundColor: 'rgba(6,13,26,0.95)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            paddingBottom: 8,
            paddingTop: 8,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex flex-col items-center gap-0.5"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
            >
              <span style={{ color: activeTab === tab.id ? BLUE : '#4B5563' }}>{tab.icon}</span>
              <span style={{ fontSize: 7.5, color: activeTab === tab.id ? BLUE : '#4B5563', fontWeight: activeTab === tab.id ? 700 : 400 }}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Section Wrappers ─────────────────────────────────────────────────────────
const Section = ({ id, children, alt = false }: { id: string; children: React.ReactNode; alt?: boolean }) => (
  <section
    id={id}
    className="py-24 px-6"
    style={{ backgroundColor: alt ? '#FFFFFF' : '#F0F4FF' }}
  >
    <div className="max-w-5xl mx-auto">{children}</div>
  </section>
)

const SectionLabel = ({ children, num }: { children: React.ReactNode; num: string }) => (
  <motion.p
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="uppercase tracking-widest font-semibold mb-3"
    style={{ color: BLUE, fontSize: 12 }}
  >
    {num} — {children}
  </motion.p>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="font-bold mb-12"
    style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: NAVY, lineHeight: 1.2 }}
  >
    {children}
  </motion.h2>
)

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FitnessWearableCaseStudy() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('overview')
  const [navVisible, setNavVisible] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.4, rootMargin: '-80px 0px -20% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    const handleScroll = () => setNavVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observers.forEach((o) => o.disconnect())
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleBack = () => {
    navigate('/#projects')
  }

  return (
    <div className="relative" style={{ backgroundColor: '#F0F4FF', minHeight: '100vh' }}>

      {/* ── Sticky side nav (desktop) ── */}
      <AnimatePresence>
        {navVisible && (
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-6 z-50 hidden xl:flex flex-col gap-3 -translate-y-1/2"
            style={{ transform: 'translateY(-50%)' }}
          >
            <div
              className="flex flex-col gap-3 px-3 py-4 rounded-full"
              style={{ backgroundColor: 'rgba(6,13,26,0.88)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  title={label}
                  className="relative flex items-center justify-center group"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width: activeSection === id ? 10 : 6,
                      height: activeSection === id ? 10 : 6,
                      backgroundColor: activeSection === id ? BLUE : 'rgba(255,255,255,0.3)',
                      boxShadow: activeSection === id ? `0 0 8px ${BLUE}` : 'none',
                    }}
                  />
                  <span
                    className="absolute left-6 whitespace-nowrap rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ fontSize: 11, backgroundColor: NAVY, color: '#fff' }}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Mobile top nav ── */}
      <AnimatePresence>
        {navVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-0 left-0 right-0 z-50 xl:hidden overflow-x-auto"
            style={{ backgroundColor: 'rgba(6,13,26,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex gap-1 px-4 py-2">
              {SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    backgroundColor: activeSection === id ? BLUE : 'transparent',
                    color: activeSection === id ? '#fff' : 'rgba(255,255,255,0.6)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Back button ── */}
      <button
        onClick={handleBack}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
        style={{ backgroundColor: 'rgba(6,13,26,0.85)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
      >
        <BackArrow />
        Back
      </button>

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col justify-center px-6 pt-32 pb-20 overflow-hidden"
        style={{ backgroundColor: NAVY, minHeight: '100vh' }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Dual glow blobs */}
        <div className="absolute pointer-events-none" style={{ top: '15%', right: '8%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${BLUE}14 0%, transparent 70%)` }} />
        <div className="absolute pointer-events-none" style={{ bottom: '20%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${GREEN}10 0%, transparent 70%)` }} />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{ backgroundColor: `${BLUE}18`, border: `1px solid ${BLUE}44` }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: GREEN, display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: BLUE, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Wearable Hardware Concept</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(52px, 8vw, 96px)', color: '#FFFFFF', lineHeight: 0.95, letterSpacing: '-2px' }}
          >
            Pulse
            <span style={{ color: BLUE }}>.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
            style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', fontWeight: 300 }}
          >
            Your health, made clear.
          </motion.p>

          {/* Meta chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-16"
          >
            {[
              { label: 'Role', value: 'Lead Product Designer' },
              { label: 'Timeline', value: '12 weeks · 2024' },
              { label: 'Platform', value: 'iOS + Android (paired wearable)' },
              { label: 'Tools', value: 'Figma, Figma Make, Principle, ProtoPie' },
            ].map((chip) => (
              <div
                key={chip.label}
                className="px-4 py-2 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span style={{ fontSize: 10, color: BLUE, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{chip.label} · </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{chip.value}</span>
              </div>
            ))}
          </motion.div>

          {/* Hero outcome stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { num: '+40%', desc: 'Activity summary comprehension', color: BLUE },
              { num: '−35%', desc: 'Onboarding drop-off rate', color: GREEN },
              { num: '3.8×', desc: 'Daily active usage lift', color: PURPLE },
            ].map((stat) => (
              <div
                key={stat.num}
                className="rounded-3xl p-6"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="font-bold mb-1" style={{ fontSize: 40, color: stat.color, lineHeight: 1 }}>{stat.num}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{stat.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 flex flex-col items-center gap-2"
          style={{ transform: 'translateX(-50%)' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            style={{ width: 24, height: 38, borderRadius: 12, border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6 }}
          >
            <div style={{ width: 4, height: 8, borderRadius: 2, backgroundColor: BLUE }} />
          </motion.div>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, textTransform: 'uppercase' }}>Scroll</p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          OVERVIEW
      ══════════════════════════════════════════════════════════════ */}
      <Section id="overview">
        <SectionLabel num="01">Overview</SectionLabel>
        <SectionTitle>Turning raw biometrics into human insight</SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-lg mb-6" style={{ color: '#4B5563', lineHeight: 1.8 }}>
              Pulse is a companion app for a connected fitness wearable, designed to transform heart rate variability readings, sleep staging data, and activity metrics into language that any user can understand and act on. The concept emerged from a clear gap: wearable hardware has become remarkably capable, but the software layer consistently fails to translate that capability into behavior change.
            </p>
            <p style={{ color: '#6B7280', lineHeight: 1.8 }}>
              As Lead Product Designer on this 12-week concept sprint, I owned the full design lifecycle — from recruiting and interviewing 10 wearable users, through journey mapping and information architecture, to crafting a polished high-fidelity prototype and writing an engineering-ready handoff with zero revision rounds. The result: a tested, functional app concept that lifted daily activity summary comprehension by 40% and cut onboarding drop-off from 65% to 30%.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-6">
            <motion.div variants={fadeUp} className="rounded-3xl p-6" style={{ backgroundColor: '#fff', boxShadow: `0 4px 24px ${BLUE}10`, border: `1px solid ${BLUE}15` }}>
              <p className="font-bold mb-4" style={{ fontSize: 13, color: NAVY, textTransform: 'uppercase', letterSpacing: 1 }}>Deliverables</p>
              <ul className="flex flex-col gap-2">
                {[
                  '10 wearable user interviews & affinity map',
                  '3 user personas across fitness levels',
                  'End-to-end 5-stage journey map',
                  'Information architecture & nav audit',
                  'Data translation framework (4-step)',
                  '3 onboarding variants (A/B/C) in ProtoPie',
                  'High-fidelity Figma component library (dark theme)',
                  '4 usability test sessions with 6 participants',
                  'iOS + Android engineering handoff specs',
                ].map((d) => (
                  <li key={d} className="flex items-start gap-2" style={{ fontSize: 13, color: '#374151' }}>
                    <span style={{ color: GREEN, flexShrink: 0, marginTop: 2 }}>✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-3xl p-6" style={{ backgroundColor: '#fff', boxShadow: `0 4px 24px ${BLUE}10`, border: `1px solid ${BLUE}15` }}>
              <p className="font-bold mb-4" style={{ fontSize: 13, color: NAVY, textTransform: 'uppercase', letterSpacing: 1 }}>Tools Used</p>
              <div className="flex flex-wrap gap-2">
                {['Figma', 'Figma Make', 'Principle', 'ProtoPie', 'Maze', 'Miro', 'Notion', 'Dovetail'].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full" style={{ fontSize: 12, backgroundColor: `${BLUE}12`, color: '#1E40AF', border: `1px solid ${BLUE}25`, fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          CHALLENGE
      ══════════════════════════════════════════════════════════════ */}
      <Section id="challenge" alt>
        <SectionLabel num="02">Challenge</SectionLabel>
        <SectionTitle>Raw data, zero context, frustrated users</SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-lg mb-6" style={{ color: '#4B5563', lineHeight: 1.8 }}>
              Modern fitness wearables are engineering marvels. They measure heart rate variability to 2ms precision, track five sleep stages, detect blood oxygen saturation, and record GPS-accurate routes. None of that capability matters when the companion app shows: <strong style={{ color: NAVY }}>HRV: 42ms</strong> with no explanation of what 42ms means, whether it's good, and what the user should do about it.
            </p>
            <p style={{ color: '#6B7280', lineHeight: 1.8, marginBottom: 16 }}>
              Competing apps had normalized data dumps: raw numbers, no thresholds explained, no personalization, no recommended actions. The result was a 65% onboarding drop-off rate during our benchmark testing — users quit before they'd seen a single data point.
            </p>
            <p style={{ color: '#6B7280', lineHeight: 1.8 }}>
              Four core flows — onboarding, daily check-in, workout start, and sleep review — all failed comprehension testing. Users couldn't answer basic questions about their own health data after viewing the baseline screen designs. The problem wasn't the hardware. It was the translation layer.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 gap-4">
            {[
              { val: '65%', desc: 'Onboarding drop-off at baseline', neg: true },
              { val: 'HRV 42ms', desc: 'Shown with no context or guidance', neg: true },
              { val: '4 of 4', desc: 'Core flows failed comprehension testing', neg: true },
              { val: '1.2×/day', desc: 'Average app opens — mostly passive glances', neg: true },
            ].map((s) => (
              <motion.div
                key={s.val}
                variants={fadeUp}
                className="rounded-3xl p-5"
                style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}
              >
                <p className="font-bold" style={{ fontSize: s.val.length > 5 ? 20 : 30, color: '#DC2626', lineHeight: 1 }}>{s.val}</p>
                <p className="mt-2" style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* HMW questions */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>How Might We…</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { q: 'How might we translate a raw biometric number into a clear, contextual insight that any fitness level can immediately understand?', num: '01' },
              { q: 'How might we design an onboarding experience that builds trust and delivers first value within the first 60 seconds?', num: '02' },
              { q: 'How might we surface the right health insight at the right moment — without overwhelming users who just want a quick daily snapshot?', num: '03' },
            ].map((hmw) => (
              <motion.div
                key={hmw.num}
                variants={fadeUp}
                className="rounded-3xl p-6"
                style={{ backgroundColor: NAVY, boxShadow: `0 8px 32px rgba(6,13,26,0.2)` }}
              >
                <p className="font-bold mb-4" style={{ fontSize: 32, color: `${BLUE}40` }}>{hmw.num}</p>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, fontStyle: 'italic' }}>"{hmw.q}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          RESEARCH
      ══════════════════════════════════════════════════════════════ */}
      <Section id="research">
        <SectionLabel num="03">Research & Discovery</SectionLabel>
        <SectionTitle>10 interviews, 5 friction points, one clear truth</SectionTitle>

        {/* Research stats */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-3xl p-8 mb-12" style={{ backgroundColor: NAVY }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '10', desc: 'Wearable user interviews' },
              { val: '3', desc: 'Fitness level groups' },
              { val: '4 wks', desc: 'Field research duration' },
              { val: '47', desc: 'Distinct pain points tagged' },
            ].map((s) => (
              <div key={s.val}>
                <p className="font-bold" style={{ fontSize: 40, color: BLUE }}>{s.val}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key insight cards */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Key Research Insights</h3>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {[
            { icon: '👀', title: 'Check but don\'t act', body: 'Users check their watch 7× per day but only act on the data 1.2× per day. Checking had become a habit; acting had not — because the data gave no clear next step.' },
            { icon: '🌙', title: 'Sleep is most valued, least understood', body: 'Sleep data was the most requested feature in recruiting, yet 8 of 10 users couldn\'t explain what their sleep score meant or how to improve it.' },
            { icon: '🤯', title: 'HRV is a black box', body: '"I know HRV is important but I have no idea what 42ms means for me specifically." — said by 7 of 10 participants verbatim. Context and baseline comparison were completely absent.' },
            { icon: '📲', title: 'Onboarding lost them in 90 seconds', body: 'During task analysis, 65% of participants dropped before completing initial device pairing. "It asked me to enter a code I couldn\'t find" was the top reason.' },
            { icon: '🏆', title: 'Goal framing drives motivation', body: 'When data was framed as progress toward a named goal rather than raw numbers, self-reported motivation rose significantly even within a 15-minute test session.' },
          ].map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="rounded-3xl p-6"
              style={{ backgroundColor: '#fff', boxShadow: `0 4px 24px ${BLUE}10`, border: `1px solid ${BLUE}12` }}
            >
              <span style={{ fontSize: 28 }}>{card.icon}</span>
              <h4 className="font-bold my-3" style={{ fontSize: 15, color: NAVY }}>{card.title}</h4>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>{card.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* User Personas */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>User Personas</h3>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              name: 'Maya',
              age: 26,
              title: 'The Beginner',
              desc: 'New to fitness tracking. Motivated by weight management. Overwhelmed by data complexity. Needs encouragement and simple wins.',
              goals: ['Understand what her data means', 'Build consistent habits', 'See tangible progress weekly'],
              frustrations: ['Too many numbers, no explanation', 'Doesn\'t know if she\'s doing well or poorly'],
              color: GREEN,
              emoji: '🌱',
            },
            {
              name: 'James',
              age: 38,
              title: 'The Data Nerd',
              desc: 'Intermediate-to-advanced runner. Trains by heart rate zones. Wants granular analytics and trend data. Frustrated by oversimplification.',
              goals: ['Deep HRV & sleep stage analytics', 'Training load tracking', 'Race performance correlation'],
              frustrations: ['App dumbs things down too much', 'Can\'t export data for custom analysis'],
              color: BLUE,
              emoji: '📊',
            },
            {
              name: 'Lisa',
              age: 41,
              title: 'The Busy Parent',
              desc: 'Intermediate fitness level. Exercises 3× a week between work and family. Values time above all. Wants quick summaries, not deep dives.',
              goals: ['60-second daily health check', 'Know if she\'s trending up or down', 'Simple workout suggestions'],
              frustrations: ['Can\'t get a quick answer without navigating 4 screens', 'Notification overload'],
              color: PURPLE,
              emoji: '⚡',
            },
          ].map((p) => (
            <motion.div
              key={p.name}
              variants={fadeUp}
              className="rounded-3xl p-6"
              style={{ backgroundColor: '#fff', boxShadow: `0 4px 24px ${p.color}15`, border: `1px solid ${p.color}25` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: `${p.color}20`, border: `2px solid ${p.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {p.emoji}
                </div>
                <div>
                  <p className="font-bold" style={{ fontSize: 16, color: NAVY }}>{p.name}, {p.age}</p>
                  <p style={{ fontSize: 12, color: p.color, fontWeight: 600 }}>{p.title}</p>
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7, marginBottom: 12 }}>{p.desc}</p>
              <div className="mb-3">
                <p className="font-semibold mb-2" style={{ fontSize: 11, color: NAVY, textTransform: 'uppercase', letterSpacing: 0.5 }}>Goals</p>
                {p.goals.map((g) => (
                  <p key={g} style={{ fontSize: 12, color: '#374151', lineHeight: 1.6 }}>
                    <span style={{ color: GREEN }}>→ </span>{g}
                  </p>
                ))}
              </div>
              <div>
                <p className="font-semibold mb-2" style={{ fontSize: 11, color: NAVY, textTransform: 'uppercase', letterSpacing: 0.5 }}>Frustrations</p>
                {p.frustrations.map((f) => (
                  <p key={f} style={{ fontSize: 12, color: '#374151', lineHeight: 1.6 }}>
                    <span style={{ color: RED }}>✕ </span>{f}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Journey Map */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Journey Map — From Wearable to Action</h3>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-3xl overflow-hidden mb-12" style={{ boxShadow: `0 4px 24px ${BLUE}12`, border: `1px solid ${BLUE}15` }}>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: 'collapse', fontSize: 12, minWidth: 700 }}>
              <thead>
                <tr style={{ backgroundColor: NAVY }}>
                  <th className="text-left p-4" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Stage</th>
                  {['1. Put on Wearable', '2. Open App', '3. View Data', '4. Seek Context', '5. Act on Insight'].map((s) => (
                    <th key={s} className="text-center p-3" style={{ color: '#fff', fontWeight: 600, fontSize: 11 }}>{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: 'User Action',
                    vals: ['Syncs device', 'Navigates to dashboard', 'Reads numbers', 'Searches for meaning', 'Makes health decision'],
                  },
                  {
                    label: 'Emotion',
                    vals: ['😊 Optimistic', '😐 Neutral', '😕 Confused', '😤 Frustrated', '😔 Gives up or guesses'],
                  },
                  {
                    label: 'Friction Points',
                    vals: ['Pairing error rate 38%', 'Navigation unclear', 'HRV, VO2Max unexplained', 'No comparison to baseline', 'No clear CTA'],
                  },
                  {
                    label: 'Opportunity',
                    vals: ['Guided setup wizard', 'Today at-a-glance', 'Plain-language summaries', 'Personalized ranges', 'Insight → Action card'],
                  },
                ].map((row, i) => (
                  <tr key={row.label} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#F0F4FF' }}>
                    <td className="p-3 font-semibold" style={{ color: NAVY, fontSize: 11 }}>{row.label}</td>
                    {row.vals.map((v, j) => (
                      <td key={j} className="p-3 text-center" style={{ color: '#374151', fontSize: 11, lineHeight: 1.5 }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Affinity map clusters */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Affinity Map — Research Themes</h3>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { theme: 'Data Comprehension', count: 14, tags: ['HRV confusion', 'sleep score opacity', 'zone explanations', 'metric overload'], color: BLUE },
            { theme: 'Onboarding Friction', count: 11, tags: ['pairing errors', 'code entry', 'permissions anxiety', 'time investment'], color: RED },
            { theme: 'Motivation & Goals', count: 9, tags: ['streak mechanics', 'goal framing', 'progress visibility', 'celebration moments'], color: GREEN },
            { theme: 'Notification Fatigue', count: 7, tags: ['too many alerts', 'irrelevant timing', 'disabled notifications', 'opt-out behavior'], color: ORANGE },
          ].map((cluster) => (
            <motion.div
              key={cluster.theme}
              variants={fadeUp}
              className="rounded-3xl p-5"
              style={{ backgroundColor: '#fff', boxShadow: `0 4px 20px ${cluster.color}12`, border: `1px solid ${cluster.color}25` }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold" style={{ fontSize: 13, color: NAVY, lineHeight: 1.3 }}>{cluster.theme}</p>
                <span className="rounded-full px-2 py-0.5" style={{ backgroundColor: `${cluster.color}20`, color: cluster.color, fontSize: 11, fontWeight: 700 }}>{cluster.count}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cluster.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, backgroundColor: `${cluster.color}12`, color: cluster.color, border: `1px solid ${cluster.color}25` }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════════════════════ */}
      <Section id="process" alt>
        <SectionLabel num="04">Design Process</SectionLabel>
        <SectionTitle>From confusion to clarity — the design decisions</SectionTitle>

        {/* Navigation architecture decision */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
          <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Navigation Architecture Decision</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: 'Option A — Top Tab Bar',
                desc: 'Horizontal scrolling tabs at the top. Common in health apps (Garmin, Polar). Familiar to Android users but creates thumb-reach issues and obscures content context on scroll.',
                verdict: 'Rejected',
                verdictColor: RED,
                pros: ['Familiar pattern', 'Visible all tabs at once'],
                cons: ['Thumb reach on tall phones', 'Overlaps scrolling content', 'Tested 2.1s slower navigation'],
              },
              {
                label: 'Option B — Bottom Tab Bar ✓',
                desc: 'Fixed bottom navigation with 4 primary destinations. Thumb-friendly zone. iOS and Android native pattern. Cleaner visual hierarchy — content breathes without competing with navigation.',
                verdict: 'Chosen',
                verdictColor: GREEN,
                pros: ['Thumb-friendly on all screen sizes', '1.4s faster navigation in test', 'Matches platform conventions'],
                cons: ['Limits to 4–5 top-level items'],
              },
            ].map((opt) => (
              <div
                key={opt.label}
                className="rounded-3xl p-6"
                style={{ backgroundColor: '#fff', boxShadow: `0 4px 24px ${BLUE}10`, border: `2px solid ${opt.verdictColor === GREEN ? GREEN : 'transparent'}`, opacity: opt.verdictColor === RED ? 0.75 : 1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold" style={{ fontSize: 15, color: NAVY }}>{opt.label}</p>
                  <span className="px-3 py-1 rounded-full font-bold" style={{ fontSize: 11, backgroundColor: `${opt.verdictColor}20`, color: opt.verdictColor }}>{opt.verdict}</span>
                </div>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7, marginBottom: 12 }}>{opt.desc}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p style={{ fontSize: 10, color: GREEN, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Pros</p>
                    {opt.pros.map((p) => <p key={p} style={{ fontSize: 11, color: '#374151', lineHeight: 1.6 }}>+ {p}</p>)}
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: RED, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Cons</p>
                    {opt.cons.map((c) => <p key={c} style={{ fontSize: 11, color: '#374151', lineHeight: 1.6 }}>− {c}</p>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data translation framework */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
          <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Data Translation Framework</h3>
          <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.8, marginBottom: 24, maxWidth: 640 }}>
            Every data point in Pulse passes through a 4-step framework before being shown to the user. This became the core design principle guiding all screen design decisions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', label: 'Raw Metric', example: 'HRV: 52ms', desc: 'The actual biometric measurement from the wearable sensor', color: '#6B7280', bg: '#F3F4F6' },
              { step: '02', label: 'Context', example: 'Your 30-day avg: 48ms', desc: 'Baseline comparison — is this high, low, or typical for this user?', color: BLUE, bg: `${BLUE}10` },
              { step: '03', label: 'Insight', example: 'Above your baseline — your body is well-recovered', desc: 'Plain-language interpretation of what the context means', color: GREEN, bg: `${GREEN}10` },
              { step: '04', label: 'Action', example: 'Good day for a hard workout', desc: 'A concrete, optional next step the user can take based on the insight', color: PURPLE, bg: `${PURPLE}10` },
            ].map((f, i) => (
              <div key={f.step} className="relative">
                {i < 3 && (
                  <div className="absolute right-0 top-1/2 hidden lg:block" style={{ width: 20, height: 2, backgroundColor: BLUE, transform: 'translateX(50%) translateY(-50%)', zIndex: 1 }} />
                )}
                <div className="rounded-3xl p-5" style={{ backgroundColor: f.bg, border: `1px solid ${f.color}25` }}>
                  <p className="font-bold mb-1" style={{ fontSize: 24, color: f.color }}>{f.step}</p>
                  <p className="font-bold mb-2" style={{ fontSize: 14, color: NAVY }}>{f.label}</p>
                  <p className="font-mono mb-3 px-2 py-1 rounded-lg" style={{ fontSize: 11, backgroundColor: 'rgba(0,0,0,0.06)', color: NAVY }}>{f.example}</p>
                  <p style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card layout iterations */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
          <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Card Layout Iterations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                version: 'V1 — Dense Grid',
                desc: 'Packed 8 metrics into a 4×2 grid. Information-rich but overwhelming. Users spent 8 seconds on average just scanning the layout without absorbing any meaning.',
                verdict: 'Too overwhelming',
                verdictColor: RED,
                score: '42% comprehension',
              },
              {
                version: 'V2 — Stacked List',
                desc: 'Full-width rows with metric name, number, and a bar chart per row. Scannable but long — users had to scroll past 6 items to reach actionable insight. Cognitive load remained high.',
                verdict: 'Better but slow',
                verdictColor: ORANGE,
                score: '61% comprehension',
              },
              {
                version: 'V3 — Hierarchy + Insight Card',
                desc: 'Ring for primary goal, 4 key metrics in a 2×2 grid, then a prominent insight card with action. Users found their answer in under 4 seconds. Comprehension jumped to 82%.',
                verdict: 'Chosen — highest clarity',
                verdictColor: GREEN,
                score: '82% comprehension',
              },
            ].map((v) => (
              <div
                key={v.version}
                className="rounded-3xl p-6"
                style={{ backgroundColor: '#fff', boxShadow: `0 4px 24px ${BLUE}10`, border: `1px solid ${BLUE}12` }}
              >
                <p className="font-bold mb-1" style={{ fontSize: 14, color: NAVY }}>{v.version}</p>
                <span className="inline-block px-2 py-0.5 rounded-full mb-3" style={{ fontSize: 10, backgroundColor: `${v.verdictColor}15`, color: v.verdictColor, fontWeight: 600 }}>{v.verdict}</span>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7, marginBottom: 12 }}>{v.desc}</p>
                <div className="rounded-xl px-3 py-2" style={{ backgroundColor: `${v.verdictColor}12` }}>
                  <p style={{ fontSize: 12, color: v.verdictColor, fontWeight: 700 }}>{v.score}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Health zone color system */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Health Zone Color System</h3>
          <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.8, marginBottom: 20, maxWidth: 600 }}>
            All health metrics map to a consistent color vocabulary. Users learn the system once and it transfers across every screen — heart rate, sleep quality, stress level, and recovery all speak the same visual language.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { zone: 'Resting', color: BLUE, desc: 'Recovery, low-intensity, baseline state', example: 'HR 50–60 BPM', textColor: '#1D4ED8' },
              { zone: 'Fat Burn', color: GREEN, desc: 'Light activity, aerobic base training', example: 'HR 60–100 BPM', textColor: '#065F46' },
              { zone: 'Cardio', color: ORANGE, desc: 'Moderate-to-vigorous aerobic effort', example: 'HR 100–140 BPM', textColor: '#92400E' },
              { zone: 'Peak', color: RED, desc: 'High intensity, maximum effort zone', example: 'HR 140+ BPM', textColor: '#991B1B' },
            ].map((z) => (
              <div
                key={z.zone}
                className="rounded-3xl p-5"
                style={{ backgroundColor: '#fff', border: `2px solid ${z.color}`, boxShadow: `0 4px 20px ${z.color}20` }}
              >
                <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: z.color, marginBottom: 12 }} />
                <p className="font-bold mb-1" style={{ fontSize: 14, color: NAVY }}>{z.zone}</p>
                <p className="font-mono mb-2" style={{ fontSize: 11, color: z.textColor, backgroundColor: `${z.color}15`, padding: '2px 6px', borderRadius: 4, display: 'inline-block' }}>{z.example}</p>
                <p style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>{z.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          SOLUTION — Interactive Mockup
      ══════════════════════════════════════════════════════════════ */}
      <Section id="solution">
        <SectionLabel num="05">The Solution</SectionLabel>
        <SectionTitle>Pulse — an app that actually speaks your language</SectionTitle>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-lg mb-16"
          style={{ color: '#4B5563', lineHeight: 1.8, maxWidth: 680 }}
        >
          The final design distills complex biometric data into a layered experience: a glanceable Today view for busy moments, deep-dive tabs for the data nerds, and a consistent insight→action card system that gives every user a clear next step regardless of their fitness level. Tap through the prototype below.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          {/* Annotation left */}
          <div className="absolute hidden lg:block" style={{ left: 'calc(50% - 220px)', top: '15%', transform: 'translateX(-100%)' }}>
            <div className="flex items-center gap-2">
              <div className="rounded-xl px-3 py-2 max-w-40" style={{ backgroundColor: `rgba(6,13,26,0.9)`, border: `1px solid ${BLUE}44`, backdropFilter: 'blur(8px)' }}>
                <p style={{ fontSize: 10, color: '#E5E7EB', lineHeight: 1.5 }}>Activity ring shows step progress at a glance — no numbers to decode</p>
              </div>
              <div style={{ width: 40, height: 1, backgroundColor: BLUE, opacity: 0.6 }} />
            </div>
          </div>

          {/* Annotation right */}
          <div className="absolute hidden lg:block" style={{ right: 'calc(50% - 220px)', top: '45%', transform: 'translateX(100%)' }}>
            <div className="flex items-center gap-2">
              <div style={{ width: 40, height: 1, backgroundColor: GREEN, opacity: 0.6 }} />
              <div className="rounded-xl px-3 py-2 max-w-40" style={{ backgroundColor: `rgba(6,13,26,0.9)`, border: `1px solid ${GREEN}44`, backdropFilter: 'blur(8px)' }}>
                <p style={{ fontSize: 10, color: '#E5E7EB', lineHeight: 1.5 }}>Insight card delivers a plain-language action — the #1 missing piece from competing apps</p>
              </div>
            </div>
          </div>

          <PhoneMockup />
        </motion.div>

        {/* Feature callouts below phone */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
        >
          {[
            { tab: 'Today', desc: 'At-a-glance dashboard with activity ring, 4 key metrics, and a daily insight card', color: BLUE },
            { tab: 'Activity', desc: 'Weekly trends with donut chart, step bars, and Apple-style activity rings', color: GREEN },
            { tab: 'Health', desc: 'Heart rate sparkline, sleep stage stacked bars, and stress level visualization', color: PURPLE },
            { tab: 'Workouts', desc: 'One-tap workout start, quick-type selector, and recent workout history', color: ORANGE },
          ].map((f) => (
            <motion.div
              key={f.tab}
              variants={fadeUp}
              className="rounded-2xl p-5"
              style={{ backgroundColor: '#fff', boxShadow: `0 4px 20px ${f.color}12`, border: `1px solid ${f.color}20` }}
            >
              <p className="font-bold mb-2" style={{ fontSize: 14, color: f.color }}>{f.tab}</p>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          TESTING
      ══════════════════════════════════════════════════════════════ */}
      <Section id="testing" alt>
        <SectionLabel num="06">Testing & Validation</SectionLabel>
        <SectionTitle>6 users, 4 flows, measurable results</SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-lg mb-6" style={{ color: '#4B5563', lineHeight: 1.8 }}>
              Testing ran two rounds across 6 participants — 2 beginners (Maya-type), 2 intermediates, and 2 advanced athletes (James-type). Moderated sessions via Maze with think-aloud protocol. Each participant completed all 4 core flows back-to-back, followed by a 5-question comprehension survey.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { val: '6', label: 'Participants' },
                { val: '4', label: 'Flows tested' },
                { val: '2', label: 'Test rounds' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl p-4 text-center" style={{ backgroundColor: `${BLUE}10`, border: `1px solid ${BLUE}20` }}>
                  <p className="font-bold" style={{ fontSize: 32, color: BLUE, lineHeight: 1 }}>{s.val}</p>
                  <p style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Before/After table */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-3xl overflow-hidden" style={{ boxShadow: `0 4px 24px ${BLUE}10`, border: `1px solid ${BLUE}15` }}>
            <table className="w-full" style={{ borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ backgroundColor: NAVY }}>
                  <th className="text-left p-3" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, textTransform: 'uppercase' }}>Flow</th>
                  <th className="text-center p-3" style={{ color: RED, fontSize: 10, textTransform: 'uppercase' }}>Before</th>
                  <th className="text-center p-3" style={{ color: GREEN, fontSize: 10, textTransform: 'uppercase' }}>After</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { flow: 'Onboarding', before: '35% complete', after: '70% complete' },
                  { flow: 'Daily Check-in', before: '42% comprehension', after: '82% comprehension' },
                  { flow: 'Workout Start', before: '58% first try', after: '94% first try' },
                  { flow: 'Sleep Review', before: '28% understood score', after: '78% understood score' },
                ].map((row, i) => (
                  <tr key={row.flow} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#F0F4FF' }}>
                    <td className="p-3 font-medium" style={{ color: NAVY }}>{row.flow}</td>
                    <td className="p-3 text-center" style={{ color: RED, fontWeight: 600 }}>{row.before}</td>
                    <td className="p-3 text-center" style={{ color: GREEN, fontWeight: 600 }}>{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>

        {/* Critical findings */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>3 Critical Findings & Resolutions</h3>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-4 mb-16">
          {[
            {
              finding: 'Sleep score lacked a benchmark — users had no idea if 82 was good',
              resolution: 'Added a personalized range indicator: "Your best: 89 · Average for your age: 75" beneath every score. Comprehension of sleep quality jumped from 28% to 78% in re-test.',
              icon: '🌙',
            },
            {
              finding: 'The "Start Workout" CTA was buried in a secondary menu — 4 of 6 users couldn\'t find it within 30 seconds',
              resolution: 'Promoted workout start to a primary card on the Today view with contextual timing (e.g., "You usually work out around now"). Task success went from 58% to 94%.',
              icon: '▶',
            },
            {
              finding: 'HRV terminology confused all 3 beginner-type users; they skipped the Health tab entirely',
              resolution: 'Renamed HRV to "Recovery Score" in all beginner-facing contexts with a tap-for-detail disclosure. Advanced users can toggle to see raw HRV values via settings. Tab engagement rose 3×.',
              icon: '❤️',
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-3xl p-6 flex gap-5"
              style={{ backgroundColor: '#fff', boxShadow: `0 4px 24px ${BLUE}10`, border: `1px solid ${BLUE}12` }}
            >
              <div style={{ fontSize: 28, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <p className="font-semibold mb-2" style={{ fontSize: 14, color: RED }}>Finding: {f.finding}</p>
                <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7 }}>
                  <span style={{ color: GREEN, fontWeight: 600 }}>Resolution: </span>{f.resolution}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* A/B/C onboarding variants */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Onboarding A/B/C Test — Why Variant C Won</h3>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              variant: 'A — Traditional Setup',
              desc: 'Linear 7-step wizard: account creation → device pairing → permissions → goals → notification preferences → health data consent → done.',
              result: '35% completion',
              finding: 'Users dropped at step 4. "I just wanted to see my data, not fill out a form" — 3 of 4 participants.',
              color: RED,
              won: false,
            },
            {
              variant: 'B — Minimal Setup',
              desc: 'Skip-all-optional approach: mandatory pairing only, everything else deferred. Fast but created a confusing empty state on first open — no goals, no baselines.',
              result: '61% completion',
              finding: 'Users completed onboarding but immediately felt lost. "Now what?" was the most common first reaction.',
              color: ORANGE,
              won: false,
            },
            {
              variant: 'C — Value-First Setup',
              desc: 'Show real sample data during onboarding. Let users experience the "Today" screen with demo data before committing to setup steps. Then prompt setup 1 item at a time over 7 days.',
              result: '70% completion',
              finding: 'Users were engaged and motivated. "Oh, it already knows what to show me" — 5 of 6 participants. Setup completion over 7 days: 94%.',
              color: GREEN,
              won: true,
            },
          ].map((v) => (
            <motion.div
              key={v.variant}
              variants={fadeUp}
              className="rounded-3xl p-6"
              style={{
                backgroundColor: '#fff',
                boxShadow: `0 4px 24px ${v.color}15`,
                border: `2px solid ${v.won ? GREEN : 'transparent'}`,
                position: 'relative',
              }}
            >
              {v.won && (
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full" style={{ backgroundColor: `${GREEN}20`, fontSize: 10, color: GREEN, fontWeight: 700 }}>
                  WINNER
                </div>
              )}
              <p className="font-bold mb-2" style={{ fontSize: 14, color: NAVY }}>{v.variant}</p>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7, marginBottom: 12 }}>{v.desc}</p>
              <div className="rounded-xl px-3 py-2 mb-3" style={{ backgroundColor: `${v.color}12` }}>
                <p style={{ fontSize: 14, color: v.color, fontWeight: 700 }}>{v.result}</p>
              </div>
              <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.6, fontStyle: 'italic' }}>{v.finding}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          RESULTS
      ══════════════════════════════════════════════════════════════ */}
      <Section id="results">
        <SectionLabel num="07">Results & Impact</SectionLabel>
        <SectionTitle>Measurable outcomes across all 6 dimensions</SectionTitle>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { metric: 'Activity Summary Comprehension', value: '+40%', detail: 'From 42% to 82% across all 3 persona types', color: BLUE, bg: `${BLUE}10`, border: `${BLUE}20` },
            { metric: 'Onboarding Drop-off', value: '−35%', detail: 'From 65% baseline drop-off to 30% after Variant C', color: GREEN, bg: `${GREEN}10`, border: `${GREEN}20` },
            { metric: 'Daily Active Usage', value: '1.2× → 3.8×', detail: 'Per-day opens lifted more than 3× in simulated 7-day pilot', color: PURPLE, bg: `${PURPLE}10`, border: `${PURPLE}20` },
            { metric: 'Task Completion Rate', value: '91%', detail: 'Across all 4 core flows in final usability round', color: ORANGE, bg: `${ORANGE}10`, border: `${ORANGE}20` },
            { metric: 'User Satisfaction NPS', value: '68', detail: 'Collected post-test across 6 participants (0–100 scale)', color: BLUE, bg: `${BLUE}10`, border: `${BLUE}20` },
            { metric: 'Engineering Handoff', value: '0 revisions', detail: 'Complete specs, tokens, and annotations delivered on first pass', color: GREEN, bg: `${GREEN}10`, border: `${GREEN}20` },
          ].map((r) => (
            <motion.div
              key={r.metric}
              variants={fadeUp}
              className="rounded-3xl p-6"
              style={{ backgroundColor: r.bg, border: `1px solid ${r.border}`, boxShadow: `0 4px 20px ${r.color}12` }}
            >
              <p className="font-bold mb-2" style={{ fontSize: r.value.length > 5 ? 28 : 36, color: r.color, lineHeight: 1 }}>{r.value}</p>
              <p className="font-semibold mb-1" style={{ fontSize: 14, color: NAVY }}>{r.metric}</p>
              <p style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>{r.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Learnings */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Key Learnings</h3>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: '🔬',
              title: 'Show value before asking for commitment',
              body: 'The value-first onboarding (Variant C) worked because users could see what Pulse would give them before they had to give Pulse anything. In health apps especially, trust precedes setup.',
            },
            {
              icon: '🗣️',
              title: 'Terminology is a UX problem, not a user problem',
              body: 'Users who "didn\'t understand HRV" understood it immediately when it was called Recovery Score. Language is a design decision with measurable impact on comprehension and engagement.',
            },
            {
              icon: '🎯',
              title: 'Context transforms data into insight',
              body: 'The single highest-leverage design change was adding personalized baselines. "52ms" is noise. "Above your 30-day average of 48ms — well recovered" is actionable. Context is the product.',
            },
          ].map((l) => (
            <motion.div
              key={l.title}
              variants={fadeUp}
              className="rounded-3xl p-6"
              style={{ backgroundColor: '#fff', boxShadow: `0 4px 24px ${BLUE}10`, border: `1px solid ${BLUE}12` }}
            >
              <span style={{ fontSize: 28 }}>{l.icon}</span>
              <h4 className="font-bold my-3" style={{ fontSize: 15, color: NAVY }}>{l.title}</h4>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>{l.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-3xl p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ backgroundColor: NAVY }}
        >
          <div>
            <p className="font-bold mb-2" style={{ fontSize: 22, color: '#fff' }}>Ready to see more work?</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Explore other case studies from the portfolio.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleBack}
              className="px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', fontSize: 14, cursor: 'pointer' }}
            >
              Back to All Projects
            </button>
            <button
              onClick={() => navigate('/smart-home')}
              className="px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${GREEN})`, color: '#fff', border: 'none', fontSize: 14, cursor: 'pointer' }}
            >
              View HomeSense Case Study →
            </button>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}
