"use client"

import type React from "react"

import { useState } from "react"
import { upload } from "@vercel/blob/client"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus, Trash2, Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface ProjectMedia {
  id?: number
  tipo: string
  url: string
  orden: number
}

interface Project {
  id: string
  titulo: string
  categoria: string[] // Changed to array to support multiple categories
  descripcion: string
  duracion: string
  anho: number
  project_media: ProjectMedia[]
}

const CATEGORIES = ["Branding", "Motion Graphics", "Graphic Design", "Web Design", "Illustration"]

export default function ProjectForm({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)
  const supabase = createClient()

  const [formData, setFormData] = useState({
    id: project?.id || `p${Date.now()}`,
    titulo: project?.titulo || "",
    categoria: project?.categoria || ["Branding"], // Default to array with one category
    descripcion: project?.descripcion || "",
    duracion: project?.duracion || "",
    anho: project?.anho || new Date().getFullYear(),
  })

  const [media, setMedia] = useState<ProjectMedia[]>(project?.project_media || [{ tipo: "imagen", url: "", orden: 1 }])

  const toggleCategory = (category: string) => {
    const currentCategories = formData.categoria
    if (currentCategories.includes(category)) {
      // Remove category if already selected (but keep at least one)
      if (currentCategories.length > 1) {
        setFormData({
          ...formData,
          categoria: currentCategories.filter((c) => c !== category),
        })
      }
    } else {
      // Add category
      setFormData({
        ...formData,
        categoria: [...currentCategories, category],
      })
    }
  }

  const handleFileUpload = async (index: number, file: File) => {
    setUploadingIndex(index)
    setError(null)

    console.log("[v0] Starting client-side file upload:", file.name, file.size, file.type)

    const maxSize = 100 * 1024 * 1024 // 100MB
    if (file.size > maxSize) {
      setError("El archivo es demasiado grande (máximo 100MB)")
      setUploadingIndex(null)
      return
    }

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      })

      console.log("[v0] Upload successful, URL:", blob.url)
      updateMedia(index, "url", blob.url)
    } catch (err) {
      console.error("[v0] Upload error:", err)
      setError(err instanceof Error ? err.message : "Error al subir el archivo")
    } finally {
      setUploadingIndex(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Upsert project
      const { error: projectError } = await supabase.from("projects").upsert({
        id: formData.id,
        titulo: formData.titulo,
        categoria: formData.categoria, // Now sends array
        descripcion: formData.descripcion,
        duracion: formData.duracion,
        anho: formData.anho,
        updated_at: new Date().toISOString(),
      })

      if (projectError) throw projectError

      // Delete existing media if editing
      if (project) {
        await supabase.from("project_media").delete().eq("project_id", formData.id)
      }

      // Insert new media
      const mediaToInsert = media
        .filter((m) => m.url.trim() !== "")
        .map((m, index) => ({
          project_id: formData.id,
          tipo: m.tipo,
          url: m.url,
          orden: index + 1,
        }))

      if (mediaToInsert.length > 0) {
        const { error: mediaError } = await supabase.from("project_media").insert(mediaToInsert)
        if (mediaError) throw mediaError
      }

      onClose()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al guardar el proyecto")
      setLoading(false)
    }
  }

  const addMedia = () => {
    setMedia([...media, { tipo: "imagen", url: "", orden: media.length + 1 }])
  }

  const removeMedia = (index: number) => {
    setMedia(media.filter((_, i) => i !== index))
  }

  const updateMedia = (index: number, field: keyof ProjectMedia, value: string) => {
    const newMedia = [...media]
    newMedia[index] = { ...newMedia[index], [field]: value }
    setMedia(newMedia)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card className="bg-[#0A0F1E] border-white/10">
          <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-[#0A0F1E] z-10 border-b border-white/10">
            <CardTitle className="text-white">{project ? "Editar Proyecto" : "Nuevo Proyecto"}</CardTitle>
            <Button onClick={onClose} variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="titulo" className="text-white">
                  Título
                </Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  required
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Categorías (selecciona una o más)</Label>
                <div className="grid grid-cols-2 gap-3 p-4 bg-white/5 rounded-md border border-white/10">
                  {CATEGORIES.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={formData.categoria.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                        className="border-white/20 data-[state=checked]:bg-[#BFFF00] data-[state=checked]:border-[#BFFF00]"
                      />
                      <Label
                        htmlFor={category}
                        className="text-sm text-white cursor-pointer hover:text-[#BFFF00] transition-colors"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/60">Debe seleccionar al menos una categoría</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="anho" className="text-white">
                    Año
                  </Label>
                  <Input
                    id="anho"
                    type="number"
                    value={formData.anho}
                    onChange={(e) => setFormData({ ...formData, anho: Number.parseInt(e.target.value) })}
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duracion" className="text-white">
                    Duración
                  </Label>
                  <Input
                    id="duracion"
                    value={formData.duracion}
                    onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                    placeholder="ej: 3 meses"
                    required
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion" className="text-white">
                  Descripción
                </Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  required
                  rows={4}
                  className="bg-white/10 border-white/20 text-white resize-none"
                  placeholder="Descripción del proyecto"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-white">Medios (Imágenes/Videos)</Label>
                  <Button
                    type="button"
                    onClick={addMedia}
                    size="sm"
                    className="bg-[#BFFF00] text-black hover:bg-[#a8e600]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Medio
                  </Button>
                </div>

                {media.map((m, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex gap-2 items-start">
                      <Select value={m.tipo} onValueChange={(value) => updateMedia(index, "tipo", value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="imagen">Imagen</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={m.url}
                        onChange={(e) => updateMedia(index, "url", e.target.value)}
                        placeholder="URL del medio o sube un archivo"
                        className="bg-white/10 border-white/20 text-white flex-1"
                      />
                      {media.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeMedia(index)}
                          variant="outline"
                          size="icon"
                          className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept={m.tipo === "imagen" ? "image/*" : "video/*"}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(index, file)
                        }}
                        className="hidden"
                        id={`file-${index}`}
                      />
                      <Label htmlFor={`file-${index}`} className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 transition-colors">
                          <Upload className="w-4 h-4 text-white" />
                          <span className="text-sm text-white">
                            {uploadingIndex === index ? "Subiendo..." : "Subir archivo"}
                          </span>
                        </div>
                      </Label>
                    </div>
                    {m.url && (
                      <div className="relative w-full h-32 bg-white/5 rounded-md overflow-hidden">
                        {m.tipo === "imagen" ? (
                          <img src={m.url || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <video src={m.url} className="w-full h-full object-cover" />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {error && <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-md">{error}</div>}

              <div className="flex gap-4 sticky bottom-0 bg-[#0A0F1E] pt-4 border-t border-white/10">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 border-[#BFFF00] text-[#BFFF00] hover:bg-[#BFFF00] hover:text-black font-semibold bg-transparent"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#BFFF00] text-black hover:bg-[#a8e600] font-semibold"
                >
                  {loading ? "Guardando..." : project ? "Actualizar" : "Crear Proyecto"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
