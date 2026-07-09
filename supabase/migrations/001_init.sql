-- Tu Asesor Migratorio — Schema inicial
-- Basado en el Plan Maestro (2026-07-08)

-- Clientes (extiende auth.users)
CREATE TABLE IF NOT EXISTS clientes (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre_completo TEXT NOT NULL,
  telefono TEXT,
  pais_origen TEXT,
  fecha_registro TIMESTAMPTZ DEFAULT now()
);

-- Roles de usuario
CREATE TYPE rol_usuario AS ENUM ('cliente', 'asesor', 'admin');

CREATE TABLE IF NOT EXISTS roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  rol rol_usuario DEFAULT 'cliente'
);

-- Trámites
CREATE TABLE IF NOT EXISTS tramites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL, -- 'visa', 'residencia', 'laboral', 'documentos'
  estado TEXT DEFAULT 'pendiente', -- 'pendiente', 'en_proceso', 'completado'
  descripcion TEXT,
  fecha_inicio TIMESTAMPTZ DEFAULT now(),
  fecha_actualizacion TIMESTAMPTZ DEFAULT now()
);

-- Documentos (usando Supabase Storage para archivos)
CREATE TABLE IF NOT EXISTS documentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tramite_id UUID REFERENCES tramites(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  url TEXT NOT NULL,
  subido_por UUID REFERENCES auth.users(id),
  fecha_subida TIMESTAMPTZ DEFAULT now()
);

-- Sesiones (consultas)
CREATE TABLE IF NOT EXISTS sesiones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  asesor_id UUID REFERENCES auth.users(id),
  fecha TIMESTAMPTZ NOT NULL,
  tipo TEXT DEFAULT 'online', -- 'online', 'presencial'
  notas TEXT
);

-- Mensajes (chat cliente-asesor)
CREATE TABLE IF NOT EXISTS mensajes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  asesor_id UUID REFERENCES auth.users(id),
  mensaje TEXT NOT NULL,
  enviado_por TEXT NOT NULL CHECK (enviado_por IN ('cliente', 'asesor')),
  leido BOOLEAN DEFAULT false,
  fecha TIMESTAMPTZ DEFAULT now()
);

-- Artículos del blog
CREATE TABLE IF NOT EXISTS articulos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  contenido TEXT NOT NULL,
  categoria TEXT, -- 'visas', 'trabajo', 'vivienda', 'salud'
  publicado BOOLEAN DEFAULT false,
  autor_id UUID REFERENCES auth.users(id),
  fecha_publicacion TIMESTAMPTZ DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_tramites_cliente ON tramites(cliente_id);
CREATE INDEX IF NOT EXISTS idx_mensajes_cliente ON mensajes(cliente_id);
CREATE INDEX IF NOT EXISTS idx_sesiones_cliente ON sesiones(cliente_id);
CREATE INDEX IF NOT EXISTS idx_articulos_slug ON articulos(slug);

-- RLS: clientes solo ven sus propios datos
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tramites ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE sesiones ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes ENABLE ROW LEVEL SECURITY;

-- Política: usuario ve su propio perfil
CREATE POLICY "Usuario ve su perfil" ON clientes
  FOR SELECT USING (auth.uid() = id);

-- Política: usuario ve sus trámites
CREATE POLICY "Usuario ve sus tramites" ON tramites
  FOR SELECT USING (auth.uid() = cliente_id);

-- Política: usuario ve sus documentos
CREATE POLICY "Usuario ve sus documentos" ON documentos
  FOR SELECT USING (auth.uid() = subido_por);

-- Política: usuario ve sus sesiones
CREATE POLICY "Usuario ve sus sesiones" ON sesiones
  FOR SELECT USING (auth.uid() = cliente_id);

-- Política: usuario ve sus mensajes
CREATE POLICY "Usuario ve sus mensajes" ON mensajes
  FOR SELECT USING (auth.uid() IN (cliente_id, asesor_id));

-- Política: usuario inserta mensajes propios
CREATE POLICY "Usuario inserta mensajes" ON mensajes
  FOR INSERT WITH CHECK (auth.uid() IN (cliente_id, asesor_id));
