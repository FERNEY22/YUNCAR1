// Header.jsx — YUNCAR MVP
// Ubicación: frontend/src/components/Header.jsx

import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/',          label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/portafolio', label: 'Portafolio' },
  { to: '/nosotros',  label: 'Nosotros' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  function closeMenu() { setMenuOpen(false); }

  useEffect(() => {
    if (!menuOpen) return;

    function handleKey(e) {
      if (e.key === 'Escape') setMenuOpen(false);
    }

    function handleOutside(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} style={s.header}>
      <div style={s.inner}>

        <Link to="/" style={s.logo} onClick={closeMenu}>
          YUN<span style={s.logoAccent}>CAR</span>
        </Link>

        {/* Nav desktop — oculto en mobile via clase CSS */}
        <nav className="nav-desktop" aria-label="Navegación principal">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                ...s.navLink,
                ...(isActive ? s.navLinkActive : {}),
              })}
            >
              {label}
            </NavLink>
          ))}
          <Link to="/contacto" style={s.ctaBtn} onClick={closeMenu}>
            Contacto
          </Link>
        </nav>

        {/* Hamburguesa — solo mobile via clase CSS */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          style={s.hamburger}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Nav mobile */}
      {menuOpen && (
        <nav style={s.navMobile} aria-label="Menú móvil">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                ...s.mobileLink,
                ...(isActive ? s.mobileLinkActive : {}),
              })}
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
          <Link to="/contacto" style={s.mobileCta} onClick={closeMenu}>
            Contacto
          </Link>
        </nav>
      )}
    </header>
  );
}

const s = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(255,255,255,0.97)',
    borderBottom: '1px solid var(--color-border)',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 800,
    color: 'var(--color-primary)',
    textDecoration: 'none',
    letterSpacing: '0.04em',
  },
  logoAccent: {
    color: 'var(--color-accent)',
  },
  navLink: {
    padding: '0.375rem 0.875rem',
    borderRadius: '4px',
    fontSize: '0.9375rem',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    textDecoration: 'none',
  },
  navLinkActive: {
    background: '#eef2f8',
    color: 'var(--color-primary)',
    fontWeight: 700,
  },
  ctaBtn: {
    marginLeft: '0.5rem',
    padding: '0.5rem 1.25rem',
    background: 'var(--color-accent)',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '0.9375rem',
    fontWeight: 700,
    textDecoration: 'none',
  },
  hamburger: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.25rem',
    color: 'var(--color-primary)',
    cursor: 'pointer',
    padding: '0.5rem',
    lineHeight: 1,
  },
  navMobile: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    borderTop: '1px solid var(--color-border)',
    background: '#fff',
    gap: '0.25rem',
  },
  mobileLink: {
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    textDecoration: 'none',
  },
  mobileLinkActive: {
    background: '#eef2f8',
    color: 'var(--color-primary)',
    fontWeight: 700,
  },
  mobileCta: {
    marginTop: '0.5rem',
    padding: '0.75rem 1rem',
    background: 'var(--color-accent)',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 700,
    textDecoration: 'none',
    textAlign: 'center',
  },
};