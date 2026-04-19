## Issue #9 — Desarrollo del backend con Node.js + Express

**Período:** 20/04 – 27/04/2026 (planeado) · 18/04/2026 (ejecutado)
**Sesión de ejecución:** 6 (18/04/2026)
**Autor:** Arnold Ferney Torres Ome
**Commit de cierre:** [F-09] agrega server.js entry point + limpia frontend/public Closes #9

### Alcance ejecutado

Implementación de la base del backend con arquitectura MVC por capas. Stack Node.js ≥ 18 + Express 4.18.2 + CommonJS. Creación de tres archivos fundamentales del servidor (entry point, health check, y la base para las rutas futuras), más actualización del `.gitignore` y `.env.example` del monorepo.

Archivos tocados: server.js, routes/healthRoutes.js, .gitignore, backend/.env.example.

### Nota metodológica

La sesión 6 cubrió en un mismo flujo de trabajo los Issues #9, #10 y #11 del Kanban por continuidad técnica. Los primeros 7 commits se hicieron inicialmente con referencia equivocada a `#9` para todo el trabajo. La corrección se resolvió mediante nuevos commits con cambio mínimo documental en cada archivo afectado y referencia al Issue correcto del Kanban. Esta desviación se documenta aquí como aprendizaje: antes de commitear hay que preguntarse a qué Issue del Kanban pertenece cada archivo y dividir en commits separados por Issue.

### Archivos creados en esta sesión

| Ref | Archivo | Descripción | Commit |
|-----|---------|-------------|--------|
| J1 | .gitignore + backend/.env.example | Monorepo limpio + plantilla pública sin Firebase | [F-09] actualiza gitignore monorepo + plantilla env.example #9 |
| J2 | backend/routes/healthRoutes.js | GET /api/health para UptimeRobot con status, uptime, database | [F-09] agrega route health para UptimeRobot #9 |
| J3 | backend/server.js + frontend/public/index.html | Entry point Express con CORS + middlewares + montaje de rutas | [F-09] agrega server.js entry point + limpia frontend/public Closes #9 |

### Elementos verificados — OK

- `npm run dev` levanta Express sin errores en `localhost:3001`
- Smoke test `GET /` responde JSON con timestamp
- `GET /api/health` responde con `status: ok`, `uptime`, `database: connected`
- Proxy frontend `:5173 → :3001` validado desde Issue #8

### Siguiente hito

Issue #10 — Integración con servicios (Nodemailer + MongoDB). Ejecutado en la misma sesión por continuidad técnica.

---

## Issue #10 — Integración con servicios

**Período:** 27/04 – 04/05/2026 (planeado) · 18/04/2026 (ejecutado)
**Sesión de ejecución:** 6 (18/04/2026)
**Autor:** Arnold Ferney Torres Ome
**Commit de cierre:** [F-10] agrega controller y route contact con Nodemailer Gmail Closes #10

### Alcance ejecutado

Integración de servicios externos sobre el backend base: Nodemailer 8.0.5 + Gmail SMTP para envío transaccional de notificaciones, y MongoDB Atlas + Mongoose para persistencia del lead. Implementación del endpoint `POST /api/contact` que recibe el payload del formulario, valida con el schema Mongoose, guarda en MongoDB, dispara correo vía Nodemailer, y responde 201 sin esperar al correo.

Archivos tocados: controllers/contactController.js, routes/contactRoutes.js.

### Nota metodológica

El Issue originalmente tenía planeado el uso de Outlook con App Password. Durante la ejecución, el servidor Microsoft devolvió el error `535 5.7.139 Authentication unsuccessful, basic authentication is disabled`. Investigación confirmó que Microsoft retira Basic Auth SMTP para cuentas consumer el 30/04/2026. Se migró el MVP a Gmail con App Password sobre cuenta `a.ferney.torres@gmail.com` con 2FA activo. La arquitectura Nodemailer queda intacta — solo cambian 2 valores del `.env` (`SMTP_HOST` y `SMTP_USER`). Plan futuro: migrar a Zoho con `contacto@yuncar.com.co` cuando se compre el dominio (Issue #15).

Adicionalmente, durante `npm install` inicial se detectaron 4 CVEs de severidad Alta en Nodemailer 6.9.7 (el del plan original). Las ramas 6.x y 7.x quedaron sin backport — la única versión parchada es 8.0.5. Se actualizó el `package.json` a `^8.0.5`.

### Archivos creados en esta sesión

| Ref | Archivo | Descripción | Commit |
|-----|---------|-------------|--------|
| K1 | backend/controllers/contactController.js | Lógica POST /api/contact: valida con Mongoose, guarda lead, dispara correo, responde 201 | [F-10] agrega controller y route contact con Nodemailer Gmail Closes #10 |
| K2 | backend/routes/contactRoutes.js | Mapeo ruta POST → controller createContact | (mismo commit) |

### Hallazgos documentados como deuda técnica

| Ref | Archivo | Hallazgo | Severidad |
|-----|---------|----------|-----------|
| K3 | backend/controllers/contactController.js | `tls.rejectUnauthorized: false` en el transporter por inspección TLS del entorno local (probable antivirus o proxy). Al deploy en Render, probar sin el flag. Si Render valida correctamente el certificado de Gmail, remover. | Media |

### Elementos verificados — OK

- `transporter.verify()` exitoso al arrancar el servidor con Gmail SMTP
- Postman POST `http://localhost:3001/api/contact` con payload válido → 201 Created
- Documento guardado en colección `yuncar.consults` verificado en Atlas Data Explorer
- Correo recibido en `a.ferney.torres@gmail.com` con formato completo, ID del documento incluido, timezone Bogotá
- Postman POST con payload malformado → 400 Bad Request con lista de errores del schema

### Siguiente hito

Issue #11 — Conexión Firebase Firestore, sustituido por MongoDB. Ejecutado en la misma sesión.

---

## Issue #11 — Conexión Firebase Firestore (sustituido por MongoDB)

**Período:** 04/05 – 11/05/2026 (planeado) · 18/04/2026 (ejecutado)
**Sesión de ejecución:** 6 (18/04/2026)
**Autor:** Arnold Ferney Torres Ome
**Commit de cierre:** [F-11] agrega model Consult.js con schema y validaciones Closes #11

### Alcance ejecutado

Persistencia del lead implementada con MongoDB Atlas + Mongoose 8.0.3 en sustitución de Firebase Firestore. Creación del schema `Consult.js` con 15 reglas de validación, tres enums operativos (canal, estado, prioridad) y timestamps automáticos. Configuración de la infraestructura Atlas con Project dedicado, cluster M0, usuario de aplicación con permisos restringidos, e IP whitelist para desarrollo local.

Archivos tocados: config/db.js, config/firebase.js (eliminado), models/Consult.js, package.json, package-lock.json.

### Nota metodológica

El título original del Issue en el Kanban es "Conexión con Firebase Firestore". Se mantiene el título original como baseline académico inmutable. La sustitución técnica por MongoDB queda documentada aquí.

Se creó un Project Atlas dedicado `YUNCAR` en lugar de reusar el Project de FERIM, para aislamiento de métricas, credenciales y escalamiento independiente. El plan original del arranque de sesión era reusar el Project de FERIM con una DB separada — la decisión de crear Project independiente se tomó en esta misma sesión.

### Archivos creados en esta sesión

| Ref | Archivo | Descripción | Commit |
|-----|---------|-------------|--------|
| L1 | package.json + package-lock.json + borrar firebase.js | Stack MongoDB definitivo sin firebase-admin, lockfile versionado | [F-11] limpia scaffold Firebase y actualiza stack MongoDB en package.json #11 |
| L2 | backend/config/db.js | Función connectDB con Mongoose — log estructurado de host y DB, process.exit(1) en fallo | [F-11] agrega config db.js conexion MongoDB Atlas Mongoose #11 |
| L3 | backend/models/Consult.js | Schema Mongoose con 15 validaciones, 3 enums operativos, timestamps en español, default contactadoEn=null | [F-11] agrega model Consult.js con schema y validaciones Closes #11 |

### Elementos verificados — OK

- Project Atlas `YUNCAR` independiente
- Cluster `yuncar-cluster` M0 en AWS `us-east-1`, MongoDB 8.0.20, Replica Set 3 nodos
- Base de datos `yuncar`, colección `consults` creada automáticamente al primer insert
- Usuario `yuncar_app` con rol `readWrite@yuncar` (principio de mínimo privilegio, no `atlasAdmin`)
- Mongoose conecta sin warnings deprecados (v8 ya no requiere `useNewUrlParser`)
- Schema rechaza payload inválido con mensajes en español (`"El correo es obligatorio"`, `"Formato de teléfono inválido"`)
- Schema aplica defaults automáticos (`canal: "formulario"`, `estado: "nuevo"`, `prioridad: "normal"`, `notas: ""`)
- Timestamps `creadoEn` y `actualizadoEn` se registran automáticamente

### Pruebas manuales pendientes del usuario

1. Al deploy en Render, autorizar IP `0.0.0.0/0` en MongoDB Atlas → Network Access
2. Rotar password de `yuncar_app` (quedó expuesto en capturas durante Sesión 6)
3. Verificar en Atlas Data Explorer que los documentos llegan desde el entorno Render

### Siguiente hito

Issue #12 — Pruebas funcionales. Validación local completada en Sesión 6. Pasa a In Review en el Kanban hasta cerrar con validación end-to-end en producción en Sesión 7.