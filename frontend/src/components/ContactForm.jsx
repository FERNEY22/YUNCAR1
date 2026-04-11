// ContactForm.jsx — YUNCAR MVP
// [F-07] feat: formulario de contacto con contenido real Closes #7
// Sin dependencias externas. Validación nativa. Submit hacia /api/contact.

import { useState } from 'react';

const ZONES = [
  'Puente Aranda',
  'Fontibón',
  'Álamos',
  'Montevideo',
  'Zona Franca',
  'Otra zona de Bogotá',
];

const SERVICES = [
  'Mantenimiento preventivo (plan mensual/trimestral)',
  'Correctivo de emergencia',
  'Auditoría eléctrica y certificación RETIE',
  'Instalación de tableros eléctricos',
  'Puesta en marcha de motores',
  'Consultoría técnica y eficiencia energética',
  'No sé / Necesito asesoría',
];

const INIT = {
  nombre: '',
  empresa: '',
  cargo: '',
  telefono: '',
  correo: '',
  zona: '',
  servicio: '',
  mensaje: '',
};

const REQUIRED_FIELDS = ['nombre', 'empresa', 'cargo', 'telefono', 'correo', 'zona', 'servicio', 'mensaje'];

function validate(form) {
  const errs = {};
  REQUIRED_FIELDS.forEach((f) => {
    if (!form[f]?.trim()) errs[f] = 'Este campo es obligatorio.';
  });
  if (form.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
    errs.correo = 'Ingrese un correo electrónico válido.';
  }
  if (form.mensaje && form.mensaje.trim().length < 20) {
    errs.mensaje = 'Describa su requerimiento (mínimo 20 caracteres).';
  }
  return errs;
}

export default function ContactForm() {
  const [form, setForm]     = useState(INIT);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('success');
      setForm(INIT);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <main>
        <section style={styles.header}>
          <div style={styles.container}>
            <h1 style={styles.headerTitle}>Contacto</h1>
          </div>
        </section>
        <section style={styles.formSection}>
          <div style={{ ...styles.container, ...styles.formWrap }}>
            <div style={styles.successCard}>
              <span style={styles.successIcon}>✅</span>
              <h2 style={styles.successTitle}>¡Solicitud recibida!</h2>
              <p style={styles.successText}>
                Gracias por contactar a YUNCAR. Un técnico especializado revisará su requerimiento
                y le responderá en menos de 24 horas hábiles.
              </p>
              <p style={styles.successText}>
                Para emergencias que no pueden esperar, contáctenos por WhatsApp Business.
              </p>
              <button
                onClick={() => setStatus('idle')}
                style={styles.btnPrimary}
              >
                Enviar otra solicitud
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* ── HEADER ───────────────────────────────────────────── */}
      <section style={styles.header}>
        <div style={styles.container}>
          <p style={styles.badge}>Atención a clientes</p>
          <h1 style={styles.headerTitle}>Contáctenos</h1>
          <p style={styles.headerSub}>
            Complete el formulario y nos comunicamos en menos de 24 horas con una propuesta
            preliminar. Para emergencias eléctricas, llámenos directamente.
          </p>
        </div>
      </section>

      <section style={styles.formSection}>
        <div style={{ ...styles.container, ...styles.formWrap }}>

          {/* ── FORMULARIO ─────────────────────────────────────── */}
          <div style={styles.formBox}>
            <h2 style={styles.formTitle}>Solicitar diagnóstico o propuesta</h2>

            {status === 'error' && (
              <div style={styles.errorBanner}>
                Hubo un problema al enviar su solicitud. Intente nuevamente o contáctenos por WhatsApp.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate style={styles.form}>
              {/* Row 1 */}
              <div style={styles.row2}>
                <Field label="Nombre completo *" error={errors.nombre}>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Nombre y apellido"
                    style={fieldStyle(errors.nombre)}
                    autoComplete="name"
                  />
                </Field>
                <Field label="Empresa *" error={errors.empresa}>
                  <input
                    type="text"
                    name="empresa"
                    value={form.empresa}
                    onChange={handleChange}
                    placeholder="Nombre de la empresa"
                    style={fieldStyle(errors.empresa)}
                    autoComplete="organization"
                  />
                </Field>
              </div>

              {/* Row 2 */}
              <div style={styles.row2}>
                <Field label="Cargo *" error={errors.cargo}>
                  <input
                    type="text"
                    name="cargo"
                    value={form.cargo}
                    onChange={handleChange}
                    placeholder="Jefe de mantenimiento / Gerente de planta"
                    style={fieldStyle(errors.cargo)}
                  />
                </Field>
                <Field label="Teléfono *" error={errors.telefono}>
                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="+57 300 000 0000"
                    style={fieldStyle(errors.telefono)}
                    autoComplete="tel"
                  />
                </Field>
              </div>

              {/* Correo */}
              <Field label="Correo electrónico *" error={errors.correo}>
                <input
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  placeholder="correo@empresa.com"
                  style={fieldStyle(errors.correo)}
                  autoComplete="email"
                />
              </Field>

              {/* Row 3 */}
              <div style={styles.row2}>
                <Field label="Zona industrial *" error={errors.zona}>
                  <select
                    name="zona"
                    value={form.zona}
                    onChange={handleChange}
                    style={fieldStyle(errors.zona)}
                  >
                    <option value="">Seleccione su zona</option>
                    {ZONES.map((z) => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Servicio de interés *" error={errors.servicio}>
                  <select
                    name="servicio"
                    value={form.servicio}
                    onChange={handleChange}
                    style={fieldStyle(errors.servicio)}
                  >
                    <option value="">¿Qué servicio necesita?</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Mensaje */}
              <Field label="Descripción de la necesidad *" error={errors.mensaje}>
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="Describa brevemente el problema o requerimiento. Incluya datos como voltaje, potencia instalada o síntomas observados."
                  rows={5}
                  style={fieldStyle(errors.mensaje)}
                />
              </Field>

              <button
                type="submit"
                disabled={status === 'sending'}
                style={{ ...styles.btnPrimary, ...(status === 'sending' ? styles.btnDisabled : {}) }}
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar solicitud'}
              </button>
            </form>
          </div>

          {/* ── DATOS DE CONTACTO ─────────────────────────────── */}
          <aside style={styles.sidebar}>
            <div style={styles.sideCard}>
              <h3 style={styles.sideTitle}>Contacto directo</h3>

              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>💬</span>
                <div>
                  <p style={styles.contactLabel}>WhatsApp Business</p>
                  <p style={styles.contactValue}>+57 [número]</p>
                  <p style={styles.contactNote}>Emergencias eléctricas 24/7</p>
                </div>
              </div>

              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📧</span>
                <div>
                  <p style={styles.contactLabel}>Correo corporativo</p>
                  <p style={styles.contactValue}>contacto@yuncar.com.co</p>
                </div>
              </div>

              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>🕐</span>
                <div>
                  <p style={styles.contactLabel}>Horario de atención</p>
                  <p style={styles.contactValue}>Lun–Vie 7:00 a.m. – 6:00 p.m.</p>
                  <p style={styles.contactNote}>Emergencias disponibles 24/7</p>
                </div>
              </div>

              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📍</span>
                <div>
                  <p style={styles.contactLabel}>Zonas de cobertura</p>
                  <p style={styles.contactValue}>
                    Puente Aranda · Fontibón · Álamos · Montevideo · Zona Franca
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.slaCard}>
              <p style={styles.slaTitle}>⏱️ Nuestro compromiso</p>
              <p style={styles.slaText}>
                Respondemos su formulario en menos de <strong>24 horas hábiles</strong>.
                Para emergencias que paran producción, garantizamos atención en menos de{' '}
                <strong>4 horas en zona</strong>.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ── Sub-componente Field ──────────────────────────────────────── */
function Field({ label, error, children }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      {children}
      {error && <span style={styles.errorMsg}>{error}</span>}
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────────── */
const fieldStyle = (err) => ({
  width: '100%',
  padding: '0.625rem 0.875rem',
  border: `1.5px solid ${err ? 'var(--color-danger)' : 'var(--color-border)'}`,
  borderRadius: '4px',
  fontSize: '1rem',
  color: 'var(--color-text-primary)',
  background: 'var(--color-surface)',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  resize: 'vertical',
  outline: 'none',
});

const styles = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  header: {
    background: 'var(--color-primary)',
    color: '#fff',
    padding: '4rem 0 3rem',
  },
  badge: {
    fontSize: '0.8rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-secondary)',
    marginBottom: '0.75rem',
    fontWeight: 600,
  },
  headerTitle: {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: 800,
    marginBottom: '1rem',
  },
  headerSub: {
    fontSize: '1.0625rem',
    color: 'rgba(255,255,255,0.78)',
    maxWidth: '580px',
    lineHeight: 1.65,
    margin: 0,
  },
  formSection: {
    padding: '3rem 0 4rem',
    background: 'var(--color-bg)',
  },
  formWrap: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    alignItems: 'start',
  },
  formBox: {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    padding: '2rem',
  },
  formTitle: {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid var(--color-border)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  row2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
  },
  label: {
    fontSize: '0.8125rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
  },
  errorMsg: {
    fontSize: '0.75rem',
    color: 'var(--color-danger)',
  },
  btnPrimary: {
    background: 'var(--color-accent)',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    border: '2px solid var(--color-accent)',
    borderRadius: '4px',
    fontWeight: 700,
    fontSize: '1rem',
    cursor: 'pointer',
    width: '100%',
    marginTop: '0.5rem',
  },
  btnDisabled: {
    opacity: 0.65,
    cursor: 'not-allowed',
  },
  errorBanner: {
    background: '#FDECEA',
    border: '1px solid var(--color-danger)',
    borderRadius: '4px',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    color: 'var(--color-danger)',
    marginBottom: '1rem',
  },
  successCard: {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    padding: '3rem 2rem',
    textAlign: 'center',
    maxWidth: '560px',
    margin: '0 auto',
  },
  successIcon: {
    fontSize: '3rem',
    display: 'block',
    marginBottom: '1rem',
  },
  successTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    marginBottom: '1rem',
  },
  successText: {
    color: 'var(--color-text-secondary)',
    lineHeight: 1.65,
    marginBottom: '0.75rem',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  sideCard: {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  sideTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    paddingBottom: '1rem',
    borderBottom: '1px solid var(--color-border)',
    margin: 0,
  },
  contactItem: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start',
  },
  contactIcon: {
    fontSize: '1.25rem',
    flexShrink: 0,
    marginTop: '2px',
  },
  contactLabel: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: '0.2rem',
  },
  contactValue: {
    fontSize: '0.9375rem',
    color: 'var(--color-text-primary)',
    fontWeight: 500,
    marginBottom: '0.125rem',
  },
  contactNote: {
    fontSize: '0.8rem',
    color: 'var(--color-text-secondary)',
  },
  slaCard: {
    background: 'var(--color-primary)',
    borderRadius: '8px',
    padding: '1.25rem',
  },
  slaTitle: {
    fontSize: '0.9rem',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '0.5rem',
  },
  slaText: {
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.78)',
    lineHeight: 1.65,
    margin: 0,
  },
};