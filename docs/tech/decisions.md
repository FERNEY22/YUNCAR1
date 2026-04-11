# Decisiones Técnicas — YUNCAR MVP
*Registro de Architecture Decision Records (ADR)*
*Última actualización: 11/04/2026 | Autor: Arnold Ferney Torres Ome*

---

## 001 | Arquitectura del Proyecto
- **Fecha**: 23/02/2026
- **Decisión**: Monorepo con carpetas `/frontend` (React) y `/backend` (Node.js)
- **Razón**: Desarrollo ágil en solitario, despliegue independiente, escalabilidad futura
- **Estado**: ✅ Vigente

---

## 002 | Stack Tecnológico
- **Fecha**: 23/02/2026
- **Frontend**: React 18.2.0 + Vite 5.0.8 — rápido, componente-based, fácil mantenimiento
- **Backend**: Node.js + Express 4.18.2 — mismo lenguaje JS, API REST ligera
- **Base de datos**: Firebase Firestore (principal) — plan gratuito Spark, NoSQL flexible
- **Deploy**: VPS + Nginx + Let's Encrypt — identidad digital profesional desde el MVP
- **Estado**: ✅ Vigente

---

## 003 | Gestión del Proyecto
- **Fecha**: 23/02/2026
- **Metodología**: Kanban con GitHub Projects — tablero de 5 columnas, WIP limitado
- **Convención de commits**: `[F-XX] descripción Closes #N` — trazabilidad automática
- **Seguimiento**: Matriz en `docs/tech/tracking.md` — actualización por Issue cerrado
- **Estado**: ✅ Vigente

---

## 004 | Infraestructura Digital
- **Fecha**: 23/02/2026
- **Dominio**: Propio (.com.co) — credibilidad inmediata en mercado colombiano
- **SSL**: Let's Encrypt — gratuito, estándar de seguridad
- **Correos**: Corporativos vinculados al dominio — profesionalismo en comunicación
- **Estado**: ✅ Vigente — implementación en Issue #13 y #15

---

## 005 | CSS sin Framework
- **Fecha**: 07/03/2026
- **Decisión**: CSS3 puro sin framework (sin Tailwind, Bootstrap ni similares)
- **Alternativas consideradas**: Tailwind CSS, Bootstrap 5
- **Razón**: Menor peso de bundle, control total sobre estilos, suficiente para MVP de una sola persona, sin curva de aprendizaje adicional
- **Impacto**: Todo el CSS vive en `index.css` con variables globales en `:root`
- **Estado**: ✅ Vigente

---

## 006 | Naming CSS — `--color-primary` vs `--color-dark`
- **Fecha**: 11/04/2026
- **Decisión**: Usar `--color-primary` en lugar de `--color-dark` como se definió en la guía de identidad visual
- **Razón**: Más semántico para un sistema de diseño — `primary` describe el rol del color, no su apariencia
- **Impacto**: `index.css` usa `--color-primary` · La guía `identidad-visual.md` usa `--color-dark` · Ambos apuntan a `#1A3A5C`
- **Acción requerida**: Ninguna — son equivalentes. Mantener `--color-primary` en el código
- **Estado**: ✅ Documentado — no requiere cambio

---

## 007 | Paleta de Colores — Versión final aprobada
- **Fecha**: 11/04/2026
- **Decisión**: Paleta azul marino + naranja industrial extraída del mockup `yuncar_mockup_v2_proyectos.html`
- **Colores principales**:
  - `--color-primary: #1A3A5C` — Azul marino
  - `--color-accent: #E8500A` — Naranja industrial (único acento)
  - `--color-secondary: #F5A623` — Ámbar (métricas y badges)
  - `--color-bg: #F4F6FA` — Fondo general
  - `--color-surface: #FFFFFF` — Tarjetas e inputs
  - `--color-border: #DCE8F0` — Bordes y divisores
- **Razón**: Paleta sobria y contenida que transmite confianza técnica industrial. El naranja como único acento evita sobre-estimulación visual
- **Estado**: ✅ Vigente — implementada en `index.css`

---

## 008 | ContactForm — Página y componente
- **Fecha**: 11/04/2026
- **Decisión**: `ContactForm` existe en dos lugares: como página en `pages/ContactForm.jsx` (ruta `/contacto`) y como componente en `components/ContactForm.jsx`
- **Razón**: La ruta `/contacto` necesita la página completa con header, sidebar y SLA card. El componente puede reutilizarse en otras secciones
- **Impacto**: Mantener sincronizados ambos archivos si se hacen cambios al formulario
- **Estado**: ✅ Vigente

---

## 009 | Portfolio — Placeholder hasta casos reales
- **Fecha**: 11/04/2026
- **Decisión**: `Portfolio.jsx` se mantiene como placeholder informativo sin casos ficticios
- **Razón**: Integridad del emprendimiento — no se fabrican referencias que no han ocurrido. El auditor puede verificar esta decisión como parte de la metodología Lean (validar con mercado real)
- **Próximo paso**: Agregar casos reales una vez ejecutados con autorización del cliente
- **Estado**: ✅ Vigente

---

## 010 | Base de datos — Firebase vs MongoDB Atlas
- **Fecha**: 11/04/2026
- **Decisión**: PENDIENTE DE RESOLUCIÓN antes del Issue #9 (Backend)
- **Situación actual**: `config/firebase.js` apunta a Firebase · `models/Consult.js` sugiere Mongoose (MongoDB)
- **Opciones**:
  - Firebase Firestore: plan gratuito Spark, sin servidor adicional, SDK directo desde frontend si se requiere
  - MongoDB Atlas: más flexible para consultas complejas, requiere Mongoose en backend
- **Deadline para decidir**: Inicio del Issue #9 (20/04/2026)
- **Estado**: ⚠️ Pendiente

---

## 011 | Sin Redux ni Context API
- **Fecha**: 11/04/2026
- **Decisión**: No usar Redux, Zustand ni Context API para manejo de estado
- **Razón**: El MVP no tiene estado compartido complejo. Props y `useState` local son suficientes para las páginas actuales
- **Revisión**: Evaluar si se necesita Context cuando se integre autenticación (fuera del alcance del MVP actual)
- **Estado**: ✅ Vigente

---

## 012 | Rama única — main
- **Fecha**: 07/03/2026
- **Decisión**: Trabajo sobre rama `main` sin branching strategy compleja
- **Razón**: Proyecto individual, MVP, sin equipo paralelo. El riesgo de conflictos es mínimo
- **Mitigación**: Commits atómicos por Issue, nunca push sin validar en localhost primero
- **Estado**: ✅ Vigente

---

*Documento vivo: Se actualiza con cada decisión técnica relevante al cierre de cada sesión.*
*Próxima actualización: Inicio del Issue #9 — decisión Firebase vs MongoDB.*