// frontend/src/components/LeadCard.jsx
// Card individual de un lead con datos visibles + editor de estado y notas

import { useState } from 'react';
import api from '../services/api';

const ESTADO_LABELS = {
  nuevo: 'Nuevo',
  en_gestion: 'En gestión',
  cerrado_ganado: 'Cerrado ganado',
  cerrado_perdido: 'Cerrado perdido',
};

const ESTADO_COLORS = {
  nuevo: '#3b82f6',
  en_gestion: '#f59e0b',
  cerrado_ganado: '#10b981',
  cerrado_perdido: '#6b7280',
};

const CANAL_LABELS = {
  formulario: 'Formulario',
  whatsapp: 'WhatsApp',
  manual: 'Manual',
};

const PRIORIDAD_LABELS = {
  normal: 'Normal',
  critico: 'Crítico',
};

export default function LeadCard({ lead, onUpdated }) {
  const [estado, setEstado] = useState(lead.estado);
  const [notas, setNotas] = useState(lead.notas || '');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  const hasChanges = estado !== lead.estado || notas !== (lead.notas || '');

  async function handleSave() {
    setSaving(true);
    setFeedback('');
    try {
      const body = {};
      if (estado !== lead.estado) body.estado = estado;
      if (notas !== (lead.notas || '')) body.notas = notas;

      const response = await api.patch(`/api/contact/${lead._id}`, body);
      onUpdated(response.data.consult);
      setFeedback('Guardado');
      setTimeout(() => setFeedback(''), 2000);
    } catch (err) {
      const message = err.response?.data?.error || 'Error al guardar';
      setFeedback(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div>
          <h3 style={styles.name}>{lead.nombre}</h3>
          {lead.empresa && <span style={styles.company}>{lead.empresa}</span>}
        </div>
        <div style={{ ...styles.badge, backgroundColor: ESTADO_COLORS[lead.estado] }}>
          {ESTADO_LABELS[lead.estado]}
        </div>
      </div>

      <div style={styles.dataGrid}>
        <DataItem label="Correo" value={lead.correo} />
        <DataItem label="Teléfono" value={lead.telefono} />
        {lead.cargo && <DataItem label="Cargo" value={lead.cargo} />}
        {lead.servicio && <DataItem label="Servicio" value={lead.servicio} />}
        {lead.zona && <DataItem label="Zona" value={lead.zona} />}
        <DataItem label="Canal" value={CANAL_LABELS[lead.canal] || lead.canal} />
        <DataItem label="Prioridad" value={PRIORIDAD_LABELS[lead.prioridad] || lead.prioridad} />
        <DataItem label="Recibido" value={new Date(lead.creadoEn).toLocaleString('es-CO')} />
      </div>

      <div style={styles.messageBlock}>
        <div style={styles.dataLabel}>Mensaje</div>
        <div style={styles.messageText}>{lead.mensaje}</div>
      </div>

      <div style={styles.editor}>
        <label style={styles.label}>
          Estado
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            disabled={saving}
            style={styles.select}
          >
            {Object.entries(ESTADO_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          Notas internas
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            maxLength={1000}
            disabled={saving}
            rows={3}
            style={styles.textarea}
            placeholder="Notas internas sobre este lead..."
          />
        </label>

        <div style={styles.actions}>
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            style={{
              ...styles.saveBtn,
              opacity: (!hasChanges || saving) ? 0.5 : 1,
              cursor: (!hasChanges || saving) ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
          {feedback && <span style={feedback === 'Guardado' ? styles.feedbackOk : styles.feedbackError}>{feedback}</span>}
          {lead.lastUpdatedBy && (
            <span style={styles.lastUpdated}>
              Última actualización por: {lead.lastUpdatedBy}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function DataItem({ label, value }) {
  return (
    <div>
      <div style={styles.dataLabel}>{label}</div>
      <div style={styles.dataValue}>{value}</div>
    </div>
  );
}

const styles = {
  card: { backgroundColor: 'white', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #f0f0f0' },
  name: { margin: 0, fontSize: 17, fontWeight: 600, color: '#1a1a1a' },
  company: { fontSize: 13, color: '#666' },
  badge: { color: 'white', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  dataGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 16 },
  dataLabel: { fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  dataValue: { fontSize: 14, color: '#1a1a1a' },
  messageBlock: { marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #f0f0f0' },
  messageText: { fontSize: 14, color: '#333', lineHeight: 1.5, backgroundColor: '#fafafa', padding: 12, borderRadius: 6, marginTop: 4 },
  editor: { display: 'flex', flexDirection: 'column', gap: 12 },
  label: { display: 'flex', flexDirection: 'column', fontSize: 13, fontWeight: 500, color: '#444', gap: 6 },
  select: { padding: '8px 12px', fontSize: 14, border: '1px solid #d0d0d0', borderRadius: 6, backgroundColor: 'white', fontFamily: 'inherit' },
  textarea: { padding: '8px 12px', fontSize: 14, border: '1px solid #d0d0d0', borderRadius: 6, fontFamily: 'inherit', resize: 'vertical' },
  actions: { display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  saveBtn: { padding: '8px 16px', fontSize: 13, fontWeight: 600, color: 'white', backgroundColor: '#1a1a1a', border: 'none', borderRadius: 6 },
  feedbackOk: { fontSize: 13, color: '#10b981' },
  feedbackError: { fontSize: 13, color: '#c52727' },
  lastUpdated: { fontSize: 12, color: '#888', marginLeft: 'auto' },
};