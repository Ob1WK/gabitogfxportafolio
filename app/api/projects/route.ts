import { createClient } from "@supabase/supabase-js"

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*, project_media (*)")
    .order("created_at", { ascending: false })

  if (error) {
    return Response.json({ error: "No se pudieron cargar los proyectos" }, { status: 500 })
  }

  return Response.json(
    projects.map((project) => ({
      id: project.id,
      titulo: project.titulo,
      categoria: project.categoria,
      descripcion: {
        es: project.descripcion,
        en: project.descripcion,
      },
      duracion: project.duracion,
      anho: project.anho,
      medios: (project.project_media ?? [])
        .sort((a: { orden: number }, b: { orden: number }) => a.orden - b.orden)
        .map((media: { tipo: string; url: string }) => ({
          tipo: media.tipo,
          url: media.url,
        })),
    })),
  )
}
