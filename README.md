# YUNCAR1 — Plataforma de Servicios Industriales

> Sitio web institucional MVP para YUNCAR Servicios de Mantenimiento y Consultorías Industriales · Bogotá D.C.

---

## Estado del Proyecto

- **Fase Actual**: Backend MVP validado — Deploy en curso
- **Inicio**: 23/02/2026
- **Target MVP**: 15/06/2026
- **Metodología**: Kanban · GitHub Projects
- **Tablero**: [YUNCAR - Sprint Board](https://github.com/users/FERNEY22/projects/2)

---

## Roadmap

| Hito planeado | Fecha plan | Estado | Actualización real | Fecha completado |
|---|---|---|---|---|
| Reunión de arranque | 02/03 | ✅ Completado | Alineación de objetivos + definición de alcance MVP con tutor | 02/03/2026 |
| Modelo de negocio — Lean Canvas | 09/03 | ✅ Completado | Lean Canvas formalizado en `docs/business/lean-canvas.md` | 09/03/2026 |
| Contenidos institucionales MVP | 16/03 | ✅ Completado | Contenidos redactados y versionados en `docs/business/contenidos-mvp.md` | 16/03/2026 |
| Identidad visual — Paleta y guía | 23/03 | ✅ Completado | Paleta aprobada (navy `#1A3A5C` + naranja `#E8500A` + ámbar `#F5A623`) con tokens CSS documentados | 23/03/2026 |
| Setup React + estructura base | 30/03 | ✅ Completado | React 18.2.0 + Vite 5.0.8 + router configurado, mobile-first sin framework CSS | 30/03/2026 |
| Secciones principales frontend | 06/04 | ✅ Completado | Home, Services, Projects, About implementadas con estructura de componentes | 06/04/2026 |
| Portafolio y formulario UI | 13/04 | ✅ Completado | Portfolio con placeholder + ContactForm con validación frontend y AbortController timeout 15s | 13/04/2026 |
| Pruebas de usabilidad | 20/04 | ✅ Completado | Auditoría 12 archivos frontend + 8 fixes atómicos + 9 hallazgos documentados como deuda técnica | 18/04/2026 |
| Backend Node.js + Express | 27/04 | ✅ Completado | Express 4.18.2 con estructura MVC por capas + CORS + middlewares + entry point `server.js` | 18/04/2026 |
| Integración con servicios | 04/05 | ✅ Completado | Nodemailer 8.0.5 con Gmail SMTP + MongoDB Atlas integrados en endpoint `/api/contact` | 18/04/2026 |
| Conexión Firebase Firestore | 11/05 | ✅ Completado | **Sustituido por MongoDB Atlas (ADR-010).** Cluster dedicado `yuncar-cluster` M0 + schema `Consult` con 15 validaciones | 18/04/2026 |
| Pruebas funcionales | 18/05 | 👀 In Review | Validación end-to-end en local con Postman → MongoDB real → Gmail real. Pendiente validación en producción | Parcial: 18/04/2026 |
| Adquisición dominio + VPS | 25/05 | 📅 This Week | Pendiente: Namecheap `yuncar.com.co` + DNS | — |
| Deploy MVP en producción | 01/06 | 🔄 En progreso | Render free + UptimeRobot + whitelist MongoDB `0.0.0.0/0` — arranca Sesión 7 | — |
| Correos corporativos | 08/06 | 📅 This Week | Pendiente: migración Gmail MVP → Zoho Mail Free con `contacto@yuncar.com.co` | — |
| Revisión final y entrega | 15/06 | ⏳ Pendiente | — | — |

---

## Stack Tecnológico

### Frontend
- React 18.2.0 + Vite 5.0.8
- React Router DOM 6.20.1
- Fetch nativo con AbortController (reemplaza plan original Axios 1.6.2)
- CSS3 puro — mobile-first

### Backend
- Node.js ≥ 18.0.0 + Express 4.18.2
- Nodemailer 8.0.5 
- CORS 2.8.5 · Dotenv 16.3.1
- Nodemon 3.0.2 

### Base de Datos y Servicios
- **MongoDB Atlas M0** (reemplaza plan original Firebase Firestore)
- Google Maps API
- Nodemailer   8.0.5  (notificaciones)

### Infraestructura
- VPS + Nginx + Let's Encrypt (producción)
- GitHub Projects (Kanban)

---

## Estructura del Proyecto

```
YUNCAR1/
├── backend/
│   ├── config/
│   │   └── db.js                      
│   ├── controllers/
│   │   └── contactController.js       
│   ├── middleware/                     
│   ├── models/
│   │   └── Consult.js                 
│   ├── routes/
│   │   ├── contactRoutes.js           
│   │   └── healthRoutes.js            
│   ├── .env                           
│   ├── .env.example                   
│   ├── package.json                   
│   ├── package-lock.json              
│   └── server.js                      
├── docs/
│   ├── business/
│   │   ├── lean-canvas.md
│   │   ├── contenidos-mvp.md
│   │   └── instrumentos-recoleccion.md
│   └── tech/
│       ├── identidad-visual.md
│       ├── decisions.md               
│       ├── tracking.md                
│       └── resumen_sesion6_arranque_sesion7.md
├── frontend/
│   ├── public/                        
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx             
│   │   │   ├── Footer.jsx             
│   │   │   ├── FloatingButtons.jsx
│   │   │   └── ScrollToTop.jsx        
│   │   ├── pages/
│   │   │   ├── Home.jsx               
│   │   │   ├── Services.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── About.jsx
│   │   │   ├── ContactForm.jsx        
│   │   │   ├── Portfolio.jsx
│   │   │   └── NotFound.jsx           
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html                     
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── .gitignore                        
├── LICENSE
└── README.md
```

---

## Convención de Commits

```
[F-XX] descripción de la tarea #N
```

Donde `[F-XX]` identifica la actividad del cronograma y `#N` vincula automáticamente con el Issue de GitHub.

---

## Documentación

- [Lean Canvas — Modelo de Negocio](docs/business/lean-canvas.md)
- [Contenidos Institucionales MVP](docs/business/contenidos-mvp.md)
- [Identidad Visual](docs/tech/identidad-visual.md)
- [Decisiones Técnicas](docs/tech/decisions.md)
- [Trazabilidad](docs/tech/tracking.md)

---

## Autor

**Arnold Ferney Torres Ome**
Ingeniería de Software · Práctica en Emprendimiento
Fundación Universitaria Iberoamericana · 2026
Tutor: John Edison Rodriguez Guisado — Ingeniero Experto Asesor