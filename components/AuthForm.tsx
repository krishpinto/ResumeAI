"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "./login-form"
import SignupForm from "./signup-form"

export default function AuthForm({ isLogin = false }: { isLogin?: boolean }) {
  const [activeTab, setActiveTab] = useState(isLogin ? "login" : "signup")

  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="mt-6">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup" className="mt-6">
          <SignupForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

