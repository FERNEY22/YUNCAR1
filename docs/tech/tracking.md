# Matriz de Trazabilidad — YUNCAR MVP
*Última actualización: 11/04/2026 | Autor: Arnold Ferney Torres Ome*

---

## Roadmap General

| Issue | Actividad | Período | Estado |
|-------|-----------|---------|--------|
| #1 | Reunión de arranque | 23/02 – 02/03 | ✅ Completado |
| #2 | Lean Canvas — modelo de negocio | 02/03 – 09/03 | ✅ Completado |
| #3 | Contenidos institucionales MVP | 09/03 – 16/03 | ✅ Completado |
| #4 | Identidad visual — paleta y guía | 16/03 – 23/03 | ✅ Completado |
| #5 | Setup React + estructura base + router | 23/03 – 30/03 | ✅ Completado |
| #6 | Secciones principales del frontend | 30/03 – 06/04 | ✅ Completado |
| #7 | Portafolio y formulario de contacto UI | 06/04 – 13/04 | ✅ Completado |
| #8 | Pruebas de usabilidad | 13/04 – 20/04 | ⏳ Pendiente |
| #9 | Backend Node.js + Express | 20/04 – 27/04 | ⏳ Pendiente |
| #10 | Integración con servicios (Nodemailer) | 27/04 – 04/05 | ⏳ Pendiente |
| #11 | Conexión Firebase Firestore | 04/05 – 11/05 | ⏳ Pendiente |
| #12 | Pruebas funcionales | 11/05 – 18/05 | ⏳ Pendiente |
| #13 | Adquisición dominio + VPS | 18/05 – 25/05 | ⏳ Pendiente |
| #14 | Deploy MVP en producción | 25/05 – 01/06 | ⏳ Pendiente |
| #15 | Correos corporativos | 01/06 – 08/06 | ⏳ Pendiente |
| #16 | Revisión final y entrega | 08/06 – 15/06 | ⏳ Pendiente |

---

## Trazabilidad Issue → Archivo → Commit

| Issue | Actividad | Archivos modificados | Commit | Fecha |
|-------|-----------|---------------------|--------|-------|
| #1 | Reunión de arranque | `README.md`, `.gitignore`, `LICENSE` | Init repo + estructura inicial | 07/03/2026 |
| #2 | Lean Canvas | `docs/business/lean-canvas.md` | [F-02] Actualiza Lean Canvas versión Bogotá v2.0 Closes #2 | 11/04/2026 |
| #3 | Contenidos institucionales | `docs/business/contenidos-mvp.md` | [F-03] Agrega contenidos institucionales MVP Closes #3 | 11/04/2026 |
| #4 | Identidad visual | `docs/tech/identidad-visual.md` | [F-04] Agrega guía de identidad visual v1.0 Closes #4 | 11/04/2026 |
| #5 | Setup React | `frontend/src/App.jsx`, `frontend/src/index.css`, `frontend/src/components/Header.jsx` | [F-05] Setup React + estructura base + router + CSS global Closes #5 | 11/04/2026 |
| #6 | Secciones frontend | `frontend/src/pages/Home.jsx`, `Services.jsx`, `About.jsx`, `Projects.jsx`, `Portfolio.jsx`, `ContactForm.jsx`, `Footer.jsx`, `FloatingButtons.jsx`, `public/index.html` | [F-06] Desarrollo secciones principales frontend Closes #6 | 11/04/2026 |
| #7 | Portafolio y formulario | `frontend/src/pages/ContactForm.jsx`, `frontend/src/pages/Portfolio.jsx` | [F-07] Portafolio y formulario de contacto UI completos Closes #7 | 11/04/2026 |
| — | Documentación adicional | `docs/business/instrumentos-recoleccion.md` | [DOC] Agrega instrumentos de recolección de datos | 11/04/2026 |
| — | README actualizado | `README.md` | [DOC] Actualiza README con estado real del proyecto | 11/04/2026 |

---

## Estructura de Archivos Comprometidos

```
docs/
├── business/
│   ├── lean-canvas.md              ← Issue #2 ✅
│   ├── contenidos-mvp.md           ← Issue #3 ✅
│   └── instrumentos-recoleccion.md ← DOC (sin Issue)
└── tech/
    ├── identidad-visual.md         ← Issue #4 ✅
    ├── decisions.md                ← Pendiente actualización
    └── tracking.md                 ← Este archivo

frontend/src/
├── App.jsx                         ← Issue #5 ✅
├── index.css                       ← Issue #5 ✅
├── main.jsx                        ← Issue #5 ✅
├── components/
│   ├── Header.jsx                  ← Issue #5 ✅
│   ├── Footer.jsx                  ← Issue #6 ✅
│   ├── ContactForm.jsx             ← Issue #5/6 ✅
│   └── FloatingButtons.jsx         ← Issue #6 ✅
└── pages/
    ├── Home.jsx                    ← Issue #6 ✅
    ├── Services.jsx                ← Issue #6 ✅
    ├── About.jsx                   ← Issue #6 ✅
    ├── Projects.jsx                ← Issue #6 ✅
    ├── Portfolio.jsx               ← Issue #7 ✅
    └── ContactForm.jsx             ← Issue #7 ✅

backend/
├── server.js                       ← Issue #9 ⏳
├── config/firebase.js              ← Issue #11 ⏳
├── controllers/contactController.js← Issue #9 ⏳
├── models/Consult.js               ← Issue #9/#11 ⏳
└── routes/contactRoutes.js         ← Issue #9 ⏳
```

---

## Métricas de Ciclo

| Métrica | Valor | Observación |
|---------|-------|-------------|
| Issues completados | 7 / 16 | 43.75% del cronograma |
| Issues en progreso | 0 | — |
| Commits con convención [F-XX] | 7 | Uno por Issue cerrado |
| Commits [DOC] | 2 | README + instrumentos |
| Archivos en repo | ~20 | Frontend completo |
| Deuda técnica identificada | 1 | decisions.md desactualizado |

---

## Próxima Actualización

Al cierre del Issue #8 — Pruebas de usabilidad (20/04/2026).

*Actualización: al completar cada Issue o al cierre de sesión de trabajo.*