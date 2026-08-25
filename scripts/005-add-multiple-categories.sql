-- Change categoria from TEXT to TEXT[] to support multiple categories
ALTER TABLE projects 
ALTER COLUMN categoria TYPE TEXT[] 
USING ARRAY[categoria];

-- Update existing projects to have array format
-- This is already handled by the USING clause above
