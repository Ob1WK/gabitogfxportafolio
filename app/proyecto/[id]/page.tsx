import { createServerSupabaseClient } from "@/lib/supabase-server"
import { createClient } from "@supabase/supabase-js"
import { notFound } from "next/navigation"
import ProjectDetailClient from "@/components/project-detail-client"

// Allow dynamic params for projects not in generateStaticParams
export const dynamicParams = true

// Generate static params for known projects - uses a simple client without cookies
export async function generateStaticParams() {
  // Use a simple Supabase client for build time (no cookies needed)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data: projects } = await supabase.from("projects").select("id")
  
  return projects?.map((project) => ({
    id: project.id,
  })) || []
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()

  const { data: project } = await supabase
    .from("projects")
    .select(
      `
      *,
      project_media (*)
    `,
    )
    .eq("id", id)
    .single()

  if (!project) {
    notFound()
  }

  // Fetch other projects for related section
  const { data: otherProjects } = await supabase
    .from("projects")
    .select(
      `
      *,
      project_media (*)
    `,
    )
    .neq("id", id)
    .limit(2)

  // Transform data
  const transformedProject = {
    id: project.id,
    titulo: project.titulo,
    categoria: project.categoria,
    descripcion: {
      es: project.descripcion,
      en: project.descripcion,
    },
    descripcionDetallada: {
      es: project.descripcion,
      en: project.descripcion,
    },
    duracion: project.duracion,
    anho: project.anho,
    medios: project.project_media
      .sort((a: { orden: number }, b: { orden: number }) => a.orden - b.orden)
      .map((media: { tipo: string; url: string }) => ({
        tipo: media.tipo,
        url: media.url,
      })),
  }

  const transformedOtherProjects =
    otherProjects?.map((p) => ({
      id: p.id,
      titulo: p.titulo,
      categoria: p.categoria,
      descripcion: {
        es: p.descripcion,
        en: p.descripcion,
      },
      medios: p.project_media
        .sort((a: { orden: number }, b: { orden: number }) => a.orden - b.orden)
        .map((media: { tipo: string; url: string }) => ({
          tipo: media.tipo,
          url: media.url,
        })),
    })) || []

  return <ProjectDetailClient project={transformedProject} otherProjects={transformedOtherProjects} />
}
