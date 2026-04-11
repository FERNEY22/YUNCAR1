// FloatingButtons.jsx — YUNCAR MVP
// Ubicación: frontend/src/components/FloatingButtons.jsx
//
// Botones flotantes WhatsApp e Instagram.
// Para actualizar Instagram: reemplaza el valor de INSTAGRAM_URL
// con el handle real. Ejemplo: 'https://instagram.com/yuncar.bogota'

import { useState } from 'react';

// ── CONFIGURACIÓN — actualizar cuando estén listos ──────────
const WHATSAPP_URL =
  'https://wa.me/573154720276?text=Hola%20YUNCAR%2C%20necesito%20información%20sobre%20sus%20servicios';
const INSTAGRAM_URL = 'https://instagram.com/yuncar'; // reemplazar con handle real

export default function FloatingButtons() {
  const [hoverWA, setHoverWA]  = useState(false);
  const [hoverIG, setHoverIG]  = useState(false);

  return (
    <div style={s.wrap}>

      {/* Instagram */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Síguenos en Instagram"
        style={{
          ...s.btn,
          ...s.btnIG,
          ...(hoverIG ? s.btnHover : {}),
        }}
        onMouseEnter={() => setHoverIG(true)}
        onMouseLeave={() => setHoverIG(false)}
      >
        {/* Ícono Instagram SVG */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="#fff" strokeWidth="1.8" fill="none"/>
          <circle cx="12" cy="12" r="4.2" stroke="#fff" strokeWidth="1.8" fill="none"/>
          <circle cx="17.5" cy="6.5" r="1.2" fill="#fff"/>
        </svg>
        {hoverIG && <span style={s.tooltip}>Instagram</span>}
      </a>

      {/* WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        style={{
          ...s.btn,
          ...s.btnWA,
          ...(hoverWA ? s.btnHover : {}),
        }}
        onMouseEnter={() => setHoverWA(true)}
        onMouseLeave={() => setHoverWA(false)}
      >
        {/* Ícono WhatsApp SVG */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.982-1.41A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Z"
            stroke="#fff"
            strokeWidth="1.7"
            fill="none"
          />
          <path
            d="M8.5 9.5c.2.8.8 2.2 2 3.3 1.3 1.2 2.7 1.8 3.5 2 .3.1.6 0 .8-.2l.7-.8c.2-.2.5-.3.7-.1l2 1c.3.1.3.5.2.7-.4.8-1.2 2-2.3 2.1-1.7.2-4-.5-6.3-2.7-2-2-2.8-4-2.8-5.5 0-1 .9-1.8 1.6-2.1.3-.1.6 0 .7.3l.9 1.8c.1.2 0 .5-.1.6l-.7.7Z"
            fill="#fff"
          />
        </svg>
        {hoverWA && <span style={s.tooltip}>WhatsApp</span>}
      </a>

    </div>
  );
}

/* ── ESTILOS ─────────────────────────────────────────────────── */
const s = {
  wrap: {
    position: 'fixed',
    bottom: '1.5rem',
    right: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    zIndex: 999,
  },
  btn: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    textDecoration: 'none',
    position: 'relative',
  },
  btnWA: {
    background: '#25D366',
  },
  btnIG: {
    background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
  },
  btnHover: {
    transform: 'scale(1.1)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
  },
  tooltip: {
    position: 'absolute',
    right: '60px',
    background: 'rgba(13,31,51,0.88)',
    color: '#fff',
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  },
};