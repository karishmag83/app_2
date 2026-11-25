import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AICareNavigatorCaseStudy from './pages/AICareNavigatorCaseStudy'
import RePackCaseStudy from './pages/RePackCaseStudy'
import RestorationMedicineCaseStudy from './pages/RestorationMedicineCaseStudy'
import FolioTrackerCaseStudy from './pages/FolioTrackerCaseStudy'
import BrandCaseStudy from './pages/BrandCaseStudy'
import SmartHomeCaseStudy from './pages/SmartHomeCaseStudy'
import FitnessWearableCaseStudy from './pages/FitnessWearableCaseStudy'
import LightCanvas from './components/LightCanvas'

function DesignSystemRedirect() {
  useEffect(() => {
    window.location.replace('/DesignSystem/')
  }, [])

  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/DesignSystem/*" element={<DesignSystemRedirect />} />
        <Route path="/ai-care-navigator-case-study" element={<LightCanvas><AICareNavigatorCaseStudy /></LightCanvas>} />
        <Route path="/repack-portal" element={<LightCanvas><RePackCaseStudy /></LightCanvas>} />
        <Route path="/restoration-medicine" element={<LightCanvas><RestorationMedicineCaseStudy /></LightCanvas>} />
        <Route path="/folio-tracker-case-study" element={<LightCanvas><FolioTrackerCaseStudy /></LightCanvas>} />
        <Route path="/brand/:id" element={<LightCanvas><BrandCaseStudy /></LightCanvas>} />
        <Route path="/smart-home" element={<LightCanvas><SmartHomeCaseStudy /></LightCanvas>} />
        <Route path="/fitness-wearable" element={<LightCanvas><FitnessWearableCaseStudy /></LightCanvas>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
