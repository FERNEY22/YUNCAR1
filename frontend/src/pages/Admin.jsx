// frontend/src/pages/Admin.jsx
// Panel admin de YUNCAR: listado de leads + logout

import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import authService from '../services/authService';
import LeadCard, { ESTADO_COLORS, ESTADO_LABELS } from '../components/LeadCard';

const formatoPorcentaje = new Intl.NumberFormat('es-CO', { style: 'percent', maximumFractionDigits: 0 });
const formatoFecha = new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
const formatoHora = new Intl.DateTimeFormat('es-CO', { hour: '2-digit', minute: '2-digit' });

// Minúsculas y sin tildes para que "gomez" encuentre "Gómez"
const normalizar = (texto) => (texto || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function Admin() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroServicio, setFiltroServicio] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [ordenFecha, setOrdenFecha] = useState('desc');
  const [vista, setVista] = useState('tabla');
  const [seleccionadoId, setSeleccionadoId] = useState(null);
  const origenFoco = useRef(null);
  const cerrarDrawerRef = useRef(null);
  const user = authService.getUser();
  // Mismos roles que acepta el backend en PATCH /api/contact/:id
  const puedeEditar = ['admin', 'comercial'].includes(user?.role);

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

  const kpis = useMemo(() => {
    const contar = (estado) => leads.filter(l => l.estado === estado).length;
    const ganados = contar('cerrado_ganado');
    const perdidos = contar('cerrado_perdido');
    const cerrados = ganados + perdidos;
    return [
      { label: 'Total', valor: leads.length, color: '#1a1a1a' },
      { label: 'Nuevos', valor: contar('nuevo'), color: ESTADO_COLORS.nuevo },
      { label: 'En gestión', valor: contar('en_gestion'), color: ESTADO_COLORS.en_gestion },
      { label: 'Ganados', valor: ganados, color: ESTADO_COLORS.cerrado_ganado },
      { label: 'Perdidos', valor: perdidos, color: ESTADO_COLORS.cerrado_perdido },
      {
        label: 'Conversión',
        valor: cerrados > 0 ? formatoPorcentaje.format(ganados / cerrados) : '—',
        detalle: cerrados > 0 ? `${ganados} de ${cerrados} cerrados` : 'Sin leads cerrados',
        color: '#1a1a1a',
      },
    ];
  }, [leads]);

  const servicios = useMemo(
    () => [...new Set(leads.map(l => l.servicio).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es')),
    [leads]
  );

  // Búsqueda y servicio se aplican primero; los contadores de los chips reflejan ese subconjunto
  const leadsBase = useMemo(() => {
    const termino = normalizar(busqueda.trim());
    return leads.filter(l => {
      if (filtroServicio !== 'todos' && l.servicio !== filtroServicio) return false;
      if (!termino) return true;
      return [l.nombre, l.empresa, l.correo, l.servicio].some(campo => normalizar(campo).includes(termino));
    });
  }, [leads, busqueda, filtroServicio]);

  const conteoEstados = useMemo(() => {
    const conteo = { todos: leadsBase.length };
    for (const estado of Object.keys(ESTADO_LABELS)) {
      conteo[estado] = leadsBase.filter(l => l.estado === estado).length;
    }
    return conteo;
  }, [leadsBase]);

  const leadsFiltrados = useMemo(
    () => (filtroEstado === 'todos' ? leadsBase : leadsBase.filter(l => l.estado === filtroEstado)),
    [leadsBase, filtroEstado]
  );
  const leadsOrdenados = useMemo(() => {
    const signo = ordenFecha === 'desc' ? -1 : 1;
    return [...leadsFiltrados].sort((a, b) => signo * (new Date(a.creadoEn) - new Date(b.creadoEn)));
  }, [leadsFiltrados, ordenFecha]);
  const hayFiltros = filtroEstado !== 'todos' || filtroServicio !== 'todos' || busqueda.trim() !== '';

  function limpiarFiltros() {
    setFiltroEstado('todos');
    setFiltroServicio('todos');
    setBusqueda('');
  }

  // Se busca en leads (no en la lista filtrada) para que el drawer siga abierto tras guardar
  const leadSeleccionado = leads.find(l => l._id === seleccionadoId) || null;

  function abrirLead(id, evento) {
    origenFoco.current = evento.currentTarget;
    setSeleccionadoId(id);
  }

  function teclaAbrir(id, evento) {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault();
      abrirLead(id, evento);
    }
  }

  function cerrarDrawer() {
    setSeleccionadoId(null);
    origenFoco.current?.focus();
  }

  const drawerAbierto = leadSeleccionado !== null;

  useEffect(() => {
    if (!drawerAbierto) return undefined;
    cerrarDrawerRef.current?.focus();
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const alPulsar = (e) => { if (e.key === 'Escape') cerrarDrawer(); };
    window.addEventListener('keydown', alPulsar);
    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener('keydown', alPulsar);
    };
  }, [drawerAbierto]);

  return (
    <div style={styles.container}>
      <header className="admin-header" style={styles.header}>
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

        {leads.length > 0 && (
          <div className="admin-kpis" style={styles.kpiBar}>
            {kpis.map(kpi => (
              <div key={kpi.label} style={{ ...styles.kpiCard, borderTopColor: kpi.color }}>
                <div style={styles.kpiLabel}>{kpi.label}</div>
                <div style={styles.kpiValue}>{kpi.valor}</div>
                {kpi.detalle && <div style={styles.kpiDetail}>{kpi.detalle}</div>}
              </div>
            ))}
          </div>
        )}

        {leads.length > 0 && (
          <div style={styles.filters}>
            <div style={styles.chips} role="group" aria-label="Filtrar por estado">
              {['todos', ...Object.keys(ESTADO_LABELS)].map(estado => {
                const activo = filtroEstado === estado;
                return (
                  <button
                    key={estado}
                    type="button"
                    onClick={() => setFiltroEstado(estado)}
                    aria-pressed={activo}
                    style={{
                      ...styles.chip,
                      ...(activo ? { backgroundColor: ESTADO_COLORS[estado] || '#1a1a1a', borderColor: ESTADO_COLORS[estado] || '#1a1a1a', color: 'white' } : {}),
                    }}
                  >
                    {estado === 'todos' ? 'Todos' : ESTADO_LABELS[estado]}
                    <span style={{ ...styles.chipCount, ...(activo ? styles.chipCountActive : {}) }}>{conteoEstados[estado]}</span>
                  </button>
                );
              })}
            </div>
            <div style={styles.filterRow}>
              <input
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre, empresa, correo o servicio"
                aria-label="Buscar leads"
                style={styles.search}
              />
              <select
                value={filtroServicio}
                onChange={(e) => setFiltroServicio(e.target.value)}
                aria-label="Filtrar por servicio"
                style={styles.serviceSelect}
              >
                <option value="todos">Todos los servicios</option>
                {servicios.map(servicio => (
                  <option key={servicio} value={servicio}>{servicio}</option>
                ))}
              </select>
              {hayFiltros && (
                <button type="button" onClick={limpiarFiltros} style={styles.clearBtn}>
                  Limpiar filtros
                </button>
              )}
            </div>
            <div style={styles.resultRow}>
              <div style={styles.resultCount}>
                Mostrando {leadsFiltrados.length} de {leads.length} leads
              </div>
              <div style={styles.viewToggle} role="group" aria-label="Vista">
                {[['tabla', 'Tabla'], ['tablero', 'Tablero']].map(([valor, etiqueta]) => (
                  <button
                    key={valor}
                    type="button"
                    onClick={() => setVista(valor)}
                    aria-pressed={vista === valor}
                    style={{ ...styles.viewBtn, ...(vista === valor ? styles.viewBtnActive : {}) }}
                  >
                    {etiqueta}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {error && <div style={styles.error}>{error}</div>}

        {loading && leads.length === 0 && (
          <div style={styles.message}>Cargando leads...</div>
        )}

        {!loading && leads.length === 0 && !error && (
          <div style={styles.message}>No hay leads todavía.</div>
        )}

        {leads.length > 0 && leadsFiltrados.length === 0 && (
          <div style={styles.message}>Ningún lead coincide con los filtros.</div>
        )}

        {vista === 'tablero' && leadsOrdenados.length > 0 && (
          <div className="admin-board" style={styles.board}>
            {Object.keys(ESTADO_LABELS).map(estado => {
              const columna = leadsOrdenados.filter(l => l.estado === estado);
              return (
                <section key={estado} className="admin-board-col" style={styles.boardColumn} aria-label={ESTADO_LABELS[estado]}>
                  <h3 style={{ ...styles.boardTitle, borderTopColor: ESTADO_COLORS[estado] }}>
                    <span>{ESTADO_LABELS[estado]}</span>
                    <span style={styles.chipCount}>{columna.length}</span>
                  </h3>
                  {columna.length === 0 && <div style={styles.boardEmpty}>Sin leads</div>}
                  {columna.map(lead => (
                    <article
                      key={lead._id}
                      tabIndex={0}
                      onClick={(e) => abrirLead(lead._id, e)}
                      onKeyDown={(e) => teclaAbrir(lead._id, e)}
                      aria-label={`Ver detalle de ${lead.nombre}`}
                      style={{ ...styles.boardCard, ...styles.clickable, ...(lead._id === seleccionadoId ? styles.seleccionado : {}) }}
                    >
                      <div style={{ ...styles.ellipsis, ...styles.contactName }} title={lead.nombre}>{lead.nombre}</div>
                      {lead.empresa && <div style={{ ...styles.ellipsis, ...styles.contactSub }} title={lead.empresa}>{lead.empresa}</div>}
                      <div style={{ ...styles.ellipsis, ...styles.boardService }} title={lead.servicio}>{lead.servicio || '—'}</div>
                      <div style={styles.boardMeta}>
                        <span>{formatoFecha.format(new Date(lead.creadoEn))}</span>
                        {lead.prioridad === 'critico' && <span style={styles.prioridadCritica}>Crítico</span>}
                      </div>
                    </article>
                  ))}
                </section>
              );
            })}
          </div>
        )}

        {vista === 'tabla' && leadsOrdenados.length > 0 && (
          <div className="admin-table-wrap" style={styles.tableWrap}>
            <table className="admin-table" style={styles.table}>
              <colgroup>
                <col style={{ width: '27%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '17%' }} />
                <col style={{ width: '13%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={styles.th}>Contacto</th>
                  <th style={styles.th}>Servicio</th>
                  <th style={styles.th}>Zona</th>
                  <th style={styles.th}>Prioridad</th>
                  <th style={styles.th}>Estado</th>
                  <th style={styles.th} aria-sort={ordenFecha === 'desc' ? 'descending' : 'ascending'}>
                    <button
                      type="button"
                      onClick={() => setOrdenFecha(o => (o === 'desc' ? 'asc' : 'desc'))}
                      style={styles.sortBtn}
                      title={ordenFecha === 'desc' ? 'Más recientes primero' : 'Más antiguos primero'}
                    >
                      Fecha {ordenFecha === 'desc' ? '↓' : '↑'}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {leadsOrdenados.map(lead => (
                  <tr
                    key={lead._id}
                    tabIndex={0}
                    onClick={(e) => abrirLead(lead._id, e)}
                    onKeyDown={(e) => teclaAbrir(lead._id, e)}
                    aria-label={`Ver detalle de ${lead.nombre}`}
                    style={{ ...styles.tr, ...styles.clickable, ...(lead._id === seleccionadoId ? styles.seleccionadoFila : {}) }}
                  >
                    <td className="admin-td-contacto" style={styles.td}>
                      <div style={{ ...styles.ellipsis, ...styles.contactName }} title={lead.nombre}>{lead.nombre}</div>
                      {lead.empresa && <div style={{ ...styles.ellipsis, ...styles.contactSub }} title={lead.empresa}>{lead.empresa}</div>}
                      <div style={{ ...styles.ellipsis, ...styles.contactSub }} title={lead.correo}>{lead.correo}</div>
                    </td>
                    <td className="admin-td-servicio" data-label="Servicio" style={styles.td}>
                      <div style={styles.ellipsis} title={lead.servicio}>{lead.servicio || '—'}</div>
                    </td>
                    <td className="admin-td-zona" data-label="Zona" style={styles.td}>
                      <div style={styles.ellipsis} title={lead.zona}>{lead.zona || '—'}</div>
                    </td>
                    <td className="admin-td-prioridad" style={styles.td}>
                      <span style={lead.prioridad === 'critico' ? styles.prioridadCritica : styles.prioridadNormal}>
                        {lead.prioridad === 'critico' ? 'Crítico' : 'Normal'}
                      </span>
                    </td>
                    <td className="admin-td-estado" style={styles.td}>
                      <span style={{ ...styles.badge, backgroundColor: ESTADO_COLORS[lead.estado] }}>
                        {ESTADO_LABELS[lead.estado] || lead.estado}
                      </span>
                    </td>
                    <td className="admin-td-fecha" style={{ ...styles.td, ...styles.fecha }}>
                      <div>{formatoFecha.format(new Date(lead.creadoEn))}</div>
                      <div style={styles.contactSub}>{formatoHora.format(new Date(lead.creadoEn))}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {leadSeleccionado && (
        <>
          <div style={styles.drawerBackdrop} onClick={cerrarDrawer} aria-hidden="true" />
          <aside className="admin-drawer" style={styles.drawer} role="dialog" aria-modal="true" aria-labelledby="drawer-titulo">
            <div style={styles.drawerHeader}>
              <h2 id="drawer-titulo" style={styles.drawerTitle}>Detalle del lead</h2>
              <button ref={cerrarDrawerRef} type="button" onClick={cerrarDrawer} style={styles.drawerClose} aria-label="Cerrar detalle">
                ×
              </button>
            </div>
            <div className="admin-drawer-body" style={styles.drawerBody}>
              <LeadCard key={leadSeleccionado._id} lead={leadSeleccionado} onUpdated={handleLeadUpdated} readOnly={!puedeEditar} />
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f5f5f7', fontFamily: 'system-ui, -apple-system, sans-serif' },
  header: { backgroundColor: '#1a1a1a', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  headerLeft: { display: 'flex', alignItems: 'baseline', minWidth: 0 },
  title: { margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: 1, color: '#ffffff', whiteSpace: 'nowrap' },
  userInfo: { marginLeft: 16, fontSize: 13, color: '#aaa', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  logoutBtn: { flexShrink: 0, whiteSpace: 'nowrap', padding: '8px 16px', fontSize: 13, backgroundColor: 'transparent', color: 'white', border: '1px solid #555', borderRadius: 6, cursor: 'pointer' },
  main: { maxWidth: 960, margin: '0 auto', padding: '24px 20px' },
  toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  subtitle: { margin: 0, fontSize: 22, fontWeight: 600, color: '#1a1a1a' },
  refreshBtn: { padding: '8px 16px', fontSize: 13, backgroundColor: 'white', color: '#1a1a1a', border: '1px solid #d0d0d0', borderRadius: 6, cursor: 'pointer' },
  kpiBar: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginBottom: 24 },
  kpiCard: { backgroundColor: 'white', borderRadius: 8, padding: '12px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderTopWidth: 3, borderTopStyle: 'solid' },
  kpiLabel: { fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: 0.5 },
  kpiValue: { fontSize: 26, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2, marginTop: 4, fontVariantNumeric: 'tabular-nums' },
  kpiDetail: { fontSize: 12, color: '#666', marginTop: 2 },
  filters: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 },
  chips: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  chip: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', fontSize: 13, fontWeight: 500, color: '#1a1a1a', backgroundColor: 'white', borderWidth: 1, borderStyle: 'solid', borderColor: '#d0d0d0', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit' },
  chipCount: { fontSize: 12, fontWeight: 600, minWidth: 20, padding: '0 6px', borderRadius: 999, backgroundColor: '#f0f0f0', color: '#444', textAlign: 'center', fontVariantNumeric: 'tabular-nums' },
  chipCountActive: { backgroundColor: 'rgba(255,255,255,0.25)', color: 'white' },
  filterRow: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  search: { flex: '1 1 260px', minWidth: 0, padding: '8px 12px', fontSize: 14, border: '1px solid #d0d0d0', borderRadius: 6, fontFamily: 'inherit', backgroundColor: 'white' },
  serviceSelect: { flex: '0 1 280px', minWidth: 0, maxWidth: '100%', padding: '8px 12px', fontSize: 14, border: '1px solid #d0d0d0', borderRadius: 6, fontFamily: 'inherit', backgroundColor: 'white', textOverflow: 'ellipsis' },
  clearBtn: { padding: '8px 12px', fontSize: 13, backgroundColor: 'transparent', color: '#1a1a1a', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'inherit' },
  resultCount: { fontSize: 13, color: '#666' },
  resultRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  viewToggle: { display: 'inline-flex', borderWidth: 1, borderStyle: 'solid', borderColor: '#d0d0d0', borderRadius: 6, overflow: 'hidden', backgroundColor: 'white' },
  viewBtn: { padding: '6px 14px', fontSize: 13, fontWeight: 500, border: 'none', backgroundColor: 'transparent', color: '#1a1a1a', cursor: 'pointer', fontFamily: 'inherit' },
  viewBtnActive: { backgroundColor: '#1a1a1a', color: 'white' },
  board: { display: 'grid', gridTemplateColumns: 'repeat(4, minmax(200px, 1fr))', gap: 12, overflowX: 'auto', alignItems: 'start' },
  boardColumn: { minWidth: 0, backgroundColor: '#ebebee', borderRadius: 8, padding: 8, display: 'flex', flexDirection: 'column', gap: 8 },
  boardTitle: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0, padding: '8px 8px 4px', fontSize: 13, fontWeight: 600, color: '#1a1a1a', borderTopWidth: 3, borderTopStyle: 'solid', borderRadius: 4 },
  boardEmpty: { padding: '12px 8px', fontSize: 13, color: '#888', textAlign: 'center' },
  boardCard: { minWidth: 0, backgroundColor: 'white', borderRadius: 6, padding: '10px 12px', boxShadow: '0 1px 2px rgba(0,0,0,0.08)', fontSize: 14 },
  boardService: { fontSize: 13, color: '#333', marginTop: 6 },
  boardMeta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginTop: 6, fontSize: 12, color: '#666', fontVariantNumeric: 'tabular-nums' },
  error: { padding: 12, backgroundColor: '#fef2f2', color: '#c52727', borderRadius: 6, fontSize: 14, marginBottom: 16, border: '1px solid #fecaca' },
  message: { padding: 24, textAlign: 'center', color: '#666', fontSize: 14 },
  tableWrap: { backgroundColor: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflowX: 'auto' },
  table: { width: '100%', minWidth: 720, borderCollapse: 'collapse', tableLayout: 'fixed', fontSize: 14 },
  th: { textAlign: 'left', padding: '10px 12px', fontSize: 11, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: 0.5, borderBottom: '1px solid #e5e5e5', backgroundColor: '#fafafa' },
  sortBtn: { padding: 0, border: 'none', background: 'none', font: 'inherit', color: '#1a1a1a', textTransform: 'inherit', letterSpacing: 'inherit', cursor: 'pointer' },
  tr: { borderBottom: '1px solid #f0f0f0' },
  td: { padding: '10px 12px', verticalAlign: 'top', color: '#1a1a1a', overflow: 'hidden' },
  ellipsis: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  contactName: { fontWeight: 600 },
  contactSub: { fontSize: 12, color: '#666' },
  prioridadNormal: { fontSize: 13, color: '#666' },
  prioridadCritica: { fontSize: 12, fontWeight: 600, color: '#b91c1c', backgroundColor: '#fef2f2', padding: '2px 8px', borderRadius: 999 },
  badge: { display: 'inline-block', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', verticalAlign: 'top', color: 'white', fontSize: 12, fontWeight: 600, padding: '2px 10px', borderRadius: 999 },
  fecha: { whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' },
  clickable: { cursor: 'pointer' },
  seleccionado: { outline: '2px solid #1a1a1a', outlineOffset: -2 },
  seleccionadoFila: { backgroundColor: '#f3f4f6' },
  drawerBackdrop: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', zIndex: 1000 },
  drawer: { position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(520px, 100vw)', backgroundColor: '#f5f5f7', boxShadow: '-4px 0 16px rgba(0,0,0,0.15)', zIndex: 1001, display: 'flex', flexDirection: 'column' },
  drawerHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: '#1a1a1a' },
  drawerTitle: { margin: 0, fontSize: 15, fontWeight: 600, color: '#ffffff' },
  drawerClose: { width: 32, height: 32, fontSize: 22, lineHeight: 1, color: 'white', backgroundColor: 'transparent', border: '1px solid #555', borderRadius: 6, cursor: 'pointer' },
  drawerBody: { flex: 1, overflowY: 'auto', padding: 16 },
};