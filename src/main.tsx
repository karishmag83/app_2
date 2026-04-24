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
        <Route path="/ai-care-navigator-case-study" element={<AICareNavigatorCaseStudy />} />
        <Route path="/repack-portal" element={<RePackCaseStudy />} />
        <Route path="/restoration-medicine" element={<RestorationMedicineCaseStudy />} />
        <Route path="/folio-tracker-case-study" element={<FolioTrackerCaseStudy />} />
        <Route path="/brand/:id" element={<BrandCaseStudy />} />
        <Route path="/smart-home" element={<SmartHomeCaseStudy />} />
        <Route path="/fitness-wearable" element={<FitnessWearableCaseStudy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
