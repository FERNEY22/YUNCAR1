## Issue #8 — Pruebas de usabilidad frontend

**Período:** 13/04 – 20/04/2026
**Sesión de ejecución:** 5 (18/04/2026)
**Autor:** Arnold Ferney Torres Ome
**Commit de cierre:** [F-08] pruebas de usabilidad frontend Closes #8

### Alcance ejecutado

Auditoría estática de 12 archivos del frontend contra los 4 puntos del criterio de usabilidad (sección 10.1 PROMPT MAESTRO v4):

1. Responsive mobile 375px
2. Contraste de colores vs paleta aprobada (sección 3)
3. Formulario — estados idle/sending/success/error
4. Navegación hamburguesa mobile

Archivos auditados: App.jsx, main.jsx, index.css, index.html, package.json, vite.config.js, Header.jsx, Footer.jsx, FloatingButtons.jsx, ContactForm.jsx, Home.jsx, Services.jsx, About.jsx, Projects.jsx, Portfolio.jsx.

### Nota metodológica

La planeación original del Issue #8 en el PROMPT MAESTRO lo definía como "pruebas de usabilidad" (solo documentación). Durante la ejecución se tomó la decisión de no solo documentar hallazgos sino también corregir los de severidad Alta y Media en commits atómicos separados, todos referenciando `#8`, con un commit final `Closes #8`. Esta desviación se documenta aquí como aprendizaje: las pruebas de usabilidad tienen más valor si incluyen la corrección, siempre que cada corrección tenga trazabilidad individual.

### Hallazgos corregidos en esta sesión

| Ref | Archivo | Descripción del fix | Commit |
|-----|---------|---------------------|--------|
| G1 | vite.config.js | Proxy backend `:5000` → `:3001` (alinea con PROMPT sección 9) | [F-08] fix proxy backend port 3001 #8 |
| E1 | Footer.jsx | Contraste texto legal/scheduleLabel elevado de 0.4/0.45 → 0.65/0.7 alpha (WCAG AA) | [F-08] fix contraste texto legal footer #8 |
| D1 + D2 | pages/ContactForm.jsx | `<label htmlFor>` + `<input id>` + `aria-invalid` + `aria-describedby` vía `cloneElement` en sub-componente Field | [F-08] fix a11y labels y aria en formulario #8 |
| A1 | App.jsx + pages/NotFound.jsx | Ruta catch-all `*` → componente NotFound con CTAs a `/` y `/contacto` | [F-08] add ruta catch-all NotFound #8 |
| A2 | App.jsx + components/ScrollToTop.jsx | Reset de scroll a top al cambiar `useLocation().pathname` | [F-08] add ScrollToTop entre rutas #8 |
| C2 | Header.jsx | Cierre de menú mobile con tecla `Escape` y clic/tap fuera del `<header>` | [F-08] add cierre menu mobile ESC y outside click #8 |
| D3 | pages/ContactForm.jsx | `AbortController` + `setTimeout` 15s en fetch de submit | [F-08] add timeout en submit formulario #8 |
| F1 | pages/Home.jsx | Detección `prefers-reduced-motion` → función `drawStatic()` alternativa al loop animado | [F-08] respeta prefers-reduced-motion en Canvas hero #8 |

### Hallazgos no corregidos — decisiones tomadas

| Ref | Decisión |
|-----|----------|
| C1 | `/portafolio` se mantiene como ruta accesible por URL directa con página "en construcción" como mensaje intencional. No requiere fix de código. |

### Hallazgos documentados como deuda técnica

Los siguientes hallazgos no se corrigieron en esta sesión y quedan registrados para futuras iteraciones (pueden integrarse a sprints de refactor posterior a Issue #9):

| Ref | Archivo | Hallazgo | Severidad |
|-----|---------|----------|-----------|
| B2 | index.css + index.html | Fuente Inter declarada pero `<link>` a Google Fonts comentado. Fallback actual a Segoe UI. Decisión estructural pendiente. | Media |
| B3 | index.css | `html { font-size: 19px }` escala sistema rem +18%. Cambio estructural — evaluar antes de tocar. | Media |
| B4 | Múltiples jsx | Colores hardcodeados repetidos (`#fff2ee`, `#eef2f8`, `#fdf4d8`, `#FDECEA`, `rgba(255,255,255,0.7x)`). Consolidar tokens en index.css en refactor posterior. | Baja |
| B5 | index.css | Breakpoint 768px inconsistente: `.container` usa `min-width`, nav usa `max-width` → ambos aplican en 768px exacto. | Baja |
| B7 | index.css | `:focus-visible` outline usa `--color-accent`, igual color que fondo de `.btn-primary`. | Baja |
| C3 | Header.jsx | Falta `aria-controls` en botón hamburguesa. | Baja |
| D4 | pages/ContactForm.jsx | Validación teléfono solo chequea trim (acepta letras, cualquier longitud). | Baja |
| H1 | package.json | `axios@1.6.2` listado como dependencia pero no utilizado (se usa `fetch` nativo). | Baja |
| I1 | — | Warnings de consola React Router v7 future flags (`v7_startTransition`, `v7_relativeSplatPath`). No afectan funcionalidad. | Informativo |

### Elementos verificados — OK

- `lang="es"`, viewport meta, Open Graph tags, SEO básico
- Favicon SVG inline funcional
- Touch targets ≥ 44px en botones e inputs
- 4 estados de formulario completos (idle/sending/success/error)
- `aria-expanded` + `aria-label` dinámico en hamburguesa
- Grids responsive `auto-fit minmax` consistentes

### Pruebas manuales pendientes del usuario

Auditoría estática + correcciones en código no reemplazan validación en dispositivo físico. Checklist sugerido para sesión de pruebas físicas posterior:

1. DevTools Chrome/Firefox — viewport 375×667 iPhone SE
2. Recorrer las 7 rutas: `/`, `/servicios`, `/proyectos`, `/nosotros`, `/contacto`, `/portafolio`, ruta inventada para probar NotFound
3. Verificar ScrollToTop al navegar entre páginas (especialmente desde footer)
4. Menú hamburguesa: abrir → presionar ESC → cerrado. Abrir → clic fuera → cerrado.
5. Formulario `/contacto`: disparar 4 estados (idle, error de validación, sending, error de backend ausente)
6. Contraste footer con lupa en "Horario de oficina" y línea de copyright
7. En Chrome DevTools emular `prefers-reduced-motion: reduce` → verificar Canvas del Home estático
8. Probar formulario con lector de pantalla (NVDA en Windows, VoiceOver en Mac) → confirmar que anuncia labels y errores

### Siguiente hito

Issue #9 — Backend base: MongoDB + `/api/contact` + Nodemailer (período 20/04 – 27/04). Ya en estado In Progress en el Kanban. Al arrancar #9, validar que el proxy `5173 → 3001` funciona con servidor Express en `localhost:3001`.