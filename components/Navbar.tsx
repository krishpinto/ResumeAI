"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { logout } from "@/lib/auth"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { FileText, User, LogOut, Github } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, usePathname } from "next/navigation"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/resume-builder/basic-info", label: "Create Resume" },
  { href: "/resume-enhancer", label: "Enhance Resume" },
]

export default function Navbar() {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
    }
    return user?.email?.substring(0, 2).toUpperCase() || "U"
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="navbar-root sticky top-0 z-50 w-full">
      <div className="navbar-inner">

        {/* Left — Logo */}
        <div className="navbar-left">
          <Link href="/" className="navbar-logo">
            <FileText className="h-4 w-4 navbar-logo-icon" />
            <span>ResumeAI</span>
          </Link>
        </div>

        {/* Center — Nav links */}
        <nav className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar-link ${isActive(link.href) ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right — Actions */}
        <div className="navbar-right">
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="navbar-social-link" aria-label="X (Twitter)">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.849L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="navbar-social-link" aria-label="GitHub">
            <Github className="h-3.5 w-3.5" />
          </a>
          <div className="dark">
            <ThemeSwitcher />
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="navbar-avatar-btn" aria-label="User menu">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "Profile"} />
                    <AvatarFallback className="navbar-avatar-fallback">{getInitials()}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="navbar-dropdown w-52">
                <div className="px-3 py-2">
                  {user.displayName && <p className="text-sm font-medium text-white">{user.displayName}</p>}
                  {user.email && <p className="text-xs text-zinc-500">{user.email}</p>}
                </div>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem asChild className="navbar-dropdown-item">
                  <Link href="/profile" className="cursor-pointer w-full">
                    <User className="mr-2 h-3.5 w-3.5" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="navbar-dropdown-item text-red-400 focus:text-red-400 cursor-pointer"
                >
                  <LogOut className="mr-2 h-3.5 w-3.5" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth" className="navbar-signin">
              Sign In
            </Link>
          )}
        </div>

      </div>
    </header>
  )
}
