// frontend/src/pages/Admin.jsx
// Panel admin de YUNCAR: listado de leads + logout

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import authService from '../services/authService';
import LeadCard from '../components/LeadCard';

export default function Admin() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = authService.getUser();

  async function fetchLeads() {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/api/contact');
      setLeads(response.data.consults);
    } catch (err) {
      // El 401 ya lo maneja el interceptor de api.js
      if (err.response?.status !== 401) {
        setError('Error al cargar los leads.');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  function handleLogout() {
    authService.logout();
    navigate('/login', { replace: true });
  }

  function handleLeadUpdated(updatedLead) {
    setLeads(prev => prev.map(l => l._id === updatedLead._id ? updatedLead : l));
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>YUNCAR Panel</h1>
          {user && (
            <span style={styles.userInfo}>
              {user.username} ({user.role})
            </span>
          )}
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Cerrar sesión
        </button>
      </header>

      <main style={styles.main}>
        <div style={styles.toolbar}>
          <h2 style={styles.subtitle}>
            Leads {leads.length > 0 && `(${leads.length})`}
          </h2>
          <button onClick={fetchLeads} disabled={loading} style={styles.refreshBtn}>
            {loading ? 'Cargando...' : 'Refrescar'}
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {loading && leads.length === 0 && (
          <div style={styles.message}>Cargando leads...</div>
        )}

        {!loading && leads.length === 0 && !error && (
          <div style={styles.message}>No hay leads todavía.</div>
        )}

        <div style={styles.leadsList}>
          {leads.map(lead => (
            <LeadCard key={lead._id} lead={lead} onUpdated={handleLeadUpdated} />
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f5f5f7', fontFamily: 'system-ui, -apple-system, sans-serif' },
  header: { backgroundColor: '#1a1a1a', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { display: 'flex', alignItems: 'baseline' },
  title: { margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: 1 },
  userInfo: { marginLeft: 16, fontSize: 13, color: '#aaa' },
  logoutBtn: { padding: '8px 16px', fontSize: 13, backgroundColor: 'transparent', color: 'white', border: '1px solid #555', borderRadius: 6, cursor: 'pointer' },
  main: { maxWidth: 960, margin: '0 auto', padding: '24px 20px' },
  toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  subtitle: { margin: 0, fontSize: 22, fontWeight: 600, color: '#1a1a1a' },
  refreshBtn: { padding: '8px 16px', fontSize: 13, backgroundColor: 'white', color: '#1a1a1a', border: '1px solid #d0d0d0', borderRadius: 6, cursor: 'pointer' },
  error: { padding: 12, backgroundColor: '#fef2f2', color: '#c52727', borderRadius: 6, fontSize: 14, marginBottom: 16, border: '1px solid #fecaca' },
  message: { padding: 24, textAlign: 'center', color: '#666', fontSize: 14 },
  leadsList: { display: 'flex', flexDirection: 'column', gap: 16 },
};