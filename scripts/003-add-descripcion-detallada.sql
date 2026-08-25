-- Add descripcionDetallada column to projects table
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS descripcion_detallada TEXT;

-- Update existing projects with a default detailed description
UPDATE projects
SET descripcion_detallada = descripcion
WHERE descripcion_detallada IS NULL;
