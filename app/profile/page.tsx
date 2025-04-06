"use client"

import { useAuth } from "@/context/AuthContext"
import { logout } from "@/lib/auth"
import AuthGuard from "@/components/AuthGuard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Mail, LogOut } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()

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

  return (
    <AuthGuard>
      <div className="container flex justify-center items-center min-h-[calc(100vh-4rem)] py-10 px-4">
        <Card className="w-full max-w-md shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-col items-center pt-8 pb-6">
            <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary/10">
              <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "Profile"} />
              <AvatarFallback className="text-xl bg-primary/10">{getInitials()}</AvatarFallback>
            </Avatar>

            <h2 className="text-2xl font-semibold tracking-tight">{user?.displayName || "No name provided"}</h2>

            <div className="flex items-center mt-1 text-muted-foreground">
              <Mail className="h-4 w-4 mr-2" />
              <span>{user?.email}</span>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-6 pt-6 pb-8">
            <div className="grid gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="text-sm font-medium mb-2 uppercase tracking-wide">Account Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Display Name</p>
                    <p className="font-medium">{user?.displayName || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account Created</p>
                    <p className="font-medium">
                      {user?.metadata?.creationTime
                        ? new Date(user.metadata.creationTime).toLocaleDateString()
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <Button variant="destructive" onClick={logout} className="w-full max-w-xs">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  )
}

