// ScrollToTop.jsx — YUNCAR MVP
// Ubicación: frontend/src/components/ScrollToTop.jsx
// Resetea el scroll al tope cuando cambia la ruta.
// Componente invisible — se monta una vez dentro del Router.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}