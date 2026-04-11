// Services.jsx — YUNCAR MVP
// [F-04] feat: contenido institucional real en Services.jsx Closes #6

import { Link } from 'react-router-dom';

const SERVICES = [
  {
    id: 'preventivo',
    icon: '🔧',
    title: 'Mantenimiento Eléctrico Preventivo',
    description:
      'Plan programado de inspección, limpieza y ajuste de instalaciones eléctricas y equipos electromecánicos. Reducimos la probabilidad de fallas antes de que ocurran.',
    includes: [
      'Inspección termográfica de tableros y conexiones',
      'Medición de aislamientos (megóhmetro)',
      'Verificación de protecciones y calibración de interruptores',
      'Limpieza de contactos y ajuste de terminales',
      'Reporte técnico con fotografías y recomendaciones',
    ],
    sla: 'Agenda programada (48 h de anticipación mínima)',
    periodicity: 'Mensual o trimestral según plan',
  },
  {
    id: 'correctivo',
    icon: '⚡',
    title: 'Correctivo de Emergencia',
    description:
      'Atención inmediata ante fallas eléctricas y electromecánicas que detienen su producción. Respuesta garantizada en menos de 4 horas en zona.',
    includes: [
      'Diagnóstico en sitio con equipos certificados',
      'Reparación o reemplazo del componente fallado',
      'Prueba de restablecimiento bajo carga',
      'Reporte técnico con causa raíz y acciones correctivas',
      'Recargo nocturno y de fin de semana según tarifa vigente',
    ],
    sla: '< 4 horas en zona contratada',
    highlight: true,
  },
  {
    id: 'retie',
    icon: '📋',
    title: 'Auditoría Eléctrica y Certificación RETIE',
    description:
      'Revisión técnica integral de sus instalaciones conforme a la NTC 2050 y el RETIE. Entregamos el informe de conformidad para trámites ante entes de control o aseguradoras.',
    includes: [
      'Revisión de planos eléctricos vs. instalación real',
      'Medición y análisis de calidad de potencia',
      'Verificación de puesta a tierra y protecciones',
      'Informe técnico de conformidad con plan de acción',
      'Gestión de certificación ante operador de red cuando aplica',
    ],
    sla: 'Informe en 5 días hábiles',
  },
  {
    id: 'tableros',
    icon: '🏗️',
    title: 'Instalación de Tableros Eléctricos',
    description:
      'Diseño e instalación de tableros de distribución, centros de carga y arrancadores para motores industriales, con cumplimiento de normativa NTC 2050.',
    includes: [
      'Diseño del diagrama unifilar',
      'Suministro e instalación de protecciones (breakers, fusibles, relés)',
      'Cableado estructurado y marcación de circuitos',
      'Puesta a tierra certificada',
      'Entrega con dossier técnico y garantía de 12 meses en mano de obra',
    ],
    sla: 'Según alcance del proyecto',
  },
  {
    id: 'motores',
    icon: '⚙️',
    title: 'Mantenimiento y Puesta en Marcha de Motores',
    description:
      'Revisión, reparación y puesta en marcha de motores eléctricos industriales (trifásicos y monofásicos). Medición de parámetros, alineación y verificación de aislamiento.',
    includes: [
      'Medición de resistencia de aislamiento (megger)',
      'Verificación de balanceo de fases y consumo nominal',
      'Inspección de rodamientos y carcasa',
      'Prueba de arranque y operación bajo carga',
      'Reporte de parámetros eléctricos',
    ],
    sla: 'Según disponibilidad y alcance',
  },
  {
    id: 'consultoria',
    icon: '💡',
    title: 'Consultoría Eléctrica y Eficiencia Energética',
    description:
      'Estudios técnicos para optimización del consumo eléctrico, rediseño de instalaciones y planificación de expansiones. Ideal para reducir la factura de energía.',
    includes: [
      'Análisis de calidad de energía y armónicos',
      'Estudio de cargas y factor de potencia',
      'Recomendaciones de corrección y eficiencia energética',
      'Rediseño de instalaciones existentes',
      'Informe técnico ejecutivo para gerencia',
    ],
    sla: 'Informe en 10 días hábiles',
  },
];

export default function Services() {
  return (
    <main>
      {/* ── HEADER SECCIÓN ───────────────────────────────────── */}
      <section style={styles.header}>
        <div style={styles.container}>
          <p style={styles.headerBadge}>Catálogo de servicios</p>
          <h1 style={styles.headerTitle}>Nuestros Servicios</h1>
          <p style={styles.headerSub}>
            Soluciones de mantenimiento eléctrico y electromecánico diseñadas para minimizar
            el tiempo de parada y maximizar la vida útil de sus instalaciones industriales.
          </p>
        </div>
      </section>

      {/* ── LISTADO DE SERVICIOS ─────────────────────────────── */}
      <section style={styles.servicesSection}>
        <div style={styles.container}>
          <div style={styles.servicesGrid}>
            {SERVICES.map((srv) => (
              <article
                key={srv.id}
                style={{
                  ...styles.serviceCard,
                  ...(srv.highlight ? styles.serviceCardHL : {}),
                }}
              >
                {srv.highlight && (
                  <span style={styles.highlightBadge}>Emergencias 24/7</span>
                )}
                <span style={styles.serviceIcon}>{srv.icon}</span>
                <h2 style={styles.serviceTitle}>{srv.title}</h2>
                <p style={styles.serviceDesc}>{srv.description}</p>

                <div style={styles.includesWrap}>
                  <p style={styles.includesLabel}>Incluye:</p>
                  <ul style={styles.includesList}>
                    {srv.includes.map((item) => (
                      <li key={item} style={styles.includesItem}>
                        <span style={styles.bullet}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={styles.slaWrap}>
                  <span style={styles.slaIcon}>⏱️</span>
                  <span style={styles.slaText}>{srv.sla}</span>
                </div>
                {srv.periodicity && (
                  <div style={{ ...styles.slaWrap, marginTop: '0.25rem' }}>
                    <span style={styles.slaIcon}>📅</span>
                    <span style={styles.slaText}>{srv.periodicity}</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={styles.ctaSection}>
        <div style={{ ...styles.container, textAlign: 'center' }}>
          <h2 style={styles.ctaTitle}>¿No encuentra lo que necesita?</h2>
          <p style={styles.ctaText}>
            Contáctenos para describir su necesidad específica. Tenemos experiencia en múltiples
            sectores industriales y ofrecemos soluciones a medida.
          </p>
          <Link to="/contacto" style={styles.btnPrimary}>
            Hablar con un técnico
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
  headerBadge: {
    fontSize: '0.8rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-secondary)',
    marginBottom: '0.75rem',
    fontWeight: 600,
  },
  headerTitle: {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 800,
    marginBottom: '1rem',
  },
  headerSub: {
    fontSize: '1.0625rem',
    color: 'rgba(255,255,255,0.78)',
    maxWidth: '620px',
    lineHeight: 1.65,
    margin: 0,
  },
  servicesSection: {
    padding: '4rem 0',
    background: 'var(--color-bg)',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  serviceCard: {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    padding: '1.75rem',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  serviceCardHL: {
    borderColor: 'var(--color-accent)',
    borderWidth: '2px',
  },
  highlightBadge: {
    position: 'absolute',
    top: '-12px',
    left: '1.5rem',
    background: 'var(--color-accent)',
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: 700,
    padding: '3px 12px',
    borderRadius: '12px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  serviceIcon: {
    fontSize: '2rem',
    display: 'block',
  },
  serviceTitle: {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    margin: 0,
  },
  serviceDesc: {
    fontSize: '0.9375rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.65,
    margin: 0,
  },
  includesWrap: {
    marginTop: '0.5rem',
  },
  includesLabel: {
    fontSize: '0.8125rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: '0.5rem',
  },
  includesList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  includesItem: {
    fontSize: '0.875rem',
    color: 'var(--color-text-secondary)',
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'flex-start',
  },
  bullet: {
    color: 'var(--color-success)',
    fontWeight: 700,
    flexShrink: 0,
    marginTop: '1px',
  },
  slaWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    marginTop: 'auto',
    paddingTop: '0.75rem',
    borderTop: '1px solid var(--color-border)',
  },
  slaIcon: {
    fontSize: '0.875rem',
  },
  slaText: {
    fontSize: '0.8125rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
  },
  ctaSection: {
    background: 'var(--color-primary)',
    padding: '4rem 0',
  },
  ctaTitle: {
    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '1rem',
  },
  ctaText: {
    color: 'rgba(255,255,255,0.75)',
    maxWidth: '520px',
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