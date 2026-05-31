// App.jsx — YUNCAR MVP
// Ubicación: frontend/src/App.jsx
// Registro de rutas con React Router DOM + separación de layouts

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicLayout from './components/PublicLayout';
import ScrollToTop from './components/ScrollToTop';

import Home        from './pages/Home';
import Services    from './pages/Services';
import Projects    from './pages/Projects';
import About       from './pages/About';
import ContactForm from './pages/ContactForm';
import Portfolio   from './pages/Portfolio';
import NotFound    from './pages/NotFound';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Rutas públicas — Header, Footer y FloatingButtons vía PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/"           element={<Home />} />
          <Route path="/servicios"  element={<Services />} />
          <Route path="/proyectos"  element={<Projects />} />
          <Route path="/nosotros"   element={<About />} />
          <Route path="/contacto"   element={<ContactForm />} />
          <Route path="/portafolio" element={<Portfolio />} />
          <Route path="*"           element={<NotFound />} />
        </Route>

        {/* Rutas del panel admin — sin layout público (se llenan en pasos siguientes) */}
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<Admin />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}