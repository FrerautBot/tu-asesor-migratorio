-- Tu Asesor Migratorio — Schema inicial (prefijo migra_)
-- Proyecto: Freraut Invest (mismo Supabase, separación por prefijo)
-- Basado en el Plan Maestro (2026-07-08)
-- Actualizado 2026-07-22: prefijo migra_ para coexistir con tablas de Freraut Invest

-- Tipo de rol
DO $$ BEGIN
  CREATE TYPE migra_rol_usuario AS ENUM ('cliente', 'asesor', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Clientes (extiende auth.users de Freraut Invest)
CREATE TABLE IF NOT EXISTS migra_clientes (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre_completo TEXT NOT NULL,
  telefono TEXT,
  pais_origen TEXT,
  fecha_registro TIMESTAMPTZ DEFAULT now()
);

-- Roles de usuario
CREATE TABLE IF NOT EXISTS migra_roles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  rol migra_rol_usuario DEFAULT 'cliente'
);

-- Trámites
CREATE TABLE IF NOT EXISTS migra_tramites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES migra_clientes(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL, -- 'visa', 'residencia', 'laboral', 'documentos'
  estado TEXT DEFAULT 'pendiente', -- 'pendiente', 'en_proceso', 'completado'
  descripcion TEXT,
  fecha_inicio TIMESTAMPTZ DEFAULT now(),
  fecha_actualizacion TIMESTAMPTZ DEFAULT now()
);

-- Documentos (archivos en Supabase Storage, bucket: migra-documentos)
CREATE TABLE IF NOT EXISTS migra_documentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tramite_id UUID REFERENCES migra_tramites(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  url TEXT NOT NULL,
  subido_por UUID REFERENCES auth.users(id),
  fecha_subida TIMESTAMPTZ DEFAULT now()
);

-- Sesiones (consultas)
CREATE TABLE IF NOT EXISTS migra_sesiones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES migra_clientes(id) ON DELETE CASCADE,
  asesor_id UUID REFERENCES auth.users(id),
  fecha TIMESTAMPTZ NOT NULL,
  tipo TEXT DEFAULT 'online', -- 'online', 'presencial'
  notas TEXT
);

-- Mensajes (chat cliente-asesor)
CREATE TABLE IF NOT EXISTS migra_mensajes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES migra_clientes(id) ON DELETE CASCADE,
  asesor_id UUID REFERENCES auth.users(id),
  mensaje TEXT NOT NULL,
  enviado_por TEXT NOT NULL CHECK (enviado_por IN ('cliente', 'asesor')),
  leido BOOLEAN DEFAULT false,
  fecha TIMESTAMPTZ DEFAULT now()
);

-- Artículos del blog
CREATE TABLE IF NOT EXISTS migra_articulos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  contenido TEXT NOT NULL,
  categoria TEXT, -- 'visas', 'trabajo', 'vivienda', 'salud'
  publicado BOOLEAN DEFAULT false,
  autor_id UUID REFERENCES auth.users(id),
  fecha_publicacion TIMESTAMPTZ DEFAULT now()
);

-- Consultas de contacto (formulario landing)
CREATE TABLE IF NOT EXISTS migra_consultas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  caso TEXT NOT NULL,
  estado TEXT DEFAULT 'pendiente', -- 'pendiente', 'contactado', 'convertido', 'descartado'
  fecha TIMESTAMPTZ DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_migra_tramites_cliente ON migra_tramites(cliente_id);
CREATE INDEX IF NOT EXISTS idx_migra_mensajes_cliente ON migra_mensajes(cliente_id);
CREATE INDEX IF NOT EXISTS idx_migra_sesiones_cliente ON migra_sesiones(cliente_id);
CREATE INDEX IF NOT EXISTS idx_migra_articulos_slug ON migra_articulos(slug);
CREATE INDEX IF NOT EXISTS idx_migra_consultas_email ON migra_consultas(email);

-- RLS: todas las tablas activadas
ALTER TABLE migra_clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE migra_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE migra_tramites ENABLE ROW LEVEL SECURITY;
ALTER TABLE migra_documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE migra_sesiones ENABLE ROW LEVEL SECURITY;
ALTER TABLE migra_mensajes ENABLE ROW LEVEL SECURITY;
ALTER TABLE migra_articulos ENABLE ROW LEVEL SECURITY;
ALTER TABLE migra_consultas ENABLE ROW LEVEL SECURITY;

-- Políticas RLS

-- Cliente ve su propio perfil
CREATE POLICY "migra_cliente_ve_perfil" ON migra_clientes
  FOR SELECT USING (auth.uid() = id);

-- Cliente ve sus roles
CREATE POLICY "migra_usuario_ve_rol" ON migra_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Cliente ve sus trámites
CREATE POLICY "migra_cliente_ve_tramites" ON migra_tramites
  FOR SELECT USING (auth.uid() = cliente_id);

-- Asesor ve trámites de sus clientes asignados
CREATE POLICY "migra_asesor_ve_tramites" ON migra_tramites
  FOR SELECT USING (
    auth.uid() IN (SELECT asesor_id FROM migra_sesiones WHERE cliente_id = migra_tramites.cliente_id)
  );

-- Usuario ve sus documentos
CREATE POLICY "migra_usuario_ve_documentos" ON migra_documentos
  FOR SELECT USING (auth.uid() = subido_por);

-- Cliente ve sus sesiones
CREATE POLICY "migra_cliente_ve_sesiones" ON migra_sesiones
  FOR SELECT USING (auth.uid() = cliente_id);

-- Asesor ve sus sesiones
CREATE POLICY "migra_asesor_ve_sesiones" ON migra_sesiones
  FOR SELECT USING (auth.uid() = asesor_id);

-- Usuario ve sus mensajes
CREATE POLICY "migra_usuario_ve_mensajes" ON migra_mensajes
  FOR SELECT USING (auth.uid() IN (cliente_id, asesor_id));

-- Usuario inserta mensajes propios
CREATE POLICY "migra_usuario_inserta_mensajes" ON migra_mensajes
  FOR INSERT WITH CHECK (auth.uid() IN (cliente_id, asesor_id));

-- Artículos publicados visibles para todos
CREATE POLICY "migra_articulos_publicos" ON migra_articulos
  FOR SELECT USING (publicado = true);

-- Admin gestiona artículos
CREATE POLICY "migra_admin_gestiona_articulos" ON migra_articulos
  FOR ALL USING (
    auth.uid() IN (SELECT user_id FROM migra_roles WHERE rol = 'admin')
  );

-- Cualquiera puede insertar consultas (formulario público)
CREATE POLICY "migra_publico_inserta_consultas" ON migra_consultas
  FOR INSERT WITH CHECK (true);

-- Solo asesores y admins ven consultas
CREATE POLICY "migra_staff_ve_consultas" ON migra_consultas
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM migra_roles WHERE rol IN ('asesor', 'admin'))
  );
