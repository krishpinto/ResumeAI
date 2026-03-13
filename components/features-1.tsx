import { Settings2, Sparkles, Zap } from "lucide-react"

const cards = [
  {
    icon: Zap,
    iconColor: "#eab308",
    title: "Customizable",
    desc: "Extensive options letting you tailor every aspect to meet your specific needs.",
  },
  {
    icon: Settings2,
    iconColor: "#3b82f6",
    title: "You have full control",
    desc: "From design elements to functionality, create a unique and personalized experience.",
  },
  {
    icon: Sparkles,
    iconColor: "#a855f7",
    title: "Powered By AI",
    desc: "Leverage cutting-edge AI to write, refine, and perfect your resume content.",
  },
]

export default function Features() {
  return (
    <section className="pillars-section">
      <div className="pillars-inner">
        <div className="pillars-header">
          <span className="pillars-eyebrow">Core pillars</span>
          <h2 className="pillars-heading">Built to cover your needs</h2>
        </div>

        <div className="pillars-grid">
          {cards.map((c, i) => (
            <div key={i} className="pillar-card">
              {/* Grid accent background */}
              <div className="pillar-card-grid" aria-hidden />
              <div className="pillar-card-vignette" aria-hidden />

              {/* Icon */}
              <div className="pillar-icon-wrap">
                <c.icon
                  className="pillar-icon"
                  style={{ color: c.iconColor }}
                  aria-hidden
                />
              </div>

              <h3 className="pillar-title">{c.title}</h3>
              <p className="pillar-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
