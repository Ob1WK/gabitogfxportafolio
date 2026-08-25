"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Project {
  id: string
  titulo: string
  categoria: string[]
  descripcion: {
    es: string
    en: string
  }
  descripcionDetallada: {
    es: string
    en: string
  }
  duracion: string
  anho: number
  medios: Array<{
    tipo: string
    url: string
  }>
}

interface RelatedProject {
  id: string
  titulo: string
  categoria: string[]
  descripcion: {
    es: string
    en: string
  }
  medios: Array<{
    tipo: string
    url: string
  }>
}

export default function ProjectDetailClient({
  project,
  otherProjects,
}: {
  project: Project
  otherProjects: RelatedProject[]
}) {
  const router = useRouter()
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % project.medios.length)
  }

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + project.medios.length) % project.medios.length)
  }

  const currentMedia = project.medios[currentMediaIndex]

  return (
    <div className="min-h-screen bg-[#171719]">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#171719]/90 text-white backdrop-blur-xl">
        <nav className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 md:px-10">
          <button
            onClick={() => router.push("/")}
            className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
          <a href="/" className="font-serif text-xl font-bold tracking-[-0.04em]">
            Gabito<span className="text-[#ff5c00]">GFX</span>
          </a>
          <a href="/#contacto" className="rounded-full bg-[#ff5c00] px-4 py-2.5 text-sm font-semibold hover:bg-[#ff7426]">
            Hablemos
          </a>
        </nav>
      </header>

      {/* PROJECT DETAIL CARD */}
      <section className="bg-[#f4f0e8] px-5 py-10 md:px-10 md:py-16 animate-fade-up">
        <div className="mx-auto max-w-[1600px]">
          {/* Title */}
          <span className="section-kicker mb-6">Proyecto seleccionado</span>
          <h1 className="font-serif font-bold text-[#171719] text-[clamp(3.4rem,8vw,8rem)] tracking-[-0.06em] leading-[0.9] mb-10">
            {project.titulo}
          </h1>

          {/* Meta info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 pb-8 border-b border-[#ddd]">
            <div>
              <label className="text-[13px] text-[#FF5C00] font-medium block mb-2">Descripción</label>
              <p className="text-[15px] text-[#1a1a2e] leading-[1.5]">{project.descripcion.es}</p>
            </div>
            <div>
              <label className="text-[13px] text-[#FF5C00] font-medium block mb-2">Categoría</label>
              <div className="flex flex-wrap gap-1.5">
                {project.categoria.map((cat) => (
                  <span key={cat} className="text-[11px] px-2.5 py-1 bg-[#FF5C00] text-white rounded-full">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[13px] text-[#FF5C00] font-medium block mb-2">Año</label>
              <p className="text-[15px] text-[#1a1a2e] flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {project.anho}
              </p>
            </div>
            <div>
              <label className="text-[13px] text-[#FF5C00] font-medium block mb-2">Duración</label>
              <p className="text-[15px] text-[#1a1a2e] flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {project.duracion}
              </p>
            </div>
          </div>

          {/* Main Media */}
          <div className="mb-8 relative rounded-2xl overflow-hidden">
            {currentMedia.tipo === "video" ? (
              <div className="aspect-video bg-black">
                <iframe
                  src={currentMedia.url}
                  title={project.titulo}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="w-full bg-[#e8e4dd]">
                <Image
                  src={currentMedia.url || "/placeholder.svg"}
                  alt={`${project.titulo} - ${currentMediaIndex + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain max-h-[80vh]"
                  priority
                />
              </div>
            )}

            {project.medios.length > 1 && (
              <>
                <button
                  onClick={prevMedia}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-[#FF5C00] text-white hover:bg-[#CC4A00] transition-colors shadow-lg cursor-pointer"
                  aria-label="Previous media"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextMedia}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-[#FF5C00] text-white hover:bg-[#CC4A00] transition-colors shadow-lg cursor-pointer"
                  aria-label="Next media"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#1a1a2e]/80 text-white px-4 py-2 rounded-full text-sm">
                  {currentMediaIndex + 1} / {project.medios.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {project.medios.length > 1 && (
            <div className="mb-10 flex gap-3 overflow-x-auto pb-4">
              {project.medios.map((medio, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMediaIndex(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    currentMediaIndex === index ? "border-[#FF5C00] scale-105" : "border-[#e5e1da] hover:border-[#FF5C00]/50"
                  }`}
                >
                  {medio.tipo === "imagen" ? (
                    <Image
                      src={medio.url || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#e8e4dd] flex items-center justify-center">
                      <span className="text-2xl">▶</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Detailed Description */}
          <div className="max-w-3xl">
            <h2 className="font-serif font-bold text-2xl text-[#1a1a2e] mb-4">
              Descripción del Proyecto
            </h2>
            <p className="text-base text-[#4a4a6a] leading-[1.7] mb-8">{project.descripcion.es}</p>

            <h3 className="text-xl font-semibold text-[#1a1a2e] mb-4">Detalles</h3>
            <p className="text-base text-[#4a4a6a] leading-[1.7]">{project.descripcionDetallada.es}</p>
          </div>
        </div>
      </section>

      {/* OTHER PROJECTS */}
      <section className="bg-[#ff5c00] px-5 py-16 md:px-10 md:py-24 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="font-serif text-4xl font-bold text-[#171719] md:text-6xl">Seguí explorando</h2>
            <div className="flex-1 h-px bg-black/20" />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {otherProjects.map((relatedProject) => (
              <Link
                key={relatedProject.id}
                href={`/proyecto/${relatedProject.id}`}
                className="group rounded-2xl overflow-hidden bg-[#ddd] aspect-[4/3] relative cursor-pointer"
              >
                <Image
                  src={relatedProject.medios[0]?.url || "/placeholder.svg"}
                  alt={relatedProject.titulo}
                  fill
                  className="object-cover transition-transform duration-400 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 opacity-100 transition-opacity duration-300">
                  <h3 className="font-serif text-lg text-white mb-1">{relatedProject.titulo}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {relatedProject.categoria.slice(0, 2).map((cat) => (
                      <span key={cat} className="text-[11px] px-2.5 py-1 bg-[#FF5C00] text-white rounded-full">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#171719] px-5 py-20 md:px-10 md:py-28 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <div className="mx-auto max-w-[1200px] text-center">
          <h3 className="font-serif font-bold text-[clamp(3rem,7vw,7rem)] leading-[0.9] tracking-[-0.05em] text-white mb-6">
            ¿Hacemos el próximo juntos?
          </h3>
          <p className="text-base text-white/55 mb-8 max-w-md mx-auto">
            Contame tu idea y vemos qué necesita para convertirse en una identidad clara y propia.
          </p>
          <button 
            onClick={() => router.push("/#contacto")} 
            className="group inline-flex items-center gap-3 bg-[#FF5C00] text-white py-4 px-8 rounded-full font-semibold hover:bg-[#ff7426] transition-colors cursor-pointer"
          >
            Hablemos <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#171719] text-center py-8 md:py-10 px-10 text-[13px] text-white/40">
        © {new Date().getFullYear()} GabitoGFX · Gabriel Anibaldi
      </footer>
    </div>
  )
}
