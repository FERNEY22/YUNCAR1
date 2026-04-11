// Portfolio.jsx — YUNCAR MVP
// Portafolio en construcción — se publicarán casos reales una vez ejecutados.
// No se fabrican casos de referencia que no han ocurrido.

import { Link } from 'react-router-dom';

export default function Portfolio() {
  return (
    <main>
      <section style={styles.header}>
        <div style={styles.container}>
          <p style={styles.badge}>Portafolio</p>
          <h1 style={styles.title}>Casos de trabajo</h1>
          <p style={styles.sub}>
            Documentamos cada intervención con reporte técnico.
            Los casos de referencia se publicarán aquí en la medida que se ejecuten.
          </p>
        </div>
      </section>

      <section style={styles.body}>
        <div style={styles.container}>
          <div style={styles.card}>
            <span style={styles.icon}>🔧</span>
            <h2 style={styles.cardTitle}>Portafolio en construcción</h2>
            <p style={styles.cardText}>
              YUNCAR está en etapa de arranque operativo. En lugar de mostrar
              casos de referencia ficticios, publicaremos aquí los trabajos
              reales una vez completados y con autorización del cliente.
            </p>
            <p style={styles.cardText}>
              Cada caso incluirá: zona industrial, sector, tipo de servicio,
              descripción técnica y reporte fotográfico.
            </p>
            <Link to="/contacto" style={styles.btn}>
              Consultar disponibilidad
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const styles = {
  container: { width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' },
  header: { background: 'var(--color-primary)', color: '#fff', padding: '4rem 0 3rem' },
  badge: { fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-secondary)', marginBottom: '0.75rem', fontWeight: 600 },
  title: { fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem' },
  sub: { fontSize: '1.0625rem', color: 'rgba(255,255,255,0.78)', maxWidth: '560px', lineHeight: 1.65, margin: 0 },
  body: { padding: '4rem 0', background: 'var(--color-bg)' },
  card: { background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderTop: '3px solid var(--color-accent)', borderRadius: '8px', padding: '2.5rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' },
  icon: { fontSize: '2.5rem', display: 'block', marginBottom: '1rem' },
  cardTitle: { fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '1rem' },
  cardText: { fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1rem' },
  btn: { display: 'inline-block', marginTop: '1rem', background: 'var(--color-accent)', color: '#fff', padding: '0.75rem 2rem', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', border: '2px solid var(--color-accent)' },
};