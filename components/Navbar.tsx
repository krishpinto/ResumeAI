"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ModeToggle"
import { FileText, Home, Upload, User, LogOut, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Navbar() {
  const { user } = useAuth()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  // Get initials for avatar fallback
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
      router.push("/") // Redirect to the landing page after logout
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const NavItems = () => (
    <>
      <Link href="/" onClick={() => setIsOpen(false)}>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
      </Link>
      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </Link>
      <Link href="/resume-builder/basic-info" onClick={() => setIsOpen(false)}>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <FileText className="mr-2 h-4 w-4" />
          Create Resume
        </Button>
      </Link>
      <Link href="/resume-enhancer" onClick={() => setIsOpen(false)}>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Upload className="mr-2 h-4 w-4" />
          Enhance Resume
        </Button>
      </Link>
    </>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>ResumeAI</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-4">
                  <NavItems />
                </div>
              </SheetContent>
            </Sheet>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <FileText className="h-5 w-5" />
            <span>ResumeAI</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <Link href="/resume-builder/basic-info">
            <Button variant="ghost" size="sm">
              Create Resume
            </Button>
          </Link>
          <Link href="/resume-enhancer">
            <Button variant="ghost" size="sm">
              Enhance Resume
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
            <ModeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "Profile"} />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user.displayName && <p className="font-medium">{user.displayName}</p>}
                    {user.email && <p className="text-xs text-muted-foreground">{user.email}</p>}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer w-full">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
