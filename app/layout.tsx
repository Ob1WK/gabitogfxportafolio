import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"],
})

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  title: "GabitoGFX — Gabriel Anibaldi",
  description: "Diseñador gráfico freelance especializado en branding, identidad visual y piezas digitales.",
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
