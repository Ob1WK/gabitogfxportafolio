import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nombre, email, mensaje } = body

    // Validate required fields
    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    // Create Supabase client
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    // Save to database
    const { error } = await supabase.from("contact_submissions").insert({
      nombre,
      email,
      mensaje,
    })

    if (error) {
      console.error("[v0] Error saving contact submission:", error)
      return NextResponse.json({ error: "Error al guardar el mensaje" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json({ error: "Error al procesar el mensaje" }, { status: 500 })
  }
}
