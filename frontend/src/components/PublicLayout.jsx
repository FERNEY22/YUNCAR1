// frontend/src/components/PublicLayout.jsx
// Layout para rutas públicas del sitio YUNCAR
// Envuelve las páginas visibles a visitantes con Header, Footer y FloatingButtons

import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';

export default function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <FloatingButtons />
    </>
  );
}