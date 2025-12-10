import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import ProductsSection from '@/components/sections/ProductsSection'
import NewsSection from '@/components/sections/NewsSection'
import CasesSection from '@/components/sections/CasesSection'

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <NewsSection />
      <CasesSection />
    </div>
  )
}





