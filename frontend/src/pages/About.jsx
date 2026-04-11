// About.jsx — YUNCAR MVP
// [F-04] feat: contenido institucional real en About.jsx Closes #6

import { Link } from 'react-router-dom';

const VALUES = [
  {
    icon: '⏱️',
    title: 'Respuesta',
    text: 'Nos comprometemos con un SLA de menos de 4 horas en zona para emergencias. Si no llegamos, lo compensamos.',
  },
  {
    icon: '📄',
    title: 'Trazabilidad',
    text: 'Cada intervención genera un reporte digital. Su historial de mantenimiento es suyo, siempre accesible.',
  },
  {
    icon: '✅',
    title: 'Cumplimiento',
    text: 'Trabajamos bajo NTC 2050 y RETIE. Nuestras instalaciones son certificables y auditables.',
  },
  {
    icon: '🤝',
    title: 'Transparencia',
    text: 'Precios claros, sin cobros ocultos. Presupuesto antes de iniciar cualquier trabajo.',
  },
];

const CERTIFICATIONS = [
  { label: 'NTC 2050', desc: 'Código Eléctrico Colombiano' },
  { label: 'RETIE',    desc: 'Reglamento Técnico de Instalaciones Eléctricas (MINMINAS)' },
  { label: 'EPP',      desc: 'Protección clase arco flash para trabajos en instalaciones energizadas' },
  { label: 'Equipos',  desc: 'Analizador de redes, megóhmetro y pinza amperimétrica calibrados' },
];

const ZONES = [
  'Puente Aranda',
  'Fontibón',
  'Álamos',
  'Montevideo',
  'Zona Franca',
];

export default function About() {
  return (
    <main>
      {/* ── HEADER ───────────────────────────────────────────── */}
      <section style={styles.header}>
        <div style={styles.container}>
          <p style={styles.badge}>Quiénes somos</p>
          <h1 style={styles.title}>Sobre YUNCAR</h1>
          <blockquote style={styles.tagline}>
            "El departamento de mantenimiento eléctrico que su planta necesita, sin la nómina fija"
          </blockquote>
        </div>
      </section>

      {/* ── DESCRIPCIÓN ──────────────────────────────────────── */}
      <section style={styles.section}>
        <div style={{ ...styles.container, ...styles.twoCol }}>
          <div style={styles.textBlock}>
            <h2 style={styles.h2}>Nuestra historia</h2>
            <p style={styles.p}>
              YUNCAR es una empresa de servicios de mantenimiento eléctrico y electromecánico
              industrial con sede en Bogotá, especializada en la atención de pymes manufactureras,
              logísticas y de servicios ubicadas en las principales zonas industriales de la ciudad.
            </p>
            <p style={styles.p}>
              Nacimos de la necesidad real que tienen las plantas medianas de Bogotá: acceder a un
              proveedor técnico serio, con respuesta rápida, cumplimiento normativo y documentación
              de cada trabajo — sin el costo de una nómina fija de mantenimiento.
            </p>
            <p style={styles.p}>
              Combinamos experiencia técnica de campo con herramientas de gestión digitales, para
              que cada cliente tenga trazabilidad total de su historial de mantenimiento desde el
              primer día.
            </p>
          </div>

          <div style={styles.infoCard}>
            <h3 style={styles.infoCardTitle}>Datos de empresa</h3>
            {[
              ['Razón social', 'YUNCAR'],
              ['Actividad', 'Mantenimiento eléctrico y electromecánico industrial'],
              ['Ciudad', 'Bogotá D.C., Colombia'],
              ['Cobertura', 'Puente Aranda · Fontibón · Álamos · Montevideo · Zona Franca'],
              ['Normativa', 'NTC 2050 · RETIE'],
            ].map(([k, v]) => (
              <div key={k} style={styles.infoRow}>
                <span style={styles.infoKey}>{k}</span>
                <span style={styles.infoVal}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALORES ──────────────────────────────────────────── */}
      <section style={{ ...styles.section, background: 'var(--color-bg)' }}>
        <div style={styles.container}>
          <h2 style={styles.h2}>Nuestros valores</h2>
          <div style={styles.valuesGrid}>
            {VALUES.map(({ icon, title, text }) => (
              <div key={title} style={styles.valueCard}>
                <span style={styles.valueIcon}>{icon}</span>
                <h3 style={styles.valueTitle}>{title}</h3>
                <p style={styles.valueText}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICACIONES ──────────────────────────────────── */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.h2}>Normativa y equipos</h2>
          <p style={{ ...styles.p, marginBottom: '2rem' }}>
            Trabajamos con herramientas calibradas y bajo los estándares técnicos exigidos por
            la regulación colombiana para instalaciones eléctricas industriales.
          </p>
          <div style={styles.certGrid}>
            {CERTIFICATIONS.map(({ label, desc }) => (
              <div key={label} style={styles.certCard}>
                <strong style={styles.certLabel}>{label}</strong>
                <p style={styles.certDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZONAS ────────────────────────────────────────────── */}
      <section style={{ ...styles.section, background: 'var(--color-primary)', color: '#fff' }}>
        <div style={styles.container}>
          <h2 style={{ ...styles.h2, color: '#fff' }}>Zonas de cobertura</h2>
          <p style={{ ...styles.p, color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>
            Operamos estratégicamente en las cinco zonas de mayor concentración industrial de
            Bogotá, garantizando tiempos de respuesta competitivos sin recargos por desplazamiento.
          </p>
          <div style={styles.zonesRow}>
            {ZONES.map((zone) => (
              <div key={zone} style={styles.zonePill}>
                <span style={styles.zoneDot}>●</span>
                {zone}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={styles.ctaSection}>
        <div style={{ ...styles.container, textAlign: 'center' }}>
          <h2 style={styles.ctaTitle}>¿Quiere conocer más?</h2>
          <p style={styles.ctaText}>
            Cuéntenos sobre su planta y las necesidades de mantenimiento.
            Le preparamos una propuesta sin compromiso.
          </p>
          <Link to="/contacto" style={styles.btnPrimary}>
            Contáctenos
          </Link>
        </div>
      </section>
    </main>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  header: {
    background: 'var(--color-primary)',
    color: '#fff',
    padding: '4rem 0 3rem',
  },
  badge: {
    fontSize: '0.8rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-secondary)',
    marginBottom: '0.75rem',
    fontWeight: 600,
  },
  title: {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 800,
    marginBottom: '1.25rem',
  },
  tagline: {
    borderLeft: '4px solid var(--color-accent)',
    paddingLeft: '1.25rem',
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.85)',
    fontStyle: 'italic',
    margin: 0,
    maxWidth: '640px',
    lineHeight: 1.55,
  },
  section: {
    padding: '4rem 0',
    background: 'var(--color-surface)',
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '3rem',
    alignItems: 'start',
  },
  textBlock: {},
  h2: {
    fontSize: 'clamp(1.25rem, 3vw, 1.625rem)',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    marginBottom: '1rem',
  },
  p: {
    fontSize: '0.9375rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.7,
    marginBottom: '1rem',
  },
  infoCard: {
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    padding: '1.5rem',
  },
  infoCardTitle: {
    fontSize: '0.875rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--color-text-secondary)',
    marginBottom: '1.25rem',
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
    paddingBottom: '0.75rem',
    marginBottom: '0.75rem',
    borderBottom: '1px solid var(--color-border)',
  },
  infoKey: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  infoVal: {
    fontSize: '0.9375rem',
    color: 'var(--color-text-primary)',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem',
  },
  valueCard: {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderTop: '3px solid var(--color-accent)',
    borderRadius: '8px',
    padding: '1.5rem',
  },
  valueIcon: {
    fontSize: '1.75rem',
    display: 'block',
    marginBottom: '0.75rem',
  },
  valueTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    marginBottom: '0.5rem',
  },
  valueText: {
    fontSize: '0.875rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.65,
    margin: 0,
  },
  certGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1rem',
  },
  certCard: {
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    padding: '1.25rem',
  },
  certLabel: {
    display: 'inline-block',
    background: 'var(--color-primary)',
    color: '#fff',
    fontSize: '0.75rem',
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: '4px',
    marginBottom: '0.5rem',
  },
  certDesc: {
    fontSize: '0.875rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.55,
    margin: 0,
  },
  zonesRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
  zonePill: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '24px',
    padding: '0.5rem 1.25rem',
    fontSize: '0.9375rem',
    fontWeight: 600,
    color: '#fff',
  },
  zoneDot: {
    color: 'var(--color-accent)',
    fontSize: '0.6rem',
  },
  ctaSection: {
    background: 'var(--color-bg)',
    padding: '4rem 0',
  },
  ctaTitle: {
    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    marginBottom: '1rem',
  },
  ctaText: {
    color: 'var(--color-text-secondary)',
    maxWidth: '480px',
    margin: '0 auto 2rem',
    lineHeight: 1.65,
  },
  btnPrimary: {
    display: 'inline-block',
    background: 'var(--color-accent)',
    color: '#fff',
    padding: '0.75rem 2rem',
    border: '2px solid var(--color-accent)',
    borderRadius: '4px',
    fontWeight: 700,
    fontSize: '1rem',
    textDecoration: 'none',
  },
};