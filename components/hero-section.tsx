"use client"

import Link from "next/link"
import { ArrowRight, FileText, Upload } from "lucide-react"

export default function HeroSection() {
  return (
    <div
      className="hero-root"
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "var(--background)",
      }}
    >
      {/* Subtle diagonal line pattern */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: `
            repeating-linear-gradient(
              -45deg,
              var(--border) 0px,
              var(--border) 1px,
              transparent 1px,
              transparent 52px
            )
          `,
          opacity: 0.5,
          maskImage: "radial-gradient(ellipse 65% 65% at 50% 50%, black 35%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 65% at 50% 50%, black 35%, transparent 100%)",
        }}
      />

      {/* Thin accent lines — top and bottom edges */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, var(--border) 30%, var(--border) 70%, transparent 100%)",
        }}
      />

      {/* Corner accent — top left */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1, opacity: 0.5 }}
        width="120" height="80"
        viewBox="0 0 120 80"
        fill="none"
      >
        <line x1="0" y1="79" x2="120" y2="79" stroke="var(--border)" strokeWidth="1" />
        <line x1="119" y1="0" x2="119" y2="80" stroke="var(--border)" strokeWidth="1" />
      </svg>

      {/* Corner accent — top right */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", top: 0, right: 0, zIndex: 1, opacity: 0.5 }}
        width="120" height="80"
        viewBox="0 0 120 80"
        fill="none"
      >
        <line x1="0" y1="79" x2="120" y2="79" stroke="var(--border)" strokeWidth="1" />
        <line x1="1" y1="0" x2="1" y2="80" stroke="var(--border)" strokeWidth="1" />
      </svg>

      {/* Horizontal center line — very subtle */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "5%",
          right: "5%",
          top: "50%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent)",
          opacity: 0.5,
          zIndex: 1,
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
          textAlign: "center",
          padding: "0 2rem",
          gap: "1.75rem",
          maxWidth: "720px",
          width: "100%",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            border: "1px solid var(--border)",
            borderRadius: "9999px",
            padding: "0.28rem 0.85rem",
            background: "var(--muted)",
          }}
          className="hero-badge"
        >
          <span
            style={{
              width: 5,
              height: 5,
              background: "#22c55e",
              borderRadius: "9999px",
              boxShadow: "0 0 5px #22c55e",
              flexShrink: 0,
              display: "inline-block",
            }}
            className="hero-badge-dot"
          />
          AI-Powered Resume Builder
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "clamp(2.8rem, 5.5vw, 4.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.045em",
            lineHeight: 1.06,
            color: "var(--foreground)",
            margin: 0,
          }}
          className="hero-heading"
        >
          Build Resumes That
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, var(--foreground) 0%, var(--muted-foreground) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Get You Hired
          </span>
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontSize: "1rem",
            color: "var(--muted-foreground)",
            maxWidth: "480px",
            lineHeight: 1.75,
            margin: 0,
            letterSpacing: "0.005em",
          }}
          className="hero-subheading"
        >
          AI-powered tools to create, enhance, and tailor your resume
          for every job — in minutes.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            justifyContent: "center",
          }}
          className="hero-actions"
        >
          <Link
            href="/resume-builder/basic-info"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.6rem 1.25rem",
              fontSize: "0.85rem",
              fontWeight: 500,
              color: "var(--primary-foreground)",
              background: "var(--primary)",
              borderRadius: "7px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              letterSpacing: "-0.01em",
            }}
          >
            <FileText style={{ width: 14, height: 14, flexShrink: 0 }} />
            Get Started
            <ArrowRight style={{ width: 14, height: 14, flexShrink: 0 }} />
          </Link>
          <Link
            href="/resume-enhancer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.6rem 1.25rem",
              fontSize: "0.85rem",
              fontWeight: 500,
              color: "var(--foreground)",
              background: "transparent",
              borderRadius: "7px",
              textDecoration: "none",
              border: "1px solid var(--border)",
              whiteSpace: "nowrap",
              letterSpacing: "-0.01em",
            }}
          >
            <Upload style={{ width: 14, height: 14, flexShrink: 0 }} />
            Enhance Resume
          </Link>
        </div>

        {/* Terminal hint */}
        <p
          style={{
            fontFamily: "var(--font-mono), ui-monospace, 'Cascadia Code', monospace",
            fontSize: "0.72rem",
            color: "var(--foreground)",
            letterSpacing: "0.02em",
            margin: 0,
          }}
          className="hero-hint"
        >
          <span style={{ color: "var(--muted-foreground)", marginRight: "0.4rem" }}>▲</span>
          npx resumeai create
        </p>
      </div>
    </div>
  )
}
