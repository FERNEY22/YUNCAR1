# Decisiones Técnicas - YUNCAR

## 001 | Arquitectura del Proyecto
- **Fecha**: 23/02/2026
- **Decisión**: Monorepo con carpetas `/frontend` (React) y `/backend` (Node.js)
- **Razón**: Desarrollo ágil en solitario, despliegue independiente, escalabilidad futura

## 002 | Stack Tecnológico
- **Frontend**: React + Vite (rápido, componente-based, fácil mantenimiento)
- **Backend**: Node.js + Express (mismo lenguaje JS, API REST ligera)
- **Base de datos**: Firebase Firestore (gratis inicial, sincronización en tiempo real)
- **Deploy**: VPS + dominio propio (identidad digital profesional desde el MVP)

## 003 | Gestión del Proyecto
- **Metodología**: Kanban + Lean (iteraciones semanales, foco en MVP)
- **Seguimiento**: Commits con IDs de feature (`[F-01]`, `[F-02]`) + matriz en `tracking.md`
- **Validación**: Métricas de tráfico, leads y conversión post-lanzamiento

## 004 | Infraestructura Digital
- **Dominio**: Propio (.com) para credibilidad inmediata
- **SSL**: Let's Encrypt (gratuito, estándar de seguridad)
- **Correos**: Corporativos vinculados al dominio (profesionalismo en comunicación)

*Documento vivo: Se actualiza con cada decisión técnica relevante.*