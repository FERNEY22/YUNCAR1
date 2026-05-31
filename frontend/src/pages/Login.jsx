// frontend/src/pages/Login.jsx
// Página de login del panel admin de YUNCAR
// Form simple username + password con redirección a /admin si autenticación exitosa

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Si ya hay sesión activa, redirige a /admin sin mostrar el form
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(username.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      const message = err.response?.data?.error || 'Error al iniciar sesión. Verifica tu conexión al servidor.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>YUNCAR</h1>
        <p style={styles.subtitle}>Panel administrativo</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Usuario
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              maxLength={30}
              disabled={loading}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
            />
          </label>

          {error && <div style={styles.error}>{error}</div>}

          <button
            type="submit"
            disabled={loading || !username || !password}
            style={styles.button}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f7',
    padding: 20,
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: '40px 32px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: 1,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 32,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 13,
    fontWeight: 500,
    color: '#444',
    gap: 6,
  },
  input: {
    padding: '10px 12px',
    fontSize: 15,
    border: '1px solid #d0d0d0',
    borderRadius: 6,
    outline: 'none',
    fontFamily: 'inherit',
  },
  error: {
    padding: 12,
    backgroundColor: '#fef2f2',
    color: '#c52727',
    borderRadius: 6,
    fontSize: 13,
    border: '1px solid #fecaca',
  },
  button: {
    padding: '12px 16px',
    fontSize: 15,
    fontWeight: 600,
    color: 'white',
    backgroundColor: '#1a1a1a',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    marginTop: 8,
  },
};