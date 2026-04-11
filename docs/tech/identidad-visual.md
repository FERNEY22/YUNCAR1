# Guía de Identidad Visual — YUNCAR MVP
*Servicios de Mantenimiento Eléctrico y Electromecánico Industrial*
*Versión: 1.0 | Fecha: 11/04/2026 | Autor: Arnold Ferney Torres Ome*

---

## 1. Principio de Diseño

Paleta industrial contenida. El diseño transmite confianza técnica y profesionalismo — no creatividad decorativa. El naranja (`#E8500A`) es el único acento y nunca supera el 20% del área visible. Máximo 2 colores por sección.

---

## 2. Paleta de Colores

| Token CSS | Nombre | Hex | Uso |
|-----------|--------|-----|-----|
| `--color-dark` | Azul Marino | `#1A3A5C` | Navbar · Footer · Títulos · Fondo SLA box |
| `--color-title` | Título Principal | `#0D1F33` | H1 · Texto hero sobre fondo claro |
| `--color-mid` | Azul Medio | `#3A5068` | Subtítulos · Párrafos · Texto secundario |
| `--color-muted` | Gris Azulado | `#5A7088` | Metadata · Labels · Texto muted |
| `--color-accent` | Naranja Industrial | `#E8500A` | Botón primario · Highlights · Íconos · Acento |
| `--color-warm` | Ámbar | `#F5A623` | Métricas secundarias · Badges de alerta |
| `--color-bg` | Fondo General | `#F4F6FA` | Background del sitio · Sección proyectos |
| `--color-surface` | Superficie | `#FFFFFF` | Tarjetas · Formulario · Inputs · Navbar |
| `--color-border` | Borde Neutro | `#DCE8F0` | Bordes de tarjetas · Divisores · Inputs |

---

## 3. Tipografía

### Títulos — Trebuchet MS
| Elemento | Tamaño | Peso | Color |
|----------|--------|------|-------|
| H1 — Hero principal | 25px | Medium (500) | `#0D1F33` + border-left 3px `#E8500A` |
| H2 — Sección | 16–18px | Medium (500) | `#1A3A5C` |
| H3 — Subsección/Tarjeta | 11–13px | Medium (500) | `#1A3A5C` |
| Logo — YUNCAR | 15px | Medium (500) | YUN: `#1A3A5C` · CAR: `#E8500A` |

### Cuerpo y UI — system-ui / sans-serif
| Elemento | Tamaño | Peso | Color |
|----------|--------|------|-------|
| Body — Párrafos | 13px | Regular | `#3A5068` · line-height 1.65 |
| Small — Metadata | 10–11px | Regular | `#5A7088` |
| Label — Formulario | 9px | SemiBold | uppercase · letter-spacing .05em · `#1A3A5C` |
| Badge / Pill | 10px | Medium | border-radius 12px |

**Font stack:** `var(--font-sans)` → `system-ui, -apple-system, 'Segoe UI', Arial, sans-serif`

---

## 4. Variables CSS (index.css)

```css
:root {
  /* Colores principales */
  --color-dark:    #1A3A5C;
  --color-title:   #0D1F33;
  --color-mid:     #3A5068;
  --color-muted:   #5A7088;
  --color-accent:  #E8500A;
  --color-warm:    #F5A623;
  --color-bg:      #F4F6FA;
  --color-surface: #FFFFFF;
  --color-border:  #DCE8F0;

  /* Tipografía */
  --font-sans: system-ui, -apple-system, 'Segoe UI', Arial, sans-serif;

  /* Espaciado */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;

  /* Bordes */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-pill: 20px;
}
```

---

## 5. Componentes

### Navbar
- Fondo: `--color-surface` (#FFFFFF) · `border-bottom: 0.5px solid #DCE8F0`
- Logo: "YUN" en `--color-dark` · "CAR" en `--color-accent` · font-weight 500 · letter-spacing .04em
- Links: 11px · `#3A5068` · hover: background `#F0F4F8` color `#1A3A5C`
- Botón Contacto: background `--color-accent` · texto blanco · hover `#C94008`
- Link activo: background `#EEF2F8` · color `#1A3A5C` · font-weight 500

### Botones
- **Primario:** fondo `#E8500A` · texto blanco · border-radius `var(--radius-sm)` · hover `#C94008`
- **Secundario:** fondo blanco · border 1.5px `#E8500A` · texto `#E8500A` · hover background `#FFF2EE`

### H1 Hero
- `border-left: 3px solid #E8500A` · `padding-left: 16px`
- font-size: 25px · font-weight: 500 · color: `#0D1F33` · line-height: 1.22

### Tarjetas de servicio
- Fondo `--color-surface` · border 0.5px `#DCE8F0` · border-radius `var(--radius-md)`
- Hover: `transform: translateY(-2px)` · `box-shadow: 0 4px 14px rgba(26,58,92,.09)`
- Ícono: background `#FFF2EE` · border-radius 6px · 28×28px
- Badge normal: background `#F4F6FA` · border `#CDD9E8`
- Badge urgente: background `#FFF2EE` · border `#F5B0A0` · texto `#B03A08`

### Formulario de contacto
- Label: 9px SemiBold uppercase letter-spacing .05em `#1A3A5C`
- Input: fondo blanco · border 0.5px `#CDD9E8` · border-radius `var(--radius-sm)` · padding 6px 9px
- Input focus: `border-color: #E8500A` · `box-shadow: 0 0 0 2px rgba(232,80,10,.08)`
- Input error: `border-color: #C0392B`
- Placeholder: `#AABBCC`

### Pills y badges
- Pill zona: fondo blanco · border `#CDD9E8` · border-radius `var(--radius-pill)` · dot naranja `#E8500A`
- Pill filtro activo: fondo `#1A3A5C` · texto blanco

---

## 6. Reglas de Aplicación

✅ El naranja (`#E8500A`) solo en botones, íconos e highlights
✅ Navbar: fondo blanco con `border-bottom` — no fondo oscuro
✅ H1 con `border-left: 3px solid #E8500A` + `padding-left: 16px`
✅ Logo: "YUN" azul marino · "CAR" naranja — siempre
✅ Secciones alternas: `#FFFFFF` / `#F4F6FA`
✅ Fondo secciones de contenido: siempre claro

🚫 No usar fondos oscuros en secciones de contenido
🚫 No usar el naranja como color de fondo de sección
🚫 No centrar texto de párrafos — solo títulos
🚫 No mezclar más de 2 pesos de fuente por sección
🚫 No hardcodear colores en JSX — siempre usar `var(--color-*)` en CSS

---

## 7. Próximos Pasos

1. **Figma** — Prototipo Hi-Fi usando este mockup y guía como base (entregable normativo)
2. **index.css** — Implementar bloque `:root` con todos los tokens
3. **App.jsx + Router** — 5 rutas con Header y Footer usando tokens
4. **Componentes React** — Nunca hardcodear colores en JSX

---

*Arnold Ferney Torres Ome · Práctica en Emprendimiento · Ingeniería de Software · YUNCAR · 2026*
