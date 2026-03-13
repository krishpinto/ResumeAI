import Link from "next/link"
import { FileText } from "lucide-react"

export default function FooterSection() {
  return (
    <footer className="footer-root">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <FileText className="footer-logo-icon" />
            <span>ResumeAI</span>
          </Link>
          <p className="footer-tagline">
            AI-powered tools to craft resumes that get you hired.
          </p>
        </div>

        {/* Links */}
        <nav className="footer-nav">
          <Link href="/resume-builder/basic-info" className="footer-link">Create Resume</Link>
          <Link href="/resume-enhancer" className="footer-link">Enhance Resume</Link>
          <Link href="/dashboard" className="footer-link">Dashboard</Link>
        </nav>

        {/* Social */}
        <div className="footer-social">
          <a
            href="https://github.com/krishpinto"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="footer-social-icon">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a
            href="https://x.com/krishpint0"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="X (Twitter)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="footer-social-icon">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.849L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/krishpint0/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="footer-social-icon">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4.5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} ResumeAI · Made by Krish</span>
      </div>
    </footer>
  )
}
