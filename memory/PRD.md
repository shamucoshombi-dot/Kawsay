# PRD — KAWSAY · Página informativa del proyecto estudiantil

## Declaración del problema (original)
Desarrollar una página web informativa para el proyecto estudiantil KAWSAY (Alumnos del Alfonso Ugarte, enfoque STEAM + H), primera versión de prueba: estructura sólida, identidad visual coherente y experiencia atractiva, sin inventar información institucional, contactos, precios futuros, nombres de profesores ni nombres definitivos de diseños.

## Arquitectura
- Frontend: React (CRA + craco) + Tailwind + framer-motion + Lenis (scroll con momentum) + sonner (toasts). Landing de una página, secciones con scroll suave.
- Backend: FastAPI + Motor (MongoDB). Endpoint `POST /api/contact` y `GET /api/contact` (mensajes guardados en colección `contact_messages`, con modelo BaseDocument/PyObjectId).
- Logos originales del usuario en `frontend/public/` (kawsay-logo.png con fondo vuelto transparente sin alterar sus colores/composición; au-logo.png intacto). Favicon SVG propio (marca de brote, solo favicon).

## Identidad visual
- Paleta derivada del logo: verdes (forest #33422C, pine #3E5233, leaf #5C7043, olive #6E7F45, moss), marrón tierra #7A5138, crema/marfil #F7F3EA/#EFE8D8, blanco complementario.
- Tipografías: Fredoka (títulos, redondeada/orgánica, afín al lettering del logo) + Nunito Sans (cuerpo legible).
- Textura de trama tejida (tocuyo) en marcadores de imagen, grano sutil global, formas orgánicas, marquee editorial, reveals con framer-motion, parallax en hero.

## Personas
- Estudiante del Ugarte: conoce el proyecto y comparte la página.
- Comprador potencial (familia/comunidad): ve el catálogo y envía interés vía formulario.
- Docente/asesor: revisa mensajes guardados en la base de datos.

## Requisitos core (estáticos)
1. Navbar fija con logo KAWSAY, menú (Inicio/Nosotros/Galería/Catálogo/Contáctanos), hamburguesa móvil, scroll suave con sección activa.
2. Hero: KAWSAY + frase + dos párrafos textuales del brief + CTA "Conoce nuestro proyecto" + contenedor reservado para imagen principal.
3. Nosotros: 4 bloques textuales del brief + chips de las 6 disciplinas + tarjetas especiales PERÚ (rojo nacional) y ALFONSO UGARTE (guinda/amarillo + logo AU), con "información próximamente".
4. Galería: 4 bloques (Trabajo colaborativo, Creación y diseño, Elaboración, Participación estudiantil) con marcos de imagen reemplazables + espacio para descripción.
5. Catálogo: 12 tarjetas (Diseño 01–12, nombre/descripción por definir, precio provisional S/ 10.00, botón "Me interesa" que precarga el interés en el formulario).
6. Contáctanos: 3 canales placeholder (profesora, WhatsApp, Instagram) + formulario (Nombre, Medio de contacto, Motivo, Mensaje) que guarda en MongoDB con toast de confirmación.
7. Footer: KAWSAY, tagline, "Alumnos del Alfonso Ugarte", espacios reservados (DPCC, docentes, redes, información institucional).

## Implementado (2026-10-03 — etapa 5, corrección del Hero)
- Hero recompuesto a dos columnas limpias dentro del contenedor: texto a la izquierda (max-w-md en párrafos) y fotografía a la derecha dentro de marco orgánico con borde oliva, object-cover centrado, altura fija contenida (~520–560px) — la foto ya no va full-bleed ni invade el texto (verificado: 56px de separación en 1440px).
- Tarjeta "Bolsas de tocuyo reutilizables" vive dentro del área de la foto (zona inferior), tanto en escritorio como en móvil.
- Decoración del hero reducida a: blob arena, una hoja, punto ocre y arco punteado; parallax más sutil (foto 30px, decor 40px).
- Altura del hero reducida (≈846px): la franja del marquee asoma indicando más contenido debajo.
- Verificado en 1440/768/390: sin solapamiento texto-foto, sin overflow horizontal, sin errores de consola.

## Implementado (2026-10-03 — etapa 4, nueva imagen principal)
- Hero recompuesto alrededor de la foto real del taller (estudiantes pintando bolsas de tocuyo con diseño peruano): foto full-bleed a la derecha en escritorio con fundido cálido hacia el marfil, tinte ocre leve, parallax suave y chip flotante; en móvil la foto va bajo el texto en marco orgánico con borde oliva. La imagen se recortó para usar solo la escena fotográfica pura (la fuente traía texto/tarjeta dibujados). Archivo: public/kawsay-hero.jpg (~145 KB).
- Nueva tinta de acento ocre (#C99A3C) en la paleta, usada con moderación (punto del badge, iconos, detalles).
- Navbar con fondo cristal marfil permanente (legible sobre la foto en todo momento).

## Implementado (2026-10-03 — etapa 3, ajuste visual)
- Página más viva dentro de la paleta Kawsay: los fondos alternan marfil / salvia / crema cálido (#F4EBDA en Galería); nuevos tonos en la config (creamWarm).
- Tarjetas de Nosotros con tintes distintos (crema cálido, verde claro, verde suave, arena) e iconos temáticos; chips de disciplinas STEAM+H con círculos de colores por letra (pino, oliva, marrón, musgo, hoja, bosque).
- Tarjetas PERÚ y ALFONSO UGARTE con más contraste (franjas y lavados más presentes, bordes reforzados, chips sólidos); tarjeta Profesora con fondo salvia suave + lavado marrón.
- Botones: primarios en verde pino (hover bosque), secundarios crema con borde verde; botón "Abrir WhatsApp" sólido oliva.
- Hero con más detalles naturales (aro oliva, puntos marrón, arco punteado curvo) y marco de imagen con borde oliva; los marcos de fotografía (variante "frame") tienen borde y fondo verdosos en Galería.
- Tarjetas de contacto diferenciadas por canal (salvia / verde / crema cálido); formulario con borde leaf; la tarjeta de WhatsApp usa la figura del logo de WhatsApp (SVG propio) en la tinta oliva de Kawsay, no el icono genérico de mensaje ni los colores de marca.

## Implementado (2026-10-03 — etapa 2)
- Enfoque informativo: se eliminó todo lenguaje de compra; el catálogo es presentación informativa (imagen, nombre, descripción, precio S/ 10.00 provisional) sin botones de compra ni "Me interesa".
- Contacto con propósito de consultas/comentarios/ideas: tarjeta "Contacto del proyecto" +51 993 929 294, tarjeta "WhatsApp" con botón wa.me/51993929294, Instagram conservado como placeholder; formulario con motivos exactos: Sugerir una idea / Dejar un comentario / Realizar una consulta.
- Tarjetas especiales compactas: PERÚ (franjas bandera sutiles + chip) y ALFONSO UGARTE (escudo AU + aro dorado + chip guinda/amarillo); debajo, tarjeta "Profesora que inspira" — Mirian Patricia Vega Cruz — con contenedor de foto preparado (sin foto ficticia).
- Marquee más fino y lento (50s), hojas y blobs sutiles en Contacto y Galería; sin desbordamiento horizontal (1440/390 verificado).

## Implementado (2026-10-01)
- Landing completa (todas las secciones), animaciones sutiles (reveals, marquee, hover, parallax hero, reveal enmascarado línea por línea).
- Formulario con guardado real en MongoDB (`POST /api/contact`) verificado con curl y desde la UI.
- Fondos de sección verdosos (sage #E7EDD8) en Nosotros y Catálogo.
- Tarjetas especiales con motivo característico en CSS puro: PERÚ con franjas verticales rojo/blanco/rojo sutiles + chip de bandera; ALFONSO UGARTE con lavado guinda/amarillo, aro dorado y chip guinda/amarillo.
- Panel docente en `/panel` (enlace discreto en el footer): login JWT + bcrypt (docente@kawsay.pe, sembrado desde backend/.env), listado de mensajes con estado leído/no leído, marcar como leído (`PUT /api/contact/{id}/read`), logout, protección de 5 intentos fallidos/15 min. GET /api/contact protegido con cookie httpOnly o Bearer; orígenes de preview de la plataforma permitidos.
- Responsive 1440/390 verificado con capturas; sin desbordamiento horizontal.

## Backlog priorizado
- P0: Reemplazar marcadores por fotos reales (hero, galería, catálogo) — solo cambiar `src` o los labels.
- P1: Cargar datos reales en tarjetas PERÚ / ALFONSO UGARTE y canales de contacto (número profesora, WhatsApp, Instagram).
- P1: Nombres/descripciones definitivos de los 12 diseños y ajuste del precio si cambia.
- P2: Cambio de contraseña del docente dentro del panel; respuestas a mensajes.

## Próximas tareas
1. Sustituir marcadores de imagen por fotografías definitivas.
2. Incorporar datos reales de contacto y de tarjetas especiales.
3. Definir nombres/descripciones de los 12 diseños.
