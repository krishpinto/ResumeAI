"use client"

import Link from "next/link"
import { ArrowRight, FileText, Upload } from "lucide-react"

export default function HeroSection() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* Animated SVG Grid */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }} aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect width="200" height="200" fill="url(#smallGrid)" />
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="hero-grid-rect" />
          <line x1="0" y1="33.33%" x2="100%" y2="33.33%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" className="hero-line hero-line-1" />
          <line x1="0" y1="66.66%" x2="100%" y2="66.66%" stroke="rgba(255,255,255,0.07)" strokeWidth="1" className="hero-line hero-line-2" />
          <line x1="15%" y1="0" x2="15%" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" className="hero-line hero-line-3" />
          <line x1="85%" y1="0" x2="85%" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" className="hero-line hero-line-4" />
          <polyline points="130,0 130,44 0,44" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="hero-bracket" />
          <g transform="translate(1920,0) scale(-1,1)">
            <polyline points="130,0 130,44 0,44" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="hero-bracket" />
          </g>
        </svg>
      </div>

      {/* Radial vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 20%, #000 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1.5rem",
          gap: "1.5rem",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          AI-Powered Resume Builder
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            color: "#fff",
            margin: 0,
          }}
          className="hero-heading"
        >
          Build Your Professional
          <br />
          <span className="hero-heading-accent">Resume Effortlessly</span>
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontSize: "1.05rem",
            color: "#52525b",
            maxWidth: "520px",
            lineHeight: 1.7,
            margin: 0,
          }}
          className="hero-subheading"
        >
          Create stunning resumes or enhance your existing ones with our
          AI-powered tools. Stand out to employers with ease.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          className="hero-actions"
        >
          <Link
            href="/resume-builder/basic-info"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.65rem 1.4rem",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#000",
              background: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.9)",
              whiteSpace: "nowrap",
            }}
          >
            <FileText style={{ width: 16, height: 16, flexShrink: 0 }} />
            Create Resume
            <ArrowRight style={{ width: 16, height: 16, flexShrink: 0 }} />
          </Link>
          <Link
            href="/resume-enhancer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.65rem 1.4rem",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#e4e4e7",
              background: "transparent",
              borderRadius: "8px",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              whiteSpace: "nowrap",
            }}
          >
            <Upload style={{ width: 16, height: 16, flexShrink: 0 }} />
            Enhance Resume
          </Link>
        </div>

        {/* Terminal hint */}
        <p
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: "0.78rem",
            color: "#3f3f46",
            letterSpacing: "0.02em",
            margin: 0,
          }}
          className="hero-hint"
        >
          <span style={{ color: "#52525b", marginRight: "0.5rem" }}>▲</span>
          {" ~ npx create-resume --ai"}
        </p>
      </div>
    </div>
  )
}
