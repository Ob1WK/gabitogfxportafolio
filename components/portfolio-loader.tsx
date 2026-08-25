"use client"

import { useEffect, useState } from "react"

type PortfolioComponent = typeof import("./portfolio-client")["default"]
type Projects = Parameters<PortfolioComponent>[0]["projects"]

export default function PortfolioLoader() {
  const [loaded, setLoaded] = useState<{ Component: PortfolioComponent; projects: Projects } | null>(null)

  useEffect(() => {
    let cancelled = false

    const frame = requestAnimationFrame(async () => {
      const [{ default: Component }, response] = await Promise.all([
        import("./portfolio-client"),
        fetch("/api/projects"),
      ])
      const projects = response.ok ? ((await response.json()) as Projects) : []

      if (!cancelled) setLoaded({ Component, projects })
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [])

  if (!loaded) {
    return <main aria-label="Cargando portafolio" style={{ minHeight: "100vh", background: "#FF5C00" }} />
  }

  return <loaded.Component projects={loaded.projects} />
}
