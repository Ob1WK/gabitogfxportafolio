import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import AdminDashboard from "@/components/admin/admin-dashboard"

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin")
  }

  // Fetch projects with their media
  const { data: projects } = await supabase
    .from("projects")
    .select(`
      *,
      project_media (*)
    `)
    .order("created_at", { ascending: false })

  return <AdminDashboard initialProjects={projects || []} userEmail={user.email || ""} />
}
