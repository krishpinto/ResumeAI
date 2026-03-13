import { Zap, FileText, Layout, CheckCircle } from "lucide-react"
import Image from "next/image"

const items = [
  {
    icon: FileText,
    title: "Step-by-Step Builder",
    desc: "Create your resume effortlessly with our intuitive guided builder.",
  },
  {
    icon: Zap,
    title: "AI-Powered Tools",
    desc: "Enhance your resume with AI suggestions for professional language and formatting.",
  },
  {
    icon: Layout,
    title: "Customizable Templates",
    desc: "Choose from a variety of professional templates to match your style.",
  },
  {
    icon: CheckCircle,
    title: "ATS-Friendly",
    desc: "Ensure your resume passes Applicant Tracking Systems with ease.",
  },
]

export default function ContentSection() {
  return (
    <section className="content-section">
      <div className="content-inner">
        {/* Left */}
        <div className="content-left">
          <span className="content-eyebrow">How it works</span>
          <h2 className="content-heading">
            Build Your Resume<br />
            <span className="content-heading-accent">with Ease</span>
          </h2>
          <p className="content-body">
            Our platform provides everything you need to create a professional resume.
            From AI-powered tools to customizable templates, we make the process
            simple and effective.
          </p>

          <div className="content-features">
            {items.map((item, i) => (
              <div key={i} className="content-feature-item">
                <div className="content-feature-icon-wrap">
                  <item.icon className="content-feature-icon" />
                </div>
                <div>
                  <h3 className="content-feature-title">{item.title}</h3>
                  <p className="content-feature-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="content-right">
          <div className="content-image-wrap">
            <Image
              src="/newphoto.png"
              alt="Resume Preview"
              width={1206}
              height={612}
              className="content-image"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
