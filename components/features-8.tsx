"use client"

import { FileText, Upload, Edit, CheckCircle, Layout, Star } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Create from Scratch",
    description: "Build your resume step-by-step with our intuitive guided builder.",
  },
  {
    icon: Upload,
    title: "AI Enhancement",
    description: "Upload your existing resume and let our AI instantly improve it.",
  },
  {
    icon: Edit,
    title: "Easy Customization",
    description: "Choose from multiple themes and layouts to make your resume stand out.",
  },
  {
    icon: Layout,
    title: "Professional Templates",
    description: "Access a variety of professionally designed, ATS-optimized templates.",
  },
  {
    icon: CheckCircle,
    title: "ATS-Friendly",
    description: "Ensure your resume passes Applicant Tracking Systems with ease.",
  },
  {
    icon: Star,
    title: "Stand Out",
    description: "Highlight your skills and achievements to impress every employer.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features-inner">
        {/* Section label */}
        <div className="features-label-row">
          <span className="features-label">Features</span>
        </div>

        {/* Heading */}
        <h2 className="features-heading">
          Everything you need to <br />
          <span className="features-heading-accent">land your next role</span>
        </h2>

        {/* Grid */}
        <div className="features-grid">
          {features.map((feature, i) => (
            <div key={i} className="feature-card">
              <div className="feature-card-icon-wrap">
                <feature.icon className="feature-card-icon" />
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
