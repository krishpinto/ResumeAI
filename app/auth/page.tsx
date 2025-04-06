import AuthForm from "@/components/AuthForm"

export default function AuthPage({ isLogin = false }: { isLogin?: boolean }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <AuthForm isLogin={isLogin} />
    </main>
  )
}

