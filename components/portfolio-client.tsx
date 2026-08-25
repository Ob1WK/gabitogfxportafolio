"use client"

import type React from "react"
import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Instagram,
  Mail,
  Send,
  Sparkles,
} from "lucide-react"

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
  {
    numero: "01",
    titulo: "Identidad visual",
    descripcion: "Una estética propia y coherente para que tu marca sea fácil de reconocer.",
  },
  {
    numero: "02",
    titulo: "Branding",
    descripcion: "Concepto, dirección visual y sistema gráfico pensados como un conjunto.",
  },
  {
    numero: "03",
    titulo: "Diseño gráfico",
    descripcion: "Piezas digitales e impresas que comunican con claridad y personalidad.",
  },
  {
    numero: "04",
    titulo: "Edición de video",
    descripcion: "Contenido dinámico, cuidado y adaptado a cada canal de comunicación.",
  },
]

const clientes = ["Club Argentino", "Gaming-City", "Barbatero"]

const testimonios = [
  {
    texto: "Gabriel supo plasmar las ideas que tenía para Almendro y convertirlas en una identidad completa y coherente. Yo no sabía exactamente qué necesitaba pedir, pero su propuesta integral me ayudó a descubrir todo lo que la marca necesitaba y hoy veo el valor de cada elemento.",
    autor: "Carolina",
    cargo: "Almendro",
  },
  {
    texto: "Gabriel transformó completamente nuestra imagen de marca. Su trabajo es excepcional y muy profesional.",
    autor: "Gian Ezequiel",
    cargo: "Barbatero Barberstudio",
  },
  {
    texto: "El trabajo de Gabriel es realmente espectacular. Se nota su talento y su gran futuro en el diseño gráfico.",
    autor: "Adrian Varela",
    cargo: "Presidente Club Argentino",
  },
  {
    texto: "Gaby fue una parte fundamental del equipo de marketing. Siempre cumplió con todo, con mucha calidad y rapidez.",
    autor: "Pablo Leis",
    cargo: "Gaming-City",
  },
]

const pasos = [
  ["01", "Entender", "Conversamos sobre la marca, el problema y lo que necesitás lograr."],
  ["02", "Crear", "Desarrollo una dirección visual con intención, criterio y personalidad."],
  ["03", "Entregar", "Recibís un sistema claro y piezas listas para usar en tu negocio."],
]

function projectCategories(project: Proyecto) {
  return (Array.isArray(project.categoria) ? project.categoria : [project.categoria]).filter(Boolean)
}

function projectImage(project?: Proyecto) {
  if (!project) return "/placeholder.svg"
  return project.medios?.find((medio) => medio.tipo === "imagen")?.url || "/placeholder.svg"
}

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const [filtroActivo, setFiltroActivo] = useState("Todo")
  const [formData, setFormData] = useState({ nombre: "", email: "", mensaje: "" })
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const categorias = useMemo(
    () => ["Todo", ...Array.from(new Set(projects.flatMap(projectCategories)))],
    [projects],
  )

  const proyectosFiltrados = filtroActivo === "Todo"
    ? projects
    : projects.filter((project) => projectCategories(project).includes(filtroActivo))

  const proyectoDestacado = projects[0]

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("No se pudo enviar el mensaje")

      setFormStatus("success")
      setFormData({ nombre: "", email: "", mensaje: "" })
    } catch {
      setFormStatus("error")
    } finally {
      setTimeout(() => setFormStatus("idle"), 5000)
    }
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#171719] text-[#171719]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#171719]/90 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 md:px-10">
          <a href="#inicio" className="font-serif text-xl font-bold tracking-[-0.04em]">
            Gabito<span className="text-[#ff5c00]">GFX</span>
          </a>

          <nav aria-label="Navegación principal" className="hidden items-center gap-8 text-sm md:flex">
            <a href="#proyectos" className="text-white/70 hover:text-white">Proyectos</a>
            <a href="#servicios" className="text-white/70 hover:text-white">Servicios</a>
            <a href="#sobre-mi" className="text-white/70 hover:text-white">Sobre mí</a>
          </nav>

          <a
            href="#contacto"
            className="group flex items-center gap-2 rounded-full bg-[#ff5c00] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#ff7426]"
          >
            Hablemos
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </header>

      <main>
        <section id="inicio" className="bg-[#f4f0e8]">
          <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-[1600px] lg:grid-cols-[1.08fr_0.92fr]">
            <div className="flex flex-col justify-between px-5 py-10 md:px-10 md:py-14 lg:py-16">
              <div className="reveal flex w-fit items-center gap-2 rounded-full border border-[#171719]/15 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff5c00]" />
                Disponible para proyectos freelance
              </div>

              <div className="my-16 lg:my-10">
                <p className="reveal reveal-delay-1 mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff5c00]">
                  Diseñador gráfico · Desde 2019
                </p>
                <h1 className="reveal reveal-delay-2 max-w-[900px] font-serif text-[clamp(3.65rem,7.4vw,8.2rem)] font-bold leading-[0.86] tracking-[-0.065em]">
                  Diseño marcas que se sienten <em className="font-normal text-[#ff5c00]">propias.</em>
                </h1>
                <p className="reveal reveal-delay-3 mt-7 max-w-xl text-base leading-relaxed text-[#545257] md:text-lg">
                  Transformo ideas en identidades visuales claras, memorables y listas para conectar con las personas correctas.
                </p>
                <div className="reveal reveal-delay-4 mt-8 flex flex-wrap gap-3">
                  <a
                    href="#proyectos"
                    className="group flex items-center gap-3 rounded-full bg-[#171719] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#ff5c00]"
                  >
                    Ver proyectos
                    <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  </a>
                  <a
                    href="mailto:gabrielanibaldi@gmail.com"
                    className="flex items-center rounded-full border border-[#171719]/20 px-6 py-3.5 text-sm font-semibold hover:border-[#171719]"
                  >
                    gabrielanibaldi@gmail.com
                  </a>
                </div>
              </div>

              <div className="reveal reveal-delay-4 flex items-end justify-between border-t border-[#171719]/15 pt-5">
                <p className="max-w-xs text-xs leading-relaxed text-[#6a676c]">
                  Branding · Identidad visual · Diseño gráfico · Edición de video
                </p>
                <span className="font-serif text-lg italic">Gabriel Anibaldi</span>
              </div>
            </div>

            <div className="relative min-h-[560px] overflow-hidden bg-[#ff5c00] p-5 md:p-10 lg:min-h-full">
              <div className="hero-orbit hero-orbit-one" />
              <div className="hero-orbit hero-orbit-two" />
              <div className="relative flex h-full min-h-[520px] items-center justify-center">
                <div className="hero-project-card reveal reveal-delay-3 relative aspect-[4/5] w-[min(78%,520px)] overflow-hidden rounded-[28px] bg-[#171719] shadow-2xl">
                  {proyectoDestacado ? (
                    <>
                      <Image
                        src={projectImage(proyectoDestacado)}
                        alt={proyectoDestacado.titulo}
                        fill
                        sizes="(max-width: 1024px) 78vw, 38vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 text-white md:p-8">
                        <div>
                          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">Selección de trabajo</span>
                          <h2 className="font-serif text-3xl font-bold leading-none md:text-4xl">{proyectoDestacado.titulo}</h2>
                        </div>
                        <Link
                          href={`/proyecto/${proyectoDestacado.id}`}
                          aria-label={`Ver proyecto ${proyectoDestacado.titulo}`}
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ff5c00]"
                        >
                          <ArrowUpRight className="h-5 w-5" />
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center p-10 text-center font-serif text-4xl text-white">
                      Ideas con identidad propia.
                    </div>
                  )}
                </div>

                <div className="absolute left-1 top-[16%] rotate-[-8deg] rounded-full bg-[#f4f0e8] px-4 py-2 text-xs font-semibold shadow-lg md:left-4">
                  Identidad visual
                </div>
                <div className="absolute right-0 top-[25%] rotate-[8deg] rounded-full bg-[#171719] px-4 py-2 text-xs font-semibold text-white shadow-lg md:right-3">
                  Diseño con intención
                </div>
                <div className="absolute bottom-[13%] left-0 rotate-[6deg] rounded-full bg-white px-4 py-2 text-xs font-semibold shadow-lg md:left-5">
                  Estrategia + estética
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="overflow-hidden border-y border-white/10 bg-[#171719] py-4 text-white" aria-hidden="true">
          <div className="marquee-track flex w-max gap-10 text-sm font-semibold uppercase tracking-[0.16em]">
            {[...servicios, ...servicios].map((servicio, index) => (
              <span key={`${servicio.titulo}-${index}`} className="flex items-center gap-10 whitespace-nowrap">
                {servicio.titulo}
                <Sparkles className="h-4 w-4 text-[#ff5c00]" />
              </span>
            ))}
          </div>
        </div>

        <section id="proyectos" className="bg-[#f4f0e8] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-12 grid gap-8 border-b border-[#171719]/15 pb-10 md:grid-cols-[1fr_0.65fr] md:items-end">
              <div>
                <span className="section-kicker">Trabajo seleccionado</span>
                <h2 className="mt-4 max-w-4xl font-serif text-[clamp(3.2rem,7vw,7.4rem)] font-bold leading-[0.9] tracking-[-0.055em]">
                  Proyectos con <em className="font-normal text-[#ff5c00]">carácter.</em>
                </h2>
              </div>
              <p className="max-w-lg text-base leading-relaxed text-[#5f5c61] md:justify-self-end md:text-lg">
                Una selección de identidades, campañas y piezas visuales creadas para convertir una idea en algo que se pueda reconocer y recordar.
              </p>
            </div>

            {categorias.length > 1 && (
              <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
                {categorias.map((categoria) => (
                  <button
                    key={categoria}
                    onClick={() => setFiltroActivo(categoria)}
                    className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                      filtroActivo === categoria
                        ? "border-[#171719] bg-[#171719] text-white"
                        : "border-[#171719]/20 bg-transparent hover:border-[#ff5c00] hover:text-[#ff5c00]"
                    }`}
                  >
                    {categoria}
                  </button>
                ))}
              </div>
            )}

            {proyectosFiltrados.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2">
                {proyectosFiltrados.map((proyecto, index) => {
                  const categoriasProyecto = projectCategories(proyecto)
                  const featured = index === 0 && proyectosFiltrados.length > 2

                  return (
                    <Link
                      key={proyecto.id}
                      href={`/proyecto/${proyecto.id}`}
                      className={`project-link group relative overflow-hidden rounded-[24px] bg-[#d8d4ce] ${
                        featured ? "aspect-[4/3] md:col-span-2 md:aspect-[2/1]" : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={projectImage(proyecto)}
                        alt={proyecto.titulo}
                        fill
                        sizes={featured ? "(max-width: 768px) 100vw, 100vw" : "(max-width: 768px) 100vw, 50vw"}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/5" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white md:p-7">
                        <div>
                          <div className="mb-2 flex flex-wrap gap-2">
                            {categoriasProyecto.slice(0, 2).map((categoria) => (
                              <span key={categoria} className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/65">
                                {categoria}
                              </span>
                            ))}
                          </div>
                          <h3 className={`font-serif font-bold leading-none ${featured ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
                            {proyecto.titulo}
                          </h3>
                        </div>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff5c00] transition-transform group-hover:rotate-12 group-hover:scale-105">
                          <ArrowUpRight className="h-5 w-5" />
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="rounded-[24px] border border-dashed border-[#171719]/25 py-16 text-center text-sm text-[#5f5c61]">
                No hay proyectos en esta categoría por el momento.
              </div>
            )}
          </div>
        </section>

        <section id="servicios" className="bg-[#171719] px-5 py-20 text-white md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <span className="section-kicker text-[#ff7a32]">Cómo puedo ayudarte</span>
                <h2 className="mt-4 max-w-xl font-serif text-[clamp(3rem,6vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.05em]">
                  Diseño que hace más clara tu <em className="font-normal text-[#ff5c00]">marca.</em>
                </h2>
                <p className="mt-7 max-w-md leading-relaxed text-white/55">
                  No necesitás llegar con todo resuelto. Te ayudo a ordenar la idea, encontrar la dirección visual y construir lo que la marca realmente necesita.
                </p>
                <a href="#contacto" className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-[#ff7a32]">
                  Contame tu idea
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>

              <div className="border-t border-white/15">
                {servicios.map((servicio) => (
                  <article key={servicio.numero} className="service-row grid gap-3 border-b border-white/15 py-7 md:grid-cols-[70px_0.8fr_1fr] md:items-center md:py-9">
                    <span className="text-xs font-semibold text-[#ff7a32]">{servicio.numero}</span>
                    <h3 className="font-serif text-3xl font-bold tracking-[-0.035em] md:text-4xl">{servicio.titulo}</h3>
                    <p className="max-w-md text-sm leading-relaxed text-white/50 md:justify-self-end md:text-base">{servicio.descripcion}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="sobre-mi" className="bg-[#ff5c00] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <span className="section-kicker border-black/20 text-[#171719]">Sobre mí</span>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-[24px] bg-[#171719] p-6 text-white md:p-8">
                    <strong className="font-serif text-5xl md:text-6xl">2019</strong>
                    <span className="mt-3 block text-xs leading-relaxed text-white/55">Año en el que empecé a trabajar en diseño</span>
                  </div>
                  <div className="rounded-[24px] bg-[#f4f0e8] p-6 md:p-8">
                    <strong className="font-serif text-3xl md:text-4xl">Freelance</strong>
                    <span className="mt-3 block text-xs leading-relaxed text-[#5f5c61]">Trabajo directo, cercano y adaptado a cada proyecto</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-[clamp(2.7rem,5vw,5.7rem)] font-bold leading-[0.98] tracking-[-0.05em]">
                  Soy Gabriel Anibaldi. Le doy forma visual a ideas que todavía están buscando su identidad.
                </h2>
                <p className="mt-7 max-w-3xl text-base leading-relaxed text-[#171719]/70 md:text-lg">
                  Desde 2019 trabajo de manera freelance en diseño gráfico. Me enfoco en desarrollar identidades y piezas visuales cuidadas, convirtiendo cada idea en una propuesta clara, atractiva y coherente.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["Photoshop", "Illustrator", "After Effects", "Premiere"].map((herramienta) => (
                    <span key={herramienta} className="rounded-full border border-[#171719]/25 px-4 py-2 text-xs font-semibold">
                      {herramienta}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-20 border-t border-black/20 pt-10">
              <span className="section-kicker border-black/20 text-[#171719]">Así trabajamos</span>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {pasos.map(([numero, titulo, descripcion]) => (
                  <article key={numero} className="rounded-[24px] border border-black/15 bg-[#f4f0e8] p-6 md:p-8">
                    <div className="mb-10 flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#ff5c00]">{numero}</span>
                      <Check className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-3xl font-bold">{titulo}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5f5c61]">{descripcion}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f4f0e8] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
              <div>
                <span className="section-kicker">Experiencias reales</span>
                <h2 className="mt-4 font-serif text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.05em]">
                  Lo que dicen<br /><em className="font-normal text-[#ff5c00]">al trabajar conmigo.</em>
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {clientes.map((cliente) => (
                  <span key={cliente} className="rounded-full border border-[#171719]/20 px-4 py-2 text-xs font-semibold">
                    {cliente}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <article className="flex min-h-[420px] flex-col justify-between rounded-[28px] bg-[#171719] p-7 text-white md:p-10">
                <span className="font-serif text-6xl leading-none text-[#ff5c00]">“</span>
                <blockquote className="my-10 font-serif text-2xl leading-snug md:text-3xl">{testimonios[0].texto}</blockquote>
                <footer className="border-t border-white/15 pt-5">
                  <strong className="block text-sm">{testimonios[0].autor}</strong>
                  <span className="text-xs text-white/45">{testimonios[0].cargo}</span>
                </footer>
              </article>

              <div className="grid gap-5">
                {testimonios.slice(1).map((testimonio) => (
                  <article key={testimonio.autor} className="rounded-[24px] border border-[#171719]/15 bg-white p-6 md:p-7">
                    <blockquote className="text-sm leading-relaxed text-[#4f4c51]">“{testimonio.texto}”</blockquote>
                    <footer className="mt-5 flex items-center justify-between border-t border-[#171719]/10 pt-4">
                      <strong className="text-sm">{testimonio.autor}</strong>
                      <span className="text-xs text-[#777379]">{testimonio.cargo}</span>
                    </footer>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="bg-[#171719] px-5 py-20 text-white md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-14 border-b border-white/15 pb-14">
              <span className="section-kicker text-[#ff7a32]">Tu próximo proyecto</span>
              <h2 className="mt-5 max-w-6xl font-serif text-[clamp(3.4rem,8vw,8.8rem)] font-bold leading-[0.86] tracking-[-0.06em]">
                Hagamos algo que tu marca pueda llamar <em className="font-normal text-[#ff5c00]">propio.</em>
              </h2>
            </div>

            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className="max-w-md leading-relaxed text-white/55">
                  Si tenés una idea, una marca que necesita orden o un proyecto por empezar, escribime. No hace falta que sepas exactamente qué pedir.
                </p>

                <div className="mt-8 flex flex-col items-start gap-4 text-sm">
                  <a href="mailto:gabrielanibaldi@gmail.com" className="group flex items-center gap-3 hover:text-[#ff7a32]">
                    <Mail className="h-4 w-4" />
                    gabrielanibaldi@gmail.com
                    <ArrowUpRight className="h-4 w-4 opacity-40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                  <a href="https://instagram.com/gabitogfx" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 hover:text-[#ff7a32]">
                    <Instagram className="h-4 w-4" />
                    @gabitogfx
                    <ArrowUpRight className="h-4 w-4 opacity-40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                <label className="contact-field">
                  <span>Nombre</span>
                  <input
                    type="text"
                    placeholder="¿Cómo te llamás?"
                    value={formData.nombre}
                    onChange={(event) => setFormData({ ...formData, nombre: event.target.value })}
                    required
                  />
                </label>
                <label className="contact-field">
                  <span>Email</span>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    required
                  />
                </label>
                <label className="contact-field md:col-span-2">
                  <span>Contame sobre el proyecto</span>
                  <textarea
                    placeholder="Qué necesitás, en qué etapa estás o qué querés mejorar..."
                    value={formData.mensaje}
                    onChange={(event) => setFormData({ ...formData, mensaje: event.target.value })}
                    required
                    rows={5}
                  />
                </label>
                <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
                  <p aria-live="polite" className={`text-xs ${formStatus === "error" ? "text-red-300" : "text-white/50"}`}>
                    {formStatus === "success" && "¡Mensaje enviado! Te respondo lo antes posible."}
                    {formStatus === "error" && "No se pudo enviar. Probá de nuevo o escribime por email."}
                  </p>
                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="group flex cursor-pointer items-center justify-center gap-3 rounded-full bg-[#ff5c00] px-7 py-4 text-sm font-semibold text-white hover:bg-[#ff7426] disabled:cursor-wait disabled:opacity-60"
                  >
                    {formStatus === "loading" ? "Enviando..." : "Enviar consulta"}
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#171719] px-5 py-8 text-white md:px-10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} GabitoGFX · Gabriel Anibaldi</p>
          <a href="#inicio" className="flex items-center gap-2 hover:text-white">
            Volver arriba <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </footer>
    </div>
  )
}
