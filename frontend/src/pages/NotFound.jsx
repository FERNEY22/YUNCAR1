// NotFound.jsx — YUNCAR MVP
// Ruta catch-all 404 para URLs no registradas

import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <p style={styles.code}>404</p>
        <h1 style={styles.title}>Página no encontrada</h1>
        <p style={styles.text}>
          La dirección que buscas no existe o fue movida. Puedes volver al inicio
          o contactarnos si necesitas ayuda específica.
        </p>
        <div style={styles.ctas}>
          <Link to="/" style={styles.btnPrimary}>Volver al inicio</Link>
          <Link to="/contacto" style={styles.btnOutline}>Contáctenos</Link>
        </div>
      </div>
    </main>
  );
}

const styles = {
  main: {
    background: 'var(--color-bg)',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    padding: '4rem 0',
  },
  container: {
    width: '100%',
    maxWidth: '560px',
    margin: '0 auto',
    padding: '0 1rem',
    textAlign: 'center',
  },
  code: {
    fontSize: 'clamp(3rem, 10vw, 5rem)',
    fontWeight: 800,
    color: 'var(--color-accent)',
    lineHeight: 1,
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
  },
  title: {
    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    marginBottom: '1rem',
  },
  text: {
    color: 'var(--color-text-secondary)',
    lineHeight: 1.65,
    marginBottom: '2rem',
  },
  ctas: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
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
  btnOutline: {
    display: 'inline-block',
    background: 'transparent',
    color: 'var(--color-accent)',
    padding: '0.75rem 2rem',
    border: '2px solid var(--color-accent)',
    borderRadius: '4px',
    fontWeight: 700,
    fontSize: '1rem',
    textDecoration: 'none',
  },
};