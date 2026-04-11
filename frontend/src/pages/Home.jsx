// Home.jsx — YUNCAR MVP
// Fondo hero: #F4F6FA con canvas animado — paleta A aprobada

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const STATS = [
  { value: '< 4 h', label: 'Respuesta en zona',        color: '#E8500A' },
  { value: '5',     label: 'Zonas industriales',        color: '#F5A623' },
  { value: '100%',  label: 'Reportes digitales',        color: '#1A3A5C' },
  { value: 'RETIE', label: 'Cumplimiento normativo',    color: '#1A3A5C' },
];

const PILLARS = [
  {
    icon: '⏱️',
    title: 'Respuesta garantizada < 4 h',
    text: 'Atención en zona en menos de 4 horas para emergencias eléctricas en Puente Aranda, Fontibón, Álamos, Montevideo y Zona Franca.',
  },
  {
    icon: '📋',
    title: 'Trazabilidad total',
    text: 'Cada intervención genera un reporte técnico digital: diagnóstico, trabajo realizado, materiales y recomendaciones.',
  },
  {
    icon: '🏭',
    title: '5 zonas industriales',
    text: 'Cobertura estratégica en las zonas de mayor densidad industrial de Bogotá, sin recargos por desplazamiento.',
  },
];

const COMPARISON = [
  { criterio: 'Tiempo de respuesta',      grandes: '6–12 h',           independientes: 'Sin SLA',            yuncar: '< 4 h garantizado' },
  { criterio: 'Cobertura multi-zona',     grandes: 'Sí, costosa',      independientes: 'Una sola zona',      yuncar: '5 zonas priorizadas' },
  { criterio: 'Reportes y trazabilidad',  grandes: 'Sí (alto costo)',  independientes: 'No',                 yuncar: 'Reporte digital' },
  { criterio: 'Cumplimiento RETIE',       grandes: 'Certificado',      independientes: 'Irregular',          yuncar: 'Certificado' },
  { criterio: 'Flexibilidad contractual', grandes: 'Contratos rígidos',independientes: 'Sin contrato',      yuncar: 'Planes flexibles' },
  { criterio: 'Precio',                   grandes: 'Alto',             independientes: 'Sin respaldo',       yuncar: 'Competitivo' },
];

const ZONES = [
  { zone: 'Puente Aranda', sectors: 'Manufactura, química, plásticos, metalmecánica', priority: 3 },
  { zone: 'Fontibón',      sectors: 'Manufactura liviana, logística, alimentos',      priority: 3 },
  { zone: 'Álamos',        sectors: 'Farmacéutica, cosmética, tecnología',            priority: 2 },
  { zone: 'Montevideo',    sectors: 'Carpintería metálica, textiles, manufactura',    priority: 2 },
  { zone: 'Zona Franca',   sectors: 'Logística internacional, exportación',           priority: 2 },
];

// ── CANVAS — Red eléctrica animada ───────────────────────────
function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let nodes = [];
    let pulses = [];

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function initNodes() {
      nodes = [];
      for (let i = 0; i < 26; i++) {
        nodes.push({
          x:  Math.random() * canvas.width,
          y:  Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r:  1.5 + Math.random() * 2,
          ph: Math.random() * Math.PI * 2,
          ps: 0.007 + Math.random() * 0.012,
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy; n.ph += n.ps;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.strokeStyle = `rgba(26,58,92,${(1 - d / 140) * 0.1})`;
            ctx.lineWidth   = 0.7;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            if (Math.random() < 0.0004)
              pulses.push({ n1: i, n2: j, t: 0, s: 0.009 + Math.random() * 0.007 });
          }
        }
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p  = pulses[i];
        p.t     += p.s;
        if (p.t >= 1) { pulses.splice(i, 1); continue; }
        const n1 = nodes[p.n1], n2 = nodes[p.n2];
        const px = n1.x + (n2.x - n1.x) * p.t;
        const py = n1.y + (n2.y - n1.y) * p.t;
        ctx.globalAlpha = Math.sin(p.t * Math.PI) * 0.75;
        ctx.fillStyle   = '#E8500A';
        ctx.beginPath();
        ctx.arc(px, py, 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      nodes.forEach((n) => {
        const pulse = (Math.sin(n.ph) + 1) / 2;
        ctx.fillStyle = pulse > 0.82
          ? `rgba(232,80,10,${0.12 + pulse * 0.18})`
          : `rgba(26,58,92,${0.07 + pulse * 0.07})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + pulse * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(frame);
    }

    resize();
    initNodes();
    frame();

    window.addEventListener('resize', () => { resize(); initNodes(); });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────
export default function Home() {
  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={s.hero}>
        <NetworkCanvas />
        <div style={{ ...s.container, position: 'relative', zIndex: 2 }}>

          {/* Eyebrow pill */}
          <div style={s.pill}>
            <span style={s.pillDot} />
            <span style={s.pillText}>Bogotá · Zonas industriales</span>
          </div>

          <h1 style={s.heroTitle}>
            Mantenimiento y consultoría
            <br />
            <span style={s.heroAccent}>garantizada en Bogotá</span>
          </h1>

          <p style={s.heroSub}>
            Prevenimos paros no planificados y documentamos cada intervención
            en las principales zonas industriales de Bogotá.
          </p>

          <div style={s.heroCtas}>
            <Link to="/contacto" style={s.btnPrimary}>Solicitar cotización</Link>
            <Link to="/servicios" style={s.btnOutline}>Ver servicios</Link>
          </div>

          {/* Métricas */}
          <div style={s.statsRow}>
            {STATS.map(({ value, label, color }) => (
              <div key={label} style={s.statCard}>
                <span style={{ ...s.statValue, color }}>{value}</span>
                <span style={s.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILARES DE VALOR ─────────────────────────────────── */}
      <section style={s.section}>
        <div style={s.container}>
          <h2 style={s.sectionTitle}>Lo que nos diferencia</h2>
          <p style={s.sectionSub}>
            Tres compromisos que todo jefe de mantenimiento necesita de su proveedor
          </p>
          <div style={s.cardsGrid}>
            {PILLARS.map(({ icon, title, text }) => (
              <div key={title} style={s.pillarCard}>
                <span style={s.pillarIcon}>{icon}</span>
                <h3 style={s.pillarTitle}>{title}</h3>
                <p style={s.pillarText}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EL PROBLEMA ──────────────────────────────────────── */}
      <section style={{ ...s.section, background: 'var(--color-primary)' }}>
        <div style={s.container}>
          <h2 style={{ ...s.sectionTitle, color: '#fff' }}>El problema que resolvemos</h2>
          <p style={{ ...s.sectionSub, color: 'rgba(255,255,255,0.75)' }}>
            Las pymes industriales de Bogotá enfrentan tres problemas críticos:
          </p>
          <div style={s.problemGrid}>
            {[
              { n: '01', text: 'Tiempos de respuesta superiores a 6 horas cuando hay una falla eléctrica.' },
              { n: '02', text: 'Paros no planificados que impactan directamente la producción y la facturación.' },
              { n: '03', text: 'Contratistas sin documentación — su empresa no sabe qué se hizo, cuándo ni por qué.' },
            ].map(({ n, text }) => (
              <div key={n} style={s.problemCard}>
                <span style={s.problemN}>{n}</span>
                <p style={s.problemText}>{text}</p>
              </div>
            ))}
          </div>
          <div style={s.tableWrap}>
            <table style={s.compTable}>
              <thead>
                <tr>
                  <th style={s.th}>Criterio</th>
                  <th style={s.th}>Empresas grandes</th>
                  <th style={s.th}>Técnicos independientes</th>
                  <th style={{ ...s.th, color: '#F5A623' }}>YUNCAR</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.criterio}>
                    <td style={s.td}>{row.criterio}</td>
                    <td style={s.td}>{row.grandes}</td>
                    <td style={s.td}>{row.independientes}</td>
                    <td style={{ ...s.td, fontWeight: 700, color: '#F5A623' }}>{row.yuncar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── ZONAS ────────────────────────────────────────────── */}
      <section style={{ ...s.section, background: 'var(--color-bg)' }}>
        <div style={s.container}>
          <h2 style={s.sectionTitle}>Dónde operamos</h2>
          <p style={s.sectionSub}>
            Cobertura estratégica en las cinco zonas de mayor concentración industrial de Bogotá
          </p>
          <div style={s.zonesGrid}>
            {ZONES.map(({ zone, sectors, priority }) => (
              <div key={zone} style={s.zoneCard}>
                <span style={s.zoneIcon}>📍</span>
                <div>
                  <strong style={s.zoneName}>{zone}</strong>
                  {priority === 3 && <span style={s.zoneBadge}>Zona principal</span>}
                  <p style={s.zoneSectors}>{sectors}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section style={s.ctaSection}>
        <div style={{ ...s.container, textAlign: 'center' }}>
          <h2 style={s.ctaTitle}>¿Tiene una planta en Bogotá?</h2>
          <p style={s.ctaText}>
            Solicite una cotización sin compromiso. Respuesta en menos de 24 horas.
          </p>
          <Link to="/contacto" style={s.btnPrimary}>Contactar ahora</Link>
        </div>
      </section>

    </main>
  );
}

// ── ESTILOS ───────────────────────────────────────────────────
const s = {
  container:   { width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' },
  // Hero — fondo claro con canvas
  hero: {
    position: 'relative',
    background: '#F4F6FA',
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    padding: '5rem 0 4rem',
    overflow: 'hidden',
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: '#fff',
    border: '1px solid #cdd9e8',
    borderRadius: '20px',
    padding: '5px 14px',
    marginBottom: '1.5rem',
  },
  pillDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#E8500A',
    flexShrink: 0,
    animation: 'none',
  },
  pillText:  { fontSize: '0.75rem', color: '#1A3A5C', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 800,
    lineHeight: 1.2,
    color: '#0D1F33',
    maxWidth: '620px',
    marginBottom: '1.25rem',
    borderLeft: '4px solid #E8500A',
    paddingLeft: '1rem',
  },
  heroAccent: { color: '#E8500A' },
  heroSub: {
    fontSize: '1.125rem',
    color: '#3A5068',
    maxWidth: '500px',
    marginBottom: '2rem',
    lineHeight: 1.65,
    paddingLeft: '1.25rem',
  },
  heroCtas: { display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingLeft: '1.25rem', marginBottom: '2.5rem' },
  btnPrimary: {
    display: 'inline-block',
    background: '#E8500A',
    color: '#fff',
    padding: '0.75rem 2rem',
    border: '2px solid #E8500A',
    borderRadius: '4px',
    fontWeight: 700,
    fontSize: '1rem',
    textDecoration: 'none',
  },
  btnOutline: {
    display: 'inline-block',
    background: 'transparent',
    color: '#E8500A',
    padding: '0.75rem 2rem',
    border: '2px solid #E8500A',
    borderRadius: '4px',
    fontWeight: 700,
    fontSize: '1rem',
    textDecoration: 'none',
  },
  statsRow: { display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingLeft: '1.25rem' },
  statCard: {
    background: '#fff',
    border: '1px solid #DCE8F0',
    borderRadius: '8px',
    padding: '1rem 1.25rem',
    minWidth: '110px',
    display: 'flex',
    flexDirection: 'column',
  },
  statValue: { fontSize: '1.5rem', fontWeight: 800, lineHeight: 1 },
  statLabel: { fontSize: '0.75rem', color: '#5A7088', marginTop: '0.375rem' },
  // Sections
  section:    { padding: '4rem 0', background: 'var(--color-surface)' },
  sectionTitle: { fontSize: 'clamp(1.5rem, 3vw, 1.875rem)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.75rem' },
  sectionSub:   { fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: '2.5rem', maxWidth: '560px', lineHeight: 1.65 },
  // Pillars
  cardsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' },
  pillarCard: {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    padding: '1.5rem',
    borderTop: '3px solid #E8500A',
  },
  pillarIcon:  { fontSize: '2rem', display: 'block', marginBottom: '0.75rem' },
  pillarTitle: { fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' },
  pillarText:  { fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0 },
  // Problem
  problemGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' },
  problemCard: { display: 'flex', gap: '1rem', alignItems: 'flex-start' },
  problemN:    { fontSize: '2.5rem', fontWeight: 800, color: '#E8500A', lineHeight: 1, flexShrink: 0 },
  problemText: { color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, margin: 0, paddingTop: '0.5rem' },
  tableWrap:   { overflowX: 'auto' },
  compTable:   { width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' },
  th: { padding: '0.75rem 1rem', textAlign: 'left', color: 'rgba(255,255,255,0.6)', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.15)', whiteSpace: 'nowrap' },
  td: { padding: '0.75rem 1rem', color: 'rgba(255,255,255,0.8)', borderBottom: '1px solid rgba(255,255,255,0.08)', verticalAlign: 'top' },
  // Zones
  zonesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' },
  zoneCard:  { background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' },
  zoneIcon:  { fontSize: '1.25rem', flexShrink: 0, marginTop: '2px' },
  zoneName:  { fontSize: '1rem', color: 'var(--color-text-primary)', display: 'block', marginBottom: '0.25rem' },
  zoneBadge: { display: 'inline-block', background: '#F5A623', color: '#1A3A5C', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', marginLeft: '0.5rem', verticalAlign: 'middle' },
  zoneSectors:{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0' },
  // CTA
  ctaSection: { background: 'var(--color-bg)', padding: '4rem 0' },
  ctaTitle:   { fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '1rem' },
  ctaText:    { color: 'var(--color-text-secondary)', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.65 },
};