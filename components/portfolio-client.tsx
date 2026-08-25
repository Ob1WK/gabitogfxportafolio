"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Mail, Send } from "lucide-react"

interface Proyecto {
  id: string
  titulo: string
  descripcion: string
  categoria: string[] | string
  medios: { tipo: string; url: string }[]
  duracion: string
  anho: number
}

interface PortfolioClientProps {
  projects: Proyecto[]
}

const servicios = [
  "Diseño Gráfico",
  "Branding", 
  "Identidad Visual",
  "Edición de Video"
]

const logros = [
  "Club Argentino",
  "Gaming-City",
  "Barbatero"
]

const testimonios = [
  {
    texto: "Gabriel transformó completamente nuestra imagen de marca. Su trabajo es excepcional y muy profesional.",
    autor: "Gian Ezequiel",
    cargo: "Barbatero Barberstudio"
  },
  {
    texto: "El trabajo de Gabriel es realmente espectacular. Se nota su talento y su gran futuro en el diseño gráfico.",
    autor: "Adrian Varela", 
    cargo: "Presidente Club Argentino"
  },
  {
    texto: "Gaby fue una parte fundamental del equipo de marketing. Siempre cumplió con todo, con mucha calidad y rapidez.",
    autor: "Pablo Leis",
    cargo: "Gaming-City"
  },
  {
    texto: "Gabriel supo plasmar las ideas que tenía para Almendro y convertirlas en una identidad completa y coherente. Yo no sabía exactamente qué necesitaba pedir, pero su propuesta integral me ayudó a descubrir todo lo que la marca necesitaba y hoy veo el valor de cada elemento.",
    autor: "Carolina",
    cargo: "Almendro"
  }
]

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const [filtroActivo, setFiltroActivo] = useState("Todo")
  const [formData, setFormData] = useState({ nombre: "", email: "", mensaje: "" })
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const categorias = ["Todo", "Diseño Gráfico", "Branding", "Motion Graphics", "Identidad Visual"]

  const proyectosFiltrados = filtroActivo === "Todo" 
    ? projects 
    : projects.filter(p => {
        const cats = Array.isArray(p.categoria) ? p.categoria : [p.categoria]
        return cats.some(c => c.toLowerCase().includes(filtroActivo.toLowerCase()))
      })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("loading")
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setFormStatus("success")
        setFormData({ nombre: "", email: "", mensaje: "" })
        setTimeout(() => setFormStatus("idle"), 5000)
      } else {
        setFormStatus("error")
        setTimeout(() => setFormStatus("idle"), 5000)
      }
    } catch {
      setFormStatus("error")
      setTimeout(() => setFormStatus("idle"), 5000)
    }
  }

  return (
    <div className="min-h-screen bg-[#FF5C00]">
      {/* NAV */}
      <nav className="flex flex-wrap gap-2 p-5 md:p-7 md:px-10">
        <a href="#inicio" className="text-[13px] font-medium px-4 py-2 rounded-full bg-[#1a1a2e] text-white transition-colors">Inicio</a>
        <a href="#proyectos" className="text-[13px] font-medium px-4 py-2 rounded-full bg-[#F5F2ED] text-[#1a1a2e] hover:bg-[#e8e4dd] transition-colors">Proyectos</a>
        <a href="#contacto" className="text-[13px] font-medium px-4 py-2 rounded-full bg-[#F5F2ED] text-[#1a1a2e] hover:bg-[#e8e4dd] transition-colors">Contacto</a>
        <a href="#sobre-mi" className="text-[13px] font-medium px-4 py-2 rounded-full bg-[#F5F2ED] text-[#1a1a2e] hover:bg-[#e8e4dd] transition-colors">Archivo</a>
      </nav>

      {/* HERO CARD */}
      <section id="inicio" className="mx-4 md:mx-10 animate-fade-up">
        <div className="bg-[#F5F2ED] rounded-[20px] p-6 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left: Text */}
            <div className="pt-4 md:pt-10">
              <p className="text-lg md:text-[18px] font-normal text-[#1a1a2e] leading-[1.5] max-w-[380px]">
                Soy Gabriel Anibaldi, diseñador gráfico freelance. Creo identidades y piezas visuales que se ven bien y conectan de verdad.
              </p>
            </div>
            
            {/* Right: Services Pill Card */}
            <div className="bg-[#FF5C00] rounded-2xl p-8 md:p-10 relative min-h-[260px] overflow-hidden">
              <div className="relative h-[200px]">
                {servicios.map((servicio, i) => (
                  <span 
                    key={servicio}
                    className="absolute bg-[#F5F2ED] text-[#1a1a2e] text-[13px] font-medium px-5 py-2.5 rounded-full whitespace-nowrap shadow-lg"
                    style={{
                      bottom: `${10 + i * 40}px`,
                      left: `${i * 65}px`,
                      transform: "rotate(-8deg)",
                      transformOrigin: "left center"
                    }}
                  >
                    {servicio}
                  </span>
                ))}
              </div>
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-serif text-[28px] text-white whitespace-nowrap">
                Servicios
              </span>
            </div>
          </div>
          
          {/* Big Name */}
          <h1 className="font-serif font-bold text-[#FF5C00] leading-[0.9] tracking-[-2px] pt-6 text-[clamp(80px,12vw,160px)]">
            GabitoGFX
          </h1>
        </div>
      </section>

      <div className="h-5" />

      {/* ABOUT SECTION */}
      <section id="sobre-mi" className="mx-4 md:mx-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <div className="bg-[#f0ece5] rounded-[20px] p-6 md:p-14">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Left: Mobile Mockup */}
            <div className="bg-[#F5F2ED] rounded-2xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.08)] max-w-[340px] hidden md:block">
              <div className="flex flex-wrap gap-1.5 pb-4">
                <span className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#1a1a2e] text-white">Inicio</span>
                <span className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#F5F2ED] text-[#1a1a2e] border border-[#e5e1da]">Proyectos</span>
                <span className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#F5F2ED] text-[#1a1a2e] border border-[#e5e1da]">Contacto</span>
              </div>
              <p className="text-sm text-[#1a1a2e] mb-4 leading-[1.5]">
                Soy Gabriel Anibaldi, diseñador gráfico freelance...
              </p>
              <div className="bg-[#FF5C00] rounded-xl p-5 pb-6 relative h-[200px] overflow-hidden mb-0">
                <div className="relative h-[155px]">
                  {["Diseño Gráfico", "Branding", "Identidad", "Video"].map((s, i) => (
                    <span 
                      key={s}
                      className="absolute bg-[#F5F2ED] text-[#1a1a2e] text-[11px] font-medium px-3.5 py-[7px] rounded-full whitespace-nowrap"
                      style={{
                        bottom: `${8 + i * 32}px`,
                        left: `${i * 45}px`,
                        transform: "rotate(-8deg)"
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-serif text-xl text-white whitespace-nowrap">
                  Servicios
                </span>
              </div>
              <div className="font-serif font-bold text-[#FF5C00] text-[42px] leading-none mt-3">
                GabitoGFX
              </div>
            </div>

            {/* Right: About Me */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-medium text-[#1a1a2e]">Sobre mí</h2>
                <span className="text-[#FF5C00] text-xl">◆</span>
                <div className="flex-1 h-px bg-[#FF5C00]" />
              </div>
              
              <p className="text-base leading-[1.7] text-[#1a1a2e] mb-8">
                Desde 2019 trabajo de manera freelance en diseño gráfico. Me enfoco en desarrollar identidades y piezas visuales cuidadas, convirtiendo cada idea en una propuesta clara, atractiva y coherente. En esta web presento una selección de los proyectos que mejor representan mi trabajo.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="font-serif font-bold text-5xl text-[#1a1a2e] leading-none">2019</div>
                  <div className="text-[13px] text-[#4a4a6a] mt-1">Trabajando en diseño</div>
                </div>
                <div>
                  <div className="font-serif font-bold text-4xl text-[#1a1a2e] leading-none">Freelance</div>
                  <div className="text-[13px] text-[#4a4a6a] mt-1">Modalidad de trabajo</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-medium px-4 py-2 rounded-full bg-[#FF5C00] text-white">Adobe Photoshop</span>
                <span className="text-xs font-medium px-4 py-2 rounded-full bg-[#FF5C00] text-white">Illustrator</span>
                <span className="text-xs font-medium px-4 py-2 rounded-full bg-[#FF5C00] text-white">After Effects</span>
                <span className="text-xs font-medium px-4 py-2 rounded-full bg-[#FF5C00] text-white">Premiere</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-5" />

      {/* PROJECTS SECTION */}
      <section id="proyectos" className="mx-4 md:mx-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <div className="bg-[#F5F2ED] rounded-[20px] p-6 md:p-12">
          {/* Header with achievements */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center mb-12">
            <h2 className="font-serif font-bold text-[#1a1a2e] text-[clamp(48px,7vw,80px)] leading-none">
              Trabajos<br />Recientes
            </h2>
            
            <div className="bg-[#FF5C00] rounded-2xl p-8 relative min-h-[220px] overflow-hidden">
              <div className="relative h-[170px]">
                {logros.map((logro, i) => (
                  <span 
                    key={logro}
                    className="absolute bg-[#F5F2ED] text-[#1a1a2e] text-[13px] font-medium px-5 py-2.5 rounded-full whitespace-nowrap shadow-lg"
                    style={{
                      bottom: `${10 + i * 35}px`,
                      left: `${i * 60}px`,
                      transform: "rotate(-8deg)"
                    }}
                  >
                    {logro}
                  </span>
                ))}
              </div>
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-serif text-[28px] text-white whitespace-nowrap">
                Logros
              </span>
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categorias.map(cat => (
              <button 
                key={cat}
                onClick={() => setFiltroActivo(cat)}
                className={`text-[13px] font-medium px-[18px] py-2 rounded-full border-[1.5px] cursor-pointer transition-all ${
                  filtroActivo === cat 
                    ? "bg-[#1a1a2e] text-white border-[#1a1a2e]" 
                    : "bg-transparent text-[#1a1a2e] border-[#ddd] hover:border-[#FF5C00] hover:text-[#FF5C00]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {proyectosFiltrados.map(proyecto => {
              const primeraImagen = proyecto.medios?.[0]?.url || "/placeholder.jpg"
              const categorias = Array.isArray(proyecto.categoria) ? proyecto.categoria : [proyecto.categoria]
              
              return (
                <Link 
                  key={proyecto.id}
                  href={`/proyecto/${proyecto.id}`}
                  className="project-card rounded-2xl overflow-hidden relative bg-[#ddd] aspect-[4/3] cursor-pointer group"
                >
                  <Image
                    src={primeraImagen}
                    alt={proyecto.titulo}
                    fill
                    className="object-cover transition-transform duration-400 group-hover:scale-[1.04]"
                  />
                  <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-serif text-lg text-white mb-1">{proyecto.titulo}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {categorias.slice(0, 3).map(cat => (
                        <span key={cat} className="text-[11px] px-2.5 py-[3px] bg-[#FF5C00] text-white rounded-full">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <div className="h-5" />

      {/* TESTIMONIALS SECTION */}
      <section className="mx-4 md:mx-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <div className="bg-[#FF5C00] rounded-[20px] p-6 md:p-14">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-xl font-medium text-white">Testimonios</h2>
            <span className="text-[#F5F2ED] text-xl">◆</span>
            <div className="flex-1 h-px bg-white/40" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-5">
            {testimonios.map((t, i) => (
              <div 
                key={i}
                className="bg-white/[0.12] border border-white/20 rounded-2xl p-7 backdrop-blur-[10px]"
              >
                <p className="text-sm leading-[1.7] text-white mb-5 italic">
                  &ldquo;{t.texto}&rdquo;
                </p>
                <div>
                  <strong className="text-sm font-semibold text-white block">{t.autor}</strong>
                  <span className="text-xs text-white/70">{t.cargo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-5" />

      {/* CONTACT SECTION */}
      <section id="contacto" className="mx-4 md:mx-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
        <div className="bg-[#F5F2ED] rounded-[20px] p-6 md:p-14">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Left: Title */}
            <div>
              <h2 className="font-serif font-bold text-[#1a1a2e] text-[clamp(40px,5vw,56px)] leading-[1.1] mb-4">
                Trabajemos<br />juntos
              </h2>
              <p className="text-base text-[#4a4a6a] leading-[1.6]">
                Si tenés un proyecto en mente o querés llevar tu marca al siguiente nivel, escribime y charlamos.
              </p>
            </div>
            
            {/* Right: Contact Links */}
            <div className="flex flex-col gap-3">
              <a 
                href="mailto:gabrielanibaldi@gmail.com"
                className="flex items-center gap-3 p-3.5 px-5 bg-white border-[1.5px] border-[#e5e1da] rounded-xl hover:border-[#FF5C00] hover:translate-x-1 transition-all"
              >
                <div className="w-8 h-8 bg-[#FF5C00] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Mail className="w-[14px] h-[14px]" />
                </div>
                <span className="text-[15px] text-[#1a1a2e]">gabrielanibaldi@gmail.com</span>
              </a>
              
              <a 
                href="https://instagram.com/gabitogfx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 px-5 bg-white border-[1.5px] border-[#e5e1da] rounded-xl hover:border-[#FF5C00] hover:translate-x-1 transition-all"
              >
                <div className="w-8 h-8 bg-[#FF5C00] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Instagram className="w-[14px] h-[14px]" />
                </div>
                <span className="text-[15px] text-[#1a1a2e]">@gabitogfx</span>
              </a>
              
              <a 
                href="https://twitter.com/gabito_gfx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 px-5 bg-white border-[1.5px] border-[#e5e1da] rounded-xl hover:border-[#FF5C00] hover:translate-x-1 transition-all"
              >
                <div className="w-8 h-8 bg-[#FF5C00] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <span className="text-[15px] text-[#1a1a2e]">@gabito_gfx</span>
              </a>
              
              <a 
                href="https://www.behance.net/gaby1020"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 px-5 bg-white border-[1.5px] border-[#e5e1da] rounded-xl hover:border-[#FF5C00] hover:translate-x-1 transition-all"
              >
                <div className="w-8 h-8 bg-[#FF5C00] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.211.994 1.948 2.527 1.948.902 0 1.494-.285 1.812-.821h2.417zm-3.09-4.018c-.11-.89-.76-1.569-1.918-1.569-1.153 0-1.853.67-2.017 1.569h3.935zM9 5v14H3V5h6zm-3.5 9.5c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z"/>
                  </svg>
                </div>
                <span className="text-[15px] text-[#1a1a2e]">Behance Portfolio</span>
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="mt-10 pt-10 border-t border-[#e5e1da]">
            <h3 className="text-lg font-medium text-[#1a1a2e] mb-6">O enviame un mensaje directo</h3>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                required
                className="p-4 rounded-xl bg-white border-[1.5px] border-[#e5e1da] text-[#1a1a2e] placeholder:text-[#4a4a6a] focus:border-[#FF5C00] focus:outline-none"
              />
              <input
                type="email"
                placeholder="Tu email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="p-4 rounded-xl bg-white border-[1.5px] border-[#e5e1da] text-[#1a1a2e] placeholder:text-[#4a4a6a] focus:border-[#FF5C00] focus:outline-none"
              />
              <textarea
                placeholder="Tu mensaje"
                value={formData.mensaje}
                onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                required
                rows={4}
                className="p-4 rounded-xl bg-white border-[1.5px] border-[#e5e1da] text-[#1a1a2e] placeholder:text-[#4a4a6a] focus:border-[#FF5C00] focus:outline-none md:col-span-2 resize-none"
              />
              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="md:col-span-2 bg-[#FF5C00] text-white py-4 px-8 rounded-full font-medium hover:bg-[#CC4A00] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {formStatus === "loading" ? "Enviando..." : "Enviar mensaje"}
                <Send className="w-4 h-4" />
              </button>
              {formStatus === "success" && (
                <p className="md:col-span-2 text-green-600 text-center text-sm">Mensaje enviado correctamente</p>
              )}
              {formStatus === "error" && (
                <p className="md:col-span-2 text-red-600 text-center text-sm">Error al enviar el mensaje</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 md:py-10 px-10 text-[13px] text-white/60">
        © {new Date().getFullYear()} GabitoGFX. Todos los derechos reservados.
      </footer>
    </div>
  )
}
