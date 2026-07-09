# Tu Asesor Migratorio — Plan de Automatización IA para Redes Sociales

**Proyecto:** tuasesormigratorio.cl
**Fecha:** 2026-07-08
**Preparado por:** Gobernador D (Cerebro Central) para Lucas/Hermes

---

## RESUMEN EJECUTIVO

Las 3 plataformas (Instagram, TikTok, LinkedIn) tienen APIs oficiales funcionales para publicar contenido programáticamente. **Ninguna requiere pago por uso de API.** La inversión está en tiempo de desarrollo y en los créditos de IA para generar contenido (~$10-30/mes con DeepSeek). La arquitectura recomendada es: **DeepSeek genera → humano aprueba → API pública → medir resultados**.

---

## FRENTE 2 — INVESTIGACIÓN POR PLATAFORMA

### INSTAGRAM (Meta Graph API)

**API:** `https://graph.facebook.com/v22.0/{IG_USER_ID}/media`

| Requisito | Detalle |
|-----------|---------|
| Tipo de cuenta | Instagram **Business** o Creator (NO personal) |
| Vinculación | Debe estar conectada a una página de Facebook |
| App Review | Meta Developer App + revisión para `instagram_content_publish` |
| Token | Long-lived token (60 días, renovable) |

**Formatos soportados:**
- Fotos: JPEG (obligatorio, PNG no funciona), máx 8MB
- Reels: MP4/MOV, 5-90 segundos, máx 300MB
- Stories: 60 segundos, expiran 24hrs
- Carruseles: 2-10 items (todas fotos o todos videos, no mezclar)

**Límites:** ~25-50 posts/día, 200 llamadas/hora/app, 2,200 chars caption, 30 hashtags máx

**Flujo de publicación (2 pasos):**
```
1. POST /{IG_USER_ID}/media → crea container (image_url + caption)
2. POST /{IG_USER_ID}/media_publish → publica el container
```
Para Reels: paso 1 → esperar `status_code=FINISHED` → paso 2. El video se procesa async.

**Riesgos:**
- Shadowban por hashtags repetitivos o comportamiento bot-like
- Meta detecta automatización agresiva → restricción de cuenta
- App Review puede rechazar si no hay UX adecuada (checkbox de contenido comercial, mostrar nickname)
- **Mitigación:** publicar con intervalo humano (no más de 3-4/día), variar hashtags, dejar pausas naturales

---

### TIKTOK (Content Posting API v2)

**API:** `https://open.tiktokapis.com/v2/post/publish/`

| Requisito | Detalle |
|-----------|---------|
| Autenticación | OAuth 2.0 con scopes `video.publish` + `video.upload` |
| Token | Access token expira 24hrs, refresh token dura 365 días |
| App Audit | Obligatorio (2-6 semanas). Sin audit = posts quedan en `SELF_ONLY` (privados) |
| Cuenta | Creator account, sin requisitos de seguidores mínimos |

**Formato soportado:** **SOLO VIDEO** (no fotos, no carruseles de imágenes aún — mid-2026).

**Flujo de publicación (4 pasos):**
```
1. POST /v2/post/publish/creator_info/query/ → obtener max_duration, privacy settings
2. POST /v2/post/publish/video/init/ → obtener publish_id + upload_url
3. PUT upload_url (chunks de 10MB con Content-Range) → subir video
4. POST /v2/post/publish/status/fetch/ → poll hasta PUBLISH_COMPLETE
```

**Límites:** ~15 posts/día, video máx 180s, caption 2,200 chars

**Riesgos:**
- Sin audit de app, todo es privado (invisible) — bloqueante crítico
- API solo video: no se pueden publicar infografías ni imágenes estáticas
- Algoritmo TikTok penaliza contenido no-nativo (baja retención si se ve "genérico")
- **Mitigación:** contenido real filmado + IA para guiones/ideas, no para generar el video entero. Publicación manual o semi-automática hasta pasar el audit.

---

### LINKEDIN (API v2)

**API:** `https://api.linkedin.com/v2/ugcPosts`

| Requisito | Detalle |
|-----------|---------|
| Autenticación | OAuth 2.0 Authorization Code |
| Scopes necesarios | `w_member_social` (posts personales), `w_organization_social` (páginas empresa, requiere partner) |
| Token | 60 días, sin refresh token (re-autenticar manualmente) |
| App | LinkedIn Developer App + producto "Share on LinkedIn" habilitado |

**Formatos soportados:**
- Texto: máx 3,000 caracteres
- Imagen: upload binario en 2 pasos (registerUpload → PUT binary → attach asset URN)
- Artículo: URL + título + descripción (shareMediaCategory: ARTICLE)
- Video: soportado vía UGC API pero requiere partner approval

**Límites:** 100-500 requests/día/app

**Riesgos:**
- LinkedIn es la plataforma más agresiva contra automatización. Detección de bots es sofisticada.
- `w_member_social` es para perfil personal. Para Company Page se requiere partner verification (más restrictivo).
- Sin refresh token: cada 60 días hay que re-autenticar manualmente.
- **Mitigación:** mantener volumen bajo (1-2 posts/día máx), evitar automatización de conexiones/mensajes, usar solo para publicación de contenido.

---

## HERRAMIENTAS DE SCHEDULING

Las 3 plataformas tradicionales (Buffer, Later, Hootsuite) **no tienen API programática** — son dashboards GUI para humanos.

**Alternativas API-first (2026):**

| Herramienta | Precio | Plataformas | Self-hosted |
|-------------|--------|-------------|:-----------:|
| **Postiz** | Open source | IG, TikTok, LinkedIn, X, FB, YouTube, Reddit, Pinterest, Threads | ✅ |
| **Simplified CLI** | npm package | 10 plataformas unificadas | ✅ |
| **Ayrshare** | $149/mes | Todas las principales + API REST | ❌ |
| **n8n + community nodes** | Gratis (self-hosted) | Instagram (node), LinkedIn (HTTP), TikTok (HTTP) | ✅ |

**Recomendación:** **n8n self-hosted** en un VPS chico (o en la máquina local con túnel) + community nodes para Instagram + llamadas HTTP directas para LinkedIn/TikTok. Es gratis, permite lógica condicional y tiene interfaz visual para debuggear.

---

## FRENTE 3 — ARQUITECTURA DE IMPLEMENTACIÓN

### Stack tecnológico

```
Generación de contenido:
  DeepSeek API (deepseek-chat) → copys, guiones, ideas
  Claude (optional) → contenido premium, artículos LinkedIn

Orquestador:
  n8n self-hosted → workflows programados
  O: scripts Node.js + cron (más simple, menos dependencias)

APIs sociales:
  Instagram → Meta Graph API v22 (direct HTTP)
  TikTok → Content Posting API v2 (direct HTTP, video nomás)
  LinkedIn → /v2/ugcPosts (direct HTTP)

Hosting:
  VPS Hostinger (ya tienen) o máquina de Lucas
  O: GitHub Actions (cron jobs gratuitos para scripts ligeros)

Métricas:
  Google Sheets API → dashboard simple
  O: n8n built-in dashboard
```

### Pipeline de contenido (workflow diario)

```
1. INPUT: Tema del día ("visa de trabajo en Chile", "cómo validar título extranjero", etc.)
       │
2. GENERAR: DeepSeek crea 3 versiones de contenido
       │  ├─ Instagram: copy cálido + idea visual (foto/gráfico)
       │  ├─ TikTok: guión 60-90s + hook primeros 3s
       │  └─ LinkedIn: artículo/post profesional 800-1500 palabras
       │
3. REVIEW: Humano revisa, edita, aprueba (Google Sheets o web simple)
       │
4. PUBLICAR: n8n/script dispara a la API correspondiente
       │
5. MEDIR: Cada 48hrs, fetch de métricas (likes, comments, shares, nuevos seguidores)
       │
6. APRENDER: DeepSeek analiza qué funcionó mejor → ajusta tono/formato
```

### Plan de contenido inicial (2 semanas)

**Semana 1 — Marca y utilidad**

| Día | Instagram | TikTok | LinkedIn |
|-----|-----------|--------|----------|
| Lunes | "Quiénes somos" — foto real del equipo | Video presentación: "No somos abogados, somos inmigrantes que ya pasaron por esto" | Artículo: "Lo que nadie te dice sobre migrar a Chile" |
| Martes | Tip del día: documento X para visa Y | Explicación animada de un trámite | Post: "5 errores comunes al pedir residencia" |
| Miércoles | Testimonio (anónimo) | Historia real de éxito (con permiso) | Compartir noticia de migración + opinión |
| Jueves | Infografía: pasos para visa Z | "Un día en la vida de un asesor migratorio" | Post: "¿Vale la pena contratar un abogado de migración?" |
| Viernes | Pregunta a la comunidad | Respuesta a pregunta frecuente | Artículo: "Guía completa: visa de residencia temporaria" |
| Sábado | Behind the scenes — equipo trabajando | Trend adaptado al nicho migratorio | (descanso LinkedIn) |
| Domingo | Reflexión personal del papá/polola | "Lo que me hubiera gustado saber antes de migrar" | (descanso LinkedIn) |

**Semana 2 — Conversión y profundidad**

| Día | Instagram | TikTok | LinkedIn |
|-----|-----------|--------|----------|
| Lunes | Caso real (antes/después) | Tutorial rápido de trámite específico | Post: "El verdadero costo de migrar a Chile en 2026" |
| Martes | "Preguntame lo que quieras" (caja de preguntas) | Dúo con cliente satisfecho | Artículo: "Inserción laboral para inmigrantes" |
| Miércoles | Comparativa: Chile vs otros países | Mitos sobre migración desmentidos | Networking: comentar en posts relevantes |
| Jueves | Testimonio 2 | "Errores que cometí al migrar" | Post: "Documentación: checklist completo" |
| Viernes | Servicios (precios, qué incluye) | "Por qué confiar en alguien que ya pasó por esto" | Artículo: "Salud, vivienda, trabajo: la trifecta del inmigrante" |
| Sábado | Comunidad: repostear historia de seguidor | Trend migratorio + dato útil | (descanso) |
| Domingo | Frase/reflexión | (descanso) | (descanso) |

### Script de generación de contenido con IA

Estructura sugerida para el prompt system de DeepSeek:

```
Eres un creador de contenido para "Tu Asesor Migratorio", una agencia chilena
de asesoría para inmigrantes. NO somos abogados — somos personas que ya pasaron
por el proceso migratorio y ayudamos a otros con experiencia real.

Tono: profesional pero cálido, español chileno (de tú, sin voseo), cercano,
sin tecnicismos legales innecesarios.

Para cada tema que te den, generás 3 formatos:
1. Instagram (150-300 chars, cálido, emoji 1-2 max, llamado a acción suave)
2. TikTok (guión 60-90s: hook 3s potente + cuerpo + CTA + hashtags)
3. LinkedIn (800-1500 palabras, profesional, datos, experiencia personal, sin hashtags excesivos)

Reglas:
- Nunca mientas sobre credenciales legales
- Siempre incluir valor práctico (un dato, tip, o recurso)
- No uses jerga IA (glow words, "en un mundo donde", "imagina")
- Los hooks de TikTok deben ser FRASES REALES que una persona diría
```

### Plan de acción — próximos pasos

1. **ESTA SEMANA:** Crear cuentas Business/Creator en las 3 plataformas
2. **ESTA SEMANA:** Configurar Meta Developer App (para Instagram)
3. **ESTA SEMANA:** Crear LinkedIn Developer App
4. **ESTA SEMANA:** Solicitar TikTok Content Posting API audit
5. **SEMANA 2:** Configurar n8n o scripts Node.js con DeepSeek
6. **SEMANA 2:** Grabar 5-10 videos base para TikTok/Reels
7. **SEMANA 3:** Publicar primera semana de contenido manualmente
8. **SEMANA 4:** Activar pipeline semi-automático (IA genera, humano publica)
9. **MES 2:** Activar publicación automática con revisión humana

---

## FRENTE 1 — PÁGINA WEB (siguiente fase)

**Dominio:** `tuasesormigratorio.cl` (por confirmar)
**Tecnología:** EQUIX (generar con IA, editar builder)
**Hosting:** Vercel (gratis) o Hostinger

**Secciones planeadas:**
- Hero: "Migrar a Chile no tiene que ser solitario"
- Servicios (visas, residencia, inserción laboral, vivienda)
- ¿Quiénes somos? (fotos reales del papá y la polola)
- Testimonios
- Blog / Guías migratorias
- WhatsApp button (CTA principal)
- Contacto

**Pendiente de Lucas:** Logo + dominio final + fotos del equipo.

---

*Documento generado por Gobernador D — 2026-07-08.*
