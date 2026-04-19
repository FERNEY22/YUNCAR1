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
- **Base de datos**: MongoDB Atlas M0 (Project dedicado YUNCAR) — reemplaza plan original Firebase Firestore
- **Deploy**: Render free (backend) + Netlify (frontend) + UptimeRobot — reemplaza plan original VPS + Nginx + Let's Encrypt
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
- **SSL**: Gestionado automáticamente por Render y Netlify — HTTPS incluido
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
- **Fecha**: 11/04/2026 (decisión) · 18/04/2026 (implementación)
- **Decisión**: MongoDB Atlas + Mongoose reemplaza a Firebase Firestore
- **Razón**: Operaciones agregadas más potentes para panel admin futuro
- **Impacto**: Project dedicado `YUNCAR` en Atlas, cluster `yuncar-cluster` 
- **Estado**: ✅ Vigente
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


## 013 | Schema Consult — Estados operativos
- **Fecha**: 18/04/2026
- **Decisión**: El schema `Consult.js` define un enum `estado` con cuatro valores: `nuevo`, `en_gestion`, `cerrado_ganado`, `cerrado_perdido`
- **Razón**: Trazabilidad operativa del lead a través del ciclo de venta. Permite filtros y estadísticas en el panel admin
- **Impacto**: Todo lead arranca como `nuevo` por default. Las transiciones las hace el admin desde el panel
- **Estado**: ✅ Vigente

---

## 014 | Panel admin protegido con ADMIN_KEY
- **Fecha**: 18/04/2026
- **Decisión**: Las rutas del panel admin (`/api/leads/*`) se protegerán con un header que valide contra la variable de entorno `ADMIN_KEY`
- **Razón**: El MVP no requiere sistema completo de usuarios con JWT. Una clave secreta en el `.env` es suficiente para proteger el panel personal del administrador
- **Impacto**: `ADMIN_KEY` generada con `crypto.randomBytes(32)`. Middleware `auth.js` por implementar
- **Estado**: ✅ Vigente

---

## 015 | Reporte semanal con node-cron
- **Fecha**: 18/04/2026
- **Decisión**: Se generará un reporte semanal de leads nuevos enviado al correo del admin cada lunes a las 7:00 AM vía `node-cron`
- **Razón**: Visibilidad operativa sin obligar al admin a entrar al panel. Resumen ejecutivo en el inbox
- **Impacto**: Dependencia `node-cron` por agregar. Implementación en Issue futuro
- **Estado**: ⏳ Pendiente

---

## 016 | Frontend avanzado después del backend
- **Fecha**: 18/04/2026
- **Decisión**: Los componentes nuevos del frontend (Google Maps, Chart.js, Panel Admin) solo se desarrollan después de que el backend esté probado y desplegado
- **Razón**: Evitar integrar frontend contra endpoints que aún no existen o pueden cambiar. Reducir re-trabajo
- **Impacto**: Componentes frontend avanzados quedan después del Issue #12 (pruebas backend)
- **Estado**: ✅ Vigente

---

## 017 | Email post-dominio — Zoho Mail Free
- **Fecha**: 18/04/2026
- **Decisión**: Cuando se adquiera el dominio `yuncar.com.co`, el email corporativo se hospedará en Zoho Mail Free (5 usuarios, 5 GB cada uno, permanente sin costo)
- **Razón**: Único servicio que ofrece email profesional con dominio propio sin costo perpetuo y sin obligar a contratar hosting Apache/PHP/MySQL incompatible con el stack. Alternativas descartadas: Hostinger, IONOS, GoDaddy
- **Impacto**: Se activará en Issue #15 del Kanban. Configuración DNS en Namecheap (MX, SPF, DKIM)
- **Estado**: ⏳ Pendiente

---

## 018 | UptimeRobot + /api/health
- **Fecha**: 18/04/2026
- **Decisión**: Endpoint `GET /api/health` en el backend, monitoreado por UptimeRobot con ping cada 5 minutos
- **Razón**: Render free suspende el backend tras 15 min de inactividad (cold start 30-60 seg). El ping evita la suspensión y provee monitoreo de uptime con alerta por correo
- **Impacto**: Endpoint implementado en Sesión 6. Monitor UptimeRobot por configurar al momento del deploy
- **Estado**: ✅ Vigente

---

## 019 | Email SMTP MVP — Gmail en lugar de Outlook
- **Fecha**: 18/04/2026
- **Decisión**: Gmail con App Password sobre cuenta `a.ferney.torres@gmail.com` con 2FA activo, en lugar del plan original con Outlook
- **Razón**: Microsoft retiró Basic Auth SMTP para cuentas consumer. El servidor devolvió literal `535 5.7.139 Authentication unsuccessful, basic authentication is disabled`. La única alternativa con Outlook sería OAuth2, desproporcionado para un MVP
- **Impacto**: Configuración SMTP en `.env` usa `smtp.gmail.com:587`. Plan de migración a Zoho con `contacto@yuncar.com.co` cuando se compre el dominio (Issue #15)
- **Estado**: ✅ Vigente

---

## 020 | Dominios consolidados en Namecheap
- **Fecha**: 18/04/2026
- **Decisión**: `yuncar.com.co` se comprará en Namecheap
- **Razón**: Un solo proveedor para todos los dominios simplifica gestión DNS, renovaciones y facturación
- **Impacto**: Gestión DNS para MX records de Zoho se hará desde Namecheap
- **Estado**: ⏳ Pendiente

---

## 021 | Deuda técnica Issue #8
- **Fecha**: 18/04/2026
- **Decisión**: 9 hallazgos de severidad Baja/Media/Informativa quedan documentados como deuda técnica, no se corrigen en Sesión 5
- **Razón**: Los fixes prioritarios (severidad Alta) ya se corrigieron. Los hallazgos restantes son estructurales o menores — se abordarán en sprint de refactor posterior al Issue #12
- **Impacto**: Ver tabla "Hallazgos documentados como deuda técnica" en `tracking.md`
- **Estado**: ✅ Vigente

---

## 022 | Project Atlas dedicado por proyecto
- **Fecha**: 18/04/2026
- **Decisión**: Se crea un Project MongoDB Atlas independiente (`YUNCAR`) 
- **Razón**: Aislamiento de métricas, credenciales, IP whitelist y cuotas. Atlas free permite 1 cluster M0 por Project — Project separado es la única vía para cluster dedicado
- **Impacto**: Mayor higiene arquitectónica. String de conexión separado en `.env`
- **Estado**: ✅ Vigente

---

## 023 | Corrección de trazabilidad post-push sin rebase
- **Fecha**: 18/04/2026
- **Decisión**: Si un commit ya pusheado quedó con referencia equivocada al Issue del Kanban, NO se reescribe historia. Se agrega un cambio mínimo documental al archivo afectado y se hace nuevo commit con la referencia correcta
- **Razón**: Preserva historia git sin riesgo, evita force-push, mantiene trazabilidad por archivo en GitHub, funciona con automatización `Closes #N` del Kanban
- **Impacto**: Aplicado en Sesión 6 tras detectar que los primeros 7 commits referenciaban solo `#9` cuando el trabajo cubría `#9`, `#10` y `#11`
- **Estado**: ✅ Vigente

---

## 024 | Nodemailer 8.0.5 en lugar de 6.9.7
- **Fecha**: 18/04/2026
- **Decisión**: Actualización del plan original `nodemailer@^6.9.7` a `nodemailer@^8.0.5`
- **Razón**: Nodemailer 6.10.1 presenta 4 CVEs de severidad Alta. Las ramas 6.x y 7.x quedaron sin backport. La única versión parchada es 8.0.5+
- **Impacto**: `package.json` actualizado. Breaking changes de 7→8 no afectan el caso de uso SMTP tradicional
- **Estado**: ✅ Vigente

---

## 025 | TLS rejectUnauthorized false en desarrollo local
- **Fecha**: 18/04/2026
- **Decisión**: El transporter de Nodemailer incluye `tls: { rejectUnauthorized: false }` en el entorno de desarrollo local
- **Razón**: Node.js en la máquina del desarrollador devolvía `self-signed certificate in certificate chain` contra cualquier SMTP. Causa probable: antivirus o proxy inyectando certificado propio. En producción este flag probablemente no sea necesario
- **Impacto**: Implementado en Sesión 6. Al deploy en Render probar sin el flag y remover si Render valida correctamente
- **Estado**: 🔄 Revisar en Sesión 7

---

## 026 | Módulos backend CommonJS
- **Fecha**: 18/04/2026
- **Decisión**: El backend usa CommonJS (`require` / `module.exports`) en lugar de ESM (`import` / `export`)
- **Razón**: Consistencia 80% de docs/ejemplos de Express/Mongoose/Nodemailer usan CommonJS, menos "gotchas" con extensiones de archivo y `__dirname`
- **Impacto**: `package.json` sin `"type": "module"`. Próximos proyectos nuevos pueden arrancar con ESM
- **Estado**: ✅ Vigente

---

## 027 | package-lock.json se commitea
- **Fecha**: 18/04/2026
- **Decisión**: El archivo `package-lock.json` se versiona en el repo. Se corrigió el `.gitignore` previo que lo excluía
- **Razón**: El `package.json` declara rangos que permiten versiones distintas entre `npm install` local y en Render. El lockfile pinnea las versiones exactas garantizando paridad entre entornos. Estándar de la industria desde npm 5
- **Impacto**: Evita el clásico "en mi máquina funciona". Cambio aplicado en `.gitignore` del monorepo
- **Estado**: ✅ Vigente

---
