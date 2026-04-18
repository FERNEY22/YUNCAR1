// Footer.jsx — YUNCAR MVP
// Ubicación: frontend/src/components/Footer.jsx

import { Link } from 'react-router-dom';

const SERVICES = [
  { label: 'Mantenimiento preventivo', to: '/servicios' },
  { label: 'Correctivo de emergencia', to: '/servicios' },
  { label: 'Auditoría RETIE',          to: '/servicios' },
  { label: 'Instalación de tableros',  to: '/servicios' },
  { label: 'Consultoría energética',   to: '/servicios' },
];

const ZONES = [
  'Puente Aranda',
  'Fontibón',
  'Álamos',
  'Montevideo',
  'Zona Franca',
];

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer style={s.footer}>

      {/* Separador superior */}
      <div style={s.topBar} />

      {/* Cuerpo principal */}
      <div style={s.body}>
        <div style={s.container}>
          <div style={s.grid}>

            {/* Columna 1 — Marca */}
            <div style={s.col}>
              <div style={s.logo}>
                YUN<span style={s.logoAccent}>CAR</span>
              </div>
              <p style={s.tagline}>
                Mantenimiento y consultoría garantizada en Bogotá
              </p>
              <div style={s.contactGroup}>
                <a
                  href="https://wa.me/573154720276"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={s.contactLink}
                >
                  <span style={s.contactIcon}>📱</span>
                  +57 315 472 0276
                </a>
                <a
                  href="mailto:contacto@yuncar.com.co"
                  style={s.contactLink}
                >
                  <span style={s.contactIcon}>✉</span>
                  contacto@yuncar.com.co
                </a>
                <span style={s.contactText}>
                  <span style={s.contactIcon}>📍</span>
                  El Chico, Bogotá D.C., Colombia
                </span>
              </div>
            </div>

            {/* Columna 2 — Servicios */}
            <div style={s.col}>
              <p style={s.colTitle}>Servicios</p>
              <ul style={s.linkList}>
                {SERVICES.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} style={s.footerLink}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna 3 — Zonas */}
            <div style={s.col}>
              <p style={s.colTitle}>Zonas de cobertura</p>
              <ul style={s.linkList}>
                {ZONES.map((zone) => (
                  <li key={zone} style={s.zoneItem}>
                    <span style={s.zoneDot} />
                    <span style={s.zoneLabel}>{zone}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna 4 — Horario y normativa */}
            <div style={s.col}>
              <p style={s.colTitle}>Atención</p>
              <div style={s.scheduleBox}>
                <p style={s.scheduleLabel}>Horario de oficina</p>
                <p style={s.scheduleVal}>Lun–Vie 7:00 a.m. – 6:00 p.m.</p>
                <p style={{ ...s.scheduleLabel, marginTop: '0.75rem' }}>Emergencias</p>
                <p style={s.scheduleVal}>24 horas · 7 días</p>
                <a
                  href="https://wa.me/573154720276?text=Emergencia%20eléctrica%20-%20necesito%20atención%20urgente"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={s.emergencyBtn}
                >
                  WhatsApp emergencias
                </a>
              </div>
              <div style={s.normativa}>
                <span style={s.normPill}>NTC 2050</span>
                <span style={s.normPill}>RETIE</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Pie legal */}
      <div style={s.legal}>
        <div style={{ ...s.container, ...s.legalInner }}>
          <span style={s.legalText}>
            © {YEAR} YUNCAR — Todos los derechos reservados
          </span>
          <span style={s.legalText}>
            NIT 1075247921-1 · El Chico, Bogotá D.C., Colombia
          </span>
        </div>
      </div>

    </footer>
  );
}

/* ── ESTILOS ─────────────────────────────────────────────────── */
const s = {
  footer: {
    background: 'var(--color-primary)',
    color: '#fff',
  },
  topBar: {
    height: '3px',
    background: 'var(--color-accent)',
  },
  body: {
    padding: '3rem 0 2.5rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2.5rem',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  logo: {
    fontSize: '1.375rem',
    fontWeight: 800,
    color: '#fff',
    letterSpacing: '0.04em',
    marginBottom: '0.25rem',
  },
  logoAccent: {
    color: 'var(--color-accent)',
  },
  tagline: {
    fontSize: '0.8125rem',
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.55,
    marginBottom: '0.75rem',
  },
  contactGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  contactLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    transition: 'color 0.15s ease',
  },
  contactText: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.8)',
  },
  contactIcon: {
    fontSize: '0.875rem',
    flexShrink: 0,
  },
  colTitle: {
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.09em',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '0.75rem',
  },
  linkList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  footerLink: {
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.75)',
    textDecoration: 'none',
    transition: 'color 0.15s ease',
  },
  zoneItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  zoneDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: 'var(--color-accent)',
    flexShrink: 0,
  },
  zoneLabel: {
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.75)',
  },
  scheduleBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
    marginBottom: '1rem',
  },
  scheduleLabel: {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: 'rgba(255,255,255,0.7)',
    fontWeight: 700,
    marginTop: '0.5rem',
  },
  scheduleVal: {
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.8)',
  },
  emergencyBtn: {
    display: 'inline-block',
    marginTop: '0.75rem',
    padding: '0.5rem 1rem',
    background: 'var(--color-accent)',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '0.8125rem',
    fontWeight: 700,
    textDecoration: 'none',
    textAlign: 'center',
  },
  normativa: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginTop: '0.5rem',
  },
  normPill: {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '4px',
    padding: '3px 10px',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.8)',
  },
  legal: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    padding: '1.25rem 0',
  },
  legalInner: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '0.5rem',
  },
  legalText: {
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,0.65)',
  },
};