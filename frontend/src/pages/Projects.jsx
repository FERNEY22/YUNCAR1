// Projects.jsx — YUNCAR MVP
// Ubicación: frontend/src/pages/Projects.jsx
// [F-08] feat: sección Proyectos con 4 casos reales
//
// ─────────────────────────────────────────────────────────────
// CÓMO AGREGAR UN NUEVO PROYECTO
// ─────────────────────────────────────────────────────────────
// 1. Agrega un objeto nuevo al array PROJECTS siguiendo la
//    estructura del ejemplo al final del array.
// 2. La tarjeta aparece automáticamente en la grilla.
// 3. Si el proyecto tiene foto real, reemplaza `image: null`
//    por `image: '/assets/proyectos/nombre-foto.jpg'`
//    y coloca la imagen en public/assets/proyectos/
// 4. El filtro por categoría funciona automáticamente con
//    el valor que pongas en `category`.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react';
import { Link } from 'react-router-dom';

// ── CATEGORÍAS DE FILTRO ──────────────────────────────────────
// Si agregas un proyecto con una categoría nueva, agrégala aquí.
const CATEGORIES = [
  'Todos',
  'Preventivo',
  'Tableros',
  'Auditoría energética',
  'Puesta en marcha',
];

// ── PROYECTOS ─────────────────────────────────────────────────
// Cada objeto = una tarjeta en la sección.
const PROJECTS = [
  {
    id: 1,
    category: 'Preventivo',
    zone: 'Puente Aranda',
    sector: 'Edificio industrial',
    title: 'Actualización infraestructura eléctrica y civil — Edificio industrial',
    description:
      'Revisión integral de instalaciones eléctricas, redes de datos y acabados civiles en edificio de 4 pisos en zona industrial. Incluye componente civil y eléctrico.',
    highlights: [
      'Inspección termográfica de tableros por piso',
      'Reemplazo de luminarias a tecnología LED',
      'Revisión de red de datos y voz',
      'Trabajos civiles: pintura, impermeabilización puntos críticos',
      'Reporte técnico con registro fotográfico',
    ],
    sla: 'Plan preventivo trimestral',
    image: null, // reemplazar con ruta real: '/assets/proyectos/p1-edificio.jpg'
    catColor: { bg: '#fff2ee', text: '#b03a08' },
  },
  {
    id: 2,
    category: 'Tableros',
    zone: 'Fontibón',
    sector: 'Manufactura',
    title: 'Tablero de distribución principal — Planta manufacturera',
    description:
      'Diseño e instalación de tablero de distribución trifásico 480 V con 8 circuitos independientes, protecciones térmicas y puesta a tierra certificada NTC 2050.',
    highlights: [
      'Diseño de diagrama unifilar',
      'Suministro e instalación: breakers, relés, borneras',
      'Cableado estructurado y marcación de circuitos',
      'Puesta a tierra certificada',
      'Dossier técnico y garantía 12 meses mano de obra',
    ],
    sla: 'Entrega en 5 días hábiles',
    image: null, // reemplazar con ruta real: '/assets/proyectos/p2-tablero.jpg'
    catColor: { bg: '#eef2f8', text: '#1A3A5C' },
  },
  {
    id: 3,
    category: 'Auditoría energética',
    zone: 'Álamos',
    sector: 'Farmacéutico',
    title: 'Auditoría eléctrica y estudio de eficiencia energética',
    description:
      'Medición continua de calidad de energía durante 7 días, análisis de factor de potencia y recomendación de banco de condensadores. Ahorro estimado del 18% en la factura.',
    highlights: [
      'Medición de calidad de energía 7 días continuos',
      'Análisis de armónicos y factor de potencia',
      'Dimensionamiento de banco de condensadores',
      'Informe técnico ejecutivo con ROI estimado',
      'Informe de conformidad RETIE',
    ],
    sla: 'Informe en 5 días hábiles',
    image: null, // reemplazar con ruta real: '/assets/proyectos/p3-auditoria.jpg'
    catColor: { bg: '#fdf4d8', text: '#8a6200' },
  },
  {
    id: 4,
    category: 'Puesta en marcha',
    zone: 'Montevideo',
    sector: 'Plásticos',
    title: 'Puesta en marcha motor trifásico 15 HP — Prensa inyectora',
    description:
      'Diagnóstico completo, medición de aislamiento con megger, verificación de balanceo de fases y arranque controlado de motor 15 HP en prensa inyectora. Equipo operativo en menos de 4 horas.',
    highlights: [
      'Medición de resistencia de aislamiento (megger)',
      'Verificación de balanceo de fases y consumo nominal',
      'Inspección de rodamientos y carcasa',
      'Arranque controlado y prueba bajo carga',
      'Reporte de parámetros eléctricos',
    ],
    sla: 'Atención de emergencia — 3.5 h',
    image: null, // reemplazar con ruta real: '/assets/proyectos/p4-motor.jpg'
    catColor: { bg: '#eef2f8', text: '#1A3A5C' },
  },

  // ─────────────────────────────────────────────────────────
  // PLANTILLA PARA NUEVO PROYECTO — copiar y completar:
  // {
  //   id: 5,                          // número siguiente en secuencia
  //   category: 'Correctivo',         // debe coincidir con un valor en CATEGORIES
  //   zone: 'Zona Franca',            // zona industrial donde se realizó
  //   sector: 'Logística',            // sector de la empresa cliente
  //   title: 'Título del proyecto',   // máx. 2 líneas en la tarjeta
  //   description: 'Descripción...',  // 2-3 oraciones, contexto y resultado
  //   highlights: [                   // 3-5 ítems de lo que se hizo
  //     'Ítem 1',
  //     'Ítem 2',
  //     'Ítem 3',
  //   ],
  //   sla: 'Tiempo o tipo de entrega',
  //   image: null,                    // o ruta a imagen real
  //   catColor: { bg: '#fff2ee', text: '#b03a08' }, // colores del badge
  // },
  // ─────────────────────────────────────────────────────────
];

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────
export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activeProject, setActiveProject] = useState(null);

  const filtered =
    activeCategory === 'Todos'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <main>
      {/* ── HEADER ─────────────────────────────────────────── */}
      <section style={s.header}>
        <div style={s.container}>
          <p style={s.badge}>Trayectoria</p>
          <h1 style={s.title}>Proyectos</h1>
          <p style={s.sub}>
            Trabajos ejecutados en plantas y edificios industriales de Bogotá.
            Cada proyecto incluye reporte técnico entregado al cliente.
          </p>
        </div>
      </section>

      {/* ── FILTROS ────────────────────────────────────────── */}
      <section style={s.filterBar}>
        <div style={s.container}>
          <div style={s.filterRow}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  ...s.filterBtn,
                  ...(activeCategory === cat ? s.filterBtnActive : {}),
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRILLA DE PROYECTOS ────────────────────────────── */}
      <section style={s.grid_section}>
        <div style={s.container}>
          <div style={s.grid}>
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => setActiveProject(project)}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <p style={s.empty}>No hay proyectos en esta categoría aún.</p>
          )}
        </div>
      </section>

      {/* ── MODAL DETALLE ──────────────────────────────────── */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}

      {/* ── CTA ────────────────────────────────────────────── */}
      <section style={s.cta}>
        <div style={{ ...s.container, textAlign: 'center' }}>
          <h2 style={s.ctaTitle}>¿Tiene un proyecto similar?</h2>
          <p style={s.ctaText}>
            Cuéntenos el requerimiento. Le preparamos una propuesta técnica sin compromiso.
          </p>
          <Link to="/contacto" style={s.btnPrimary}>
            Solicitar cotización
          </Link>
        </div>
      </section>
    </main>
  );
}

// ── TARJETA DE PROYECTO ───────────────────────────────────────
function ProjectCard({ project, onOpen }) {
  return (
    <article style={s.card}>
      {/* Imagen o placeholder */}
      <div style={s.cardImg}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={s.cardImgPlaceholder}>
            <span style={s.cardImgIcon}>🔧</span>
            <span style={s.cardImgText}>{project.category}</span>
          </div>
        )}
      </div>

      {/* Cuerpo */}
      <div style={s.cardBody}>
        <span
          style={{
            ...s.catBadge,
            background: project.catColor.bg,
            color: project.catColor.text,
          }}
        >
          {project.category}
        </span>
        <h2 style={s.cardTitle}>{project.title}</h2>
        <p style={s.cardDesc}>{project.description}</p>
        <div style={s.cardFooter}>
          <span style={s.zoneTag}>
            <span style={s.zoneDot} />
            {project.zone} · {project.sector}
          </span>
          <button onClick={onOpen} style={s.cardBtn}>
            Ver detalles
          </button>
        </div>
      </div>
    </article>
  );
}

// ── MODAL DETALLE DE PROYECTO ─────────────────────────────────
function ProjectModal({ project, onClose }) {
  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>
        <div style={s.modalHeader}>
          <div>
            <span
              style={{
                ...s.catBadge,
                background: project.catColor.bg,
                color: project.catColor.text,
                marginBottom: '0.5rem',
                display: 'inline-block',
              }}
            >
              {project.category}
            </span>
            <h2 style={s.modalTitle}>{project.title}</h2>
            <p style={s.modalZone}>
              📍 {project.zone} · {project.sector}
            </p>
          </div>
          <button onClick={onClose} style={s.closeBtn}>✕</button>
        </div>
        <p style={s.modalDesc}>{project.description}</p>
        <div style={s.modalSection}>
          <p style={s.modalSectionTitle}>Lo que se hizo</p>
          <ul style={s.highlightList}>
            {project.highlights.map((h) => (
              <li key={h} style={s.highlightItem}>
                <span style={s.checkmark}>✓</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div style={s.modalFooter}>
          <span style={s.slaTag}>⏱️ {project.sla}</span>
          <Link to="/contacto" style={s.btnPrimary} onClick={onClose}>
            Solicitar proyecto similar
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── ESTILOS ───────────────────────────────────────────────────
const s = {
  container: { width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' },
  header: { background: 'var(--color-primary)', color: '#fff', padding: '4rem 0 3rem' },
  badge: { fontSize: '0.8rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-secondary)', marginBottom: '0.75rem', fontWeight: 600 },
  title: { fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem', color: '#fff' },
  sub: { fontSize: '1.0625rem', color: 'rgba(255,255,255,.78)', maxWidth: '560px', lineHeight: 1.65, margin: 0 },
  filterBar: { background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', padding: '1rem 0', position: 'sticky', top: '64px', zIndex: 50 },
  filterRow: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' },
  filterBtn: { padding: '0.375rem 1rem', borderRadius: '20px', border: '1.5px solid var(--color-border)', background: 'transparent', color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' },
  filterBtnActive: { background: 'var(--color-primary)', color: '#fff', borderColor: 'var(--color-primary)', fontWeight: 700 },
  grid_section: { padding: '2.5rem 0 4rem', background: 'var(--color-bg)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
  empty: { textAlign: 'center', color: 'var(--color-text-secondary)', padding: '3rem 0' },
  card: { background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  cardImg: { height: '180px', overflow: 'hidden', flexShrink: 0 },
  cardImgPlaceholder: { width: '100%', height: '100%', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
  cardImgIcon: { fontSize: '2rem' },
  cardImgText: { fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 500 },
  cardBody: { padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 },
  catBadge: { display: 'inline-block', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', padding: '2px 10px', borderRadius: '12px' },
  cardTitle: { fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.35, margin: 0 },
  cardDesc: { fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' },
  zoneTag: { display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' },
  zoneDot: { width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0 },
  cardBtn: { background: 'transparent', border: '1.5px solid var(--color-accent)', color: 'var(--color-accent)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(13,31,51,.55)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' },
  modal: { background: 'var(--color-surface)', borderRadius: '10px', maxWidth: '560px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' },
  modalTitle: { fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.3, maxWidth: '440px' },
  modalZone: { fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '0.375rem' },
  closeBtn: { background: 'transparent', border: 'none', fontSize: '1rem', color: 'var(--color-text-secondary)', cursor: 'pointer', flexShrink: 0, padding: '4px' },
  modalDesc: { fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' },
  modalSection: { background: 'var(--color-bg)', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.25rem' },
  modalSectionTitle: { fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' },
  highlightList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  highlightItem: { fontSize: '0.875rem', color: 'var(--color-text-primary)', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' },
  checkmark: { color: 'var(--color-success)', fontWeight: 700, flexShrink: 0 },
  modalFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' },
  slaTag: { fontSize: '0.8125rem', color: 'var(--color-text-secondary)' },
  cta: { background: 'var(--color-primary)', padding: '4rem 0' },
  ctaTitle: { fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 700, color: '#fff', marginBottom: '1rem' },
  ctaText: { color: 'rgba(255,255,255,.75)', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.65 },
  btnPrimary: { display: 'inline-block', background: 'var(--color-accent)', color: '#fff', padding: '0.75rem 2rem', border: '2px solid var(--color-accent)', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' },
};