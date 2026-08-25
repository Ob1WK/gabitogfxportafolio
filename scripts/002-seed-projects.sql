-- Insert existing projects from data/projects.ts
INSERT INTO projects (id, titulo, categoria, descripcion, duracion, anho) VALUES
('p001', 'CLUB ARGENTINO SOCIAL MEDIA REDESIGN (CONCEPT)', 'Branding', 'Rediseño completo de la identidad visual para redes sociales del Club Argentino, incluyendo plantillas para posts, stories y contenido multimedia.', '3 meses', 2024),
('p002', 'URBAN BEATS FESTIVAL', 'Motion Graphics', 'Animaciones y gráficos en movimiento para el festival de música urbana más grande de la región.', '2 meses', 2024),
('p003', 'ECOPACK BRANDING', 'Graphic Design', 'Diseño de packaging sostenible para línea de productos orgánicos.', '4 semanas', 2023),
('p004', 'TECH STARTUP INTRO', 'Motion Graphics', 'Video animado de introducción para startup tecnológica.', '3 semanas', 2024),
('p005', 'RESTAURANT REBRAND', 'Branding', 'Renovación completa de marca para cadena de restaurantes.', '2 meses', 2023),
('p006', 'MAGAZINE LAYOUT', 'Graphic Design', 'Diseño editorial para revista de moda y lifestyle.', '6 semanas', 2024);

-- Insert media for project p001 (Club Argentino)
INSERT INTO project_media (project_id, tipo, url, orden) VALUES
('p001', 'imagen', '/projects/p001-club-argentino-cover.png', 1),
('p001', 'imagen', '/projects/p001-jugador-partido.png', 2),
('p001', 'imagen', '/projects/p001-xi-inicial.png', 3),
('p001', 'imagen', '/projects/p001-siguiente-partido.png', 4),
('p001', 'imagen', '/projects/p001-posiciones.png', 5),
('p001', 'imagen', '/projects/p001-hinchas.png', 6),
('p001', 'imagen', '/projects/p001-final-partido.png', 7);

-- Insert placeholder media for other projects
INSERT INTO project_media (project_id, tipo, url, orden) VALUES
('p002', 'imagen', '/music-festival-graphics-posters.jpg', 1),
('p002', 'imagen', '/tech-startup-branding-identity.jpg', 2),
('p003', 'imagen', '/organic-food-packaging-design.jpg', 1),
('p003', 'imagen', '/corporate-finance-branding.jpg', 2),
('p004', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1),
('p005', 'imagen', '/corporate-finance-branding.jpg', 1),
('p005', 'imagen', '/music-festival-graphics-posters.jpg', 2),
('p006', 'imagen', '/tech-startup-branding-identity.jpg', 1),
('p006', 'imagen', '/organic-food-packaging-design.jpg', 2);
