import { createServerSupabaseClient } from "@/lib/supabase-server"
import PortfolioClient from "@/components/portfolio-client"

export default async function Portfolio() {
  const supabase = await createServerSupabaseClient()

  const { data: projects } = await supabase
    .from("projects")
    .select(
      `
      *,
      project_media (*)
    `,
    )
    .order("created_at", { ascending: false })

  // Transform database data to match expected format
  const transformedProjects =
    projects?.map((project) => ({
      id: project.id,
      titulo: project.titulo,
      categoria: project.categoria,
      descripcion: {
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
    })) || []

  return <PortfolioClient projects={transformedProjects} />
}
