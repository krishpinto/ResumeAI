import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Upload } from "lucide-react"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-8"
import ContentSection from "@/components/content-7"
import Features from "@/components/features-1"
import FooterSection from "@/components/footer"

export default function Home() {
  return (
    <><HeroSection />
    <FeaturesSection />
    <ContentSection />
    <Features/>
    <FooterSection />
    </>
  )
}

