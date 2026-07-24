# Portafolio — Maria Adriana Contreras Soto

Sitio estático (HTML + CSS + JS + Bootstrap 5) listo para abrir directamente
con `index.html` o publicar en GitHub Pages / Netlify / Vercel.

## Estructura
```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
└── assets/profile-placeholder.jpg   ← foto de ejemplo, cámbiala
```

## Qué se implementó de tu lista

- **Fondo animado tipo ShaderGradient** (`index.html`, sección `.bg-layer`):
  se usa un `<iframe>` apuntando a tu enlace de shadergradient.co en modo
  `embedMode=on`, combinado con 3 "glows" en CSS (mint / purple / orange)
  para lograr el efecto de aurora que se ve en tu Figma sin perder el
  movimiento del shader original.
  - Para cambiar entre **Mint** y **Universe**: entra a
    https://shadergradient.co/customize , elige el preset que quieras,
    copia la URL generada y reemplaza el `src` del iframe en `index.html`.
- **Ojos SVG con movimiento** (logo "MACS" en la navbar, `.brand-face`):
  las pupilas siguen el cursor del mouse con JS (`moveEyes()` en `script.js`).
  En pantallas táctiles hacen un movimiento ambiental automático.
- **Tarjetas de proyectos movibles**: contenedor `#cardsTrack` con
  "drag to scroll" (mouse, touch y rueda del mouse) + efecto hover tipo
  tarjeta de Uiverse (elevación, giro leve, glow).
- **Botón "Ver todo" con borde degradado animado**: `.btn-glow-border`,
  inspirado en el estilo de botón que compartiste (borde giratorio con
  `@property --angle`).
- **Skills con barras de progreso animadas**: GitHub 80%, HTML 100%,
  JS 95%, Bootstrap 90%, Python 60%, Java 80% — se llenan solas cuando
  haces scroll hasta la sección (Intersection Observer).
- Colores tomados de tu mockup: fondo casi negro `#07070c`, acentos
  menta `#94ffd1`, cian `#6bf5ff`, morado `#c58bff`, naranja `#ffb26b`,
  botones amarillo `#f6d94e` y azul `#3aa0ff`.

## Pendientes para dejarlo 100% listo (cosas que yo no puedo hacer por ti)

1. **Foto de perfil real**: `assets/profile-placeholder.jpg` es un
   recorte de baja resolución tomado de tu propia imagen de Figma, solo
   para que veas el efecto del anillo giratorio. Reemplázala por tu foto
   en buena calidad (cuadrada, mínimo 500×500px).
2. **Iconos de Flaticon**: no tengo forma de descargar archivos de
   Flaticon directamente. Si tienes un SVG de Flaticon específico que
   quieras usar como el "logo con ojos", pégalo en `index.html` donde
   está el `<svg class="face-eyes">` y el JS de `script.js` seguirá
   moviendo cualquier elemento con clase `.pupil` dentro de `.eye`.
3. **Enlaces reales**: cambia los `href="#"` y `https://github.com/`,
   `https://linkedin.com/`, el correo y el WhatsApp por tus datos reales.
4. **Código exacto de Uiverse**: uiverse.io genera el HTML/CSS con
   JavaScript en el navegador, así que no pude leer el código fuente
   exacto de las tarjetas y el botón que enlazaste. Recreé el mismo
   estilo visual (tarjeta oscura con glow, botón con borde degradado
   giratorio) directamente en `style.css`, ya integrado con tus colores.
   Si quieres el snippet 100% original, cópialo tú desde la página
   (botón "Copy") y yo te ayudo a integrarlo.

## Cómo previsualizar
Solo abre `index.html` en tu navegador. Si vas a subirlo a GitHub Pages,
sube toda la carpeta `portfolio/` tal cual.
