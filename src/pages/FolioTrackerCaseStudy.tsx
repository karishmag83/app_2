import { CaseStudyPage } from '@/components/folio-case-study/CaseStudyPage'
import '@/components/folio-case-study/lovable-case-study.css'

export default function FolioTrackerCaseStudy() {
  return (
    <div 
      className="lovable-case-study"
      style={{
        '--background': '222 47% 6%',
        '--foreground': '210 20% 95%',
        '--card': '222 47% 9%',
        '--card-foreground': '210 20% 95%',
        '--primary': '162 63% 48%',
        '--primary-foreground': '222 47% 6%',
        '--secondary': '217 33% 17%',
        '--secondary-foreground': '210 20% 85%',
        '--muted': '217 33% 15%',
        '--muted-foreground': '215 20% 55%',
        '--accent': '162 45% 25%',
        '--accent-foreground': '162 63% 65%',
        '--border': '217 33% 18%',
        '--input': '217 33% 18%',
        '--ring': '162 63% 48%',
        '--success': '162 63% 48%',
        '--sidebar-background': '222 47% 7%',
        '--sidebar-primary': '162 63% 48%',
      } as React.CSSProperties}
    >
      <CaseStudyPage />
    </div>
  )
}
