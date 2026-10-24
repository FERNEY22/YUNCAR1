// frontend/src/components/LeadCard.jsx
// Detalle de un lead (se muestra en el drawer del panel): datos, contacto, editor y historial

import { useState } from 'react';
import api from '../services/api';

export const ESTADO_LABELS = {
  nuevo: 'Nuevo',
  en_gestion: 'En gestión',
  cerrado_ganado: 'Cerrado ganado',
  cerrado_perdido: 'Cerrado perdido',
};

export const ESTADO_COLORS = {
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

const HISTORIAL_LABELS = {
  estado: 'Estado',
  prioridad: 'Prioridad',
  responsable: 'Responsable',
  notas: 'Notas',
  proximoSeguimiento: 'Próximo seguimiento',
};

// proximoSeguimiento se maneja como AAAA-MM-DD en UTC, sin pasar por la hora local
const fechaUTC = (valor) => (valor ? new Date(valor).toISOString().slice(0, 10) : '');

// Deja solo los dígitos nacionales: sin espacios, guiones, paréntesis ni indicativo 57
function telefonoNacional(telefono) {
  let digitos = (telefono || '').replace(/\D/g, '');
  if (digitos.startsWith('57') && digitos.length > 10) digitos = digitos.slice(2);
  return digitos;
}

function detalleHistorial(entrada) {
  const etiquetas = entrada.tipo === 'estado' ? ESTADO_LABELS : entrada.tipo === 'prioridad' ? PRIORIDAD_LABELS : null;
  if (!etiquetas || !entrada.detalle) return entrada.detalle;
  return entrada.detalle.split(' → ').map(valor => etiquetas[valor] || valor).join(' → ');
}

export default function LeadCard({ lead, onUpdated, readOnly = false }) {
  const [estado, setEstado] = useState(lead.estado);
  const [notas, setNotas] = useState(lead.notas || '');
  const [prioridad, setPrioridad] = useState(lead.prioridad || 'normal');
  const [responsable, setResponsable] = useState(lead.responsable || '');
  const [seguimiento, setSeguimiento] = useState(fechaUTC(lead.proximoSeguimiento));
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  const hasChanges = estado !== lead.estado || notas !== (lead.notas || '') ||
    prioridad !== (lead.prioridad || 'normal') || responsable !== (lead.responsable || '') || seguimiento !== fechaUTC(lead.proximoSeguimiento);

  const telefono = telefonoNacional(lead.telefono);
  const historial = [...(lead.historial || [])].reverse();

  async function handleSave() {
    if (readOnly) return;
    setSaving(true);
    setFeedback('');
    try {
      const body = {};
      if (estado !== lead.estado) body.estado = estado;
      if (notas !== (lead.notas || '')) body.notas = notas;
      if (prioridad !== (lead.prioridad || 'normal')) body.prioridad = prioridad;
      if (responsable !== (lead.responsable || '')) body.responsable = responsable;
      if (seguimiento !== fechaUTC(lead.proximoSeguimiento)) body.proximoSeguimiento = seguimiento || null;

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
        <div style={styles.headerText}>
          <h3 style={styles.name}>{lead.nombre}</h3>
          {lead.empresa && <span style={styles.company}>{lead.empresa}</span>}
        </div>
        <div style={{ ...styles.badge, backgroundColor: ESTADO_COLORS[lead.estado] }}>
          {ESTADO_LABELS[lead.estado]}
        </div>
      </div>

      <div style={styles.contactActions}>
        {telefono && (
          <a href={`https://wa.me/57${telefono}`} target="_blank" rel="noopener noreferrer" style={styles.contactBtn}>
            WhatsApp
          </a>
        )}
        {telefono && (
          <a href={`tel:+57${telefono}`} style={styles.contactBtn}>
            Llamar
          </a>
        )}
        {lead.correo && (
          <a href={`mailto:${lead.correo}`} style={styles.contactBtn}>
            Correo
          </a>
        )}
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
            disabled={saving || readOnly}
            style={styles.select}
          >
            {Object.entries(ESTADO_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          Prioridad
          <select
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
            disabled={saving || readOnly}
            style={styles.select}
          >
            {Object.entries(PRIORIDAD_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>

        <div style={styles.fieldRow}>
          <label style={styles.label}>
            Responsable
            <input
              type="text"
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              maxLength={100}
              disabled={saving || readOnly}
              style={styles.input}
              placeholder="Sin asignar"
            />
          </label>

          <label style={styles.label}>
            Próximo seguimiento
            <input
              type="date"
              value={seguimiento}
              onChange={(e) => setSeguimiento(e.target.value)}
              disabled={saving || readOnly}
              style={styles.input}
            />
          </label>
        </div>

        <label style={styles.label}>
          Notas internas
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            maxLength={1000}
            disabled={saving || readOnly}
            rows={3}
            style={styles.textarea}
            placeholder="Notas internas sobre este lead..."
          />
        </label>

        <div style={styles.actions}>
          {readOnly ? (
            <span style={styles.readOnlyNote}>Solo lectura: tu rol no permite editar este lead.</span>
          ) : (
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
          )}
          {feedback && <span style={feedback === 'Guardado' ? styles.feedbackOk : styles.feedbackError}>{feedback}</span>}
          {lead.lastUpdatedBy && (
            <span style={styles.lastUpdated}>
              Última actualización por: {lead.lastUpdatedBy}
            </span>
          )}
        </div>
      </div>

      <div style={styles.history}>
        <div style={styles.dataLabel}>Historial</div>
        {historial.length === 0 ? (
          <div style={styles.historyEmpty}>Sin cambios registrados.</div>
        ) : (
          <ol style={styles.historyList}>
            {historial.map((entrada, i) => (
              <li key={`${entrada.fecha}-${entrada.tipo}-${i}`} style={styles.historyItem}>
                <div style={styles.historyText}>
                  <strong>{HISTORIAL_LABELS[entrada.tipo] || entrada.tipo}:</strong> {detalleHistorial(entrada)}
                </div>
                <div style={styles.historyMeta}>
                  {entrada.autor} · {new Date(entrada.fecha).toLocaleString('es-CO')}
                </div>
              </li>
            ))}
          </ol>
        )}
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
  headerText: { minWidth: 0, marginRight: 12 },
  name: { margin: 0, fontSize: 17, fontWeight: 600, color: '#1a1a1a', overflowWrap: 'anywhere' },
  company: { display: 'block', marginTop: 2, fontSize: 13, lineHeight: 1.4, color: '#666', overflowWrap: 'anywhere' },
  badge: { flexShrink: 0, whiteSpace: 'nowrap', color: 'white', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  contactActions: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  contactBtn: { padding: '6px 14px', fontSize: 13, fontWeight: 500, color: '#1a1a1a', backgroundColor: 'white', border: '1px solid #d0d0d0', borderRadius: 6, textDecoration: 'none' },
  dataGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 16 },
  dataLabel: { fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  dataValue: { fontSize: 14, color: '#1a1a1a', overflowWrap: 'anywhere' },
  fieldRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 },
  input: { padding: '8px 12px', fontSize: 14, border: '1px solid #d0d0d0', borderRadius: 6, backgroundColor: 'white', fontFamily: 'inherit', minWidth: 0 },
  history: { marginTop: 20, paddingTop: 16, borderTop: '1px solid #f0f0f0' },
  historyEmpty: { fontSize: 13, color: '#888', marginTop: 4 },
  historyList: { listStyle: 'none', margin: '6px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 },
  historyItem: { paddingLeft: 10, borderLeft: '2px solid #e5e5e5' },
  historyText: { fontSize: 13, color: '#1a1a1a', overflowWrap: 'anywhere' },
  historyMeta: { fontSize: 12, color: '#888', marginTop: 2 },
  messageBlock: { marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #f0f0f0' },
  messageText: { fontSize: 14, color: '#333', lineHeight: 1.5, backgroundColor: '#fafafa', padding: 12, borderRadius: 6, marginTop: 4 },
  editor: { display: 'flex', flexDirection: 'column', gap: 12 },
  label: { display: 'flex', flexDirection: 'column', fontSize: 13, fontWeight: 500, color: '#444', gap: 6 },
  select: { padding: '8px 12px', fontSize: 14, border: '1px solid #d0d0d0', borderRadius: 6, backgroundColor: 'white', fontFamily: 'inherit' },
  textarea: { padding: '8px 12px', fontSize: 14, border: '1px solid #d0d0d0', borderRadius: 6, fontFamily: 'inherit', resize: 'vertical' },
  actions: { display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  saveBtn: { padding: '8px 16px', fontSize: 13, fontWeight: 600, color: 'white', backgroundColor: '#1a1a1a', border: 'none', borderRadius: 6 },
  readOnlyNote: { fontSize: 13, color: '#666', backgroundColor: '#f3f4f6', padding: '6px 10px', borderRadius: 6 },
  feedbackOk: { fontSize: 13, color: '#10b981' },
  feedbackError: { fontSize: 13, color: '#c52727' },
  lastUpdated: { fontSize: 12, color: '#888', marginLeft: 'auto' },
};