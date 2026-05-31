// frontend/src/components/ProtectedRoute.jsx
// Wrapper de rutas que requieren autenticación
// Si no hay token en localStorage, redirige a /login

import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

export default function ProtectedRoute() {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}