import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

// ─── Types ────────────────────────────────────────────────────────────────────
type TabId = 'home' | 'devices' | 'energy' | 'schedules'
type DeviceId =
  | 'refrigerator'
  | 'oven'
  | 'dishwasher'
  | 'washer'
  | 'dryer'
  | 'coffee'
  | 'microwave'
  | 'purifier'
type DeviceStates = Record<DeviceId, boolean>

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

const AMBER = '#F59E0B'
const NAVY = '#0D1B2A'

// ─── Motion variants ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

// ─── Inline SVG icons ─────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
)
const DevicesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z" />
  </svg>
)
const EnergyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </svg>
)
const ScheduleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
  </svg>
)
const BackArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
)

// ─── Device metadata ──────────────────────────────────────────────────────────
const DEVICE_META: Record<DeviceId, { label: string; icon: string; status: string; detail: string }> = {
  refrigerator: { label: 'Refrigerator', icon: '🧊', status: '72°F', detail: 'Interior temp: 37°F · Freezer: 0°F · Door: Closed' },
  oven: { label: 'Oven', icon: '🔥', status: 'Off', detail: 'Preheat target: 375°F · Timer: None set' },
  dishwasher: { label: 'Dishwasher', icon: '🍽️', status: 'Running', detail: 'Cycle: Heavy · 38 min remaining · Door locked' },
  washer: { label: 'Washer', icon: '👕', status: 'Off', detail: 'Last cycle: Cotton · 45 min · Door unlocked' },
  dryer: { label: 'Dryer', icon: '🌀', status: 'Off', detail: 'Heat: Medium · Moisture sensor: Ready' },
  coffee: { label: 'Coffee Maker', icon: '☕', status: 'Scheduled 7am', detail: 'Brew size: 10 cups · Grind: Medium · Auto-off: 30 min' },
  microwave: { label: 'Microwave', icon: '📡', status: 'Off', detail: 'Power level: 100% · Clock synced' },
  purifier: { label: 'Air Purifier', icon: '💨', status: 'Running', detail: 'Mode: Auto · AQI: 22 (Good) · Filter: 78% life' },
}

// ─── App mockup sub-components ────────────────────────────────────────────────
const StatusBar = () => (
  <div className="flex items-center justify-between px-4 pt-1 pb-0" style={{ height: 20 }}>
    <span className="text-white text-xs font-semibold" style={{ fontSize: 11 }}>9:41</span>
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
    <div
      className="rounded-full"
      style={{ width: 120, height: 32, backgroundColor: '#000', borderRadius: 20 }}
    />
  </div>
)

const Toggle = ({
  on,
  onToggle,
}: {
  on: boolean
  onToggle: () => void
}) => (
  <button
    onClick={(e) => { e.stopPropagation(); onToggle() }}
    className="relative flex-shrink-0"
    style={{
      width: 36,
      height: 20,
      borderRadius: 10,
      backgroundColor: on ? AMBER : '#374151',
      transition: 'background-color 0.2s',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    <span
      style={{
        position: 'absolute',
        top: 2,
        left: on ? 18 : 2,
        width: 16,
        height: 16,
        borderRadius: '50%',
        backgroundColor: '#fff',
        transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }}
    />
  </button>
)

// ── Home screen ───────────────────────────────────────────────────────────────
const HomeScreen = ({
  deviceStates,
  setDeviceStates,
}: {
  deviceStates: DeviceStates
  setDeviceStates: React.Dispatch<React.SetStateAction<DeviceStates>>
}) => {
  const energyData = [18, 24, 19, 30, 27, 22, 25]
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const maxVal = Math.max(...energyData)

  return (
    <div className="flex flex-col gap-3 px-3 py-2 overflow-y-auto" style={{ maxHeight: 580 }}>
      {/* Header */}
      <div>
        <p className="text-gray-400" style={{ fontSize: 11 }}>Saturday, Apr 19</p>
        <h2 className="text-white font-bold" style={{ fontSize: 18 }}>Good morning, Sarah ☀️</h2>
      </div>

      {/* Active appliances */}
      <div>
        <p className="text-gray-400 mb-2" style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Active Now</p>
        <div className="grid grid-cols-2 gap-2">
          {([
            { id: 'refrigerator' as DeviceId, label: 'Refrigerator', val: '72°F', icon: '🧊' },
            { id: 'dishwasher' as DeviceId, label: 'Dishwasher', val: 'Running', icon: '🍽️' },
            { id: 'coffee' as DeviceId, label: 'Coffee Maker', val: 'Sched. 7am', icon: '☕' },
            { id: 'oven' as DeviceId, label: 'Oven', val: 'Off', icon: '🔥' },
          ] as { id: DeviceId; label: string; val: string; icon: string }[]).map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-3 flex flex-col gap-1"
              style={{
                backgroundColor: deviceStates[item.id] ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${deviceStates[item.id] ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <Toggle
                  on={deviceStates[item.id]}
                  onToggle={() => setDeviceStates((s) => ({ ...s, [item.id]: !s[item.id] }))}
                />
              </div>
              <p className="text-white" style={{ fontSize: 10, fontWeight: 600 }}>{item.label}</p>
              <p style={{ fontSize: 9, color: deviceStates[item.id] ? AMBER : '#6B7280' }}>{item.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Energy bar chart */}
      <div className="rounded-2xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-white" style={{ fontSize: 11, fontWeight: 600 }}>Energy This Week</p>
          <p style={{ fontSize: 10, color: AMBER }}>$47.20</p>
        </div>
        <div className="flex items-end gap-1" style={{ height: 44 }}>
          {energyData.map((val, i) => (
            <div key={i} className="flex flex-col items-center flex-1 gap-1">
              <div
                className="w-full rounded-sm"
                style={{
                  height: (val / maxVal) * 36,
                  backgroundColor: i === 6 ? AMBER : 'rgba(245,158,11,0.35)',
                  borderRadius: 3,
                }}
              />
              <span style={{ fontSize: 7, color: '#6B7280' }}>{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <p className="text-gray-400 mb-2" style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Quick Actions</p>
        <div className="flex gap-2">
          {[
            { label: 'Goodnight', icon: '🌙' },
            { label: 'Away Mode', icon: '🏠' },
            { label: 'Eco Mode', icon: '🌿' },
          ].map((a) => (
            <button
              key={a.label}
              className="flex-1 rounded-xl py-2 flex flex-col items-center gap-1"
              style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
            >
              <span style={{ fontSize: 14 }}>{a.icon}</span>
              <span className="text-white" style={{ fontSize: 8 }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Devices screen ────────────────────────────────────────────────────────────
const DevicesScreen = ({
  deviceStates,
  setDeviceStates,
  selectedDevice,
  setSelectedDevice,
}: {
  deviceStates: DeviceStates
  setDeviceStates: React.Dispatch<React.SetStateAction<DeviceStates>>
  selectedDevice: string | null
  setSelectedDevice: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const deviceKeys = Object.keys(DEVICE_META) as DeviceId[]

  if (selectedDevice) {
    const d = DEVICE_META[selectedDevice as DeviceId]
    const isOn = deviceStates[selectedDevice as DeviceId]
    return (
      <div className="flex flex-col px-3 py-2" style={{ height: '100%' }}>
        <button
          onClick={() => setSelectedDevice(null)}
          className="flex items-center gap-1 mb-3"
          style={{ background: 'none', border: 'none', color: AMBER, cursor: 'pointer', fontSize: 12 }}
        >
          ← Back
        </button>
        <div className="rounded-2xl p-4 mb-3" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 36 }}>{d.icon}</span>
            <Toggle on={isOn} onToggle={() => setDeviceStates((s) => ({ ...s, [selectedDevice as DeviceId]: !s[selectedDevice as DeviceId] }))} />
          </div>
          <p className="text-white font-bold mb-1" style={{ fontSize: 16 }}>{d.label}</p>
          <p style={{ fontSize: 11, color: isOn ? AMBER : '#6B7280' }}>● {isOn ? 'Active' : 'Off'}</p>
        </div>
        <div className="rounded-2xl p-3 mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-gray-400 mb-1" style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Status</p>
          <p className="text-white" style={{ fontSize: 11 }}>{d.detail}</p>
        </div>
        {selectedDevice === 'refrigerator' && (
          <div className="rounded-2xl p-3" style={{ backgroundColor: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <p className="mb-2" style={{ fontSize: 10, color: AMBER, fontWeight: 600 }}>Temperature Control</p>
            <div className="flex items-center justify-between">
              <button className="w-8 h-8 rounded-full text-white flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', fontSize: 16, cursor: 'pointer' }}>−</button>
              <span className="text-white font-bold" style={{ fontSize: 20 }}>37°F</span>
              <button className="w-8 h-8 rounded-full text-white flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', fontSize: 16, cursor: 'pointer' }}>+</button>
            </div>
          </div>
        )}
        {selectedDevice === 'oven' && (
          <div className="rounded-2xl p-3" style={{ backgroundColor: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <p className="mb-2" style={{ fontSize: 10, color: AMBER, fontWeight: 600 }}>Preheat to</p>
            <div className="flex gap-2">
              {[325, 375, 425, 475].map((t) => (
                <button key={t} className="flex-1 rounded-lg py-2 text-white" style={{ fontSize: 10, backgroundColor: t === 375 ? AMBER : 'rgba(255,255,255,0.08)', border: 'none', color: t === 375 ? '#000' : '#fff', cursor: 'pointer' }}>{t}°</button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 px-3 py-2 overflow-y-auto" style={{ maxHeight: 580 }}>
      <p className="text-white font-bold mb-1" style={{ fontSize: 15 }}>All Appliances</p>
      <div className="grid grid-cols-2 gap-2">
        {deviceKeys.map((key) => {
          const d = DEVICE_META[key]
          const isOn = deviceStates[key]
          return (
            <button
              key={key}
              onClick={() => setSelectedDevice(key)}
              className="rounded-2xl p-3 text-left"
              style={{
                backgroundColor: isOn ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isOn ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.08)'}`,
                cursor: 'pointer',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: 20 }}>{d.icon}</span>
                <Toggle on={isOn} onToggle={() => setDeviceStates((s) => ({ ...s, [key]: !s[key] }))} />
              </div>
              <p className="text-white" style={{ fontSize: 10, fontWeight: 600 }}>{d.label}</p>
              <p style={{ fontSize: 9, color: isOn ? AMBER : '#6B7280', marginTop: 2 }}>{d.status}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Energy screen ─────────────────────────────────────────────────────────────
const EnergyScreen = () => {
  const weekData = [18, 24, 19, 30, 27, 22, 25]
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const maxVal = Math.max(...weekData)
  const topAppliances = [
    { name: 'Refrigerator', usage: 24, pct: 100 },
    { name: 'Dishwasher', usage: 18, pct: 75 },
    { name: 'Washing Machine', usage: 12, pct: 50 },
    { name: 'Dryer', usage: 10, pct: 42 },
    { name: 'Oven', usage: 8, pct: 33 },
  ]

  return (
    <div className="flex flex-col gap-3 px-3 py-2 overflow-y-auto" style={{ maxHeight: 580 }}>
      <p className="text-white font-bold" style={{ fontSize: 15 }}>Energy Usage</p>

      {/* Cost summary */}
      <div className="rounded-2xl p-3 flex items-center justify-between" style={{ backgroundColor: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' }}>
        <div>
          <p className="text-gray-400" style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 1 }}>This Week</p>
          <p className="text-white font-bold" style={{ fontSize: 22 }}>$47.20</p>
          <p style={{ fontSize: 9, color: '#10B981' }}>↓ 8% vs last week</p>
        </div>
        {/* Efficiency ring */}
        <div className="relative flex items-center justify-center" style={{ width: 60, height: 60 }}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
            <circle
              cx="30" cy="30" r="24"
              fill="none"
              stroke={AMBER}
              strokeWidth="5"
              strokeDasharray={`${2 * Math.PI * 24 * 0.82} ${2 * Math.PI * 24}`}
              strokeLinecap="round"
              transform="rotate(-90 30 30)"
            />
          </svg>
          <div className="absolute text-center">
            <p className="text-white font-bold" style={{ fontSize: 12, lineHeight: 1 }}>82</p>
            <p style={{ fontSize: 7, color: '#9CA3AF' }}>score</p>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="rounded-2xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-white mb-2" style={{ fontSize: 10, fontWeight: 600 }}>Daily Breakdown (kWh)</p>
        <div className="flex items-end gap-1" style={{ height: 56 }}>
          {weekData.map((val, i) => (
            <div key={i} className="flex flex-col items-center flex-1 gap-1">
              <div
                className="w-full"
                style={{
                  height: (val / maxVal) * 44,
                  backgroundColor: i === 6 ? AMBER : 'rgba(245,158,11,0.4)',
                  borderRadius: '3px 3px 0 0',
                }}
              />
              <span style={{ fontSize: 7, color: '#6B7280' }}>{days[i].slice(0, 1)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top appliances */}
      <div className="rounded-2xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-white mb-2" style={{ fontSize: 10, fontWeight: 600 }}>Top Consumers</p>
        <div className="flex flex-col gap-2">
          {topAppliances.map((a) => (
            <div key={a.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-white" style={{ fontSize: 9 }}>{a.name}</span>
                <span style={{ fontSize: 9, color: AMBER }}>{a.usage} kWh</span>
              </div>
              <div className="rounded-full overflow-hidden" style={{ height: 4, backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <div className="rounded-full" style={{ width: `${a.pct}%`, height: '100%', backgroundColor: AMBER }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Schedules screen ──────────────────────────────────────────────────────────
const SchedulesScreen = () => {
  const [morningOn, setMorningOn] = useState(true)
  const [eveningOn, setEveningOn] = useState(true)

  const routines = [
    {
      id: 'morning',
      label: 'Morning Routine',
      time: '6:30 AM – 7:30 AM',
      icon: '🌅',
      steps: ['Coffee Maker starts at 6:30 AM', 'Kitchen lights brighten to 80%', 'Thermostat to 70°F at 7:00 AM'],
      on: morningOn,
      toggle: () => setMorningOn((v) => !v),
    },
    {
      id: 'evening',
      label: 'Evening Routine',
      time: '9:00 PM – 10:00 PM',
      icon: '🌙',
      steps: ['Dishwasher starts at 9:00 PM', 'Lights dim to 30%', 'Door locked & secured at 10:00 PM'],
      on: eveningOn,
      toggle: () => setEveningOn((v) => !v),
    },
  ]

  return (
    <div className="flex flex-col gap-3 px-3 py-2 overflow-y-auto" style={{ maxHeight: 580 }}>
      <p className="text-white font-bold" style={{ fontSize: 15 }}>Schedules & Routines</p>
      {routines.map((r) => (
        <div
          key={r.id}
          className="rounded-2xl p-3"
          style={{
            backgroundColor: r.on ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${r.on ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.08)'}`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 20 }}>{r.icon}</span>
              <div>
                <p className="text-white font-semibold" style={{ fontSize: 11 }}>{r.label}</p>
                <p style={{ fontSize: 9, color: '#9CA3AF' }}>{r.time}</p>
              </div>
            </div>
            <Toggle on={r.on} onToggle={r.toggle} />
          </div>
          <div className="flex flex-col gap-1 pl-1" style={{ borderLeft: `2px solid ${r.on ? AMBER : 'rgba(255,255,255,0.15)'}` }}>
            {r.steps.map((step) => (
              <p key={step} style={{ fontSize: 9, color: '#9CA3AF', paddingLeft: 8 }}>• {step}</p>
            ))}
          </div>
        </div>
      ))}
      <button
        className="rounded-2xl py-3 text-center w-full"
        style={{
          backgroundColor: 'transparent',
          border: `2px dashed ${AMBER}`,
          color: AMBER,
          fontSize: 11,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        + Add Routine
      </button>
      <div className="rounded-2xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-gray-400 mb-2" style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Upcoming</p>
        {[
          { label: 'Coffee Maker', time: 'Today, 7:00 AM', icon: '☕' },
          { label: 'Dishwasher', time: 'Today, 9:00 PM', icon: '🍽️' },
          { label: 'Washer', time: 'Sat, 10:00 AM', icon: '👕' },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between py-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 12 }}>{item.icon}</span>
              <span className="text-white" style={{ fontSize: 10 }}>{item.label}</span>
            </div>
            <span style={{ fontSize: 9, color: '#6B7280' }}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Full phone mockup ────────────────────────────────────────────────────────
const PhoneMockup = () => {
  const [activeTab, setActiveTab] = useState<TabId>('home')
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const [deviceStates, setDeviceStates] = useState<DeviceStates>({
    refrigerator: true,
    oven: false,
    dishwasher: true,
    washer: false,
    dryer: false,
    coffee: true,
    microwave: false,
    purifier: true,
  })

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'devices', label: 'Devices', icon: <DevicesIcon /> },
    { id: 'energy', label: 'Energy', icon: <EnergyIcon /> },
    { id: 'schedules', label: 'Schedules', icon: <ScheduleIcon /> },
  ]

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab)
    if (tab !== 'devices') setSelectedDevice(null)
  }

  return (
    <div
      className="relative mx-auto select-none"
      style={{
        width: 300,
        height: 644,
        borderRadius: 48,
        backgroundColor: '#0F172A',
        border: '8px solid #1E293B',
        boxShadow: '0 0 0 1px #334155, 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(245,158,11,0.08)',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      }}
    >
      {/* Screen content */}
      <div className="flex flex-col h-full">
        <StatusBar />
        <DynamicIsland />

        {/* Scrollable content area */}
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
              {activeTab === 'home' && (
                <HomeScreen deviceStates={deviceStates} setDeviceStates={setDeviceStates} />
              )}
              {activeTab === 'devices' && (
                <DevicesScreen
                  deviceStates={deviceStates}
                  setDeviceStates={setDeviceStates}
                  selectedDevice={selectedDevice}
                  setSelectedDevice={setSelectedDevice}
                />
              )}
              {activeTab === 'energy' && <EnergyScreen />}
              {activeTab === 'schedules' && <SchedulesScreen />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom tab bar */}
        <div
          className="flex items-center"
          style={{
            backgroundColor: 'rgba(15,23,42,0.95)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: 8,
            paddingTop: 8,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className="flex-1 flex flex-col items-center gap-1"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
            >
              <span style={{ color: activeTab === tab.id ? AMBER : '#4B5563' }}>{tab.icon}</span>
              <span style={{ fontSize: 8, color: activeTab === tab.id ? AMBER : '#4B5563', fontWeight: activeTab === tab.id ? 600 : 400 }}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Annotation card ──────────────────────────────────────────────────────────
const Annotation = ({
  text,
  side,
  top,
}: {
  text: string
  side: 'left' | 'right'
  top: string
}) => (
  <div
    className="absolute hidden lg:flex items-center gap-2"
    style={{
      top,
      [side]: side === 'left' ? 'calc(50% - 220px)' : 'auto',
      right: side === 'right' ? 'calc(50% - 220px)' : 'auto',
      transform: side === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
    }}
  >
    {side === 'right' && (
      <div style={{ width: 40, height: 1, backgroundColor: AMBER, opacity: 0.6 }} />
    )}
    <div
      className="rounded-xl px-3 py-2 max-w-40"
      style={{
        backgroundColor: 'rgba(13,27,42,0.9)',
        border: `1px solid ${AMBER}44`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <p style={{ fontSize: 10, color: '#E5E7EB', lineHeight: 1.5 }}>{text}</p>
    </div>
    {side === 'left' && (
      <div style={{ width: 40, height: 1, backgroundColor: AMBER, opacity: 0.6 }} />
    )}
  </div>
)

// ─── Section wrapper ──────────────────────────────────────────────────────────
const Section = ({
  id,
  children,
  alt = false,
}: {
  id: string
  children: React.ReactNode
  alt?: boolean
}) => (
  <section
    id={id}
    className="py-24 px-6"
    style={{ backgroundColor: alt ? '#FFFFFF' : '#F8F7F4' }}
  >
    <div className="max-w-5xl mx-auto">{children}</div>
  </section>
)

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <motion.p
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="uppercase tracking-widest font-semibold mb-3"
    style={{ color: AMBER, fontSize: 12 }}
  >
    {children}
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

// ─── Main component ───────────────────────────────────────────────────────────
export default function SmartHomeCaseStudy() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('overview')
  const [navVisible, setNavVisible] = useState(false)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Intersection observer for sticky nav
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
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
    sessionStorage.setItem('homepage-scroll', '0')
    navigate('/#projects')
  }

  return (
    <div className="relative" style={{ backgroundColor: '#F8F7F4', minHeight: '100vh' }}>

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
              style={{ backgroundColor: 'rgba(13,27,42,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}
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
                      backgroundColor: activeSection === id ? AMBER : 'rgba(255,255,255,0.3)',
                      boxShadow: activeSection === id ? `0 0 8px ${AMBER}` : 'none',
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

      {/* ── Horizontal nav (mobile) ── */}
      <AnimatePresence>
        {navVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-0 left-0 right-0 z-50 xl:hidden overflow-x-auto"
            style={{ backgroundColor: 'rgba(13,27,42,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
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
                    backgroundColor: activeSection === id ? AMBER : 'transparent',
                    color: activeSection === id ? '#000' : 'rgba(255,255,255,0.6)',
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
        style={{ backgroundColor: 'rgba(13,27,42,0.85)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
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
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        {/* Glow blob */}
        <div
          className="absolute pointer-events-none"
          style={{ top: '20%', right: '10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)' }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{ backgroundColor: `${AMBER}18`, border: `1px solid ${AMBER}44` }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: AMBER, display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: AMBER, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Connected Consumer Hardware Concept</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(52px, 8vw, 96px)', color: '#FFFFFF', lineHeight: 0.95, letterSpacing: '-2px' }}
          >
            Home
            <span style={{ color: AMBER }}>Sense</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
            style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', fontWeight: 300 }}
          >
            One app. Every appliance.
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
              { label: 'Timeline', value: '14 weeks · 2024' },
              { label: 'Platform', value: 'iOS + Android' },
              { label: 'Tools', value: 'Figma, Principle, iOS, Android' },
            ].map((chip) => (
              <div
                key={chip.label}
                className="px-4 py-2 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span style={{ fontSize: 10, color: AMBER, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{chip.label} · </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{chip.value}</span>
              </div>
            ))}
          </motion.div>

          {/* Outcome numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { num: '+35%', desc: 'Daily engagement lift' },
              { num: '+40%', desc: 'First-attempt task success' },
              { num: '−45%', desc: 'First-time pairing friction' },
            ].map((stat) => (
              <div
                key={stat.num}
                className="rounded-3xl p-6"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="font-bold mb-1" style={{ fontSize: 40, color: AMBER, lineHeight: 1 }}>{stat.num}</p>
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
            <div style={{ width: 4, height: 8, borderRadius: 2, backgroundColor: AMBER }} />
          </motion.div>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, textTransform: 'uppercase' }}>Scroll</p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          OVERVIEW
      ══════════════════════════════════════════════════════════════ */}
      <Section id="overview">
        <SectionLabel>01 — Overview</SectionLabel>
        <SectionTitle>The big picture</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-lg mb-6" style={{ color: '#4B5563', lineHeight: 1.8 }}>
              HomeSense is a unified smart-home companion app that consolidates control for eight kitchen and household appliances into a single, coherent experience. The project was a 14-week end-to-end design sprint — from ethnographic research through pixel-perfect Figma handoff — for a connected consumer hardware concept targeting urban homeowners.
            </p>
            <p style={{ color: '#6B7280', lineHeight: 1.8 }}>
              As Lead Product Designer, I owned the full design lifecycle: defining the research plan, mapping the information architecture, crafting the interaction model, prototyping multiple onboarding variants in Principle, and running five moderated usability sessions. The final designs lifted daily active engagement from 12% to 47% and cut first-time pairing time nearly in half.
            </p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-6">
            {/* Deliverables */}
            <motion.div variants={fadeUp} className="rounded-3xl p-6" style={{ backgroundColor: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <p className="font-bold mb-4" style={{ fontSize: 13, color: NAVY, textTransform: 'uppercase', letterSpacing: 1 }}>Deliverables</p>
              <ul className="flex flex-col gap-2">
                {[
                  'User research synthesis & affinity map',
                  'Competitive audit (4 platforms)',
                  'User persona & journey map',
                  'Information architecture diagram',
                  'Wireframe explorations (3 rounds)',
                  '3 Principle-prototyped onboarding variants',
                  'High-fidelity Figma component library',
                  'iOS + Android handoff specs',
                  'Usability test report (5 sessions)',
                ].map((d) => (
                  <li key={d} className="flex items-start gap-2" style={{ fontSize: 13, color: '#374151' }}>
                    <span style={{ color: AMBER, flexShrink: 0, marginTop: 2 }}>✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tools */}
            <motion.div variants={fadeUp} className="rounded-3xl p-6" style={{ backgroundColor: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <p className="font-bold mb-4" style={{ fontSize: 13, color: NAVY, textTransform: 'uppercase', letterSpacing: 1 }}>Tools Used</p>
              <div className="flex flex-wrap gap-2">
                {['Figma', 'Figma Make', 'Principle', 'iOS TestFlight', 'Android Studio', 'Maze', 'Miro', 'Notion'].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full" style={{ fontSize: 12, backgroundColor: `${AMBER}15`, color: '#92400E', border: `1px solid ${AMBER}30`, fontWeight: 500 }}>{t}</span>
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
        <SectionLabel>02 — Challenge</SectionLabel>
        <SectionTitle>A fragmented smart home</SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-lg mb-6" style={{ color: '#4B5563', lineHeight: 1.8 }}>
              The average smart-home household juggles eight separate manufacturer apps — one for the fridge, another for the oven, yet another for the dishwasher. Each app has its own design language, notification cadence, and account ecosystem. The cognitive overhead is immense and abandonment is rampant.
            </p>
            <p style={{ color: '#6B7280', lineHeight: 1.8 }}>
              Research confirmed what early diary studies hinted at: users weren't failing because the hardware was broken. They were failing because the software experience was designed in silos, without any empathy for the multi-appliance household workflow.
            </p>
          </motion.div>

          {/* Baseline stats */}
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 gap-4">
            {[
              { val: '8+', desc: 'Separate apps required per household', neg: true },
              { val: '4.2 min', desc: 'Average first-time pairing time', neg: true },
              { val: '52%', desc: 'First-attempt task success on control screens', neg: true },
              { val: '12%', desc: 'Daily active engagement baseline', neg: true },
            ].map((s) => (
              <motion.div
                key={s.val}
                variants={fadeUp}
                className="rounded-3xl p-5"
                style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}
              >
                <p className="font-bold" style={{ fontSize: 32, color: '#DC2626', lineHeight: 1 }}>{s.val}</p>
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
              { q: 'How might we reduce the mental model gap between eight different appliance interfaces into a single learnable system?', num: '01' },
              { q: 'How might we make the first-time pairing experience feel effortless, even for users who are not tech-savvy?', num: '02' },
              { q: 'How might we surface the right appliance controls at the right moment — without overwhelming the user with everything at once?', num: '03' },
            ].map((hmw) => (
              <motion.div
                key={hmw.num}
                variants={fadeUp}
                className="rounded-3xl p-6"
                style={{ backgroundColor: NAVY, boxShadow: '0 8px 32px rgba(13,27,42,0.15)' }}
              >
                <p className="font-bold mb-4" style={{ fontSize: 32, color: `${AMBER}40` }}>{hmw.num}</p>
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
        <SectionLabel>03 — Research & Discovery</SectionLabel>
        <SectionTitle>8 interviews, 4 weeks, one clear truth</SectionTitle>

        {/* Interview summary */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-3xl p-8 mb-12" style={{ backgroundColor: NAVY }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '8', desc: 'Moderated interviews' },
              { val: '28–45', desc: 'Age range of participants' },
              { val: '6+', desc: 'Avg smart appliances owned' },
              { val: '4 wks', desc: 'Field research duration' },
            ].map((s) => (
              <div key={s.val}>
                <p className="font-bold" style={{ fontSize: 40, color: AMBER }}>{s.val}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Insight cards */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Key Research Findings</h3>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {[
            { icon: '🧠', title: 'Cognitive Overload', body: '7 of 8 participants described managing multiple apps as "exhausting." They used workarounds like manufacturer remotes or voice assistants to avoid opening apps altogether.' },
            { icon: '⏱️', title: 'Pairing Abandonment', body: 'All participants had at least one appliance they gave up pairing. The top reason: overly long QR-code or manual-code flows with no progress indication.' },
            { icon: '📣', title: 'Notification Fatigue', body: 'Participants received an average of 14 push notifications per day across manufacturer apps — 83% of which they considered "low value" and had disabled entirely.' },
            { icon: '👁️', title: 'Status Anxiety', body: '"Did the dishwasher finish?" was the most common recurring check. Users wanted ambient status glances, not full app launches, to confirm appliance states.' },
            { icon: '🔋', title: 'Energy Blindspot', body: '6 of 8 participants had no idea which appliances consumed the most energy. All 6 said they would actively change behavior if shown this information clearly.' },
          ].map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="rounded-3xl p-6"
              style={{ backgroundColor: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}
            >
              <span style={{ fontSize: 28 }}>{card.icon}</span>
              <h4 className="font-bold my-3" style={{ fontSize: 15, color: NAVY }}>{card.title}</h4>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>{card.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Competitive analysis table */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Competitive Analysis</h3>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-3xl overflow-hidden mb-16" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ backgroundColor: NAVY, color: '#fff' }}>
                  <th className="text-left p-4" style={{ fontWeight: 600 }}>Feature</th>
                  {['Samsung SmartThings', 'Google Home', 'Apple Home', 'Philips Hue'].map((c) => (
                    <th key={c} className="text-center p-4" style={{ fontWeight: 600, fontSize: 11 }}>{c}</th>
                  ))}
                  <th className="text-center p-4" style={{ fontWeight: 700, color: AMBER, fontSize: 11 }}>HomeSense</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Cross-brand appliance support', vals: ['✓', '✓', '✗', '✗', '✓'] },
                  { feature: 'Guided pairing flow', vals: ['Partial', '✓', '✓', '✓', '✓'] },
                  { feature: 'Energy usage dashboard', vals: ['✓', 'Partial', '✗', '✓', '✓'] },
                  { feature: 'Routine automation', vals: ['✓', '✓', '✓', '✗', '✓'] },
                  { feature: 'WCAG 2.1 AA compliant', vals: ['✗', 'Partial', '✓', '✗', '✓'] },
                  { feature: 'Single unified nav hierarchy', vals: ['✗', '✗', '✗', '✗', '✓'] },
                  { feature: 'Appliance detail controls', vals: ['Partial', 'Partial', '✗', '✓', '✓'] },
                ].map((row, i) => (
                  <tr key={row.feature} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#F8F7F4' }}>
                    <td className="p-4 font-medium" style={{ color: NAVY }}>{row.feature}</td>
                    {row.vals.slice(0, 4).map((v, j) => (
                      <td key={j} className="p-4 text-center" style={{ color: v === '✓' ? '#059669' : v === '✗' ? '#DC2626' : '#D97706' }}>{v}</td>
                    ))}
                    <td className="p-4 text-center font-bold" style={{ color: '#059669' }}>{row.vals[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* User persona */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Primary Persona</h3>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-3xl p-8 mb-16" style={{ backgroundColor: '#fff', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center text-5xl" style={{ backgroundColor: `${AMBER}20`, border: `3px solid ${AMBER}` }}>
                👩‍💼
              </div>
              <h4 className="font-bold" style={{ fontSize: 20, color: NAVY }}>Sarah Chen</h4>
              <p style={{ fontSize: 13, color: '#6B7280' }}>34 · Boston, MA</p>
              <p style={{ fontSize: 13, color: '#6B7280' }}>Product Manager</p>
              <div className="flex flex-wrap gap-1 justify-center mt-3">
                {['Efficiency-driven', 'Tech-comfortable', 'Time-poor'].map((t) => (
                  <span key={t} className="px-2 py-1 rounded-full" style={{ fontSize: 10, backgroundColor: `${AMBER}18`, color: '#92400E', border: `1px solid ${AMBER}30` }}>{t}</span>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-3" style={{ fontSize: 13, color: NAVY, textTransform: 'uppercase', letterSpacing: 1 }}>About</h5>
              <p className="mb-4" style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>Sarah owns a 1,400 sq ft condo with 6 smart appliances spread across three brands. She is not a tech enthusiast — she bought smart devices because of energy savings promises, not for the gadget factor. She is comfortable with apps but has zero patience for friction.</p>
              <h5 className="font-semibold mb-3" style={{ fontSize: 13, color: NAVY, textTransform: 'uppercase', letterSpacing: 1 }}>Goals</h5>
              <ul className="flex flex-col gap-1">
                {['Know every appliance status at a glance', 'Start her coffee without opening an app', 'Understand her monthly energy spend', 'Set routines and forget about them'].map((g) => (
                  <li key={g} className="flex items-start gap-2" style={{ fontSize: 13, color: '#374151' }}>
                    <span style={{ color: AMBER, flexShrink: 0 }}>→</span>{g}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3" style={{ fontSize: 13, color: NAVY, textTransform: 'uppercase', letterSpacing: 1 }}>Frustrations</h5>
              <ul className="flex flex-col gap-1 mb-4">
                {['"I have 5 apps I never open"', '"Pairing took 20 minutes"', '"I don\'t know which device costs the most"', '"Notifications are noise"'].map((f) => (
                  <li key={f} className="flex items-start gap-2" style={{ fontSize: 13, color: '#374151', fontStyle: 'italic' }}>
                    <span style={{ color: '#DC2626', flexShrink: 0 }}>✕</span>{f}
                  </li>
                ))}
              </ul>
              <h5 className="font-semibold mb-3" style={{ fontSize: 13, color: NAVY, textTransform: 'uppercase', letterSpacing: 1 }}>Smart Appliances Owned</h5>
              <div className="flex flex-wrap gap-1">
                {['Refrigerator', 'Dishwasher', 'Oven', 'Coffee Maker', 'Air Purifier', 'Washing Machine'].map((a) => (
                  <span key={a} className="px-2 py-1 rounded-full" style={{ fontSize: 10, backgroundColor: '#F3F4F6', color: '#374151' }}>{a}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Journey map */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>User Journey Map</h3>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="overflow-x-auto">
          <div className="grid grid-cols-5 gap-0 min-w-max md:min-w-0 rounded-3xl overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}>
            {[
              {
                stage: 'Discovery',
                action: 'Unboxes appliance, finds QR code',
                emotion: '😐 Curious',
                pain: 'Where do I start? Which app do I even need?',
                opp: 'Universal entry point with brand detection',
              },
              {
                stage: 'Setup',
                action: 'Attempts pairing via manufacturer app',
                emotion: '😤 Frustrated',
                pain: '4.2 min average pairing time. Multiple failed attempts.',
                opp: 'Guided 3-step pairing with progress indicator',
              },
              {
                stage: 'First Use',
                action: 'Navigates app to find basic controls',
                emotion: '😕 Confused',
                pain: 'Cannot find the right screen. Task success only 52%.',
                opp: 'Clear nav hierarchy + contextual onboarding',
              },
              {
                stage: 'Daily Use',
                action: 'Checks status, adjusts settings',
                emotion: '😒 Disengaged',
                pain: 'Opens app rarely. Uses hardware controls instead.',
                opp: 'Glanceable home screen + smart notifications',
              },
              {
                stage: 'Routine',
                action: 'Tries to set automation',
                emotion: '😖 Overwhelmed',
                pain: 'Automation builder is buried & complex.',
                opp: 'Pre-built routine templates + simple editor',
              },
            ].map((col, i) => (
              <motion.div key={col.stage} variants={fadeUp} className="flex flex-col" style={{ minWidth: 160 }}>
                {/* Stage header */}
                <div className="p-4 text-center" style={{ backgroundColor: NAVY }}>
                  <p className="font-bold" style={{ fontSize: 11, color: AMBER, textTransform: 'uppercase', letterSpacing: 1 }}>Stage {i + 1}</p>
                  <p className="font-bold" style={{ fontSize: 14, color: '#fff', marginTop: 4 }}>{col.stage}</p>
                </div>
                {/* Action */}
                <div className="p-4" style={{ backgroundColor: '#fff', borderBottom: '1px solid #F3F4F6', flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Action</p>
                  <p style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>{col.action}</p>
                </div>
                {/* Emotion */}
                <div className="p-4" style={{ backgroundColor: '#FFFBEB', borderBottom: '1px solid #FEF3C7' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#92400E', marginBottom: 4 }}>Emotion</p>
                  <p style={{ fontSize: 13 }}>{col.emotion}</p>
                </div>
                {/* Pain point */}
                <div className="p-4" style={{ backgroundColor: '#FEF2F2', borderBottom: '1px solid #FECACA' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#991B1B', marginBottom: 4 }}>Pain Point</p>
                  <p style={{ fontSize: 11, color: '#7F1D1D', lineHeight: 1.5 }}>{col.pain}</p>
                </div>
                {/* Opportunity */}
                <div className="p-4" style={{ backgroundColor: '#F0FDF4' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#14532D', marginBottom: 4 }}>Opportunity</p>
                  <p style={{ fontSize: 11, color: '#166534', lineHeight: 1.5 }}>{col.opp}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════════════════════════ */}
      <Section id="process" alt>
        <SectionLabel>04 — Design Process</SectionLabel>
        <SectionTitle>From chaos to clarity</SectionTitle>

        {/* IA Diagram */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Information Architecture</h3>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="rounded-3xl p-8 mb-16" style={{ backgroundColor: NAVY, boxShadow: '0 8px 40px rgba(13,27,42,0.2)' }}>
          {/* Root */}
          <div className="flex justify-center mb-6">
            <div className="px-6 py-3 rounded-2xl font-bold text-center" style={{ backgroundColor: AMBER, color: '#000', fontSize: 14 }}>HomeSense App</div>
          </div>
          {/* L1 — Tabs */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Home', items: ['Status overview', 'Active appliances', 'Energy summary', 'Quick actions'] },
              { label: 'Devices', items: ['All appliances', 'Device detail', 'Controls', 'Schedule device'] },
              { label: 'Energy', items: ['Weekly chart', 'Cost estimate', 'Top consumers', 'Efficiency score'] },
              { label: 'Schedules', items: ['Routines', 'Add routine', 'Upcoming runs', 'Edit routine'] },
            ].map((tab) => (
              <div key={tab.label} className="flex flex-col gap-2">
                <div className="rounded-xl p-3 text-center font-semibold" style={{ backgroundColor: 'rgba(245,158,11,0.2)', border: `1px solid ${AMBER}50`, color: AMBER, fontSize: 13 }}>{tab.label}</div>
                {tab.items.map((item) => (
                  <div key={item} className="rounded-lg px-3 py-2 text-center" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{item}</div>
                ))}
              </div>
            ))}
          </div>
          {/* Settings branch */}
          <div className="flex justify-center mt-4">
            <div className="flex flex-col items-center gap-2">
              <div style={{ width: 1, height: 20, backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <div className="px-4 py-2 rounded-xl text-center" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Settings · Account · Notifications · Accessibility</div>
            </div>
          </div>
        </motion.div>

        {/* Wireframe evolution */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Wireframe Evolution</h3>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              phase: 'Before',
              label: 'Manufacturer App Pattern',
              issues: ['One app per appliance', 'Inconsistent nav patterns', 'Buried controls', 'No cross-device view'],
              color: '#FEF2F2',
              border: '#FECACA',
              tag: '#DC2626',
            },
            {
              phase: 'Iteration 1',
              label: 'Unified Dashboard v1',
              issues: ['Single app architecture', 'Tab bar introduced', 'Too much info density', 'Overwhelming home screen'],
              color: '#FFFBEB',
              border: '#FDE68A',
              tag: '#D97706',
            },
            {
              phase: 'Final',
              label: 'Progressive Disclosure',
              issues: ['Contextual information', 'Glanceable home view', 'Detail on demand', 'WCAG 2.1 compliant'],
              color: '#F0FDF4',
              border: '#BBF7D0',
              tag: '#059669',
            },
          ].map((wf) => (
            <motion.div
              key={wf.phase}
              variants={fadeUp}
              className="rounded-3xl overflow-hidden"
              style={{ backgroundColor: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)' }}
            >
              {/* Wireframe sketch representation */}
              <div className="p-6" style={{ backgroundColor: wf.color, borderBottom: `1px solid ${wf.border}` }}>
                <div className="mx-auto rounded-2xl overflow-hidden" style={{ width: 140, height: 240, backgroundColor: '#1E293B', position: 'relative' }}>
                  {/* Status bar */}
                  <div className="flex justify-between px-3 pt-2 pb-1" style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)' }}>
                    <span>9:41</span><span>⚡</span>
                  </div>
                  {wf.phase === 'Before' && (
                    <div className="px-2 py-1 flex flex-col gap-1">
                      <div className="rounded-md p-2" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-1 w-12 rounded mb-1" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
                        <div className="h-10 w-full rounded" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }} />
                      </div>
                      {[1, 2].map((n) => (
                        <div key={n} className="rounded-md p-2 flex items-center gap-1" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                          <div className="rounded-sm flex-shrink-0" style={{ width: 20, height: 20, backgroundColor: 'rgba(255,255,255,0.08)' }} />
                          <div className="flex-1">
                            <div className="h-1 w-10 rounded mb-1" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
                            <div className="h-1 w-8 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
                          </div>
                        </div>
                      ))}
                      <div className="rounded-md p-2 mt-8" style={{ backgroundColor: 'rgba(220,38,38,0.2)', border: '1px dashed rgba(220,38,38,0.4)' }}>
                        <div className="h-1 w-full rounded" style={{ backgroundColor: 'rgba(220,38,38,0.3)' }} />
                        <p style={{ fontSize: 7, color: '#FCA5A5', marginTop: 4 }}>Wrong app! Switch to Fridge app</p>
                      </div>
                    </div>
                  )}
                  {wf.phase === 'Iteration 1' && (
                    <div className="px-2 py-1 flex flex-col gap-1">
                      <div className="rounded-md p-2" style={{ backgroundColor: 'rgba(245,158,11,0.1)' }}>
                        <div className="h-1 w-16 rounded mb-1" style={{ backgroundColor: `${AMBER}40` }} />
                        <div className="grid grid-cols-3 gap-1 mt-1">
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="rounded" style={{ height: 24, backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }} />
                          ))}
                        </div>
                      </div>
                      <div className="rounded-md p-2" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                        <div className="h-1 w-12 rounded mb-1" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                        <div className="flex gap-1 items-end" style={{ height: 30 }}>
                          {[40, 60, 45, 70, 55, 65, 50].map((h, i) => (
                            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: `${AMBER}50` }} />
                          ))}
                        </div>
                      </div>
                      <div style={{ fontSize: 7, color: '#D97706', marginTop: 2 }}>↑ Information overload on first view</div>
                    </div>
                  )}
                  {wf.phase === 'Final' && (
                    <div className="px-2 py-1 flex flex-col gap-1">
                      <div className="h-5 rounded-md mb-1" style={{ backgroundColor: 'rgba(245,158,11,0.15)' }}>
                        <div className="h-1 w-10 rounded mx-auto mt-2" style={{ backgroundColor: `${AMBER}60` }} />
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {[1, 2, 3, 4].map((n) => (
                          <div key={n} className="rounded-lg p-1.5" style={{ backgroundColor: 'rgba(245,158,11,0.1)', border: `1px solid ${AMBER}30` }}>
                            <div className="h-1 w-5 rounded mb-1" style={{ backgroundColor: `${AMBER}40` }} />
                            <div className="h-1 w-8 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                          </div>
                        ))}
                      </div>
                      <div className="rounded-lg p-2 mt-1" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                        <div className="flex gap-1 items-end" style={{ height: 24 }}>
                          {[40, 60, 45, 70, 55, 65, 80].map((h, i) => (
                            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: i === 6 ? AMBER : `${AMBER}35` }} />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-around mt-2 pt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        {['⌂', '⊞', '⚡', '⏰'].map((ic) => (
                          <span key={ic} style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{ic}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 rounded-full font-bold" style={{ fontSize: 10, backgroundColor: `${wf.tag}15`, color: wf.tag, border: `1px solid ${wf.tag}30` }}>{wf.phase}</span>
                  <h4 className="font-bold" style={{ fontSize: 14, color: NAVY }}>{wf.label}</h4>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {wf.issues.map((issue) => (
                    <li key={issue} className="flex items-start gap-2" style={{ fontSize: 12, color: '#6B7280' }}>
                      <span style={{ color: wf.tag, flexShrink: 0 }}>{wf.phase === 'Final' ? '✓' : wf.phase === 'Iteration 1' ? '△' : '✕'}</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Onboarding variants */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Onboarding Variants (Prototyped in Principle)</h3>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              variant: 'Variant A',
              title: 'Manual Code Entry',
              desc: 'Users enter a pairing code found in the appliance manual. Clean, brand-agnostic, but high friction.',
              pros: ['Works offline', 'Brand agnostic'],
              cons: ['Avg 4.2 min completion', '38% dropoff on code step'],
              chosen: false,
            },
            {
              variant: 'Variant B',
              title: 'QR Code Scan + Confirm',
              desc: 'Scan the QR code on the appliance, confirm on the app. Faster but failed when labels were damaged.',
              pros: ['2.8 min completion', 'Visual and tactile'],
              cons: ['Fails with damaged labels', 'Camera permission friction'],
              chosen: false,
            },
            {
              variant: 'Variant C — CHOSEN',
              title: 'Smart Detect + Guided Steps',
              desc: 'App uses BLE scanning to detect nearby appliances, then guides user through a 3-step confirmation flow. Reduced pairing time by 45%.',
              pros: ['2.3 min completion', 'No manual code needed', '45% less friction', '92% first-attempt success'],
              cons: ['Requires BLE permissions', 'Needs appliance firmware v2+'],
              chosen: true,
            },
          ].map((v) => (
            <motion.div
              key={v.variant}
              variants={fadeUp}
              className="rounded-3xl p-6"
              style={{
                backgroundColor: v.chosen ? NAVY : '#fff',
                boxShadow: v.chosen ? `0 8px 40px rgba(13,27,42,0.2), 0 0 0 2px ${AMBER}` : '0 4px 24px rgba(0,0,0,0.06)',
                border: v.chosen ? `2px solid ${AMBER}` : '1px solid rgba(0,0,0,0.04)',
              }}
            >
              <span className="px-3 py-1 rounded-full font-bold inline-block mb-3" style={{ fontSize: 10, backgroundColor: v.chosen ? AMBER : `${AMBER}15`, color: v.chosen ? '#000' : '#92400E', textTransform: 'uppercase', letterSpacing: 1 }}>{v.variant}</span>
              <h4 className="font-bold mb-2" style={{ fontSize: 16, color: v.chosen ? '#fff' : NAVY }}>{v.title}</h4>
              <p className="mb-4" style={{ fontSize: 13, color: v.chosen ? 'rgba(255,255,255,0.7)' : '#6B7280', lineHeight: 1.6 }}>{v.desc}</p>
              <div className="flex flex-col gap-1 mb-3">
                {v.pros.map((p) => (
                  <div key={p} className="flex items-start gap-1.5" style={{ fontSize: 12, color: v.chosen ? '#6EE7B7' : '#059669' }}>
                    <span>✓</span>{p}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                {v.cons.map((c) => (
                  <div key={c} className="flex items-start gap-1.5" style={{ fontSize: 12, color: v.chosen ? 'rgba(252,165,165,0.9)' : '#DC2626' }}>
                    <span>✕</span>{c}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          SOLUTION — Interactive phone mockup
      ══════════════════════════════════════════════════════════════ */}
      <Section id="solution">
        <SectionLabel>05 — The Solution</SectionLabel>
        <SectionTitle>HomeSense — Interactive Prototype</SectionTitle>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
          style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.8 }}
        >
          Tap the tabs, toggle appliances on and off, and explore the device detail views. This is a fully interactive React prototype of the final HomeSense design — built pixel-for-pixel from the Figma handoff.
        </motion.p>

        <div className="relative flex justify-center">
          {/* Glow behind phone */}
          <div
            className="absolute pointer-events-none"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${AMBER}22 0%, transparent 70%)`, filter: 'blur(20px)' }}
          />

          {/* Annotation left — Nav architecture */}
          <Annotation text="4-tab bottom nav mirrors mental model: Place → Device → Cost → Time" side="left" top="20%" />
          {/* Annotation right — Energy */}
          <Annotation text="Energy dashboard surfaces blind-spot insight. Top request from 6/8 participants." side="right" top="42%" />
          {/* Annotation left — Toggle */}
          <Annotation text="44px tap targets on all toggles — WCAG 2.1 compliant minimum" side="left" top="62%" />
          {/* Annotation right — Tab */}
          <Annotation text="Amber accent denotes active state; meets 3:1 contrast ratio minimum" side="right" top="82%" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          TESTING
      ══════════════════════════════════════════════════════════════ */}
      <Section id="testing" alt>
        <SectionLabel>06 — Testing & Validation</SectionLabel>
        <SectionTitle>5 sessions. Real insights. Measurable fixes.</SectionTitle>

        {/* Onboarding variant results */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Onboarding Variant Test Results</h3>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { variant: 'Variant A — Manual Code', time: '4.2 min', success: '62%', dropoff: '38%', nps: '2.1 / 5', winner: false },
            { variant: 'Variant B — QR Scan', time: '2.8 min', success: '74%', dropoff: '22%', nps: '3.4 / 5', winner: false },
            { variant: 'Variant C — Smart Detect', time: '2.3 min', success: '92%', dropoff: '8%', nps: '4.6 / 5', winner: true },
          ].map((r) => (
            <motion.div
              key={r.variant}
              variants={fadeUp}
              className="rounded-3xl p-6"
              style={{ backgroundColor: r.winner ? NAVY : '#fff', border: r.winner ? `2px solid ${AMBER}` : '1px solid rgba(0,0,0,0.06)', boxShadow: r.winner ? `0 8px 40px rgba(13,27,42,0.2)` : '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-bold" style={{ fontSize: 13, color: r.winner ? AMBER : NAVY, maxWidth: 160 }}>{r.variant}</h4>
                {r.winner && <span className="px-2 py-1 rounded-full" style={{ fontSize: 9, backgroundColor: AMBER, color: '#000', fontWeight: 700, whiteSpace: 'nowrap' }}>Winner</span>}
              </div>
              {[
                { label: 'Avg Time', val: r.time },
                { label: 'Task Success', val: r.success },
                { label: 'Dropoff Rate', val: r.dropoff },
                { label: 'User Rating', val: r.nps },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${r.winner ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}` }}>
                  <span style={{ fontSize: 12, color: r.winner ? 'rgba(255,255,255,0.5)' : '#9CA3AF' }}>{m.label}</span>
                  <span className="font-bold" style={{ fontSize: 14, color: r.winner ? '#fff' : NAVY }}>{m.val}</span>
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Usability findings */}
        <h3 className="font-bold mb-6" style={{ fontSize: 20, color: NAVY }}>Usability Findings & Resolutions</h3>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-4">
          {[
            {
              severity: 'Critical',
              color: '#DC2626',
              bg: '#FEF2F2',
              issue: 'Users couldn\'t locate the Energy screen',
              finding: '4 of 5 participants looked in "Settings" for energy data. Tab label "Energy" was overlooked because the tab icon (a lightning bolt) was perceived as a power/on-off control.',
              fix: 'Changed icon to a chart/bar-graph symbol and ran A/B label test. "Energy" → "Usage" reduced confusion by 80% in follow-up test.',
              before: '20% task success on Energy screen navigation',
              after: '96% task success after icon + label change',
            },
            {
              severity: 'Critical',
              color: '#DC2626',
              bg: '#FEF2F2',
              issue: 'Toggle state not visually distinct enough',
              finding: '3 participants were unsure whether an appliance was on or off. The original design used only color (green/gray) which failed for colorblind users.',
              fix: 'Added position shift to toggles + text label ("On"/"Off") and ensured 4.5:1 contrast ratio for on-state. Also added haptic feedback pattern in spec.',
              before: '58% correct toggle state recognition',
              after: '99% correct recognition after redesign',
            },
            {
              severity: 'Critical',
              color: '#DC2626',
              bg: '#FEF2F2',
              issue: 'Pairing progress bar caused anxiety at 70%',
              finding: 'All 5 participants expressed anxiety when the pairing progress bar stalled visually at 70% for several seconds (during BLE handshake). 2 participants tapped "Cancel".',
              fix: 'Added animated skeleton pulse during BLE phase + inline copy "Establishing secure connection... (10–15 sec)". Reduced premature cancellations by 90%.',
              before: '2 of 5 participants cancelled mid-pairing',
              after: '0 of 5 cancelled in follow-up round',
            },
            {
              severity: 'Moderate',
              color: '#D97706',
              bg: '#FFFBEB',
              issue: 'Routine editor felt overwhelming',
              finding: '3 participants didn\'t attempt to create a routine in the open task. When prompted, they described the trigger/condition/action model as "complicated."',
              fix: 'Redesigned routine creation as a pre-built template gallery first, with a "build custom" escape hatch. Template completion rate 84% vs 31% for blank builder.',
              before: '31% routine creation completion rate',
              after: '84% completion via template-first flow',
            },
            {
              severity: 'Moderate',
              color: '#D97706',
              bg: '#FFFBEB',
              issue: 'Back navigation from device detail unclear',
              finding: '2 participants used the device\'s back gesture instead of the in-app Back button, losing their context. In-app back button was confused with the OS button.',
              fix: 'Added a persistent breadcrumb (Devices / Refrigerator) at top of detail screen and increased Back button tap target to 48px × 48px.',
              before: '40% used wrong back mechanism, lost context',
              after: '95% used correct in-app navigation',
            },
          ].map((finding) => (
            <motion.div
              key={finding.issue}
              variants={fadeUp}
              className="rounded-3xl p-6"
              style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="px-3 py-1 rounded-full font-bold flex-shrink-0" style={{ fontSize: 10, backgroundColor: finding.bg, color: finding.color, border: `1px solid ${finding.color}30` }}>{finding.severity}</span>
                <h4 className="font-bold" style={{ fontSize: 15, color: NAVY }}>{finding.issue}</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl p-4" style={{ backgroundColor: finding.bg }}>
                  <p className="font-semibold mb-2" style={{ fontSize: 11, color: finding.color, textTransform: 'uppercase', letterSpacing: 1 }}>Finding</p>
                  <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.6 }}>{finding.finding}</p>
                </div>
                <div className="rounded-2xl p-4" style={{ backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD' }}>
                  <p className="font-semibold mb-2" style={{ fontSize: 11, color: '#0369A1', textTransform: 'uppercase', letterSpacing: 1 }}>Fix Applied</p>
                  <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.6 }}>{finding.fix}</p>
                </div>
                <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <div>
                    <p className="font-semibold mb-1" style={{ fontSize: 10, color: '#DC2626', textTransform: 'uppercase', letterSpacing: 1 }}>Before</p>
                    <p style={{ fontSize: 12, color: '#374151' }}>{finding.before}</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1" style={{ fontSize: 10, color: '#059669', textTransform: 'uppercase', letterSpacing: 1 }}>After</p>
                    <p style={{ fontSize: 12, color: '#374151' }}>{finding.after}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          RESULTS
      ══════════════════════════════════════════════════════════════ */}
      <Section id="results">
        <SectionLabel>07 — Results & Impact</SectionLabel>
        <SectionTitle>Numbers that tell the story</SectionTitle>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {[
            { metric: 'Daily Engagement', before: '12%', after: '47%', change: '+35%', positive: true, icon: '📈' },
            { metric: 'Task Success Rate', before: '52%', after: '92%', change: '+40%', positive: true, icon: '✅' },
            { metric: 'Avg Pairing Time', before: '4.2 min', after: '2.3 min', change: '−45%', positive: true, icon: '⚡' },
            { metric: 'WCAG Compliance', before: 'Not audited', after: '100%', change: 'AA+', positive: true, icon: '♿' },
            { metric: 'User Satisfaction', before: '2.9 / 5.0', after: '4.6 / 5.0', change: '+59%', positive: true, icon: '⭐' },
            { metric: 'Support Tickets', before: 'Baseline', after: '−52%', change: '−52%', positive: true, icon: '🎯' },
          ].map((r) => (
            <motion.div
              key={r.metric}
              variants={fadeUp}
              className="rounded-3xl p-7 relative overflow-hidden"
              style={{ backgroundColor: NAVY, boxShadow: '0 8px 40px rgba(13,27,42,0.15)' }}
            >
              {/* Background glow */}
              <div className="absolute top-0 right-0 pointer-events-none" style={{ width: 120, height: 120, background: `radial-gradient(circle at top right, ${AMBER}18, transparent 70%)` }} />
              <div className="flex items-start justify-between mb-4">
                <span style={{ fontSize: 28 }}>{r.icon}</span>
                <span className="font-bold px-3 py-1 rounded-full" style={{ fontSize: 14, backgroundColor: `${AMBER}20`, color: AMBER, border: `1px solid ${AMBER}40` }}>{r.change}</span>
              </div>
              <p className="font-bold mb-4" style={{ fontSize: 40, color: AMBER, lineHeight: 1 }}>{r.after}</p>
              <p className="font-semibold mb-2" style={{ fontSize: 14, color: '#fff' }}>{r.metric}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Previously: {r.before}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact narrative */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-3xl p-10"
          style={{ backgroundColor: '#fff', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-bold mb-4" style={{ fontSize: 22, color: NAVY }}>What the numbers mean</h3>
              <p className="mb-4" style={{ color: '#6B7280', lineHeight: 1.8 }}>
                A 35-point lift in daily engagement is not just a vanity metric — it represents a meaningful shift in how users relate to their smart appliances. When people engage with HomeSense daily, they are more likely to catch inefficiencies (like the fridge door left ajar) and respond to actionable energy insights.
              </p>
              <p style={{ color: '#6B7280', lineHeight: 1.8 }}>
                The 45% reduction in pairing time directly eliminated the most common abandonment point in the existing experience. By compressing that from 4.2 minutes to 2.3, the design transformed a friction wall into a confidence-building first win.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4" style={{ fontSize: 22, color: NAVY }}>Accessibility as a feature</h3>
              <p className="mb-4" style={{ color: '#6B7280', lineHeight: 1.8 }}>
                Achieving WCAG 2.1 AA compliance across all screens was a non-negotiable design constraint, not an afterthought. The color contrast audit, 44px minimum touch target enforcement, and screen-reader-compatible component labeling directly contributed to the 40-point task success lift — for all users, not just those with disabilities.
              </p>
              <p style={{ color: '#6B7280', lineHeight: 1.8 }}>
                The 52% drop in support tickets is perhaps the most telling business metric: when users can successfully complete tasks without assistance, it validates that the redesigned information architecture and navigation hierarchy are genuinely learnable.
              </p>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          LEARNINGS
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: NAVY }}>
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Learnings</SectionLabel>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-bold mb-12"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#fff', lineHeight: 1.2 }}
          >
            What I'd carry forward
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: '🎯',
                title: 'Test the mental model, not the interface',
                body: 'The toggle confusion and Energy tab misattribution were both rooted in broken mental models, not bad visual design. Future research will include mental model mapping sessions before any wireframing begins — understanding what users expect to find where is more valuable than any heuristic audit.',
              },
              {
                icon: '🔄',
                title: 'Prototype at fidelity appropriate to the risk',
                body: 'Spending two weeks polishing Principle prototypes before running initial concept tests slowed the project. The pairing flow learnings from Variant A could have surfaced in week 2 with paper prototypes. Reserve high-fidelity prototyping for final validation, not early exploration.',
              },
              {
                icon: '♿',
                title: 'Accessibility constraints produce better design',
                body: 'Every time the WCAG audit flagged an issue — insufficient contrast, small tap targets, missing labels — fixing it resulted in a design that worked better for everyone. Accessibility isn\'t a compliance checkbox; it\'s a forcing function for design clarity.',
              },
            ].map((l) => (
              <motion.div
                key={l.title}
                variants={fadeUp}
                className="rounded-3xl p-6"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span style={{ fontSize: 36, marginBottom: 16, display: 'block' }}>{l.icon}</span>
                <h4 className="font-bold mb-3" style={{ fontSize: 16, color: AMBER, lineHeight: 1.4 }}>{l.title}</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>{l.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER CTA
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 text-center" style={{ backgroundColor: '#F8F7F4' }}>
        <div className="max-w-2xl mx-auto">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="uppercase tracking-widest font-semibold mb-4"
            style={{ color: AMBER, fontSize: 12 }}
          >
            Next Project
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-bold mb-6"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: NAVY, lineHeight: 1.1 }}
          >
            FitSense Wearable
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
            style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.8 }}
          >
            Designing a health coaching companion for a next-generation fitness wearable — balancing data density with moment-to-moment glanceability.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/fitness-wearable"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: NAVY, color: '#fff', fontSize: 15, textDecoration: 'none' }}
            >
              Explore Next Project →
            </a>
            <button
              onClick={handleBack}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: 'transparent', color: NAVY, border: `2px solid ${NAVY}`, fontSize: 15, cursor: 'pointer' }}
            >
              ← Back to All Projects
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
