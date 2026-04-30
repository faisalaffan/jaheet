import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import BrandDescription from '@/components/landing/BrandDescription'
import FeaturedProductSection from '@/components/landing/FeaturedProductSection'
import CollectionSection from '@/components/landing/CollectionSection'
import CategorySection from '@/components/landing/CategorySection'
import LookSection from '@/components/landing/LookSection'
import CatalogSection from '@/components/landing/CatalogSection'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <BrandDescription />
      <FeaturedProductSection />
      <CollectionSection />
      <CategorySection />
      <LookSection />
      <CatalogSection />
      <Footer />
    </div>
  )
}
