# YUNCAR1 — Plataforma de Servicios Industriales

> Sitio web institucional MVP para YUNCAR Servicios de Mantenimiento Eléctrico y Electromecánico Industrial · Bogotá D.C.

---

## Estado del Proyecto

- **Fase Actual**: Desarrollo Frontend — Mes 2
- **Inicio**: 23/02/2026
- **Target MVP**: 15/06/2026
- **Metodología**: Kanban · GitHub Projects
- **Tablero**: [YUNCAR - Sprint Board](https://github.com/users/FERNEY22/projects/2)

---

## Roadmap

| Hito | Fecha | Estado |
|------|-------|--------|
| Reunión de arranque | 02/03 | ✅ Completado |
| Modelo de negocio — Lean Canvas | 09/03 | ✅ Completado |
| Contenidos institucionales MVP | 16/03 | ✅ Completado |
| Identidad visual — Paleta y guía | 23/03 | ✅ Completado |
| Setup React + estructura base | 30/03 | ✅ Completado |
| Secciones principales frontend | 06/04 | ✅ Completado |
| Portafolio y formulario UI | 13/04 | 🔄 En progreso |
| Pruebas de usabilidad | 20/04 | ⏳ Pendiente |
| Backend Node.js + Express | 27/04 | ⏳ Pendiente |
| Integración con servicios | 04/05 | ⏳ Pendiente |
| Conexión Firebase Firestore | 11/05 | ⏳ Pendiente |
| Pruebas funcionales | 18/05 | ⏳ Pendiente |
| Adquisición dominio + VPS | 25/05 | ⏳ Pendiente |
| Deploy MVP en producción | 01/06 | ⏳ Pendiente |
| Correos corporativos | 08/06 | ⏳ Pendiente |
| Revisión final y entrega | 15/06 | ⏳ Pendiente |

---

## Stack Tecnológico

### Frontend
- React 18.2.0 + Vite 5.0.8
- React Router DOM 6.20.1
- Axios 1.6.2
- CSS3 puro — mobile-first

### Backend
- Node.js + Express 4.18.2
- Nodemailer 6.9.7
- CORS · Dotenv

### Base de Datos y Servicios
- Firebase Firestore (principal)
- Google Maps API
- Nodemailer (notificaciones)

### Infraestructura
- VPS + Nginx + Let's Encrypt (producción)
- GitHub Projects (Kanban)

---

## Estructura del Proyecto

```
YUNCAR1/
├── backend/
│   ├── config/firebase.js
│   ├── controllers/contactController.js
│   ├── models/Consult.js
│   ├── routes/contactRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── docs/
│   ├── business/
│   │   ├── lean-canvas.md
│   │   ├── contenidos-mvp.md
│   │   └── instrumentos-recoleccion.md
│   └── tech/
│       ├── identidad-visual.md
│       ├── decisions.md
│       └── tracking.md
├── frontend/
│   ├── public/index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   └── FloatingButtons.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── About.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   └── Portfolio.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
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