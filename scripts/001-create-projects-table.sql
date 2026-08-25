-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  duracion TEXT NOT NULL,
  anho INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_media table for multiple images/videos per project
CREATE TABLE IF NOT EXISTS project_media (
  id SERIAL PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('imagen', 'video')),
  url TEXT NOT NULL,
  orden INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_project_media_project_id ON project_media(project_id);
CREATE INDEX IF NOT EXISTS idx_project_media_orden ON project_media(project_id, orden);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public can read project media" ON project_media
  FOR SELECT USING (true);

-- Create policies for authenticated users (admin) to manage
CREATE POLICY "Authenticated users can insert projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert project media" ON project_media
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update project media" ON project_media
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete project media" ON project_media
  FOR DELETE USING (auth.role() = 'authenticated');
