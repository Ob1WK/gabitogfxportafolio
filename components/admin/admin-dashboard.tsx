"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, LogOut, Pencil, Trash2, Mail } from "lucide-react"
import ProjectForm from "./project-form"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProjectMedia {
  id: number
  project_id: string
  tipo: string
  url: string
  orden: number
}

interface Project {
  id: string
  titulo: string
  categoria: string[]
  descripcion: string
  duracion: string
  anho: number
  project_media: ProjectMedia[]
}

interface ContactSubmission {
  id: number
  nombre: string
  email: string
  mensaje: string
  created_at: string
}

export default function AdminDashboard({
  initialProjects,
  userEmail,
}: {
  initialProjects: Project[]
  userEmail: string
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState("projects")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setContacts(data)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin")
    router.refresh()
  }

  const handleDelete = async (projectId: string) => {
    if (!confirm("¿Estás seguro de eliminar este proyecto?")) return

    const { error } = await supabase.from("projects").delete().eq("id", projectId)

    if (!error) {
      setProjects(projects.filter((p) => p.id !== projectId))
    }
  }

  const handleDeleteContact = async (contactId: number) => {
    if (!confirm("¿Estás seguro de eliminar este mensaje?")) return

    const { error } = await supabase.from("contact_submissions").delete().eq("id", contactId)

    if (!error) {
      setContacts(contacts.filter((c) => c.id !== contactId))
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProject(null)
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1E] to-[#1A2332]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Panel de Administración</h1>
            <p className="text-gray-400">{userEmail}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-[#BFFF00] text-[#BFFF00] hover:bg-[#BFFF00] hover:text-black font-semibold bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>

        {/* Project Form Modal */}
        {showForm && <ProjectForm project={editingProject} onClose={handleFormClose} />}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white/5 border border-white/10 mb-8">
            <TabsTrigger value="projects" className="data-[state=active]:bg-[#BFFF00] data-[state=active]:text-black">
              Proyectos ({projects.length})
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-[#BFFF00] data-[state=active]:text-black">
              <Mail className="w-4 h-4 mr-2" />
              Contactos ({contacts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="flex justify-end mb-6">
              <Button
                onClick={() => setShowForm(true)}
                className="bg-[#BFFF00] text-black hover:bg-[#a8e600] flex items-center gap-2 font-semibold"
              >
                <Plus className="w-4 h-4" />
                Nuevo Proyecto
              </Button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-[#BFFF00]/20 to-[#0A0F1E]">
                    {project.project_media[0] && (
                      <img
                        src={project.project_media[0].url || "/placeholder.svg"}
                        alt={project.titulo}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <Badge className="absolute top-4 left-4 bg-[#BFFF00] text-black">{project.categoria}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white text-lg line-clamp-2">{project.titulo}</CardTitle>
                    <CardDescription className="text-gray-400 line-clamp-2">{project.descripcion}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                      <span>{project.duracion}</span>
                      <span>{project.anho}</span>
                    </div>
                    <div className="text-sm text-gray-400 mb-4">
                      {project.project_media.length} {project.project_media.length === 1 ? "medio" : "medios"}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(project)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-[#BFFF00] text-[#BFFF00] hover:bg-[#BFFF00] hover:text-black font-semibold"
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleDelete(project.id)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {projects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">No hay proyectos todavía</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-[#BFFF00] text-black hover:bg-[#a8e600] flex items-center gap-2 mx-auto font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Crear Primer Proyecto
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="contacts">
            <div className="space-y-4">
              {contacts.map((contact) => (
                <Card key={contact.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-lg">{contact.nombre}</CardTitle>
                        <CardDescription className="text-gray-400">{contact.email}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">
                          {new Date(contact.created_at).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <Button
                          onClick={() => handleDeleteContact(contact.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 whitespace-pre-wrap">{contact.mensaje}</p>
                  </CardContent>
                </Card>
              ))}

              {contacts.length === 0 && (
                <div className="text-center py-12">
                  <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No hay mensajes de contacto todavía</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
