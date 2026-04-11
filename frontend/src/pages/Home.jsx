// Home.jsx — YUNCAR MVP
// [F-04] feat: contenido institucional real en Home.jsx Closes #6
// Stack: React 18 + Vite | CSS3 puro | mobile-first

import { Link } from 'react-router-dom';

const STATS = [
  { value: '< 4 h', label: 'Tiempo máximo de respuesta en zona' },
  { value: '5',     label: 'Zonas industriales cubiertas' },
  { value: '100%',  label: 'Reportes digitales por intervención' },
  { value: 'RETIE', label: 'Cumplimiento normativo certificado' },
];

const PILLARS = [
  {
    icon: '⏱️',
    title: 'Respuesta garantizada < 4 h',
    text: 'Atención en zona en menos de 4 horas para emergencias eléctricas en Puente Aranda, Fontibón, Álamos, Montevideo y Zona Franca. Sin excusas.',
  },
  {
    icon: '📋',
    title: 'Trazabilidad total',
    text: 'Cada intervención genera un reporte técnico digital: diagnóstico, trabajo realizado, materiales y recomendaciones. Su historial es suyo, siempre accesible.',
  },
  {
    icon: '🏭',
    title: '5 zonas industriales',
    text: 'Cobertura estratégica en las zonas de mayor densidad industrial de Bogotá, sin recargos por desplazamiento dentro de la zona contratada.',
  },
];

const COMPARISON = [
  { criterio: 'Tiempo de respuesta',     grandes: '6–12 h (agenda ocupada)', independientes: 'Variable, sin SLA',     yuncar: '< 4 h garantizado en zona' },
  { criterio: 'Cobertura multi-zona',    grandes: 'Sí, costosa',              independientes: 'Una sola zona',         yuncar: '5 zonas priorizadas' },
  { criterio: 'Reportes y trazabilidad', grandes: 'Sí (alto costo)',           independientes: 'No',                    yuncar: 'Reporte digital por servicio' },
  { criterio: 'Cumplimiento RETIE',      grandes: 'Certificado',               independientes: 'Irregular',             yuncar: 'Certificado y documentado' },
  { criterio: 'Flexibilidad contractual',grandes: 'Contratos rígidos',         independientes: 'Sin contrato formal',   yuncar: 'Planes mensuales flexibles' },
  { criterio: 'Precio',                  grandes: 'Alto (overhead)',           independientes: 'Bajo (sin respaldo)',   yuncar: 'Competitivo con garantía técnica' },
];

const ZONES = [
  { zone: 'Puente Aranda', sectors: 'Manufactura, química, plásticos, metalmecánica', priority: 3 },
  { zone: 'Fontibón',      sectors: 'Manufactura liviana, logística, alimentos',      priority: 3 },
  { zone: 'Álamos',        sectors: 'Farmacéutica, cosmética, tecnología',            priority: 2 },
  { zone: 'Montevideo',    sectors: 'Carpintería metálica, textiles, manufactura',    priority: 2 },
  { zone: 'Zona Franca',   sectors: 'Logística internacional, exportación',           priority: 2 },
];

export default function Home() {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <p style={styles.heroBadge}>Bogotá D.C. · Zonas Industriales</p>
          <h1 style={styles.heroTitle}>
            Mantenimiento eléctrico industrial en Bogotá{' '}
            <span style={styles.heroAccent}>con respuesta garantizada</span>
          </h1>
          <p style={styles.heroSub}>
            Prevenimos paros no planificados y documentamos cada intervención
            en las principales zonas industriales de Bogotá.
          </p>
          <div style={styles.heroCtas}>
            <Link to="/contacto" style={styles.btnPrimary}>
              Solicitar diagnóstico gratuito
            </Link>
            <Link to="/servicios" style={styles.btnOutline}>
              Ver nuestros servicios
            </Link>
          </div>
        </div>
      </section>

      {/* ── MÉTRICAS ─────────────────────────────────────────── */}
      <section style={styles.statsSection}>
        <div style={styles.container}>
          <div style={styles.statsGrid}>
            {STATS.map(({ value, label }) => (
              <div key={label} style={styles.statCard}>
                <span style={styles.statValue}>{value}</span>
                <span style={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILARES DE VALOR ─────────────────────────────────── */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Lo que nos diferencia</h2>
          <p style={styles.sectionSub}>
            Tres compromisos que todo jefe de mantenimiento necesita de su proveedor
          </p>
          <div style={styles.cardsGrid}>
            {PILLARS.map(({ icon, title, text }) => (
              <div key={title} style={styles.pillarCard}>
                <span style={styles.pillarIcon}>{icon}</span>
                <h3 style={styles.pillarTitle}>{title}</h3>
                <p style={styles.pillarText}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEMA ─────────────────────────────────────────── */}
      <section style={{ ...styles.section, background: 'var(--color-primary)' }}>
        <div style={styles.container}>
          <h2 style={{ ...styles.sectionTitle, color: '#fff' }}>El problema que resolvemos</h2>
          <p style={{ ...styles.sectionSub, color: 'rgba(255,255,255,0.75)' }}>
            Las pymes industriales de Bogotá enfrentan tres problemas críticos con su mantenimiento eléctrico:
          </p>
          <div style={styles.problemGrid}>
            {[
              { n: '01', text: 'Tiempos de respuesta superiores a 6 horas cuando hay una falla eléctrica.' },
              { n: '02', text: 'Paros no planificados que impactan directamente la producción y la facturación.' },
              { n: '03', text: 'Contratistas sin documentación ni trazabilidad — su empresa no sabe qué se hizo, cuándo ni por qué.' },
            ].map(({ n, text }) => (
              <div key={n} style={styles.problemCard}>
                <span style={styles.problemN}>{n}</span>
                <p style={styles.problemText}>{text}</p>
              </div>
            ))}
          </div>

          {/* tabla comparativa */}
          <div style={styles.tableWrap}>
            <table style={styles.compTable}>
              <thead>
                <tr>
                  <th style={styles.th}>Criterio</th>
                  <th style={styles.th}>Empresas grandes</th>
                  <th style={styles.th}>Técnicos independientes</th>
                  <th style={{ ...styles.th, color: 'var(--color-secondary)' }}>YUNCAR</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.criterio}>
                    <td style={styles.td}>{row.criterio}</td>
                    <td style={styles.td}>{row.grandes}</td>
                    <td style={styles.td}>{row.independientes}</td>
                    <td style={{ ...styles.td, fontWeight: 700, color: 'var(--color-secondary)' }}>{row.yuncar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── ZONAS DE COBERTURA ───────────────────────────────── */}
      <section style={{ ...styles.section, background: 'var(--color-bg)' }}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Dónde operamos</h2>
          <p style={styles.sectionSub}>
            Cobertura estratégica en las cinco zonas de mayor concentración industrial de Bogotá
          </p>
          <div style={styles.zonesGrid}>
            {ZONES.map(({ zone, sectors, priority }) => (
              <div key={zone} style={styles.zoneCard}>
                <span style={styles.zoneIcon}>📍</span>
                <div>
                  <strong style={styles.zoneName}>{zone}</strong>
                  {priority === 3 && (
                    <span style={styles.zoneBadge}>Zona principal</span>
                  )}
                  <p style={styles.zoneSectors}>{sectors}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <h2 style={styles.ctaTitle}>¿Tiene una planta en Bogotá?</h2>
          <p style={styles.ctaText}>
            Solicite un diagnóstico gratuito de su instalación eléctrica.
            Sin compromiso. Respuesta en menos de 24 horas.
          </p>
          <Link to="/contacto" style={styles.btnPrimary}>
            Contactar ahora
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ── ESTILOS ─────────────────────────────────────────────────── */
const styles = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  // Hero
  hero: {
    background: 'var(--color-primary)',
    color: '#fff',
    padding: '5rem 0 4rem',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
  },
  heroBadge: {
    fontSize: '0.875rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-secondary)',
    marginBottom: '1rem',
    fontWeight: 600,
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 800,
    lineHeight: 1.15,
    maxWidth: '720px',
    marginBottom: '1.5rem',
    borderLeft: '4px solid var(--color-accent)',
    paddingLeft: '1rem',
  },
  heroAccent: {
    color: 'var(--color-accent)',
  },
  heroSub: {
    fontSize: '1.125rem',
    color: 'rgba(255,255,255,0.8)',
    maxWidth: '560px',
    marginBottom: '2rem',
    lineHeight: 1.6,
  },
  heroCtas: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
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
    transition: 'background 0.2s ease',
  },
  btnOutline: {
    display: 'inline-block',
    background: 'transparent',
    color: '#fff',
    padding: '0.75rem 2rem',
    border: '2px solid rgba(255,255,255,0.5)',
    borderRadius: '4px',
    fontWeight: 600,
    fontSize: '1rem',
    textDecoration: 'none',
  },
  // Stats
  statsSection: {
    background: 'var(--color-primary)',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    padding: '2.5rem 0',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '1.5rem',
  },
  statCard: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 800,
    color: 'var(--color-secondary)',
    display: 'block',
  },
  statLabel: {
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.7)',
    marginTop: '0.5rem',
    maxWidth: '120px',
  },
  // Section generic
  section: {
    padding: '4rem 0',
    background: 'var(--color-surface)',
  },
  sectionTitle: {
    fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    marginBottom: '0.75rem',
  },
  sectionSub: {
    fontSize: '1rem',
    color: 'var(--color-text-secondary)',
    marginBottom: '2.5rem',
    maxWidth: '560px',
    lineHeight: 1.6,
  },
  // Pillars
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  pillarCard: {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    padding: '1.5rem',
    borderTop: '3px solid var(--color-accent)',
  },
  pillarIcon: {
    fontSize: '2rem',
    display: 'block',
    marginBottom: '0.75rem',
  },
  pillarTitle: {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    marginBottom: '0.5rem',
  },
  pillarText: {
    fontSize: '0.9375rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
    margin: 0,
  },
  // Problem
  problemGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2.5rem',
  },
  problemCard: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  problemN: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: 'var(--color-accent)',
    lineHeight: 1,
    flexShrink: 0,
  },
  problemText: {
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.6,
    margin: 0,
    paddingTop: '0.5rem',
  },
  tableWrap: {
    overflowX: 'auto',
  },
  compTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.875rem',
  },
  th: {
    padding: '0.75rem 1rem',
    textAlign: 'left',
    color: 'rgba(255,255,255,0.6)',
    fontWeight: 600,
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '0.75rem 1rem',
    color: 'rgba(255,255,255,0.8)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    verticalAlign: 'top',
  },
  // Zones
  zonesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1rem',
  },
  zoneCard: {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    padding: '1.25rem',
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start',
  },
  zoneIcon: {
    fontSize: '1.25rem',
    flexShrink: 0,
    marginTop: '2px',
  },
  zoneName: {
    fontSize: '1rem',
    color: 'var(--color-text-primary)',
    display: 'block',
    marginBottom: '0.25rem',
  },
  zoneBadge: {
    display: 'inline-block',
    background: 'var(--color-secondary)',
    color: 'var(--color-primary)',
    fontSize: '0.7rem',
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: '12px',
    marginLeft: '0.5rem',
    verticalAlign: 'middle',
  },
  zoneSectors: {
    fontSize: '0.8125rem',
    color: 'var(--color-text-secondary)',
    margin: '0.25rem 0 0',
  },
  // CTA final
  ctaSection: {
    background: 'var(--color-bg)',
    padding: '4rem 0',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    marginBottom: '1rem',
  },
  ctaText: {
    color: 'var(--color-text-secondary)',
    marginBottom: '2rem',
    maxWidth: '480px',
    margin: '0 auto 2rem',
    lineHeight: 1.6,
  },
};