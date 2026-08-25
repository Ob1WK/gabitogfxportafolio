import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import LoginForm from "@/components/admin/login-form"

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/admin/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0F1E] to-[#1A2332]">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400">Inicia sesión para gestionar proyectos</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
