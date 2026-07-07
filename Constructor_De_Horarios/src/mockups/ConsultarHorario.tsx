import { useState } from 'react'
import { BookOpen, User, DoorOpen, Calendar } from 'lucide-react'
import Navbar from './Navbar'
import './shared.css'
import './ConsultarHorario.css'

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

const franjas = [
  { id: '08:00', label: '08:00 - 09:00' },
  { id: '09:00', label: '09:00 - 10:00' },
  { id: '10:15', label: '10:15 - 11:15' },
  { id: '11:15', label: '11:15 - 12:15' },
  { id: '12:15', label: '12:15 - 13:15' },
  { id: '13:15', label: '13:15 - 14:15' },
  { id: '14:15', label: '14:15 - 15:15' },
  { id: '15:15', label: '15:15 - 16:15' },
  { id: '16:15', label: '16:15 - 17:15' },
  { id: '17:15', label: '17:15 - 18:15' },
  { id: '18:25', label: '18:25 - 19:25' },
  { id: '19:25', label: '19:25 - 20:25' },
]

const gradoColors: Record<string, string> = {
  GII: '#1A7CC1', CAFYD: '#16a085', GPSI: '#8e44ad', GCTA: '#e67e22', GADE: '#c0392b',
}

interface Asig {
  codigo: string; nombre: string; grados: string[]
  profesor: string; aula: string; año: number; semestre: number
}

const mk = (codigo: string, nombre: string, profesor: string, aula: string, año: number, semestre: number, grados: string[]): Asig =>
  ({ codigo, nombre, profesor, aula, año, semestre, grados })

const asigs = {
  MAT101: mk('MAT101', 'Cálculo I',                 'Juan García',      '1.2', 1, 1, ['GII', 'GCTA']),
  MAT102: mk('MAT102', 'Cálculo II',                'Juan García',      '1.3', 1, 2, ['GII']),
  EST201: mk('EST201', 'Estadística',               'María López',      '1.4', 2, 1, ['GII', 'GPSI', 'GADE']),
  PRG301: mk('PRG301', 'Programación Avanzada',     'Carlos Rodríguez', '1.5', 3, 1, ['GII']),
  ING401: mk('ING401', 'Ing. del Software',         'Carlos Rodríguez', '1.6', 4, 2, ['GII']),
  FIS301: mk('FIS301', 'Fisiología del Ejercicio',  'Ana Martínez',     '1.2', 2, 1, ['CAFYD']),
  NUT101: mk('NUT101', 'Nutrición Deportiva',       'Ana Martínez',     '1.3', 1, 2, ['CAFYD', 'GCTA']),
  ECO101: mk('ECO101', 'Economía',                  'María López',      '1.4', 1, 1, ['CAFYD', 'GADE']),
  PSI201: mk('PSI201', 'Psicología del Deporte',    'Ana Martínez',     '1.5', 2, 2, ['CAFYD', 'GPSI']),
  PSI101: mk('PSI101', 'Psicología General',        'Ana Martínez',     '1.6', 1, 1, ['GPSI']),
  PSI301: mk('PSI301', 'Psicología Clínica',        'Ana Martínez',     '1.7', 3, 1, ['GPSI']),
  ALI101: mk('ALI101', 'Ciencia de los Alimentos',  'Juan García',      '1.2', 1, 1, ['GCTA']),
  MIC201: mk('MIC201', 'Microbiología Alimentaria', 'Juan García',      '1.3', 2, 2, ['GCTA']),
  GES301: mk('GES301', 'Gestión Empresarial',       'María López',      '1.7', 3, 2, ['GADE']),
  MKT201: mk('MKT201', 'Marketing',                 'María López',      '1.8', 2, 1, ['GADE']),
}

// Horarios demo precargados (simulan lo que se guardó en GenerarHorario)
const demo: Record<string, Record<string, Asig>> = {
  'GII|1|1':   { 'Lunes-08:00': asigs.MAT101, 'Miércoles-08:00': asigs.MAT101 },
  'GII|1|2':   { 'Martes-08:00': asigs.MAT102, 'Jueves-09:00': asigs.MAT102 },
  'GII|2|1':   { 'Lunes-10:15': asigs.EST201, 'Jueves-10:15': asigs.EST201 },
  'GII|3|1':   { 'Martes-11:15': asigs.PRG301, 'Viernes-10:15': asigs.PRG301 },
  'GII|4|2':   { 'Lunes-15:15': asigs.ING401, 'Miércoles-14:15': asigs.ING401 },
  'CAFYD|1|1': { 'Lunes-12:15': asigs.ECO101, 'Miércoles-12:15': asigs.ECO101 },
  'CAFYD|1|2': { 'Lunes-09:00': asigs.NUT101, 'Jueves-09:00': asigs.NUT101 },
  'CAFYD|2|1': { 'Martes-09:00': asigs.FIS301, 'Viernes-09:00': asigs.FIS301 },
  'CAFYD|2|2': { 'Lunes-13:15': asigs.PSI201, 'Miércoles-13:15': asigs.PSI201 },
  'GPSI|1|1':  { 'Martes-11:15': asigs.PSI101, 'Jueves-11:15': asigs.PSI101 },
  'GPSI|2|1':  { 'Lunes-10:15': asigs.EST201, 'Jueves-10:15': asigs.EST201 },
  'GPSI|2|2':  { 'Lunes-13:15': asigs.PSI201, 'Miércoles-13:15': asigs.PSI201 },
  'GPSI|3|1':  { 'Martes-14:15': asigs.PSI301, 'Viernes-14:15': asigs.PSI301 },
  'GCTA|1|1':  { 'Lunes-08:00': asigs.MAT101, 'Miércoles-08:00': asigs.MAT101, 'Martes-10:15': asigs.ALI101, 'Jueves-10:15': asigs.ALI101 },
  'GCTA|1|2':  { 'Lunes-09:00': asigs.NUT101, 'Jueves-09:00': asigs.NUT101 },
  'GCTA|2|2':  { 'Martes-16:15': asigs.MIC201, 'Viernes-16:15': asigs.MIC201 },
  'GADE|1|1':  { 'Lunes-12:15': asigs.ECO101, 'Miércoles-12:15': asigs.ECO101 },
  'GADE|2|1':  { 'Lunes-10:15': asigs.EST201, 'Jueves-10:15': asigs.EST201, 'Martes-12:15': asigs.MKT201, 'Viernes-12:15': asigs.MKT201 },
  'GADE|3|2':  { 'Lunes-15:15': asigs.GES301, 'Miércoles-15:15': asigs.GES301 },
}

const profesores = ['Ana Martínez', 'Carlos Rodríguez', 'Juan García', 'María López']
const aulas      = ['1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8']

type ViewMode = 'grado' | 'profesor' | 'aula'

function computeSlots(
  mode: ViewMode,
  { grado, año, sem, prof, aula }: { grado: string; año: string; sem: string; prof: string; aula: string }
): Record<string, Asig[]> {
  if (mode === 'grado') {
    if (!grado || !año || !sem) return {}
    const slots = demo[`${grado}|${año}|${sem}`] ?? {}
    return Object.fromEntries(Object.entries(slots).map(([k, v]) => [k, [v]]))
  }
  const result: Record<string, Asig[]> = {}
  for (const slots of Object.values(demo)) {
    for (const [slotKey, asig] of Object.entries(slots)) {
      const hit = mode === 'profesor' ? (prof && asig.profesor === prof) : (aula && asig.aula === aula)
      if (!hit) continue
      if (!result[slotKey]) result[slotKey] = []
      if (!result[slotKey].some(a => a.codigo === asig.codigo)) result[slotKey].push(asig)
    }
  }
  return result
}

export default function ConsultarHorario() {
  const [viewMode, setViewMode] = useState<ViewMode>('grado')
  const [viewGrado, setViewGrado] = useState('')
  const [viewAño,   setViewAño]   = useState('')
  const [viewSem,   setViewSem]   = useState('')
  const [viewProf,  setViewProf]  = useState('')
  const [viewAula,  setViewAula]  = useState('')

  const hasSelection =
    (viewMode === 'grado'    && !!viewGrado && !!viewAño && !!viewSem) ||
    (viewMode === 'profesor' && !!viewProf) ||
    (viewMode === 'aula'     && !!viewAula)

  const slots = computeSlots(viewMode, { grado: viewGrado, año: viewAño, sem: viewSem, prof: viewProf, aula: viewAula })

  const accentColor = viewMode === 'grado' ? (gradoColors[viewGrado] ?? 'var(--navy)') : 'var(--navy)'

  const switchMode = (m: ViewMode) => {
    setViewMode(m)
    setViewGrado(''); setViewAño(''); setViewSem('')
    setViewProf('');  setViewAula('')
  }

  return (
    <div className="mock-page ch-page">
      <Navbar />
      <main className="ch-main">

        {/* ── Zona fija ── */}
        <div className="ch-sticky">
          <div className="ch-top-row">
            <h2 className="ch-title">Consultar Horario</h2>
          </div>

          {/* Tabs de modo */}
          <div className="ch-mode-tabs">
            <button className={`ch-mode-tab ${viewMode === 'grado' ? 'ch-mode-tab-active' : ''}`} onClick={() => switchMode('grado')}>
              <BookOpen size={13} /> Por Grado
            </button>
            <button className={`ch-mode-tab ${viewMode === 'profesor' ? 'ch-mode-tab-active' : ''}`} onClick={() => switchMode('profesor')}>
              <User size={13} /> Por Profesor
            </button>
            <button className={`ch-mode-tab ${viewMode === 'aula' ? 'ch-mode-tab-active' : ''}`} onClick={() => switchMode('aula')}>
              <DoorOpen size={13} /> Por Aula
            </button>
          </div>

          {/* Filtros según modo */}
          <div className="ch-filters">
            {viewMode === 'grado' && (<>
              <select className="mock-input mock-select ch-select" value={viewGrado}
                onChange={e => { setViewGrado(e.target.value); setViewAño(''); setViewSem('') }}>
                <option value="">Selecciona un grado</option>
                {Object.keys(gradoColors).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <select className="mock-input mock-select ch-select" value={viewAño}
                onChange={e => { setViewAño(e.target.value); setViewSem('') }} disabled={!viewGrado}>
                <option value="">Año</option>
                {[1, 2, 3, 4].map(n => <option key={n} value={n}>Año {n}</option>)}
              </select>
              <select className="mock-input mock-select ch-select" value={viewSem}
                onChange={e => setViewSem(e.target.value)} disabled={!viewAño}>
                <option value="">Semestre</option>
                {[1, 2].map(s => <option key={s} value={s}>Semestre {s}</option>)}
              </select>
              {hasSelection && (
                <span className="ch-view-chip" style={{ background: gradoColors[viewGrado] }}>
                  {viewGrado} · Año {viewAño} · Sem {viewSem}
                </span>
              )}
            </>)}

            {viewMode === 'profesor' && (
              <select className="mock-input mock-select ch-select ch-select-wide" value={viewProf}
                onChange={e => setViewProf(e.target.value)}>
                <option value="">Selecciona un profesor</option>
                {profesores.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            )}

            {viewMode === 'aula' && (
              <select className="mock-input mock-select ch-select" value={viewAula}
                onChange={e => setViewAula(e.target.value)}>
                <option value="">Selecciona un aula</option>
                {aulas.map(a => <option key={a} value={a}>Aula {a}</option>)}
              </select>
            )}
          </div>
        </div>

        {/* ── Zona scrollable ── */}
        <div className="ch-body">
          {!hasSelection ? (
            <div className="ch-empty-state">
              <Calendar size={44} className="ch-empty-icon" />
              <h3 className="ch-empty-title">
                {viewMode === 'grado'    ? 'Selecciona un grado, año y semestre' :
                 viewMode === 'profesor' ? 'Selecciona un profesor'              :
                                          'Selecciona un aula'}
              </h3>
              <p className="ch-empty-desc">Aquí aparecerá el horario correspondiente</p>
            </div>
          ) : (
            <div className="ch-grid-wrap">
              <table className="ch-grid">
                <thead>
                  <tr>
                    <th className="ch-th-hora" />
                    {dias.map(d => (
                      <th key={d} className="ch-th-dia" style={{ borderBottom: `3px solid ${accentColor}` }}>
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {franjas.map(f => (
                    <tr key={f.id}>
                      <td className="ch-td-hora">{f.label}</td>
                      {dias.map(d => {
                        const slotKey = `${d}-${f.id}`
                        const celda   = slots[slotKey] ?? []
                        return (
                          <td key={d} className={`ch-cell ${celda.length > 0 ? 'ch-cell-filled' : 'ch-cell-empty'}`}>
                            {celda.length > 0 && (
                              <div className="ch-cell-slots">
                                {celda.map(asig => {
                                  const color = viewMode === 'grado' ? accentColor : gradoColors[asig.grados[0]]
                                  return (
                                    <div key={asig.codigo} className="ch-slot" style={{ background: color }}>
                                      <span className="ch-slot-code">{asig.codigo}</span>
                                      <span className="ch-slot-name">{asig.nombre}</span>
                                      {viewMode === 'grado' ? (
                                        <span className="ch-slot-meta">
                                          {asig.profesor.split(' ')[0]} · Aula {asig.aula}
                                        </span>
                                      ) : (
                                        <div className="ch-slot-chips">
                                          {asig.grados.map(g => (
                                            <span key={g} className="ch-grado-chip"
                                              style={{ background: gradoColors[g] }}>{g}
                                            </span>
                                          ))}
                                          {viewMode === 'profesor' && (
                                            <span className="ch-aula-chip">Aula {asig.aula}</span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}
