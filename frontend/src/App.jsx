// App.jsx — YUNCAR MVP
// Ubicación: frontend/src/App.jsx
// Registro de rutas con React Router DOM

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header          from './components/Header';
import Footer          from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

import Home        from './pages/Home';
import Services    from './pages/Services';
import Projects    from './pages/Projects';
import About       from './pages/About';
import ContactForm from './pages/ContactForm';
import Portfolio   from './pages/Portfolio';
import NotFound    from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/servicios"  element={<Services />} />
        <Route path="/proyectos"  element={<Projects />} />
        <Route path="/nosotros"   element={<About />} />
        <Route path="/contacto"   element={<ContactForm />} />
        <Route path="/portafolio" element={<Portfolio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <FloatingButtons />
    </BrowserRouter>
  );
}