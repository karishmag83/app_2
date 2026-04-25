import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

/* ─── Design tokens ──────────────────────────────────────────────────────── */
const BG     = '#fafaf8'
const FG     = '#0a0a09'
const ACCENT = '#4f46e5'
const MUTED  = '#737373'
const BONE   = '#f0efec'
const CARD   = '#ffffff'
const BORDER = 'rgba(0,0,0,0.09)'
const HL     = `1px solid ${BORDER}`
const SERIF  = '"Playfair Display", Georgia, serif'
const MONO   = 'ui-monospace, "SF Mono", "Courier New", monospace'
const SANS   = '"Inter", system-ui, -apple-system, sans-serif'
const AMBER  = '#F59E0B'

/* ─── Mobile hook ────────────────────────────────────────────────────────── */
function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return mobile
}

/* ─── Count-up hook ──────────────────────────────────────────────────────── */
function useCountUp(target: number, duration: number, started: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!started) return
    let t0: number | null = null
    const tick = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setVal(Math.round(p * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target, duration])
  return val
}

/* ─── Shared ─────────────────────────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, margin: '0 0 18px' }}>{children}</p>
}
function Box({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const isMobile = useIsMobile()
  return <div style={{ maxWidth: 1280, margin: '0 auto', padding: `0 ${isMobile ? '20px' : '48px'}`, ...style }}>{children}</div>
}
function Sec({ id, bone, children }: { id?: string; bone?: boolean; children: React.ReactNode }) {
  const isMobile = useIsMobile()
  return (
    <section id={id} style={{ borderTop: HL, backgroundColor: bone ? BONE : 'transparent', padding: `${isMobile ? '48px' : '80px'} 0`, scrollMarginTop: 60 }}>
      <Box>{children}</Box>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION PROGRESS NAV (fixed right)
═══════════════════════════════════════════════════════════════════════════ */
const NAV_SECTIONS = [
  { id: 'hero',         label: 'Intro'            },
  { id: 'overview',     label: '01 Overview'      },
  { id: 'problem',      label: '02 Problem'       },
  { id: 'objectives',   label: '03 Objectives'    },
  { id: 'process',      label: '04 Process'       },
  { id: 'research',     label: '05 Research'      },
  { id: 'ia',           label: '06 Architecture'  },
  { id: 'userflow',     label: '07 User Flow'     },
  { id: 'wireframes',   label: '08 Wireframes'    },
  { id: 'onboarding',   label: '09 Onboarding'    },
  { id: 'accessibility',label: '10 Accessibility' },
  { id: 'final-design', label: '11 Final Design'  },
  { id: 'prototype',    label: '12 Prototype'     },
  { id: 'results',      label: '13 Results'       },
  { id: 'reflection',   label: '14 Reflection'    },
]

function SectionNav({ active }: { active: string }) {
  const isMobile = useIsMobile()
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  if (isMobile) return null
  return (
    <nav style={{ position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 40, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
      {NAV_SECTIONS.map(s => {
        const isActive = active === s.id
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            title={s.label}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0' }}
          >
            <span style={{
              fontFamily: MONO, fontSize: 9, color: isActive ? ACCENT : MUTED,
              opacity: isActive ? 1 : 0, transition: 'opacity 0.2s', whiteSpace: 'nowrap',
              letterSpacing: '0.06em',
            }}>
              {s.label}
            </span>
            <div style={{
              width: isActive ? 20 : 6, height: 2, borderRadius: 2,
              backgroundColor: isActive ? ACCENT : BORDER,
              transition: 'all 0.25s ease', flexShrink: 0,
            }} />
          </button>
        )
      })}
    </nav>
  )
}

function useSectionObserver() {
  const [active, setActive] = useState('hero')
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    NAV_SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])
  return active
}

/* ═══════════════════════════════════════════════════════════════════════════
   HEARTH PROTOTYPE - Lovable-matched interactive app
═══════════════════════════════════════════════════════════════════════════ */
const H_FG     = '#111110'
const H_BG     = '#fafaf9'
const H_ACCENT = '#575ECF'
const H_BONE   = '#f5f4f1'
const H_RULE   = '#e5e3de'
const H_MUTED2 = '#737373'
const H_SAGE   = '#22c55e'

type HScreen = 'splash'|'welcome'|'signin'|'onboard-type'|'onboard-apps'|'pair-scan'|'tab'
type HTab = 'home'|'devices'|'routines'|'alerts'|'settings'

const H_DEVS = [
  { id:'fridge',     name:'Refrigerator', room:'Kitchen',     status:'37°F',    note:'Door closed · freezer 0°F',    on:true,  dot:'#3b82f6' },
  { id:'oven',       name:'Oven',         room:'Kitchen',     status:'Off',     note:'Auto-off ready',                on:false, dot:'#ef4444' },
  { id:'dishwasher', name:'Dishwasher',   room:'Kitchen',     status:'Running', note:'38 min · heavy cycle',         on:true,  dot:'#06b6d4' },
  { id:'coffee',     name:'Coffee Maker', room:'Kitchen',     status:'7:00 AM', note:'10 cups · grind medium',       on:true,  dot:'#d97706' },
  { id:'washer',     name:'Washer',       room:'Laundry',     status:'Off',     note:'Door unlocked · ready',         on:false, dot:'#8b5cf6' },
  { id:'dryer',      name:'Dryer',        room:'Laundry',     status:'Off',     note:'Sensor dry ready',              on:false, dot:'#ec4899' },
  { id:'purifier',   name:'Air Purifier', room:'Living Room', status:'Auto',    note:'AQI 22 · filter 78%',          on:true,  dot:'#10b981' },
  { id:'microwave',  name:'Microwave',    room:'Kitchen',     status:'Off',     note:'Power 100%',                    on:false, dot:'#6366f1' },
]

const H_ROUTINES = [
  { id:'morning', name:'Morning Brew', trigger:'7:00 AM daily',   summary:'Coffee + exhaust fan',  on:true  },
  { id:'away',    name:'Leave Home',   trigger:'On departure',     summary:'All off · lock report', on:true  },
  { id:'dinner',  name:'Dinner Prep',  trigger:'6:30 PM weekdays', summary:'Oven preheat + hood',   on:false },
  { id:'night',   name:'Wind Down',    trigger:'10:00 PM daily',   summary:'Purifier on · all off', on:true  },
]

const H_ALERTS_DEF = [
  { id:'a1', kind:'done', title:'Dishwasher complete',  desc:'Heavy cycle finished · 3 min ago',  time:'2m' },
  { id:'a2', kind:'warn', title:'Filter change due',    desc:'Air purifier · 78 days old',        time:'1h' },
  { id:'a3', kind:'info', title:'Brew scheduled',       desc:'Coffee starts tomorrow at 7:00 AM', time:'5h' },
  { id:'a4', kind:'done', title:'Washer complete',      desc:'Cotton 45 min, ready to transfer', time:'3h' },
]

/* ── Hearth toggle ─────────────────────────────────────────────────────── */
function HToggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={e => { e.stopPropagation(); onChange() }}
      style={{ width:42, height:24, borderRadius:12, border:'none', cursor:'pointer', backgroundColor: on ? H_ACCENT : H_RULE, position:'relative', transition:'background 0.2s', flexShrink:0 }}>
      <div style={{ width:18, height:18, borderRadius:'50%', backgroundColor:'#fff', position:'absolute', top:3, left: on ? 21 : 3, transition:'left 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.25)' }}/>
    </button>
  )
}

/* ── Status bar ────────────────────────────────────────────────────────── */
function HStatus({ inv = false }: { inv?: boolean }) {
  const c = inv ? '#fff' : H_FG
  return (
    <div style={{ padding:'12px 28px 4px', display:'flex', justifyContent:'space-between', fontSize:11, fontFamily:SANS, fontWeight:500, color:c, flexShrink:0 }}>
      <span>9:41</span>
      <span style={{ opacity:0.7 }}>●●●● 5G ▮</span>
    </div>
  )
}

/* ── Phone frame ───────────────────────────────────────────────────────── */
function HPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position:'relative', margin:'0 auto', width:'100%', maxWidth:360 }}>
      <div style={{ borderRadius:48, backgroundColor:H_FG, padding:10, boxShadow:'0 48px 96px -24px rgba(0,0,0,0.55)' }}>
        <div style={{ borderRadius:38, overflow:'hidden', backgroundColor:H_BG, height:740, position:'relative' }}>
          <div style={{ position:'absolute', top:8, left:'50%', transform:'translateX(-50%)', zIndex:30, width:108, height:22, borderRadius:11, backgroundColor:H_FG }}/>
          <div style={{ height:'100%', width:'100%', overflow:'hidden', display:'flex', flexDirection:'column' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Back button ───────────────────────────────────────────────────────── */
function HBack({ onBack }: { onBack: () => void }) {
  return (
    <button onClick={onBack} style={{ display:'flex', alignItems:'center', gap:4, background:'none', border:'none', cursor:'pointer', color:H_FG, fontFamily:SANS, fontSize:13, fontWeight:500, padding:0 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
    </button>
  )
}

/* ── Splash ────────────────────────────────────────────────────────────── */
function HSplash({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t) }, [onDone])
  return (
    <div onClick={onDone} style={{ flex:1, backgroundColor:H_FG, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14, cursor:'pointer' }}>
      <div style={{ width:60, height:60, borderRadius:20, border:'1.5px solid rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 3L4 9v12h16V9L12 3z" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M9 21V12h6v9" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      </div>
      <p style={{ fontFamily:SERIF, fontSize:28, color:'#fff', margin:0, fontWeight:700, letterSpacing:-0.5 }}>Hearth</p>
      <p style={{ fontFamily:MONO, fontSize:9, color:'rgba(255,255,255,0.35)', margin:0, letterSpacing:'0.22em', textTransform:'uppercase' }}>Smart Appliance Hub</p>
      <div style={{ marginTop:20, display:'flex', gap:5 }}>
        {[0,1,2].map(i => <div key={i} style={{ width:i===0?20:5, height:3, borderRadius:2, backgroundColor:i===0?H_ACCENT:'rgba(255,255,255,0.15)' }}/>)}
      </div>
    </div>
  )
}

/* ── Welcome ───────────────────────────────────────────────────────────── */
function HWelcome({ onStart, onSignIn }: { onStart: () => void; onSignIn: () => void }) {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', backgroundColor:H_BG }}>
      <div style={{ flex:1, backgroundColor:H_BONE, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'0 0 32px 32px' }}>
        <div style={{ textAlign:'center', padding:'32px 24px' }}>
          <div style={{ display:'flex', justifyContent:'center', gap:8, marginBottom:16 }}>
            {[{label:'Fridge',dot:'#3b82f6',on:true},{label:'Coffee',dot:'#d97706',on:true},{label:'Oven',dot:'#ef4444',on:false}].map(d=>(
              <div key={d.label} style={{ width:60, backgroundColor:'#fff', borderRadius:14, padding:'10px 8px', border:`1px solid ${H_RULE}`, textAlign:'center' }}>
                <div style={{ width:8, height:8, borderRadius:'50%', backgroundColor:d.on?d.dot:H_RULE, margin:'0 auto 6px' }}/>
                <div style={{ fontFamily:SANS, fontSize:8, color:H_MUTED2 }}>{d.label}</div>
              </div>
            ))}
          </div>
          <div style={{ width:120, height:2, backgroundColor:H_RULE, margin:'0 auto 12px', borderRadius:1 }}/>
          <div style={{ fontFamily:MONO, fontSize:8, color:H_MUTED2, letterSpacing:'0.1em', textTransform:'uppercase' }}>8 appliances · 1 app</div>
        </div>
      </div>
      <div style={{ padding:'28px 24px 32px' }}>
        <h1 style={{ fontFamily:SERIF, fontSize:26, color:H_FG, margin:'0 0 10px', fontWeight:700, lineHeight:1.2 }}>Your home,<br/>simplified.</h1>
        <p style={{ fontFamily:SANS, fontSize:13, color:H_MUTED2, margin:'0 0 22px', lineHeight:1.6 }}>One app for every appliance. Smarter routines, fewer headaches.</p>
        <button onClick={onStart} style={{ width:'100%', padding:'13px', borderRadius:14, backgroundColor:H_FG, border:'none', fontFamily:SANS, fontSize:14, fontWeight:600, color:'#fff', cursor:'pointer', marginBottom:10 }}>
          Get started
        </button>
        <button onClick={onSignIn} style={{ width:'100%', padding:'13px', borderRadius:14, backgroundColor:'transparent', border:`1px solid ${H_RULE}`, fontFamily:SANS, fontSize:14, fontWeight:500, color:H_MUTED2, cursor:'pointer' }}>
          I have an account
        </button>
      </div>
    </div>
  )
}

/* ── Sign In ───────────────────────────────────────────────────────────── */
function HSignIn({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  const [email, setEmail] = useState('demo@hearth.app')
  const [pass, setPass] = useState('••••••••')
  const inp = { width:'100%', padding:'12px 14px', borderRadius:12, border:`1px solid ${H_RULE}`, fontFamily:SANS, fontSize:14, color:H_FG, backgroundColor:H_BG, outline:'none', boxSizing:'border-box' as const }
  return (
    <div style={{ flex:1, backgroundColor:H_BG, display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'8px 20px 0' }}><HBack onBack={onBack} /></div>
      <div style={{ flex:1, padding:'22px 24px 32px', display:'flex', flexDirection:'column' }}>
        <h2 style={{ fontFamily:SERIF, fontSize:24, color:H_FG, margin:'0 0 6px', fontWeight:700 }}>Welcome back</h2>
        <p style={{ fontFamily:SANS, fontSize:13, color:H_MUTED2, margin:'0 0 24px' }}>Sign in to your Hearth account</p>
        <div style={{ marginBottom:12 }}>
          <label style={{ fontFamily:MONO, fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', color:H_MUTED2, display:'block', marginBottom:6 }}>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} style={inp}/>
        </div>
        <div style={{ marginBottom:22 }}>
          <label style={{ fontFamily:MONO, fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', color:H_MUTED2, display:'block', marginBottom:6 }}>Password</label>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} style={inp}/>
        </div>
        <button onClick={onContinue} style={{ width:'100%', padding:'13px', borderRadius:14, backgroundColor:H_ACCENT, border:'none', fontFamily:SANS, fontSize:14, fontWeight:600, color:'#fff', cursor:'pointer', marginBottom:'auto' }}>
          Continue →
        </button>
        <div style={{ marginTop:24, textAlign:'center' }}>
          <p style={{ fontFamily:SANS, fontSize:12, color:H_MUTED2, margin:0 }}>
            Forgot password? <span style={{ color:H_ACCENT, cursor:'pointer' }}>Reset</span>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Onboard: home type ────────────────────────────────────────────────── */
function HOnboardType({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [sel, setSel] = useState<string|null>(null)
  return (
    <div style={{ flex:1, backgroundColor:H_BG, display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'10px 20px 0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <HBack onBack={onBack} />
        <div style={{ display:'flex', gap:4 }}>{[0,1,2].map(i=><div key={i} style={{ width:i===0?20:8, height:3, borderRadius:2, backgroundColor:i===0?H_ACCENT:H_RULE }}/>)}</div>
      </div>
      <div style={{ flex:1, padding:'22px 24px 28px', display:'flex', flexDirection:'column' }}>
        <p style={{ fontFamily:MONO, fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', color:H_MUTED2, margin:'0 0 10px' }}>Step 1 of 3</p>
        <h2 style={{ fontFamily:SERIF, fontSize:22, color:H_FG, margin:'0 0 6px', fontWeight:700 }}>What type of home?</h2>
        <p style={{ fontFamily:SANS, fontSize:13, color:H_MUTED2, margin:'0 0 22px', lineHeight:1.5 }}>We'll tailor your experience to your space.</p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, flex:1 }}>
          {['Apartment','House','Condo','Studio'].map(t=>(
            <button key={t} onClick={()=>setSel(t)} style={{ padding:'18px 14px', borderRadius:14, border:`1.5px solid ${sel===t?H_ACCENT:H_RULE}`, backgroundColor:sel===t?`${H_ACCENT}0D`:H_BG, fontFamily:SANS, fontSize:14, fontWeight:500, color:H_FG, cursor:'pointer', textAlign:'left' }}>
              {t}
            </button>
          ))}
        </div>
        <button onClick={onNext} disabled={!sel} style={{ marginTop:20, width:'100%', padding:'13px', borderRadius:14, backgroundColor:sel?H_FG:H_RULE, border:'none', fontFamily:SANS, fontSize:14, fontWeight:600, color:sel?'#fff':H_MUTED2, cursor:sel?'pointer':'default' }}>
          Continue
        </button>
      </div>
    </div>
  )
}

/* ── Onboard: select appliances ────────────────────────────────────────── */
function HOnboardApps({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const all = ['Refrigerator','Oven','Dishwasher','Coffee Maker','Washer','Dryer','Air Purifier','Microwave']
  const [sel, setSel] = useState(new Set(['Refrigerator','Dishwasher','Coffee Maker','Air Purifier']))
  const toggle = (a: string) => setSel(s => { const n = new Set(s); n.has(a) ? n.delete(a) : n.add(a); return n })
  return (
    <div style={{ flex:1, backgroundColor:H_BG, display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'10px 20px 0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <HBack onBack={onBack} />
        <div style={{ display:'flex', gap:4 }}>{[0,1,2].map(i=><div key={i} style={{ width:i===1?20:8, height:3, borderRadius:2, backgroundColor:i<=1?H_ACCENT:H_RULE }}/>)}</div>
      </div>
      <div style={{ flex:1, padding:'22px 20px', display:'flex', flexDirection:'column', overflowY:'auto' }}>
        <p style={{ fontFamily:MONO, fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', color:H_MUTED2, margin:'0 0 10px' }}>Step 2 of 3</p>
        <h2 style={{ fontFamily:SERIF, fontSize:22, color:H_FG, margin:'0 0 6px', fontWeight:700 }}>Which appliances?</h2>
        <p style={{ fontFamily:SANS, fontSize:13, color:H_MUTED2, margin:'0 0 18px' }}>Select all that apply. Add more later.</p>
        <div style={{ display:'flex', flexDirection:'column', gap:7, marginBottom:20 }}>
          {all.map(a=>{
            const checked = sel.has(a)
            return (
              <button key={a} onClick={()=>toggle(a)} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:13, border:`1.5px solid ${checked?H_ACCENT:H_RULE}`, backgroundColor:checked?`${H_ACCENT}0D`:H_BG, cursor:'pointer', textAlign:'left' }}>
                <div style={{ width:20, height:20, borderRadius:6, border:`1.5px solid ${checked?H_ACCENT:H_RULE}`, backgroundColor:checked?H_ACCENT:'transparent', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {checked && <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>}
                </div>
                <span style={{ fontFamily:SANS, fontSize:13, color:H_FG, fontWeight:500 }}>{a}</span>
              </button>
            )
          })}
        </div>
        <button onClick={onNext} style={{ width:'100%', padding:'13px', borderRadius:14, backgroundColor:H_FG, border:'none', fontFamily:SANS, fontSize:14, fontWeight:600, color:'#fff', cursor:'pointer' }}>
          Set up {sel.size} appliance{sel.size !== 1 ? 's' : ''}
        </button>
      </div>
    </div>
  )
}

/* ── Pair scan ─────────────────────────────────────────────────────────── */
function HPairScan({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const iv = setInterval(() => setProgress(p => Math.min(p + 7, 100)), 160)
    return () => clearInterval(iv)
  }, [])
  const found = progress > 85 ? ['Refrigerator','Dishwasher','Coffee Maker','Air Purifier']
              : progress > 65 ? ['Refrigerator','Dishwasher','Coffee Maker']
              : progress > 40 ? ['Refrigerator','Dishwasher']
              : progress > 20 ? ['Refrigerator'] : []
  const done = progress >= 100
  return (
    <div style={{ flex:1, backgroundColor:H_BG, display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'10px 20px 0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <HBack onBack={onBack} />
        <div style={{ display:'flex', gap:4 }}>{[0,1,2].map(i=><div key={i} style={{ width:i===2?20:8, height:3, borderRadius:2, backgroundColor:H_ACCENT }}/>)}</div>
      </div>
      <div style={{ flex:1, padding:'22px 24px 28px', display:'flex', flexDirection:'column' }}>
        <p style={{ fontFamily:MONO, fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', color:H_MUTED2, margin:'0 0 10px' }}>Step 3 of 3</p>
        <h2 style={{ fontFamily:SERIF, fontSize:22, color:H_FG, margin:'0 0 6px', fontWeight:700 }}>{done ? 'Devices found!' : 'Scanning…'}</h2>
        <p style={{ fontFamily:SANS, fontSize:13, color:H_MUTED2, margin:'0 0 20px' }}>{done ? `${found.length} appliances connected.` : 'Detecting appliances on your network.'}</p>
        <div style={{ height:3, backgroundColor:H_RULE, borderRadius:2, marginBottom:20, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${progress}%`, backgroundColor:H_ACCENT, transition:'width 0.16s ease' }}/>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8, flex:1 }}>
          {found.map(f=>(
            <div key={f} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:12, backgroundColor:`${H_ACCENT}0D`, border:`1px solid ${H_ACCENT}30` }}>
              <div style={{ width:7, height:7, borderRadius:'50%', backgroundColor:H_SAGE, flexShrink:0 }}/>
              <span style={{ fontFamily:SANS, fontSize:13, color:H_FG, fontWeight:500 }}>{f}</span>
              <span style={{ fontFamily:MONO, fontSize:9, color:H_MUTED2, marginLeft:'auto' }}>Connected</span>
            </div>
          ))}
          {!done && (
            <div style={{ padding:'12px 14px', borderRadius:12, backgroundColor:H_BONE, border:`1px solid ${H_RULE}`, display:'flex', gap:4, alignItems:'center' }}>
              {[0,1,2].map(i=><div key={i} style={{ width:4, height:4, borderRadius:'50%', backgroundColor:H_MUTED2, opacity:0.35+i*0.2 }}/>)}
            </div>
          )}
        </div>
        {done && (
          <button onClick={onSuccess} style={{ width:'100%', padding:'13px', borderRadius:14, backgroundColor:H_FG, border:'none', fontFamily:SANS, fontSize:14, fontWeight:600, color:'#fff', cursor:'pointer' }}>
            Open Hearth →
          </button>
        )}
      </div>
    </div>
  )
}

/* ── Tab bar ───────────────────────────────────────────────────────────── */
const H_TABS: { id: HTab; label: string }[] = [
  { id:'home', label:'Home' }, { id:'devices', label:'Devices' }, { id:'routines', label:'Routines' },
  { id:'alerts', label:'Alerts' }, { id:'settings', label:'Settings' },
]
const H_ICONS: Record<HTab, React.ReactNode> = {
  home:     <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
  devices:  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>,
  routines: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>,
  alerts:   <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>,
  settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>,
}

function HTabBar({ active, onChange, alertCount }: { active: HTab; onChange: (t: HTab) => void; alertCount: number }) {
  return (
    <div style={{ display:'flex', borderTop:`1px solid ${H_RULE}`, backgroundColor:H_BG, padding:'8px 0 16px', flexShrink:0 }}>
      {H_TABS.map(t=>(
        <button key={t.id} onClick={()=>onChange(t.id)}
          style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, border:'none', background:'none', cursor:'pointer', padding:'4px 0', color:active===t.id?H_ACCENT:H_MUTED2, position:'relative' }}>
          {t.id==='alerts' && alertCount>0 && (
            <div style={{ position:'absolute', top:2, right:'50%', marginRight:-16, width:15, height:15, borderRadius:'50%', backgroundColor:'#ef4444', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontFamily:SANS, fontSize:8, color:'#fff', fontWeight:700 }}>{alertCount}</span>
            </div>
          )}
          {H_ICONS[t.id]}
          <span style={{ fontSize:9, fontFamily:SANS, fontWeight:active===t.id?600:400, letterSpacing:0.2 }}>{t.label}</span>
        </button>
      ))}
    </div>
  )
}

/* ── Home tab ──────────────────────────────────────────────────────────── */
function HHomeTab({ devState, onToggle }: { devState: Record<string, boolean>; onToggle: (id: string) => void }) {
  const activeCount = Object.values(devState).filter(Boolean).length
  const quick = H_DEVS.filter(d => ['fridge','coffee','dishwasher','purifier'].includes(d.id))
  return (
    <div style={{ flex:1, overflowY:'auto', backgroundColor:H_BG }}>
      <div style={{ padding:'14px 20px 10px' }}>
        <p style={{ fontFamily:MONO, fontSize:9, color:H_MUTED2, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 3px' }}>Good morning</p>
        <h2 style={{ fontFamily:SERIF, fontSize:22, color:H_FG, margin:'0 0 3px', fontWeight:700 }}>Your Kitchen</h2>
        <p style={{ fontFamily:SANS, fontSize:12, color:H_MUTED2, margin:0 }}>{activeCount} active · {H_DEVS.length - activeCount} idle</p>
      </div>
      {/* Scene pills */}
      <div style={{ padding:'0 20px 12px', display:'flex', gap:7, overflowX:'auto' }}>
        {['Morning','Away','Evening','Night'].map((s,i)=>(
          <button key={s} style={{ padding:'5px 14px', borderRadius:20, border:`1px solid ${i===0?H_FG:H_RULE}`, backgroundColor:i===0?H_FG:'transparent', color:i===0?'#fff':H_MUTED2, fontFamily:SANS, fontSize:11, fontWeight:i===0?600:400, cursor:'pointer', whiteSpace:'nowrap', flexShrink:0 }}>{s}</button>
        ))}
      </div>
      {/* Quick controls */}
      <div style={{ padding:'0 20px 12px' }}>
        <p style={{ fontFamily:MONO, fontSize:8, color:H_MUTED2, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 9px' }}>Quick controls</p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {quick.map(d=>{
            const on = devState[d.id]
            return (
              <button key={d.id} onClick={()=>onToggle(d.id)}
                style={{ padding:12, borderRadius:14, border:`1px solid ${on?`${d.dot}30`:H_RULE}`, backgroundColor:on?`${d.dot}0A`:H_BONE, cursor:'pointer', textAlign:'left', transition:'all 0.15s' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', backgroundColor:on?d.dot:H_RULE }}/>
                  <span style={{ fontFamily:MONO, fontSize:8, color:on?d.dot:H_MUTED2, fontWeight:600 }}>{on?'ON':'OFF'}</span>
                </div>
                <div style={{ fontFamily:SANS, fontSize:12, fontWeight:600, color:H_FG }}>{d.name}</div>
                <div style={{ fontFamily:SANS, fontSize:10, color:on?d.dot:H_MUTED2, marginTop:2 }}>{on?d.status:'Idle'}</div>
              </button>
            )
          })}
        </div>
      </div>
      {/* Energy card */}
      <div style={{ padding:'0 20px 12px' }}>
        <div style={{ backgroundColor:H_FG, borderRadius:16, padding:'14px 16px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:10 }}>
            <div>
              <p style={{ fontFamily:MONO, fontSize:8, color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 3px' }}>Energy today</p>
              <p style={{ fontFamily:SERIF, fontSize:20, color:'#fff', margin:0, fontWeight:700 }}>4.2 <span style={{ fontSize:11, fontWeight:400, opacity:0.6 }}>kWh</span></p>
            </div>
            <p style={{ fontFamily:SANS, fontSize:11, color:'rgba(255,255,255,0.35)', margin:0 }}>↓ 12% vs avg</p>
          </div>
          <div style={{ display:'flex', gap:3, alignItems:'flex-end', height:26 }}>
            {[35,55,28,70,48,38,62,75,42].map((h,i)=>(
              <div key={i} style={{ flex:1, height:`${h}%`, borderRadius:2, backgroundColor:i===8?H_ACCENT:'rgba(255,255,255,0.15)' }}/>
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:5 }}>
            {['6am','Now','12am'].map(t=><span key={t} style={{ fontFamily:SANS, fontSize:8, color:'rgba(255,255,255,0.3)' }}>{t}</span>)}
          </div>
        </div>
      </div>
      {/* Next routine */}
      <div style={{ padding:'0 20px 18px' }}>
        <p style={{ fontFamily:MONO, fontSize:8, color:H_MUTED2, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 8px' }}>Next routine</p>
        <div style={{ backgroundColor:H_BONE, borderRadius:14, padding:'11px 14px', border:`1px solid ${H_RULE}`, display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:34, height:34, borderRadius:10, backgroundColor:`${H_ACCENT}15`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill={H_ACCENT}><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
          </div>
          <div style={{ flex:1 }}>
            <p style={{ fontFamily:SANS, fontSize:13, fontWeight:600, color:H_FG, margin:0 }}>Wind Down</p>
            <p style={{ fontFamily:SANS, fontSize:11, color:H_MUTED2, margin:'2px 0 0' }}>Tonight · 10:00 PM</p>
          </div>
          <div style={{ width:7, height:7, borderRadius:'50%', backgroundColor:H_SAGE }}/>
        </div>
      </div>
    </div>
  )
}

/* ── Devices tab ───────────────────────────────────────────────────────── */
function HDevicesTab({ devState, onToggle, onDetail }: { devState: Record<string, boolean>; onToggle: (id: string) => void; onDetail: (id: string) => void }) {
  return (
    <div style={{ flex:1, overflowY:'auto', backgroundColor:H_BG }}>
      <div style={{ padding:'14px 20px 10px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <p style={{ fontFamily:MONO, fontSize:8, color:H_MUTED2, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 2px' }}>{H_DEVS.filter(d=>devState[d.id]).length} active</p>
          <h2 style={{ fontFamily:SERIF, fontSize:22, color:H_FG, margin:0, fontWeight:700 }}>Devices</h2>
        </div>
        <button style={{ width:32, height:32, borderRadius:'50%', border:`1px solid ${H_RULE}`, background:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:H_FG }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </button>
      </div>
      {['Kitchen','Laundry','Living Room'].map(room=>{
        const roomDevs = H_DEVS.filter(d=>d.room===room)
        return (
          <div key={room} style={{ padding:'8px 20px 4px' }}>
            <p style={{ fontFamily:MONO, fontSize:8, color:H_MUTED2, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 7px' }}>{room}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {roomDevs.map(d=>{
                const on = devState[d.id]
                return (
                  <div key={d.id} onClick={()=>onDetail(d.id)}
                    style={{ backgroundColor:H_BONE, borderRadius:14, padding:'11px 14px', border:`1px solid ${on?`${d.dot}25`:H_RULE}`, display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
                    <div style={{ width:34, height:34, borderRadius:10, backgroundColor:on?`${d.dot}15`:H_RULE, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <div style={{ width:8, height:8, borderRadius:'50%', backgroundColor:on?d.dot:H_MUTED2 }}/>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontFamily:SANS, fontSize:13, fontWeight:600, color:H_FG }}>{d.name}</div>
                      <div style={{ fontFamily:SANS, fontSize:11, color:on?d.dot:H_MUTED2, marginTop:1 }}>{on?d.status:'Idle'}</div>
                    </div>
                    <HToggle on={on} onChange={()=>onToggle(d.id)} />
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      <div style={{ height:14 }}/>
    </div>
  )
}

/* ── Appliance detail sheet ────────────────────────────────────────────── */
function HApplianceSheet({ id, devState, onToggle, onClose }: { id: string; devState: Record<string, boolean>; onToggle: (id: string) => void; onClose: () => void }) {
  const d = H_DEVS.find(x=>x.id===id)!
  const on = devState[id]
  const [temp, setTemp] = useState(id==='fridge'?37:375)
  return (
    <div style={{ position:'absolute', inset:0, zIndex:10 }} onClick={onClose}>
      <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.35)', backdropFilter:'blur(2px)' }}/>
      <div onClick={e=>e.stopPropagation()} style={{ position:'absolute', bottom:0, left:0, right:0, backgroundColor:H_BG, borderRadius:'24px 24px 0 0', padding:'0 20px 28px' }}>
        <div style={{ width:36, height:3, borderRadius:2, backgroundColor:H_RULE, margin:'12px auto 18px' }}/>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
          <div style={{ width:46, height:46, borderRadius:14, backgroundColor:on?`${d.dot}15`:H_BONE, border:`1px solid ${on?`${d.dot}30`:H_RULE}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <div style={{ width:13, height:13, borderRadius:'50%', backgroundColor:on?d.dot:H_MUTED2 }}/>
          </div>
          <div style={{ flex:1 }}>
            <p style={{ fontFamily:SERIF, fontSize:17, color:H_FG, margin:'0 0 2px', fontWeight:700 }}>{d.name}</p>
            <p style={{ fontFamily:SANS, fontSize:11, color:H_MUTED2, margin:0 }}>{d.room} · {on?'Active':'Idle'}</p>
          </div>
          <HToggle on={on} onChange={()=>onToggle(id)} />
        </div>
        <div style={{ backgroundColor:H_BONE, borderRadius:14, padding:'11px 14px', marginBottom:10 }}>
          <p style={{ fontFamily:MONO, fontSize:8, color:H_MUTED2, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 5px' }}>Status</p>
          <p style={{ fontFamily:SANS, fontSize:13, color:H_FG, margin:0, lineHeight:1.5 }}>{d.note}</p>
        </div>
        {(id==='fridge'||id==='oven') && (
          <div style={{ backgroundColor:H_BONE, borderRadius:14, padding:'11px 14px', marginBottom:10 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:7 }}>
              <p style={{ fontFamily:MONO, fontSize:8, color:H_MUTED2, letterSpacing:'0.1em', textTransform:'uppercase', margin:0 }}>Temperature</p>
              <p style={{ fontFamily:MONO, fontSize:13, color:d.dot, margin:0, fontWeight:700 }}>{temp}°F</p>
            </div>
            <input type="range" min={id==='fridge'?33:200} max={id==='fridge'?42:500} value={temp} onChange={e=>setTemp(Number(e.target.value))} style={{ width:'100%', accentColor:d.dot }}/>
          </div>
        )}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          <button style={{ padding:'11px', borderRadius:12, border:`1px solid ${H_RULE}`, backgroundColor:H_BG, fontFamily:SANS, fontSize:12, fontWeight:600, color:H_FG, cursor:'pointer' }}>Schedule</button>
          <button style={{ padding:'11px', borderRadius:12, border:`1px solid ${H_RULE}`, backgroundColor:H_BG, fontFamily:SANS, fontSize:12, fontWeight:600, color:H_FG, cursor:'pointer' }}>Diagnostics</button>
        </div>
      </div>
    </div>
  )
}

/* ── Routines tab ──────────────────────────────────────────────────────── */
function HRoutinesTab({ rtState, onToggle, onDetail }: { rtState: Record<string, boolean>; onToggle: (id: string) => void; onDetail: (id: string) => void }) {
  return (
    <div style={{ flex:1, overflowY:'auto', backgroundColor:H_BG }}>
      <div style={{ padding:'14px 20px 10px' }}>
        <p style={{ fontFamily:MONO, fontSize:8, color:H_MUTED2, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 2px' }}>Automations</p>
        <h2 style={{ fontFamily:SERIF, fontSize:22, color:H_FG, margin:0, fontWeight:700 }}>Routines</h2>
      </div>
      <div style={{ padding:'6px 20px 14px', display:'flex', flexDirection:'column', gap:8 }}>
        {H_ROUTINES.map(r=>{
          const on = rtState[r.id]
          return (
            <div key={r.id} onClick={()=>onDetail(r.id)}
              style={{ backgroundColor:H_BONE, borderRadius:16, padding:'13px 15px', border:`1px solid ${on?`${H_ACCENT}25`:H_RULE}`, cursor:'pointer' }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:10, backgroundColor:on?`${H_ACCENT}15`:H_RULE, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={on?H_ACCENT:H_MUTED2}><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:SANS, fontSize:13, fontWeight:600, color:H_FG }}>{r.name}</div>
                  <div style={{ fontFamily:SANS, fontSize:11, color:H_MUTED2, marginTop:2 }}>{r.trigger}</div>
                  <div style={{ fontFamily:SANS, fontSize:11, color:on?H_ACCENT:H_MUTED2, marginTop:1 }}>{r.summary}</div>
                </div>
                <HToggle on={on} onChange={()=>onToggle(r.id)} />
              </div>
            </div>
          )
        })}
        <button style={{ borderRadius:14, padding:'12px', border:`1.5px dashed ${H_RULE}`, background:'none', cursor:'pointer', fontFamily:SANS, fontSize:13, color:H_MUTED2, textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          New routine
        </button>
      </div>
    </div>
  )
}

/* ── Routine detail sheet ──────────────────────────────────────────────── */
function HRoutineSheet({ id, rtState, onToggle, onClose }: { id: string; rtState: Record<string, boolean>; onToggle: (id: string) => void; onClose: () => void }) {
  const r = H_ROUTINES.find(x=>x.id===id)!
  const on = rtState[id]
  return (
    <div style={{ position:'absolute', inset:0, zIndex:10 }} onClick={onClose}>
      <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.35)', backdropFilter:'blur(2px)' }}/>
      <div onClick={e=>e.stopPropagation()} style={{ position:'absolute', bottom:0, left:0, right:0, backgroundColor:H_BG, borderRadius:'24px 24px 0 0', padding:'0 20px 28px' }}>
        <div style={{ width:36, height:3, borderRadius:2, backgroundColor:H_RULE, margin:'12px auto 18px' }}/>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
          <div>
            <p style={{ fontFamily:SERIF, fontSize:17, color:H_FG, margin:'0 0 2px', fontWeight:700 }}>{r.name}</p>
            <p style={{ fontFamily:SANS, fontSize:11, color:H_MUTED2, margin:0 }}>{r.trigger}</p>
          </div>
          <HToggle on={on} onChange={()=>onToggle(id)} />
        </div>
        {[{label:'Trigger',value:r.trigger},{label:'Actions',value:r.summary}].map(row=>(
          <div key={row.label} style={{ backgroundColor:H_BONE, borderRadius:12, padding:'11px 14px', marginBottom:8 }}>
            <p style={{ fontFamily:MONO, fontSize:8, color:H_MUTED2, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 4px' }}>{row.label}</p>
            <p style={{ fontFamily:SANS, fontSize:13, color:H_FG, margin:0 }}>{row.value}</p>
          </div>
        ))}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:4 }}>
          <button style={{ padding:'11px', borderRadius:12, border:`1px solid ${H_RULE}`, backgroundColor:H_BG, fontFamily:SANS, fontSize:12, fontWeight:600, color:H_FG, cursor:'pointer' }}>Edit</button>
          <button style={{ padding:'11px', borderRadius:12, border:`1px solid #ef444420`, backgroundColor:'#ef44440A', fontFamily:SANS, fontSize:12, fontWeight:600, color:'#ef4444', cursor:'pointer' }}>Delete</button>
        </div>
      </div>
    </div>
  )
}

/* ── Alerts tab ────────────────────────────────────────────────────────── */
function HAlertsTab({ alerts, onDismiss }: { alerts: typeof H_ALERTS_DEF; onDismiss: (id: string) => void }) {
  const kindColor: Record<string, string> = { done:H_SAGE, warn:'#f59e0b', info:H_ACCENT }
  return (
    <div style={{ flex:1, overflowY:'auto', backgroundColor:H_BG }}>
      <div style={{ padding:'14px 20px 10px' }}>
        <p style={{ fontFamily:MONO, fontSize:8, color:H_MUTED2, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 2px' }}>Notifications</p>
        <h2 style={{ fontFamily:SERIF, fontSize:22, color:H_FG, margin:0, fontWeight:700 }}>Alerts</h2>
      </div>
      {alerts.length === 0 ? (
        <div style={{ padding:'40px 20px', textAlign:'center' }}>
          <div style={{ width:48, height:48, borderRadius:'50%', backgroundColor:H_BONE, margin:'0 auto 12px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill={H_MUTED2}><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
          </div>
          <p style={{ fontFamily:SANS, fontSize:13, color:H_MUTED2, margin:0 }}>All caught up!</p>
        </div>
      ) : (
        <div style={{ padding:'6px 20px 14px', display:'flex', flexDirection:'column', gap:8 }}>
          {alerts.map(a=>(
            <div key={a.id} style={{ backgroundColor:H_BONE, borderRadius:14, padding:'12px 14px', border:`1px solid ${kindColor[a.kind]}20`, display:'flex', alignItems:'flex-start', gap:10 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', backgroundColor:kindColor[a.kind], flexShrink:0, marginTop:4 }}/>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:SANS, fontSize:13, fontWeight:600, color:H_FG }}>{a.title}</div>
                <div style={{ fontFamily:SANS, fontSize:11, color:H_MUTED2, marginTop:2, lineHeight:1.4 }}>{a.desc}</div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:5, flexShrink:0 }}>
                <span style={{ fontFamily:MONO, fontSize:9, color:H_MUTED2 }}>{a.time}</span>
                <button onClick={()=>onDismiss(a.id)} style={{ fontFamily:SANS, fontSize:10, color:H_ACCENT, background:'none', border:'none', cursor:'pointer', padding:0 }}>Dismiss</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Settings tab ──────────────────────────────────────────────────────── */
function HSettingsTab() {
  const [notif, setNotif] = useState(true)
  const [energy, setEnergy] = useState(true)
  return (
    <div style={{ flex:1, overflowY:'auto', backgroundColor:H_BG }}>
      <div style={{ padding:'14px 20px 10px' }}>
        <h2 style={{ fontFamily:SERIF, fontSize:22, color:H_FG, margin:0, fontWeight:700 }}>Settings</h2>
      </div>
      <div style={{ padding:'8px 20px 0' }}>
        <div style={{ backgroundColor:H_FG, borderRadius:16, padding:'15px', display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:44, height:44, borderRadius:'50%', backgroundColor:`${H_ACCENT}25`, border:`1.5px solid ${H_ACCENT}40`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:SERIF, fontSize:18, color:H_ACCENT, fontWeight:700 }}>K</div>
          <div>
            <p style={{ fontFamily:SERIF, fontSize:14, color:'#fff', margin:'0 0 2px', fontWeight:600 }}>Karishma G.</p>
            <p style={{ fontFamily:SANS, fontSize:11, color:'rgba(255,255,255,0.4)', margin:0 }}>1 household · 8 devices</p>
          </div>
        </div>
      </div>
      <div style={{ padding:'10px 20px 16px', display:'flex', flexDirection:'column', gap:6 }}>
        {[
          { label:'Notifications', toggle:true,  val:notif,  set:()=>setNotif(n=>!n) },
          { label:'Energy reports', toggle:true,  val:energy, set:()=>setEnergy(e=>!e) },
          { label:'Household',      toggle:false, right:'1 member'    },
          { label:'Privacy',        toggle:false, right:'Local only'  },
          { label:'Support',        toggle:false, right:'Help center' },
          { label:'App version',    toggle:false, right:'v2.1.0'      },
        ].map(r=>(
          <div key={r.label} style={{ backgroundColor:H_BONE, borderRadius:14, padding:'13px 14px', border:`1px solid ${H_RULE}`, display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ flex:1, fontFamily:SANS, fontSize:13, fontWeight:500, color:H_FG }}>{r.label}</span>
            {r.toggle ? (
              <HToggle on={r.val!} onChange={r.set!} />
            ) : (
              <>
                <span style={{ fontFamily:SANS, fontSize:12, color:H_MUTED2 }}>{r.right}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill={H_MUTED2}><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── PhonePrototype - Hearth app entry point ───────────────────────────── */
function PhonePrototype() {
  const [screen, setScreen] = useState<HScreen>('splash')
  const [tab, setTab] = useState<HTab>('home')
  const [devState, setDevState] = useState<Record<string, boolean>>(
    Object.fromEntries(H_DEVS.map(d => [d.id, d.on]))
  )
  const [rtState, setRtState] = useState<Record<string, boolean>>(
    Object.fromEntries(H_ROUTINES.map(r => [r.id, r.on]))
  )
  const [alerts, setAlerts] = useState(H_ALERTS_DEF)
  const [selDev, setSelDev] = useState<string | null>(null)
  const [selRt, setSelRt] = useState<string | null>(null)

  const toggleDev = useCallback((id: string) => setDevState(p => ({ ...p, [id]: !p[id] })), [])
  const toggleRt  = useCallback((id: string) => setRtState(p => ({ ...p, [id]: !p[id] })), [])
  const dismissAlert = useCallback((id: string) => setAlerts(a => a.filter(x => x.id !== id)), [])

  const reset = () => {
    setScreen('splash')
    setTab('home')
    setDevState(Object.fromEntries(H_DEVS.map(d => [d.id, d.on])))
    setRtState(Object.fromEntries(H_ROUTINES.map(r => [r.id, r.on])))
    setAlerts(H_ALERTS_DEF)
    setSelDev(null)
    setSelRt(null)
  }

  const go = (s: HScreen) => { setSelDev(null); setSelRt(null); setScreen(s) }
  const goTab = (t: HTab) => { setTab(t); setSelDev(null); setSelRt(null); setScreen('tab') }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:12 }}>
        <button onClick={reset} style={{ fontFamily:MONO, fontSize:10, letterSpacing:'0.08em', border:HL, borderRadius:20, padding:'5px 14px', background:'none', cursor:'pointer', color:MUTED }}>
          Reset ↺
        </button>
      </div>
      <HPhoneFrame>
        <HStatus inv={screen === 'splash'} />
        {screen === 'splash'       && <HSplash onDone={() => go('welcome')} />}
        {screen === 'welcome'      && <HWelcome onStart={() => go('onboard-type')} onSignIn={() => go('signin')} />}
        {screen === 'signin'       && <HSignIn onBack={() => go('welcome')} onContinue={() => go('tab')} />}
        {screen === 'onboard-type' && <HOnboardType onBack={() => go('welcome')} onNext={() => go('onboard-apps')} />}
        {screen === 'onboard-apps' && <HOnboardApps onBack={() => go('onboard-type')} onNext={() => go('pair-scan')} />}
        {screen === 'pair-scan'    && <HPairScan onBack={() => go('onboard-apps')} onSuccess={() => go('tab')} />}
        {screen === 'tab' && (
          <>
            {tab === 'home'     && <HHomeTab devState={devState} onToggle={toggleDev} />}
            {tab === 'devices'  && (
              <div style={{ flex:1, display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>
                <HDevicesTab devState={devState} onToggle={toggleDev} onDetail={id => setSelDev(id)} />
                {selDev && <HApplianceSheet id={selDev} devState={devState} onToggle={toggleDev} onClose={() => setSelDev(null)} />}
              </div>
            )}
            {tab === 'routines' && (
              <div style={{ flex:1, display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>
                <HRoutinesTab rtState={rtState} onToggle={toggleRt} onDetail={id => setSelRt(id)} />
                {selRt && <HRoutineSheet id={selRt} rtState={rtState} onToggle={toggleRt} onClose={() => setSelRt(null)} />}
              </div>
            )}
            {tab === 'alerts'   && <HAlertsTab alerts={alerts} onDismiss={dismissAlert} />}
            {tab === 'settings' && <HSettingsTab />}
            <HTabBar active={tab} onChange={goTab} alertCount={alerts.length} />
          </>
        )}
      </HPhoneFrame>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO MOCKUP - 3 phones showing app screens
═══════════════════════════════════════════════════════════════════════════ */
function MiniPhone({ screen, rotate = 0, scale = 1 }: { screen: React.ReactNode; rotate?: number; scale?: number }) {
  return (
    <div style={{ transform:`rotate(${rotate}deg) scale(${scale})`, transformOrigin:'center bottom', flexShrink:0 }}>
      <div style={{ width:160, backgroundColor: H_FG, borderRadius:28, padding:6, boxShadow:`0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)` }}>
        {/* Notch */}
        <div style={{ position:'relative' }}>
          <div style={{ position:'absolute', top:6, left:'50%', transform:'translateX(-50%)', width:44, height:9, borderRadius:5, backgroundColor:H_FG, zIndex:10 }}/>
        </div>
        <div style={{ backgroundColor: H_BG, borderRadius:22, overflow:'hidden', height:340, display:'flex', flexDirection:'column', position:'relative' }}>
          {/* Status bar */}
          <div style={{ padding:'14px 12px 3px', display:'flex', justifyContent:'space-between', flexShrink:0 }}>
            <span style={{ color: H_FG, fontSize:7, fontWeight:600, fontFamily: SANS }}>9:41</span>
            <span style={{ color: H_FG, fontSize:6, opacity:0.5, fontFamily: SANS }}>●●●● 5G</span>
          </div>
          {screen}
        </div>
      </div>
    </div>
  )
}

/* Mini Home screen - Hearth styled */
function MiniHomeScreen() {
  const devs = [
    { label:'Coffee',    on:true,  dot:'#d97706' },
    { label:'Fridge',    on:true,  dot:'#3b82f6' },
    { label:'Washer',    on:false, dot:'#8b5cf6' },
    { label:'Purifier',  on:true,  dot:'#10b981' },
  ]
  return (
    <div style={{ flex:1, backgroundColor: H_BG, padding:'8px 10px 0', overflow:'hidden' }}>
      <p style={{ fontFamily: MONO, fontSize:5, color: H_MUTED2, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 1px' }}>Good morning</p>
      <p style={{ fontFamily: SERIF, fontSize:11, color: H_FG, margin:'0 0 7px', fontWeight:700 }}>Your Kitchen</p>
      {/* Scene pills */}
      <div style={{ display:'flex', gap:3, marginBottom:7 }}>
        {['Morning','Away','Evening'].map((s,i) => (
          <div key={s} style={{ padding:'2px 6px', borderRadius:10, backgroundColor: i===0 ? H_ACCENT : H_BONE, border:`1px solid ${i===0 ? H_ACCENT : H_RULE}`, fontSize:5.5, fontFamily: SANS, fontWeight:600, color: i===0 ? '#fff' : H_FG }}>
            {s}
          </div>
        ))}
      </div>
      {/* 2×2 quick controls */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4, marginBottom:7 }}>
        {devs.map(d => (
          <div key={d.label} style={{ backgroundColor: d.on ? `${d.dot}10` : H_BONE, borderRadius:7, padding:'6px 7px', border:`1px solid ${d.on ? `${d.dot}35` : H_RULE}` }}>
            <div style={{ width:6, height:6, borderRadius:'50%', backgroundColor: d.on ? d.dot : H_RULE, marginBottom:4 }}/>
            <div style={{ fontFamily: SANS, fontSize:6.5, fontWeight:600, color: d.on ? H_FG : H_MUTED2 }}>{d.label}</div>
          </div>
        ))}
      </div>
      {/* Energy dark card */}
      <div style={{ backgroundColor: H_FG, borderRadius:7, padding:'6px 8px', display:'flex', gap:1.5, alignItems:'flex-end', height:30 }}>
        {[40,60,35,75,55,42,68,80,45].map((h,i) => (
          <div key={i} style={{ flex:1, height:`${h}%`, borderRadius:1, backgroundColor: i===8 ? H_ACCENT : 'rgba(255,255,255,0.15)' }}/>
        ))}
      </div>
    </div>
  )
}

/* Mini Devices screen - Hearth styled */
function MiniDevicesScreen() {
  const items = [
    { label:'Refrigerator', status:'37°F',    on:true,  dot:'#3b82f6' },
    { label:'Oven',         status:'Off',     on:false, dot:'#ef4444' },
    { label:'Dishwasher',   status:'Running', on:true,  dot:'#06b6d4' },
    { label:'Coffee Maker', status:'7:00 AM', on:true,  dot:'#d97706' },
    { label:'Air Purifier', status:'Auto',    on:true,  dot:'#10b981' },
  ]
  return (
    <div style={{ flex:1, backgroundColor: H_BG, padding:'8px 10px 0', overflow:'hidden' }}>
      <p style={{ fontFamily: SERIF, fontSize:11, color: H_FG, margin:'0 0 7px', fontWeight:700 }}>Devices</p>
      <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
        {items.map(d => (
          <div key={d.label} style={{ backgroundColor: d.on ? `${d.dot}08` : H_BONE, borderRadius:6, padding:'5px 7px', border:`1px solid ${d.on ? `${d.dot}30` : H_RULE}`, display:'flex', alignItems:'center', gap:5 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', backgroundColor: d.on ? d.dot : H_RULE, flexShrink:0 }}/>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily: SANS, fontSize:6.5, fontWeight:600, color: H_FG }}>{d.label}</div>
              <div style={{ fontFamily: SANS, fontSize:5.5, color: d.on ? d.dot : H_MUTED2 }}>{d.status}</div>
            </div>
            {/* Toggle */}
            <div style={{ width:16, height:9, borderRadius:4.5, backgroundColor: d.on ? H_ACCENT : H_RULE, position:'relative', flexShrink:0 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', backgroundColor:'#fff', position:'absolute', top:1, left: d.on ? 8 : 1, boxShadow:'0 1px 2px rgba(0,0,0,0.2)' }}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Mini Routines screen - Hearth styled */
function MiniRoutinesScreen() {
  const items = [
    { label:'Morning Brew', on:true,  time:'7:00 AM daily'   },
    { label:'Leave Home',   on:true,  time:'On departure'    },
    { label:'Dinner Prep',  on:false, time:'6:30 PM weekdays' },
    { label:'Wind Down',    on:true,  time:'10:00 PM daily'  },
  ]
  return (
    <div style={{ flex:1, backgroundColor: H_BG, padding:'8px 10px 0', overflow:'hidden' }}>
      <p style={{ fontFamily: SERIF, fontSize:11, color: H_FG, margin:'0 0 7px', fontWeight:700 }}>Routines</p>
      <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
        {items.map(r => (
          <div key={r.label} style={{ backgroundColor: r.on ? `${H_ACCENT}08` : H_BONE, borderRadius:7, padding:'6px 8px', border:`1px solid ${r.on ? `${H_ACCENT}25` : H_RULE}`, display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily: SANS, fontSize:6.5, fontWeight:600, color: H_FG }}>{r.label}</div>
              <div style={{ fontFamily: SANS, fontSize:5.5, color: H_MUTED2 }}>{r.time}</div>
            </div>
            <div style={{ width:16, height:9, borderRadius:4.5, backgroundColor: r.on ? H_ACCENT : H_RULE, position:'relative', flexShrink:0 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', backgroundColor:'#fff', position:'absolute', top:1, left: r.on ? 8 : 1 }}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Mini TabBar - Hearth styled */
function MiniTabBar({ active }: { active: string }) {
  const tabs = ['home','devices','routines','alerts','settings']
  return (
    <div style={{ display:'flex', borderTop:`1px solid ${H_RULE}`, backgroundColor: H_BG, padding:'5px 0 8px', flexShrink:0 }}>
      {tabs.map(t => (
        <div key={t} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:1.5 }}>
          <div style={{ width: t===active ? 14 : 5, height:3, borderRadius:1.5, backgroundColor: t===active ? H_ACCENT : H_RULE, transition:'all 0.2s' }}/>
          <div style={{ fontFamily: SANS, fontSize:4, color: t===active ? H_ACCENT : H_MUTED2, fontWeight: t===active ? 700 : 400 }}>{t.slice(0,4)}</div>
        </div>
      ))}
    </div>
  )
}

function HeroMockup() {
  return (
    <div style={{ width:'100%', borderRadius:20, backgroundColor: H_FG, padding:'48px 0 0', overflow:'hidden', position:'relative', marginTop:40 }}>
      {/* Indigo glow */}
      <div style={{ position:'absolute', top:'30%', left:'50%', transform:'translate(-50%,-50%)', width:420, height:220, background:`radial-gradient(ellipse, ${H_ACCENT}30 0%, transparent 70%)`, pointerEvents:'none' }}/>
      {/* Phones row */}
      <div style={{ display:'flex', justifyContent:'center', alignItems:'flex-end', gap:16, padding:'0 32px' }}>
        <MiniPhone rotate={-6} scale={0.92} screen={<><MiniRoutinesScreen /><MiniTabBar active="routines"/></>} />
        <MiniPhone rotate={0}  scale={1}    screen={<><MiniHomeScreen    /><MiniTabBar active="home"    /></>} />
        <MiniPhone rotate={6}  scale={0.92} screen={<><MiniDevicesScreen /><MiniTabBar active="devices" /></>} />
      </div>
      {/* Label */}
      <div style={{ textAlign:'center', padding:'20px 0 24px' }}>
        <p style={{ fontFamily: MONO, fontSize:10, color:'rgba(255,255,255,0.35)', margin:0, letterSpacing:'0.12em', textTransform:'uppercase' }}>
          Hearth · Smart Appliance Hub
        </p>
      </div>
    </div>
  )
}

/* Wireframe placeholder */
/* ── Wireframe phone screen SVGs - one per variant ──────────────────────── */
function WireframeScreen({ variant }: { variant: string }) {
  const blk2 = { fill:'#c8c4bf' }
  const blkSm = { fill:'#e8e5e0' }

  /* shared phone outline + notch */
  const Phone = ({ children }: { children: React.ReactNode }) => (
    <svg width="100%" height="100%" viewBox="0 0 280 210" style={{ position:'absolute', inset:0 }}>
      {/* Phone frame */}
      <rect x="88" y="5" width="104" height="200" rx="12" fill="#f5f4f1" stroke="#b8b4ae" strokeWidth="1.5"/>
      {/* Notch */}
      <rect x="117" y="8" width="46" height="8" rx="4" fill="#c8c4bf"/>
      {/* Tab bar */}
      <rect x="88" y="187" width="104" height="18" rx="0" fill="#e8e5e0" strokeWidth="0"/>
      <rect x="88" y="186" width="104" height="1" fill="#c8c4bf"/>
      {/* Tab dots */}
      {[101,122,140,158,176].map((x,i)=><circle key={i} cx={x} cy={196} r={i===0?4:3} fill={i===0?'#575ECF':'#c0beba'}/>)}
      {children}
    </svg>
  )

  if (variant === 'dashboard') return (
    <Phone>
      {/* Header */}
      <rect x="96" y="22" width="40" height="4" rx="2" {...blkSm}/>
      <rect x="96" y="30" width="65" height="7" rx="2" {...blk2}/>
      <rect x="96" y="41" width="50" height="3" rx="1.5" {...blkSm}/>
      {/* Scene pills */}
      <rect x="96" y="50" width="22" height="8" rx="4" fill="#575ECF"/>
      <rect x="121" y="50" width="18" height="8" rx="4" {...blkSm}/>
      <rect x="142" y="50" width="20" height="8" rx="4" {...blkSm}/>
      <rect x="165" y="50" width="18" height="8" rx="4" {...blkSm}/>
      {/* Quick controls 2×2 */}
      <rect x="96" y="63" width="43" height="38" rx="6" fill="#ede9e4" stroke="#c8c4bf" strokeWidth="1"/>
      <circle cx="103" cy="71" r="3" fill="#575ECF"/>
      <rect x="100" y="79" width="28" height="4" rx="2" {...blk2}/>
      <rect x="100" y="86" width="20" height="3" rx="1.5" fill="#575ECF" opacity="0.5"/>
      <rect x="143" y="63" width="43" height="38" rx="6" {...blkSm} stroke="#c8c4bf" strokeWidth="1"/>
      <circle cx="150" cy="71" r="3" fill="#c8c4bf"/>
      <rect x="148" y="79" width="28" height="4" rx="2" {...blk2}/>
      <rect x="148" y="86" width="20" height="3" rx="1.5" {...blkSm}/>
      <rect x="96" y="105" width="43" height="38" rx="6" fill="#ede9e4" stroke="#c8c4bf" strokeWidth="1"/>
      <circle cx="103" cy="113" r="3" fill="#06b6d4"/>
      <rect x="100" y="121" width="28" height="4" rx="2" {...blk2}/>
      <rect x="143" y="105" width="43" height="38" rx="6" fill="#ede9e4" stroke="#c8c4bf" strokeWidth="1"/>
      <circle cx="150" cy="113" r="3" fill="#10b981"/>
      <rect x="148" y="121" width="28" height="4" rx="2" {...blk2}/>
      {/* Energy card */}
      <rect x="96" y="148" width="90" height="34" rx="6" fill="#111110"/>
      <rect x="102" y="154" width="35" height="3" rx="1.5" fill="rgba(255,255,255,0.2)"/>
      <rect x="102" y="160" width="22" height="6" rx="2" fill="rgba(255,255,255,0.5)"/>
      {[0,1,2,3,4,5,6,7,8].map((i)=><rect key={i} x={150+i*7} y={163-(i===8?14:[6,10,4,14,8,6,12,14,0][i])} width="5" height={[6,10,4,14,8,6,12,14,8][i]} rx="1.5" fill={i===8?'#575ECF':'rgba(255,255,255,0.2)'}/>)}
    </Phone>
  )

  if (variant === 'pairing') return (
    <Phone>
      {/* Back + progress */}
      <text x="96" y="28" fontSize="8" fill="#737373" fontFamily="monospace">← Back</text>
      <rect x="160" y="23" width="10" height="3" rx="1.5" fill="#575ECF"/>
      <rect x="173" y="23" width="6" height="3" rx="1.5" fill="#dddad5"/>
      <rect x="182" y="23" width="6" height="3" rx="1.5" fill="#dddad5"/>
      {/* Eyebrow */}
      <rect x="115" y="35" width="50" height="3" rx="1.5" {...blkSm}/>
      {/* Heading */}
      <rect x="96" y="43" width="80" height="7" rx="2" {...blk2}/>
      <rect x="96" y="54" width="65" height="4" rx="2" {...blkSm}/>
      {/* Progress bar */}
      <rect x="96" y="63" width="90" height="3" rx="1.5" fill="#e8e5e0"/>
      <rect x="96" y="63" width="60" height="3" rx="1.5" fill="#575ECF"/>
      {/* Found devices */}
      {[
        { label:'Refrigerator', y:73 },
        { label:'Dishwasher',   y:86 },
        { label:'Coffee Maker', y:99 },
      ].map(d=>(
        <g key={d.label}>
          <rect x="96" y={d.y} width="90" height="10" rx="5" fill={`${ACCENT}15`} stroke={`${ACCENT}40`} strokeWidth="1"/>
          <circle cx="103" cy={d.y+5} r="2.5" fill="#22c55e"/>
          <rect x="109" y={d.y+3} width="30" height="3" rx="1.5" fill="#575ECF" opacity="0.5"/>
          <rect x="168" y={d.y+3} width="16" height="3" rx="1.5" {...blkSm}/>
        </g>
      ))}
      {/* Scanning indicator */}
      <rect x="96" y="115" width="90" height="10" rx="5" {...blkSm}/>
      {[107,118,129].map(x=><circle key={x} cx={x} cy={120} r="2" fill="#c8c4bf"/>)}
      {/* CTA button */}
      <rect x="96" y="162" width="90" height="20" rx="8" fill="#111110"/>
      <rect x="126" y="170" width="40" height="4" rx="2" fill="rgba(255,255,255,0.5)"/>
    </Phone>
  )

  if (variant === 'devices') return (
    <Phone>
      <rect x="96" y="22" width="55" height="7" rx="2" {...blk2}/>
      <rect x="96" y="33" width="40" height="4" rx="2" {...blkSm}/>
      {/* Room label */}
      <rect x="96" y="43" width="30" height="3" rx="1.5" {...blkSm}/>
      {/* Device rows */}
      {[
        { y:50, on:true,  dot:'#3b82f6' },
        { y:65, on:false, dot:'#c8c4bf' },
        { y:80, on:true,  dot:'#06b6d4' },
        { y:95, on:true,  dot:'#d97706' },
      ].map((d,i)=>(
        <g key={i}>
          <rect x="96" y={d.y} width="90" height="12" rx="5" fill={d.on?'#f0efeb':'#f5f4f1'} stroke={d.on?`${d.dot}40`:'#e0ddd8'} strokeWidth="1"/>
          <rect x="102" y={d.y+3} width="6" height="6" rx="2" fill={d.on?`${d.dot}25`:'#e8e5e0'}/>
          <circle cx="105" cy={d.y+6} r="2" fill={d.on?d.dot:'#c8c4bf'}/>
          <rect x="113" y={d.y+3} width="30" height="3" rx="1.5" {...blk2}/>
          <rect x="113" y={d.y+8} width="20" height="2" rx="1" fill={d.on?d.dot+'60':'#dddad5'}/>
          {/* Toggle */}
          <rect x="168" y={d.y+3} width="14" height="7" rx="3.5" fill={d.on?'#575ECF':'#dddad5'}/>
          <circle cx={d.on?178:171} cy={d.y+6.5} r="3" fill="#fff"/>
        </g>
      ))}
      {/* Laundry label */}
      <rect x="96" y="114" width="28" height="3" rx="1.5" {...blkSm}/>
      {[120, 135].map((y,i)=>(
        <g key={i}>
          <rect x="96" y={y} width="90" height="12" rx="5" fill="#f5f4f1" stroke="#e0ddd8" strokeWidth="1"/>
          <rect x="102" y={y+3} width="6" height="6" rx="2" fill="#e8e5e0"/>
          <rect x="113" y={y+3} width="30" height="3" rx="1.5" {...blk2}/>
          <rect x="168" y={y+3} width="14" height="7" rx="3.5" fill="#dddad5"/>
          <circle cx="171" cy={y+6.5} r="3" fill="#fff"/>
        </g>
      ))}
    </Phone>
  )

  if (variant === 'ia') return (
    <svg width="100%" height="100%" viewBox="0 0 280 210" style={{ position:'absolute', inset:0 }}>
      {/* Label: BEFORE */}
      <text x="42" y="18" fontSize="7" fill="#737373" fontFamily="monospace" textAnchor="middle">BEFORE</text>
      {/* Deep hierarchy left side */}
      {[
        { label:'App', y:25 }, { label:'Category', y:55 }, { label:'Device', y:85 }, { label:'Control', y:115 },
      ].map((n,i)=>(
        <g key={i}>
          <rect x="10" y={n.y} width="64" height="22" rx="5" fill={i===0?'#e8e5e0':'#f0efeb'} stroke="#c8c4bf" strokeWidth="1"/>
          <rect x="16" y={n.y+8} width="30" height="4" rx="2" fill="#c8c4bf"/>
          {i < 3 && <line x1="42" y1={n.y+22} x2="42" y2={n.y+30} stroke="#c8c4bf" strokeWidth="1" strokeDasharray="2,2"/>}
        </g>
      ))}
      <text x="42" y="148" fontSize="6" fill="#ef4444" fontFamily="sans-serif" textAnchor="middle">4 levels deep</text>

      {/* Divider */}
      <line x1="86" y1="10" x2="86" y2="200" stroke="#e0ddd8" strokeWidth="1" strokeDasharray="3,3"/>

      {/* Label: AFTER */}
      <text x="183" y="18" fontSize="7" fill="#575ECF" fontFamily="monospace" textAnchor="middle">AFTER</text>
      {/* Phone with flat nav */}
      <rect x="130" y="22" width="106" height="182" rx="10" fill="#f5f4f1" stroke="#b8b4ae" strokeWidth="1.5"/>
      <rect x="155" y="25" width="56" height="6" rx="3" fill="#c8c4bf"/>
      {/* Dashboard content blocks */}
      <rect x="137" y="38" width="92" height="12" rx="4" fill="#dddad5"/>
      <rect x="137" y="54" width="44" height="38" rx="6" fill="#ede9e4" stroke="#c8c4bf" strokeWidth="1"/>
      <rect x="185" y="54" width="44" height="38" rx="6" fill="#ede9e4" stroke="#c8c4bf" strokeWidth="1"/>
      <rect x="137" y="96" width="44" height="38" rx="6" fill="#ede9e4" stroke="#c8c4bf" strokeWidth="1"/>
      <rect x="185" y="96" width="44" height="38" rx="6" fill="#ede9e4" stroke="#c8c4bf" strokeWidth="1"/>
      <rect x="137" y="138" width="92" height="24" rx="5" fill="#111110"/>
      {/* Tab bar */}
      <rect x="130" y="186" width="106" height="18" rx="0" fill="#e8e5e0"/>
      <rect x="130" y="185" width="106" height="1" fill="#c8c4bf"/>
      {[143,162,183,203,222].map((x,i)=><circle key={i} cx={x} cy={195} r={i===0?4:3} fill={i===0?'#575ECF':'#c0beba'}/>)}
      <text x="183" y="205" fontSize="6" fill="#22c55e" fontFamily="sans-serif" textAnchor="middle">2 levels · tab nav</text>
    </svg>
  )

  if (variant === 'routines') return (
    <Phone>
      <rect x="96" y="22" width="55" height="7" rx="2" {...blk2}/>
      <rect x="96" y="33" width="45" height="3" rx="1.5" {...blkSm}/>
      {/* Routine cards */}
      {[
        { y:42, on:true,  accent:'#575ECF' },
        { y:70, on:true,  accent:'#575ECF' },
        { y:98, on:false, accent:'#c8c4bf' },
        { y:126, on:true,  accent:'#575ECF' },
      ].map((r,i)=>(
        <g key={i}>
          <rect x="96" y={r.y} width="90" height="24" rx="7" fill={r.on?`${r.accent}08`:'#f5f4f1'} stroke={r.on?`${r.accent}30`:'#e0ddd8'} strokeWidth="1"/>
          <rect x="102" y={r.y+5} width="14" height="14" rx="4" fill={r.on?`${r.accent}20`:'#e8e5e0'}/>
          <circle cx="109" cy={r.y+12} r="4" fill={r.on?r.accent:'#c8c4bf'} opacity="0.5"/>
          <rect x="120" y={r.y+7} width="35" height="4" rx="2" {...blk2}/>
          <rect x="120" y={r.y+14} width="50" height="3" rx="1.5" {...blkSm}/>
          {/* Toggle */}
          <rect x="168" y={r.y+8} width="14" height="7" rx="3.5" fill={r.on?r.accent:'#dddad5'}/>
          <circle cx={r.on?178:171} cy={r.y+11.5} r="3" fill="#fff"/>
        </g>
      ))}
      {/* Add new button */}
      <rect x="96" y="156" width="90" height="22" rx="7" fill="none" stroke="#dddad5" strokeWidth="1" strokeDasharray="3,3"/>
      <text x="141" y="170" fontSize="8" fill="#c8c4bf" textAnchor="middle" fontFamily="sans-serif">+ New routine</text>
    </Phone>
  )

  if (variant === 'alerts') return (
    <Phone>
      <rect x="96" y="22" width="55" height="7" rx="2" {...blk2}/>
      <rect x="96" y="33" width="40" height="4" rx="2" {...blkSm}/>
      {/* Alert rows */}
      {[
        { y:43, color:'#22c55e' },
        { y:67, color:'#f59e0b' },
        { y:91, color:'#575ECF' },
        { y:115, color:'#22c55e' },
      ].map((a,i)=>(
        <g key={i}>
          <rect x="96" y={a.y} width="90" height="20" rx="6" fill="#f5f4f1" stroke={`${a.color}25`} strokeWidth="1"/>
          <circle cx="103" cy={a.y+10} r="3" fill={a.color}/>
          <rect x="111" y={a.y+5} width="45" height="4" rx="2" {...blk2}/>
          <rect x="111" y={a.y+12} width="55" height="3" rx="1.5" {...blkSm}/>
          <rect x="171" y={a.y+6} width="10" height="3" rx="1.5" {...blkSm}/>
          <rect x="171" y={a.y+12} width="12" height="3" rx="1.5" fill={a.color} opacity="0.4"/>
        </g>
      ))}
      {/* Severity legend */}
      <rect x="96" y="142" width="90" height="18" rx="5" fill="#f0efeb"/>
      {[{c:'#22c55e',l:'Done'},{c:'#f59e0b',l:'Warn'},{c:'#575ECF',l:'Info'}].map((k,i)=>(
        <g key={i}>
          <circle cx={105+i*30} cy={151} r="3" fill={k.c}/>
          <text x={111+i*30} y={153.5} fontSize="6" fill="#737373" fontFamily="sans-serif">{k.l}</text>
        </g>
      ))}
    </Phone>
  )

  // fallback
  return (
    <Phone>
      <rect x="96" y="30" width="90" height="140" rx="6" fill="#e8e5e0"/>
    </Phone>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   USER FLOW DIAGRAM
═══════════════════════════════════════════════════════════════════════════ */
function UserFlowDiagram() {
  const BX = 88, BH = 32 // box width, height
  const arr = (x1: number, y1: number, x2: number, y2: number) => {
    const mx = (x1 + x2) / 2
    return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`
  }

  // Nodes: [id, x, y, label, sublabel, isMain]
  type N = [string, number, number, string, string, boolean?]
  const nodes: N[] = [
    // Entry
    ['splash',   30,  48,  'Splash',       'Auto 2s',         false],
    ['welcome',  160, 48,  'Welcome',      'Entry point',     false],
    // Auth branch (y=16)
    ['signin',   290, 16,  'Sign In',      'Returning user',  false],
    // Onboard branch (y=80)
    ['ob1',      290, 80,  'Home Type',    'Step 1 of 3',     false],
    ['ob2',      430, 80,  'Appliances',   'Step 2 of 3',     false],
    ['pair',     570, 80,  'Pair Scan',    'Step 3 of 3',     false],
    // Hub
    ['home',     700, 48,  'Home',         'Main dashboard',  true ],
    // Tabs (y=160)
    ['t-home',   100, 160, 'Home Tab',     'Quick controls',  false],
    ['t-dev',    240, 160, 'Devices',      'All appliances',  false],
    ['t-rt',     380, 160, 'Routines',     'Automations',     false],
    ['t-al',     520, 160, 'Alerts',       'Notifications',   false],
    ['t-set',    660, 160, 'Settings',     'Account & prefs', false],
    // Sub-screens (y=270)
    ['dev-d',    180, 270, 'Device Detail','Controls + temp',  false],
    ['pair-n',   310, 270, '+ Pair New',   'Add appliance',   false],
    ['rt-d',     380, 270, 'Routine Edit', 'Trigger & action',false],
    ['rt-n',     490, 270, 'New Routine',  'Builder',         false],
    ['al-d',     520, 270, 'Alert Detail', 'Action + dismiss', false],
  ]

  // Edges: [from-x, from-y, to-x, to-y, color]
  const edges = [
    // Onboarding path
    [30+BX,  64,  160,       64,  MUTED],
    [160+BX, 32,  290,       32,  MUTED],   // welcome → signin
    [160+BX, 64,  290,       96,  MUTED],   // welcome → ob1
    [290+BX, 96,  430,       96,  MUTED],
    [430+BX, 96,  570,       96,  MUTED],
    // merge to home
    [290+BX, 32,  700,       64,  MUTED],   // signin → home
    [570+BX, 96,  700,       64,  MUTED],   // pair → home
    // home → tabs
    [700+BX/2, 80, 100+BX/2, 160, ACCENT],
    [700+BX/2, 80, 240+BX/2, 160, ACCENT],
    [700+BX/2, 80, 380+BX/2, 160, ACCENT],
    [700+BX/2, 80, 520+BX/2, 160, ACCENT],
    [700+BX/2, 80, 660+BX/2, 160, ACCENT],
    // sub-screens
    [240+BX/2, 192, 180+BX/2, 270, H_MUTED2],
    [240+BX/2, 192, 310+BX/2, 270, H_MUTED2],
    [380+BX/2, 192, 380+BX/2, 270, H_MUTED2],
    [380+BX/2, 192, 490+BX/2, 270, H_MUTED2],
    [520+BX/2, 192, 520+BX/2, 270, H_MUTED2],
  ]


  return (
    <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch' }}>
      <svg viewBox="0 0 820 330" style={{ width:'100%', minWidth:600, height:'auto', display:'block' }}>
        {/* Section labels */}
        <text x="290" y="8" fontSize="8" fill={MUTED} fontFamily={MONO} letterSpacing="0.1em" textAnchor="middle">ONBOARDING</text>
        <text x="580" y="8" fontSize="8" fill={MUTED} fontFamily={MONO} letterSpacing="0.1em" textAnchor="middle">AUTH</text>
        <text x="380" y="148" fontSize="8" fill={ACCENT} fontFamily={MONO} letterSpacing="0.1em" textAnchor="middle">MAIN NAVIGATION</text>
        <text x="380" y="258" fontSize="8" fill={H_MUTED2} fontFamily={MONO} letterSpacing="0.1em" textAnchor="middle">SUB-SCREENS</text>

        {/* Edges */}
        {edges.map(([x1,y1,x2,y2,color],i) => (
          <path key={i} d={arr(x1 as number, y1 as number, x2 as number, y2 as number)}
            fill="none" stroke={color as string} strokeWidth="1.5" strokeDasharray={color === MUTED ? '4,3' : undefined} opacity="0.5"
            markerEnd={`url(#arr-${color===ACCENT?'acc':'def'})`}
          />
        ))}

        {/* Arrow markers */}
        <defs>
          <marker id="arr-acc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={ACCENT}/>
          </marker>
          <marker id="arr-def" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={MUTED}/>
          </marker>
        </defs>

        {/* Nodes */}
        {nodes.map(([id, x, y, label, sub, isMain]) => {
          const isSub = (y as number) >= 270
          const isTab = (y as number) === 160
          const fillColor = isMain ? FG : isTab ? BONE : CARD
          const borderColor = isMain ? FG : isTab ? `${ACCENT}40` : BORDER
          return (
            <g key={id as string}>
              <rect
                x={x as number} y={y as number}
                width={BX} height={BH}
                rx="8"
                fill={fillColor}
                stroke={isMain ? 'none' : borderColor}
                strokeWidth={isTab ? 1.5 : 1}
              />
              {isMain && <rect x={x as number} y={y as number} width={BX} height={BH} rx="8" fill={ACCENT}/>}
              <text
                x={(x as number) + BX/2} y={(y as number) + 13}
                textAnchor="middle" fontSize={isSub?9:10}
                fontWeight="600" fill={isMain ? '#fff' : FG}
                fontFamily={SANS}
              >{label}</text>
              <text
                x={(x as number) + BX/2} y={(y as number) + 24}
                textAnchor="middle" fontSize="8"
                fill={isMain ? 'rgba(255,255,255,0.6)' : MUTED}
                fontFamily={SANS}
              >{sub}</text>
            </g>
          )
        })}

        {/* Legend */}
        <rect x="10" y="305" width="10" height="2" rx="1" fill={ACCENT}/>
        <text x="24" y="310" fontSize="8" fill={ACCENT} fontFamily={SANS}>Core navigation</text>
        <line x1="130" y1="306" x2="140" y2="306" stroke={MUTED} strokeWidth="1.5" strokeDasharray="3,2"/>
        <text x="144" y="310" fontSize="8" fill={MUTED} fontFamily={SANS}>Onboarding / auth</text>
        <rect x="254" y="305" width="10" height="2" rx="1" fill={H_MUTED2}/>
        <text x="268" y="310" fontSize="8" fill={H_MUTED2} fontFamily={SANS}>Sub-screens (sheets / modals)</text>
      </svg>
    </div>
  )
}

/* Metric card with count-up */
function MetricCard({ target, suffix, label, desc, started, index }: { target:number; suffix:string; label:string; desc:string; started:boolean; index:number }) {
  const val = useCountUp(target, 1100 + index * 150, started)
  const isMobile = useIsMobile()
  return (
    <div style={{ padding: isMobile ? '28px 0' : '40px 28px', borderRight: (!isMobile && index < 2) ? HL : 'none', borderBottom: (isMobile && index < 2) ? HL : 'none' }}>
      <div style={{ fontFamily: SERIF, fontSize:56, fontWeight:700, color: FG, lineHeight:1, marginBottom:8 }}>{val}{suffix}</div>
      <div style={{ fontFamily: SANS, fontSize:13, fontWeight:600, color: FG, marginBottom:6 }}>{label}</div>
      <div style={{ fontFamily: SANS, fontSize:12, color: MUTED, lineHeight:1.55 }}>{desc}</div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════════════════ */
export default function SmartHomeCaseStudy() {
  const navigate   = useNavigate()
  const protoRef   = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const activeSection = useSectionObserver()
  const isMobile = useIsMobile()
  const cols = (desktop: string, mob = '1fr') => isMobile ? mob : desktop

  const scrollTo = (ref: React.RefObject<Element | null>) =>
    ref.current?.scrollIntoView({ behavior:'smooth', block:'start' })

  /* Metric count-up */
  const metricsRef = useRef<HTMLDivElement>(null)
  const [metricsStarted, setMetricsStarted] = useState(false)
  useEffect(() => {
    const el = metricsRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setMetricsStarted(true); obs.disconnect() } }, { threshold:0.3 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  const METRICS = [
    { target:35, suffix:'%', label:'Daily engagement lift',           desc:'Measured 30 days post-launch vs. legacy single-appliance apps.' },
    { target:40, suffix:'%', label:'First-attempt task success',      desc:'On primary control screens, after WCAG 2.1 nav rebuild.' },
    { target:45, suffix:'%', label:'Less first-time pairing friction', desc:'From 5 moderated tests of 3 onboarding variants in Principle.' },
  ]

  return (
    <div style={{ backgroundColor: BG, color: FG, minHeight:'100vh', fontFamily: SANS }}>

      {/* Fixed section nav */}
      <SectionNav active={activeSection} />

      {/* ── Header: back + try prototype only ─────────────────────────── */}
      <header style={{ position:'sticky', top:0, zIndex:40, backgroundColor:'rgba(250,250,248,0.9)', backdropFilter:'blur(12px)', borderBottom: HL }}>
        <Box style={{ height:52, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <button onClick={() => navigate('/')}
            style={{ fontFamily: SANS, fontSize:13, fontWeight:600, color: MUTED, background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:6, padding:0 }}>
            ← Back
          </button>
          <button onClick={() => scrollTo(protoRef)}
            style={{ fontFamily: SANS, fontSize:12, fontWeight:600, backgroundColor: FG, color: BG, border:'none', borderRadius:999, padding:'7px 16px', cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
            Try prototype ↗
          </button>
        </Box>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div id="hero" style={{ scrollMarginTop:60 }}>
        <Box style={{ padding: isMobile ? '40px 20px 0' : '72px 48px 0' }}>
          <div style={{ display:'grid', gridTemplateColumns: cols('1fr 200px'), gap: isMobile ? 32 : 48, alignItems:'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize:10, color: MUTED, letterSpacing:'0.12em', textTransform:'uppercase', margin:'0 0 22px' }}>
                Case study · Smart appliance hub · iOS & Android · 2024
              </p>
              <h1 style={{ fontFamily: SERIF, fontSize:'clamp(40px, 6vw, 72px)', color: FG, margin:'0 0 20px', lineHeight:1.1, fontWeight:700 }}>
                One app for the{' '}
                <em style={{ color: ACCENT }}>whole kitchen.</em>
              </h1>
              <p style={{ fontFamily: SANS, fontSize:16, color: MUTED, margin:'0 0 10px', maxWidth:520 }}>
                Hearth: Smart Appliance Hub · Connected Kitchen Companion
              </p>
              <p style={{ fontFamily: SANS, fontSize:15, color: FG, lineHeight:1.7, margin:'0 0 32px', maxWidth:540, opacity:0.7 }}>
                Homeowners juggled 8+ inconsistent manufacturer apps. Hearth consolidates every kitchen appliance into one accessible, delightful experience: unified navigation, guided pairing, smart routines, and real-time alerts.
              </p>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                <button onClick={() => scrollTo(protoRef)}
                  style={{ fontFamily: SANS, fontSize:13, fontWeight:600, backgroundColor: FG, color: BG, border:'none', borderRadius:999, padding:'11px 22px', cursor:'pointer', display:'flex', alignItems:'center', gap:7 }}>
                  📱 Try the live prototype
                </button>
                <button onClick={() => scrollTo(processRef)}
                  style={{ fontFamily: SANS, fontSize:13, fontWeight:600, backgroundColor:'transparent', color: FG, border: HL, borderRadius:999, padding:'11px 22px', cursor:'pointer' }}>
                  Read the process ↓
                </button>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:18, paddingTop:8 }}>
              {[
                { label:'Role',      value:'UX Designer' },
                { label:'Tools',     value:'Figma · Figma Make · Principle' },
                { label:'Platforms', value:'iOS · Android' },
                { label:'Timeline',  value:'14 weeks · 2024' },
                { label:'By',        value:'Karishma Dilip Gawali' },
              ].map(m => (
                <div key={m.label}>
                  <p style={{ fontFamily: MONO, fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', color: MUTED, margin:'0 0 3px' }}>{m.label}</p>
                  <p style={{ fontFamily: SANS, fontSize:12, color: FG, margin:0, fontWeight:500 }}>{m.value}</p>
                </div>
              ))}
            </div>
          </div>
          {/* 3-phone hero mockup */}
          <HeroMockup />
        </Box>
      </div>

      {/* ── Metrics ───────────────────────────────────────────────────── */}
      <div ref={metricsRef} style={{ borderTop: HL, borderBottom: HL }}>
        <Box>
          <div style={{ display:'grid', gridTemplateColumns: cols('repeat(3, 1fr)') }}>
            {METRICS.map((m, i) => <MetricCard key={m.label} {...m} started={metricsStarted} index={i} />)}
          </div>
        </Box>
      </div>

      {/* ── 01 Overview ───────────────────────────────────────────────── */}
      <div id="overview" style={{ borderTop: HL, padding: isMobile ? '48px 0' : '80px 0', scrollMarginTop:60 }} ref={processRef}>
        <Box>
          <Eyebrow>01 · Overview</Eyebrow>
          <div style={{ display:'grid', gridTemplateColumns: cols('repeat(3, 1fr)'), gap:32 }}>
            {[
              { h:'Product',     b:'HomeSense is a unified companion app that maps eight kitchen appliance control flows into one seamless mobile experience.' },
              { h:'Challenge',   b:'Homeowners were juggling 8+ manufacturer apps, each with inconsistent navigation, accessibility gaps, and time-consuming pairing flows.' },
              { h:'Opportunity', b:'Consolidate all appliances into a single, accessible, delightful interface that reduces cognitive load and increases daily engagement.' },
            ].map(c => (
              <div key={c.h}>
                <h3 style={{ fontFamily: SERIF, fontSize:22, color: FG, margin:'0 0 12px', fontWeight:600 }}>{c.h}</h3>
                <p style={{ fontFamily: SANS, fontSize:14, color: MUTED, lineHeight:1.7, margin:0 }}>{c.b}</p>
              </div>
            ))}
          </div>
        </Box>
      </div>

      {/* ── 02 Problem ────────────────────────────────────────────────── */}
      <Sec id="problem">
        <Eyebrow>02 · Problem</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize:'clamp(32px, 4vw, 52px)', color: FG, margin:'0 0 40px', fontWeight:700, lineHeight:1.15 }}>Four pain points, one product gap.</h2>
        <div style={{ display:'grid', gridTemplateColumns: cols('repeat(2, 1fr)'), gap:24 }}>
          {[
            { label:'Fragmented controls',     body:'Owners managed 3–8 separate apps with different UX patterns, no cross-device awareness, no shared state.' },
            { label:'Confusing pairing',        body:'Average first-time pairing took 4.2 minutes with a 48% drop-off rate at the BLE handshake step.' },
            { label:'Inconsistent navigation', body:'Each appliance app had a different IA, forcing users to re-learn navigation for every new device.' },
            { label:'Accessibility debt',       body:'Touch targets averaged 32pt (below WCAG 2.1 minimum). Contrast ratios as low as 3.1:1 in key flows.' },
          ].map(p => (
            <div key={p.label} style={{ borderTop:`2px solid ${FG}`, paddingTop:16 }}>
              <p style={{ fontFamily: MONO, fontSize:9, color: ACCENT, letterSpacing:'0.12em', textTransform:'uppercase', margin:'0 0 10px' }}>Pain point</p>
              <h3 style={{ fontFamily: SERIF, fontSize:20, color: FG, margin:'0 0 8px', fontWeight:600 }}>{p.label}</h3>
              <p style={{ fontFamily: SANS, fontSize:13, color: MUTED, lineHeight:1.6, margin:0 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </Sec>

      {/* ── 03 Objectives ─────────────────────────────────────────────── */}
      <Sec id="objectives" bone>
        <Eyebrow>03 · Objectives</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize:'clamp(32px, 4vw, 52px)', color: FG, margin:'0 0 40px', fontWeight:700, lineHeight:1.15 }}>Four clear goals.</h2>
        <div style={{ display:'grid', gridTemplateColumns: cols('repeat(2, 1fr)'), gap:28 }}>
          {[
            { n:'01', h:'Unify eight into one',       b:'Single app, single IA: all eight appliance control flows in one place with consistent patterns.' },
            { n:'02', h:'Raise accessibility to AA+', b:'WCAG 2.1 AA minimum on contrast, touch targets, focus management, and status grammar.' },
            { n:'03', h:'Cut pairing time in half',   b:'Redesign the onboarding and pairing flow using BLE auto-discovery and a guided "kitchen scan" approach.' },
            { n:'04', h:'Drive daily engagement',     b:'Surface routines, energy insights, and alerts that give owners a reason to open the app every morning.' },
          ].map(o => (
            <div key={o.n} style={{ display:'flex', gap:16 }}>
              <span style={{ fontFamily: MONO, fontSize:12, color: ACCENT, fontWeight:700, flexShrink:0, paddingTop:4 }}>{o.n}</span>
              <div>
                <h3 style={{ fontFamily: SERIF, fontSize:20, color: FG, margin:'0 0 8px', fontWeight:600 }}>{o.h}</h3>
                <p style={{ fontFamily: SANS, fontSize:13, color: MUTED, lineHeight:1.6, margin:0 }}>{o.b}</p>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      {/* ── 04 Process ────────────────────────────────────────────────── */}
      <Sec id="process">
        <Eyebrow>04 · Process</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize:'clamp(32px, 4vw, 52px)', color: FG, margin:'0 0 40px', fontWeight:700, lineHeight:1.15 }}>14 weeks, 8 phases.</h2>
        <div>
          {[
            { w:'Weeks 1–2',   t:'Stakeholder alignment',         d:'Define project scope, success metrics, and technical constraints with product and engineering.' },
            { w:'Weeks 2–4',   t:'User understanding',            d:'8 in-depth interviews with connected-appliance owners. Affinity mapping, journey mapping.' },
            { w:'Weeks 4–5',   t:'Competitive audit',             d:'Evaluated 12 appliance apps across navigation patterns, onboarding flows, and accessibility.' },
            { w:'Weeks 5–7',   t:'IA & wireframing',              d:'Collapsed 4-level hierarchy to 2-level. Lo-fi wireframes across 8 core flows.' },
            { w:'Weeks 7–9',   t:'Onboarding exploration',        d:'3 onboarding variants prototyped in Principle, tested in 5 moderated remote sessions.' },
            { w:'Weeks 9–11',  t:'Visual design & accessibility', d:'Hi-fi in Figma. WCAG 2.1 audit, 48pt touch targets, 7:1 contrast on body copy.' },
            { w:'Weeks 11–13', t:'Usability testing',             d:'12 unmoderated sessions via Maze. Iterated on control density and alert hierarchy.' },
            { w:'Weeks 13–14', t:'Handoff & documentation',       d:'Figma component library, spec annotations, motion guidelines, and developer Q&A.' },
          ].map((p, i, arr) => (
            <div key={p.w} style={{ display:'grid', gridTemplateColumns: cols('170px 1fr'), gap:24, padding:'20px 0', borderTop: HL, borderBottom: i === arr.length - 1 ? HL : 'none' }}>
              <span style={{ fontFamily: MONO, fontSize:11, color: MUTED, paddingTop:3 }}>{p.w}</span>
              <div>
                <h3 style={{ fontFamily: SERIF, fontSize:18, color: FG, margin:'0 0 6px', fontWeight:600 }}>{p.t}</h3>
                <p style={{ fontFamily: SANS, fontSize:13, color: MUTED, lineHeight:1.6, margin:0 }}>{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      {/* ── 05 Research ───────────────────────────────────────────────── */}
      <Sec id="research" bone>
        <Eyebrow>05 · User Understanding</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize:'clamp(32px, 4vw, 52px)', color: FG, margin:'0 0 40px', fontWeight:700, lineHeight:1.15 }}>Who we designed for.</h2>
        <div style={{ display:'grid', gridTemplateColumns: cols('1fr 1fr'), gap:32 }}>
          <div>
            <p style={{ fontFamily: SANS, fontSize:14, color: MUTED, lineHeight:1.7, margin:'0 0 20px' }}>8 in-depth interviews with homeowners who owned 2+ connected appliances. Patterns emerged around context-switching frustration, fear during pairing, and low awareness of automation features.</p>
            <ul style={{ margin:0, padding:'0 0 0 18px' }}>
              {['Average 3.4 apps per household for appliance control','72% found pairing "stressful" or "confusing"','0 of 8 had ever set up a routine or automation','5 of 8 said they "just gave up" on advanced features','All 8 wanted one place to check appliance status'].map(b => (
                <li key={b} style={{ fontFamily: SANS, fontSize:13, color: MUTED, lineHeight:1.6, marginBottom:7 }}>{b}</li>
              ))}
            </ul>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {[
              { name:'Anika · 34', role:'Busy working professional', goals:'Control appliances from work, get notified when a cycle finishes, automate morning routines.', frustrations:'Opens 4 apps just to check if the dishwasher is done. Gave up on schedules.' },
              { name:'Sameer · 42', role:'Multitasking home cook', goals:'Preheat oven on his way home, track energy usage, share access with his partner.', frustrations:'Pairing takes 20+ minutes. Different apps have completely different UX logic.' },
            ].map(p => (
              <div key={p.name} style={{ border: HL, borderRadius:16, padding:20, backgroundColor: CARD }}>
                <p style={{ fontFamily: MONO, fontSize:9, color: ACCENT, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 4px' }}>Persona</p>
                <h3 style={{ fontFamily: SERIF, fontSize:18, color: FG, margin:'0 0 3px', fontWeight:600 }}>{p.name}</h3>
                <p style={{ fontFamily: SANS, fontSize:11, color: MUTED, margin:'0 0 14px' }}>{p.role}</p>
                {[{ l:'Goals', v:p.goals }, { l:'Frustrations', v:p.frustrations }].map(r => (
                  <div key={r.l} style={{ marginTop:10 }}>
                    <p style={{ fontFamily: MONO, fontSize:9, color: MUTED, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 4px' }}>{r.l}</p>
                    <p style={{ fontFamily: SANS, fontSize:12, color: FG, margin:0, lineHeight:1.5 }}>{r.v}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* ── 06 IA ─────────────────────────────────────────────────────── */}
      <Sec id="ia">
        <Eyebrow>06 · Information Architecture</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize:'clamp(32px, 4vw, 52px)', color: FG, margin:'0 0 16px', fontWeight:700, lineHeight:1.15 }}>Three primitives, eight flows.</h2>
        <p style={{ fontFamily: SANS, fontSize:14, color: MUTED, margin:'0 0 36px', maxWidth:620, lineHeight:1.7 }}>We collapsed eight independent control surfaces into a single hierarchy built on Spaces, Devices, and Routines. Every flow lives inside one of them.</p>
        <div style={{ display:'grid', gridTemplateColumns: cols('repeat(4, 1fr)', '1fr 1fr'), gap:10 }}>
          {[
            { n:'01', l:'Onboarding & account' },{ n:'02', l:'Appliance pairing' },
            { n:'03', l:'Dashboard overview'  },{ n:'04', l:'Appliance detail'  },
            { n:'05', l:'Routine creation'    },{ n:'06', l:'Alerts & notifications' },
            { n:'07', l:'Maintenance reminders'},{ n:'08', l:'Settings & permissions' },
          ].map(f => (
            <div key={f.n} style={{ border: HL, borderRadius:13, padding:'15px 13px', backgroundColor: CARD }}>
              <p style={{ fontFamily: MONO, fontSize:9, color: ACCENT, letterSpacing:'0.1em', margin:'0 0 8px' }}>{f.n}</p>
              <h3 style={{ fontFamily: SERIF, fontSize:14, color: FG, margin:0, fontWeight:600, lineHeight:1.3 }}>{f.l}</h3>
            </div>
          ))}
        </div>
      </Sec>

      {/* ── 07 User Flow ──────────────────────────────────────────────── */}
      <Sec id="userflow" bone>
        <Eyebrow>07 · User Flow</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize:'clamp(32px, 4vw, 52px)', color: FG, margin:'0 0 16px', fontWeight:700, lineHeight:1.15 }}>Every path, mapped.</h2>
        <p style={{ fontFamily: SANS, fontSize:14, color: MUTED, margin:'0 0 36px', maxWidth:640, lineHeight:1.7 }}>
          Two entry paths, new user onboarding and returning sign-in, merge at the main dashboard. From there, five primary tabs and their sub-screens form the complete navigable surface of Hearth.
        </p>
        <UserFlowDiagram />
      </Sec>

      {/* ── 08 Wireframes ─────────────────────────────────────────────── */}
      <Sec id="wireframes">
        <Eyebrow>08 · Wireframes & UX Evolution</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize:'clamp(32px, 4vw, 52px)', color: FG, margin:'0 0 40px', fontWeight:700, lineHeight:1.15 }}>From lo-fi to system.</h2>
        <div style={{ display:'grid', gridTemplateColumns: cols('repeat(3, 1fr)'), gap:16 }}>
          {[
            { badge:'Lo-fi → Mid-fi',   title:'Dashboard',        variant:'dashboard', desc:'Evolved from 11 controls per screen to 4 primary actions with progressive disclosure.' },
            { badge:'Pairing v1 → v3',  title:'Pairing flow',     variant:'pairing',   desc:'Three variants tested. Guided "kitchen scan" reduced drop-off from 48% to 8%.' },
            { badge:'Mid-fi → Hi-fi',   title:'Control screens',  variant:'devices',   desc:'Consistent gesture vocabulary and control patterns across all 8 appliances.' },
            { badge:'IA v1 → v2',       title:'Tab navigation',   variant:'ia',        desc:'Collapsed from 4 levels deep to 2 levels with a persistent bottom tab bar.' },
            { badge:'Concept → Final',  title:'Routine builder',  variant:'routines',  desc:'Simplified trigger-action model replacing a complex conditional logic interface.' },
            { badge:'Audit → Redesign', title:'Settings & alerts',variant:'alerts',    desc:'WCAG audit triggered a full redesign of alert hierarchy and notification grouping.' },
          ].map(w => (
            <div key={w.title} style={{ border: HL, borderRadius:16, overflow:'hidden', backgroundColor: CARD }}>
              <div style={{ aspectRatio:'4/3', backgroundColor:'#f0efec', position:'relative', overflow:'hidden' }}>
                <WireframeScreen variant={w.variant} />
              </div>
              <div style={{ padding:'13px 15px' }}>
                <span style={{ fontFamily: MONO, fontSize:9, color: ACCENT, letterSpacing:'0.1em', textTransform:'uppercase' }}>{w.badge}</span>
                <h3 style={{ fontFamily: SERIF, fontSize:16, color: FG, margin:'4px 0 6px', fontWeight:600 }}>{w.title}</h3>
                <p style={{ fontFamily: SANS, fontSize:12, color: MUTED, margin:0, lineHeight:1.5 }}>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      {/* ── 09 Onboarding ─────────────────────────────────────────────── */}
      <Sec id="onboarding">
        <Eyebrow>09 · Onboarding Exploration</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize:'clamp(32px, 4vw, 52px)', color: FG, margin:'0 0 16px', fontWeight:700, lineHeight:1.15 }}>Three variants. One winner.</h2>
        <p style={{ fontFamily: SANS, fontSize:14, color: MUTED, margin:'0 0 36px', maxWidth:600, lineHeight:1.7 }}>We prototyped three onboarding approaches in Principle and ran five moderated sessions. The guided "kitchen scan" won decisively.</p>
        <div style={{ display:'grid', gridTemplateColumns: cols('repeat(3, 1fr)'), gap:16 }}>
          {[
            { v:'Variant A', t:'QR-first',           hi:false, benefit:'Familiar to most users', risk:'Requires physical label access', outcome:'Dropped. 62% could not complete without assistance.' },
            { v:'Variant B', t:'BLE discovery',       hi:false, benefit:'Fully automatic pairing', risk:'High false-positive rate, confusing disambiguation', outcome:'Dropped. Users panicked when 4+ devices appeared at once.' },
            { v:'Variant C', t:'Guided kitchen scan', hi:true,  benefit:'Room-by-room with visual confirmation', risk:'Slightly longer, requires camera permission', outcome:'✅ Selected. Friction down 45%. Completion 92%.' },
          ].map(v => (
            <div key={v.v} style={{ border: v.hi ? `2px solid ${FG}` : HL, borderRadius:16, padding:20, backgroundColor: v.hi ? BONE : CARD }}>
              <p style={{ fontFamily: MONO, fontSize:9, color: v.hi ? ACCENT : MUTED, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 8px' }}>{v.v}</p>
              <h3 style={{ fontFamily: SERIF, fontSize:20, color: FG, margin:'0 0 16px', fontWeight:600 }}>{v.t}</h3>
              {[{ l:'Benefit', val:v.benefit }, { l:'Risk', val:v.risk }, { l:'Outcome', val:v.outcome }].map(r => (
                <div key={r.l} style={{ borderTop: HL, paddingTop:10, marginTop:10 }}>
                  <p style={{ fontFamily: MONO, fontSize:9, color: MUTED, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 4px' }}>{r.l}</p>
                  <p style={{ fontFamily: SANS, fontSize:12, color: FG, margin:0, lineHeight:1.5 }}>{r.val}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Sec>

      {/* ── 10 Accessibility ──────────────────────────────────────────── */}
      <Sec id="accessibility" bone>
        <Eyebrow>10 · Accessibility & Usability</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize:'clamp(32px, 4vw, 52px)', color: FG, margin:'0 0 40px', fontWeight:700, lineHeight:1.15 }}>Accessible by design, not retrofit.</h2>
        <div style={{ display:'grid', gridTemplateColumns: cols('1fr 1fr'), gap:36 }}>
          <div>
            <p style={{ fontFamily: SANS, fontSize:14, color: MUTED, lineHeight:1.7, margin:'0 0 20px' }}>Accessibility wasn't a final checklist; it was a design constraint from day one. Every pattern decision was evaluated against WCAG 2.1 AA requirements before moving to the next phase.</p>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {['WCAG 2.1 AA+ contrast on all body text','48pt minimum touch targets across all controls','Clear visual hierarchy with consistent landmark structure','Icon + text label pairs, never icon-only controls','Maximum 5 controls per screen (down from 11)','Consistent status grammar: Idle · Active · Attention · Done'].map(item => (
                <div key={item} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                  <span style={{ color: ACCENT, fontSize:14, flexShrink:0 }}>✓</span>
                  <span style={{ fontFamily: SANS, fontSize:13, color: FG, lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:24, borderTop:`2px solid ${ACCENT}`, paddingTop:16 }}>
              <span style={{ fontFamily: SERIF, fontSize:22, color: ACCENT, fontWeight:700 }}>+40%</span>
              <span style={{ fontFamily: SANS, fontSize:13, color: MUTED, marginLeft:10 }}>first-attempt task success</span>
            </div>
          </div>
          <div style={{ backgroundColor: FG, borderRadius:20, padding:'24px 28px' }}>
            <p style={{ fontFamily: MONO, fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)', margin:'0 0 20px' }}>Before → After</p>
            {[
              { metric:'Touch target',              before:'32 pt', after:'48 pt' },
              { metric:'Body contrast ratio',       before:'3.8:1', after:'7.2:1' },
              { metric:'Controls per screen',       before:'11',    after:'5'     },
              { metric:'First-attempt task success',before:'54%',   after:'94%'   },
            ].map((r, i, arr) => (
              <div key={r.metric} style={{ display:'grid', gridTemplateColumns:'1fr 72px 72px', gap:12, padding:'12px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none', alignItems:'center' }}>
                <span style={{ fontFamily: SANS, fontSize:12, color:'rgba(255,255,255,0.55)' }}>{r.metric}</span>
                <span style={{ fontFamily: MONO, fontSize:12, color:'rgba(255,255,255,0.28)', textDecoration:'line-through' }}>{r.before}</span>
                <span style={{ fontFamily: MONO, fontSize:13, color: AMBER, fontWeight:700 }}>{r.after}</span>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* ── Testimonial ───────────────────────────────────────────────── */}
      <div style={{ backgroundColor: FG, padding:'80px 0' }}>
        <Box>
          <div style={{ maxWidth:760 }}>
            <span style={{ fontSize:52, color: AMBER, lineHeight:1, display:'block', marginBottom:16, fontFamily: SERIF }}>"</span>
            <blockquote style={{ fontFamily: SERIF, fontSize:'clamp(22px, 3vw, 38px)', color: BG, margin:'0 0 24px', lineHeight:1.4, fontWeight:600 }}>
              It used to take me forty minutes to set up Sunday brunch. Now I tap once and the oven preheats while the coffee starts brewing.
            </blockquote>
            <p style={{ fontFamily: MONO, fontSize:11, color:'rgba(250,250,248,0.4)', margin:0, letterSpacing:'0.06em' }}>Beta participant, moderated test #4</p>
          </div>
        </Box>
      </div>

      {/* ── 11 Final Design ───────────────────────────────────────────── */}
      <Sec id="final-design">
        <Eyebrow>11 · Final Design</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize:'clamp(32px, 4vw, 52px)', color: FG, margin:'0 0 40px', fontWeight:700, lineHeight:1.15 }}>Spaces over apps.</h2>
        <div style={{ display:'grid', gridTemplateColumns: cols('1fr 1fr'), gap:40 }}>
          <p style={{ fontFamily: SANS, fontSize:14, color: MUTED, lineHeight:1.7, margin:0 }}>The final design organises every appliance flow under three top-level primitives (Spaces, Devices, Routines) with a persistent bottom tab bar as the single navigation surface. No hidden drawers, no deep hierarchies.</p>
          <ul style={{ margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:9 }}>
            {['Splash · welcome · sign in · permissions · confirmation','Pair flow · auto-discovery · Wi-Fi handoff · naming · success','Home · dashboard · routines · status strip','Appliance detail · per-device controls · diagnostics','Routines · trigger · action · review · saved','Alerts · severity · recommendations · resolve','Maintenance · step-by-step guide · mark complete','Settings · profile · household · devices · permissions'].map(item => (
              <li key={item} style={{ borderLeft:`2px solid ${ACCENT}`, paddingLeft:12, fontFamily: SANS, fontSize:12, color: MUTED, lineHeight:1.5 }}>{item}</li>
            ))}
          </ul>
        </div>
      </Sec>

      {/* ── 12 Interactive Prototype ──────────────────────────────────── */}
      <div ref={protoRef} id="prototype" style={{ scrollMarginTop:60 }}>
        <Sec bone>
          <Eyebrow>12 · Interactive Prototype</Eyebrow>
          <div style={{ display:'grid', gridTemplateColumns: cols('1fr 1fr'), gap: isMobile ? 32 : 56, alignItems:'start' }}>
            <div style={{ position: isMobile ? 'static' : 'sticky', top:72 }}>
              <h2 style={{ fontFamily: SERIF, fontSize:'clamp(28px, 3.5vw, 48px)', color: FG, margin:'0 0 16px', fontWeight:700, lineHeight:1.15 }}>
                Try the <em style={{ color: ACCENT }}>whole flow.</em>
              </h2>
              <p style={{ fontFamily: SANS, fontSize:14, color: MUTED, lineHeight:1.7, margin:'0 0 28px' }}>
                Fully interactive, built in React, not a video. Toggle devices, enable routines, tap a device for detail controls, add a new appliance through the full pairing flow. Tap Reset to restore defaults.
              </p>
              <div style={{ borderTop: HL, paddingTop:20 }}>
                <p style={{ fontFamily: MONO, fontSize:9, color: MUTED, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 14px' }}>Suggested flows</p>
                <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
                  {['Wait for the splash screen, then tap into the app','On Home, tap a device card to toggle it on or off','Switch to Devices, tap any row to see full controls','Tap + to walk through the full pairing wizard','Enable Dinner Prep in Routines, then check Alerts'].map((f, i) => (
                    <div key={f} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                      <span style={{ fontFamily: MONO, fontSize:10, color: ACCENT, flexShrink:0, width:20 }}>{String(i+1).padStart(2,'0')}</span>
                      <span style={{ fontFamily: SANS, fontSize:13, color: FG, lineHeight:1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <PhonePrototype />
          </div>
        </Sec>
      </div>

      {/* ── 13 Results ────────────────────────────────────────────────── */}
      <Sec id="results">
        <Eyebrow>13 · Results & Impact</Eyebrow>
        <h2 style={{ fontFamily: SERIF, fontSize:'clamp(32px, 4vw, 52px)', color: FG, margin:'0 0 40px', fontWeight:700, lineHeight:1.15 }}>Numbers that moved.</h2>
        <div style={{ display:'grid', gridTemplateColumns: cols('repeat(3, 1fr)'), gap:16, marginBottom:32 }}>
          {[
            { value:'35%', label:'Daily engagement lift',          desc:'More owners returned daily, not just when something broke. Measured 30 days post-launch.' },
            { value:'40%', label:'First-attempt task success',     desc:'On primary control screens, from 54% to 94%, after the accessibility and hierarchy rebuild.' },
            { value:'45%', label:'Less pairing friction',          desc:'From 4.2 min to 2.3 min average setup time across 5 moderated onboarding sessions.' },
          ].map(r => (
            <div key={r.label} style={{ border: HL, borderRadius:20, padding:'28px 22px', backgroundColor: CARD }}>
              <div style={{ fontFamily: SERIF, fontSize:52, color: FG, fontWeight:700, lineHeight:1, marginBottom:8 }}>{r.value}</div>
              <div style={{ fontFamily: SANS, fontSize:13, fontWeight:600, color: FG, marginBottom:8 }}>{r.label}</div>
              <div style={{ fontFamily: SANS, fontSize:12, color: MUTED, lineHeight:1.5 }}>{r.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: HL, paddingTop:28 }}>
          <h3 style={{ fontFamily: SERIF, fontSize:22, color: FG, margin:'0 0 10px', fontWeight:600 }}>Also measured</h3>
          <p style={{ fontFamily: SANS, fontSize:14, color: MUTED, lineHeight:1.7, maxWidth:700, margin:0 }}>WCAG 2.1 AA compliance: 100% across all screens. User satisfaction: 4.6/5 (up from 3.1/5). Support tickets related to pairing: down 52%. These weren't the target metrics; they were the side effects of designing for clarity.</p>
        </div>
      </Sec>

      {/* ── 14 Reflection ─────────────────────────────────────────────── */}
      <Sec id="reflection" bone>
        <Eyebrow>14 · Reflection</Eyebrow>
        <div style={{ display:'grid', gridTemplateColumns: cols('1fr 1fr'), gap:40 }}>
          <div>
            <h2 style={{ fontFamily: SERIF, fontSize:'clamp(22px, 2.5vw, 34px)', color: FG, margin:'0 0 16px', fontWeight:700, lineHeight:1.3 }}>
              Designing for connected hardware taught me that the hardest interface is the one between products.
            </h2>
            <p style={{ fontFamily: SANS, fontSize:14, color: MUTED, lineHeight:1.7, margin:0 }}>The individual appliance UIs weren't the problem; the seams between them were. The moment someone closes one app and opens another is the moment they lose context, confidence, and motivation.</p>
          </div>
          <div>
            <h3 style={{ fontFamily: SERIF, fontSize:20, color: FG, margin:'0 0 12px', fontWeight:600 }}>What I'd do differently</h3>
            <p style={{ fontFamily: SANS, fontSize:14, color: MUTED, lineHeight:1.7, margin:0 }}>I'd run cross-team alignment workshops earlier, before wireframes and not after. Firmware constraints surfaced in week 8 and required redesigning the BLE pairing flow mid-prototype. Earlier technical discovery would have saved two weeks and preserved an onboarding variant that tested very well but wasn't feasible given API limitations.</p>
          </div>
        </div>
      </Sec>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <div style={{ borderTop: HL, padding:'80px 0' }}>
        <Box style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:24 }}>
          <h2 style={{ fontFamily: SERIF, fontSize:'clamp(28px, 4vw, 52px)', color: FG, margin:0, fontWeight:700, maxWidth:580, lineHeight:1.15 }}>
            Want to see it move?{' '}<em style={{ color: ACCENT }}>Try the prototype.</em>
          </h2>
          <button onClick={() => scrollTo(protoRef)}
            style={{ fontFamily: SANS, fontSize:14, fontWeight:600, backgroundColor: FG, color: BG, border:'none', borderRadius:999, padding:'14px 28px', cursor:'pointer', display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
            Launch the demo ↗
          </button>
        </Box>
      </div>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: HL, padding:'24px 0' }}>
        <Box style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <span style={{ fontFamily: MONO, fontSize:11, color: MUTED }}>© 2025 Karishma Dilip Gawali</span>
          <div style={{ display:'flex', gap:16, alignItems:'center' }}>
            <span style={{ fontFamily: MONO, fontSize:11, color: MUTED }}>UX case study · Smart Home Companion App</span>
            <button onClick={() => navigate('/')}
              style={{ fontFamily: MONO, fontSize:11, color: MUTED, background:'none', border: HL, borderRadius:999, padding:'5px 14px', cursor:'pointer' }}>
              ← Portfolio
            </button>
          </div>
        </Box>
      </footer>

    </div>
  )
}
