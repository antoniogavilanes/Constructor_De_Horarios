import { useState } from 'react'
import { GripVertical, X, Save, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react'
import Navbar from './Navbar'
import './shared.css'
import './GenerarHorario.css'

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
  GII:   '#1A7CC1',
  CAFYD: '#16a085',
  GPSI:  '#8e44ad',
  GCTA:  '#e67e22',
  GADE:  '#c0392b',
}

interface Asig {
  codigo: string
  nombre: string
  grados: string[]
  profesor: string
  aula: string
  año: number
  semestre: number
}

const asignaturasTodas: Asig[] = [
  { codigo: 'MAT101', nombre: 'Cálculo I',                 profesor: 'Juan García',      aula: '1.2', año: 1, semestre: 1, grados: ['GII', 'GCTA']         },
  { codigo: 'MAT102', nombre: 'Cálculo II',                profesor: 'Juan García',      aula: '1.3', año: 1, semestre: 2, grados: ['GII']                  },
  { codigo: 'EST201', nombre: 'Estadística',               profesor: 'María López',      aula: '1.4', año: 2, semestre: 1, grados: ['GII', 'GPSI', 'GADE']  },
  { codigo: 'PRG301', nombre: 'Programación Avanzada',     profesor: 'Carlos Rodríguez', aula: '1.5', año: 3, semestre: 1, grados: ['GII']                  },
  { codigo: 'ING401', nombre: 'Ing. del Software',         profesor: 'Carlos Rodríguez', aula: '1.6', año: 4, semestre: 2, grados: ['GII']                  },
  { codigo: 'FIS301', nombre: 'Fisiología del Ejercicio',  profesor: 'Ana Martínez',     aula: '1.2', año: 2, semestre: 1, grados: ['CAFYD']                },
  { codigo: 'NUT101', nombre: 'Nutrición Deportiva',       profesor: 'Ana Martínez',     aula: '1.3', año: 1, semestre: 2, grados: ['CAFYD', 'GCTA']        },
  { codigo: 'ECO101', nombre: 'Economía',                  profesor: 'María López',      aula: '1.4', año: 1, semestre: 1, grados: ['CAFYD', 'GADE']        },
  { codigo: 'PSI201', nombre: 'Psicología del Deporte',    profesor: 'Ana Martínez',     aula: '1.5', año: 2, semestre: 2, grados: ['CAFYD', 'GPSI']        },
  { codigo: 'PSI101', nombre: 'Psicología General',        profesor: 'Ana Martínez',     aula: '1.6', año: 1, semestre: 1, grados: ['GPSI']                 },
  { codigo: 'PSI301', nombre: 'Psicología Clínica',        profesor: 'Ana Martínez',     aula: '1.7', año: 3, semestre: 1, grados: ['GPSI']                 },
  { codigo: 'ALI101', nombre: 'Ciencia de los Alimentos',  profesor: 'Juan García',      aula: '1.2', año: 1, semestre: 1, grados: ['GCTA']                 },
  { codigo: 'MIC201', nombre: 'Microbiología Alimentaria', profesor: 'Juan García',      aula: '1.3', año: 2, semestre: 2, grados: ['GCTA']                 },
  { codigo: 'GES301', nombre: 'Gestión Empresarial',       profesor: 'María López',      aula: '1.7', año: 3, semestre: 2, grados: ['GADE']                 },
  { codigo: 'MKT201', nombre: 'Marketing',                 profesor: 'María López',      aula: '1.8', año: 2, semestre: 1, grados: ['GADE']                 },
]

// viewKey = `${grado}|${año}|${semestre}`, slotKey = `${dia}-${franja.id}`
type Horario = Record<string, Record<string, Asig[]>>

interface Conflicto {
  dia: string
  franjaId: string
  tipo: 'profesor' | 'aula'
  recurso: string
  items: Asig[]
}

function detectarConflictos(horario: Horario): Conflicto[] {
  const result: Conflicto[] = []
  const seen = new Set<string>()

  for (const d of dias) {
    for (const f of franjas) {
      const slot = `${d}-${f.id}`

      // Colectar asignaturas únicas (por código) en este slot en todos los horarios
      // Una asignatura compartida que aparece en varios grados = misma asig, no conflicto
      const byCode = new Map<string, Asig>()
      for (const slots of Object.values(horario)) {
        for (const asig of (slots[slot] ?? [])) {
          if (!byCode.has(asig.codigo)) byCode.set(asig.codigo, asig)
        }
      }

      const uniques = [...byCode.values()]
      if (uniques.length < 2) continue

      // Conflicto de profesor: mismo profesor en 2+ asignaturas distintas a la vez
      const byProf = new Map<string, Asig[]>()
      for (const asig of uniques) {
        if (!asig.profesor) continue
        if (!byProf.has(asig.profesor)) byProf.set(asig.profesor, [])
        byProf.get(asig.profesor)!.push(asig)
      }
      for (const [prof, items] of byProf) {
        if (items.length > 1) {
          const key = `prof|${prof}|${slot}`
          if (!seen.has(key)) { seen.add(key); result.push({ dia: d, franjaId: f.id, tipo: 'profesor', recurso: prof, items }) }
        }
      }

      // Conflicto de aula: misma aula con 2+ asignaturas distintas a la vez
      const byAula = new Map<string, Asig[]>()
      for (const asig of uniques) {
        if (!asig.aula) continue
        if (!byAula.has(asig.aula)) byAula.set(asig.aula, [])
        byAula.get(asig.aula)!.push(asig)
      }
      for (const [aula, items] of byAula) {
        if (items.length > 1) {
          const key = `aula|${aula}|${slot}`
          if (!seen.has(key)) { seen.add(key); result.push({ dia: d, franjaId: f.id, tipo: 'aula', recurso: aula, items }) }
        }
      }
    }
  }

  return result
}

export default function GenerarHorario() {
  const [horario,     setHorario]     = useState<Horario>({})
  const [dragging,    setDragging]    = useState<Asig | null>(null)
  const [dragOver,    setDragOver]    = useState<string | null>(null)
  const [filterGrado, setFilterGrado] = useState('')
  const [filterAño,   setFilterAño]   = useState('')
  const [filterSem,   setFilterSem]   = useState('')
  const [viewGrado,   setViewGrado]   = useState('')
  const [viewAño,     setViewAño]     = useState('')
  const [viewSem,     setViewSem]     = useState('')
  const [saved,       setSaved]       = useState(false)

  const viewKey     = viewGrado && viewAño && viewSem ? `${viewGrado}|${viewAño}|${viewSem}` : ''
  const vistaActual = viewKey ? (horario[viewKey] ?? {}) : {}
  const hasView     = !!viewKey

  const sidebarAsigs = asignaturasTodas.filter(a =>
    (!filterGrado || a.grados.includes(filterGrado)) &&
    (!filterAño   || a.año      === Number(filterAño)) &&
    (!filterSem   || a.semestre === Number(filterSem))
  )

  const placedCodes = new Set(Object.values(vistaActual).flat().map(a => a.codigo))
  const placedView  = placedCodes.size
  const conflictos  = detectarConflictos(horario)

  const handleDrop = (slotKey: string) => {
    if (!dragging || !viewKey) return
    const currentSlot = vistaActual[slotKey] ?? []
    // No agregar la misma asig dos veces en el mismo slot
    if (currentSlot.some(a => a.codigo === dragging.codigo)) return
    setHorario(prev => {
      const next = { ...prev }
      next[viewKey] = { ...(next[viewKey] ?? {}), [slotKey]: [...currentSlot, dragging] }
      // Propagar automáticamente a los demás grados que comparten la asignatura
      for (const otherGrado of dragging.grados) {
        if (otherGrado === viewGrado) continue
        const otherKey = `${otherGrado}|${dragging.año}|${dragging.semestre}`
        const otherSlot = next[otherKey]?.[slotKey] ?? []
        if (!otherSlot.some(a => a.codigo === dragging.codigo)) {
          next[otherKey] = { ...(next[otherKey] ?? {}), [slotKey]: [...otherSlot, dragging] }
        }
      }
      return next
    })
    setDragging(null)
    setDragOver(null)
  }

  const removeFromGrid = (slotKey: string, codigo: string) => {
    if (!viewKey) return
    const removedAsig = (vistaActual[slotKey] ?? []).find(a => a.codigo === codigo)
    setHorario(prev => {
      const next = { ...prev }
      const filtered = (next[viewKey]?.[slotKey] ?? []).filter(a => a.codigo !== codigo)
      if (filtered.length === 0) {
        const slots = { ...(next[viewKey] ?? {}) }
        delete slots[slotKey]
        next[viewKey] = slots
      } else {
        next[viewKey] = { ...(next[viewKey] ?? {}), [slotKey]: filtered }
      }
      // Propagar eliminación a los demás grados que comparten la asignatura
      if (removedAsig) {
        for (const otherGrado of removedAsig.grados) {
          if (otherGrado === viewGrado) continue
          const otherKey = `${otherGrado}|${removedAsig.año}|${removedAsig.semestre}`
          if (next[otherKey]?.[slotKey]?.some(a => a.codigo === codigo)) {
            const otherFiltered = (next[otherKey][slotKey]).filter(a => a.codigo !== codigo)
            if (otherFiltered.length === 0) {
              const otherSlots = { ...(next[otherKey] ?? {}) }
              delete otherSlots[slotKey]
              next[otherKey] = otherSlots
            } else {
              next[otherKey] = { ...(next[otherKey] ?? {}), [slotKey]: otherFiltered }
            }
          }
        }
      }
      return next
    })
  }

  const limpiarVista = () => {
    if (!viewKey) return
    setHorario(prev => { const n = { ...prev }; delete n[viewKey]; return n })
  }

  return (
    <div className="mock-page gh-page">
      <Navbar />
      <div className="gh-layout">

        {/* ── Sidebar ── */}
        <aside className="gh-sidebar">
          <div className="gh-sidebar-sticky">
            <div className="gh-sidebar-header">
              <h2 className="gh-sidebar-title">Asignaturas</h2>
              <span className="gh-pending-badge">{sidebarAsigs.length}</span>
            </div>

            <div className="gh-sidebar-filters">
              <select className="mock-input mock-select" value={filterGrado} onChange={e => setFilterGrado(e.target.value)}>
                <option value="">Todos los grados</option>
                {Object.keys(gradoColors).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <select className="mock-input mock-select" value={filterAño} onChange={e => setFilterAño(e.target.value)}>
                <option value="">Todos los años</option>
                {[1, 2, 3, 4].map(a => <option key={a} value={a}>Año {a}</option>)}
              </select>
              <select className="mock-input mock-select" value={filterSem} onChange={e => setFilterSem(e.target.value)}>
                <option value="">Todos los semestres</option>
                {[1, 2].map(s => <option key={s} value={s}>Semestre {s}</option>)}
              </select>
            </div>

            <p className="gh-sidebar-hint">Arrastra al horario</p>
          </div>

          <div className="gh-cards">
            {sidebarAsigs.map(a => (
              <div
                key={a.codigo}
                className="gh-subject-card"
                draggable
                onDragStart={() => setDragging(a)}
                onDragEnd={() => { setDragging(null); setDragOver(null) }}
                style={{ borderLeftColor: gradoColors[a.grados[0]] }}
              >
                <GripVertical size={14} className="gh-grip" />
                <div className="gh-subject-info">
                  <div className="gh-subject-top">
                    <span className="gh-subject-code">{a.codigo}</span>
                    <div className="gh-grado-chips">
                      {a.grados.map(g => (
                        <span key={g} className="gh-grado-chip" style={{ background: gradoColors[g] }}>{g}</span>
                      ))}
                    </div>
                  </div>
                  <div className="gh-subject-name">{a.nombre}</div>
                  <div className="gh-subject-meta">Año {a.año} · Sem {a.semestre}</div>
                </div>
              </div>
            ))}
            {sidebarAsigs.length === 0 && (
              <div className="gh-all-placed">
                <CheckCircle2 size={20} className="gh-check-icon" />
                <span>Sin pendientes</span>
              </div>
            )}
          </div>

          {placedView > 0 && (
            <button className="mock-btn mock-btn-outline gh-clear-btn" onClick={limpiarVista}>
              <X size={13} /> Limpiar vista
            </button>
          )}
        </aside>

        {/* ── Main ── */}
        <main className="gh-main">

          {/* Zona fija: cabecera + selectores */}
          <div className="gh-main-sticky">
            <div className="gh-main-header">
              <h2 className="gh-main-title">Horario Semanal</h2>
              <button
                className={`mock-btn ${saved ? 'gh-btn-saved' : 'mock-btn-primary'}`}
                onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
              >
                {saved
                  ? <><CheckCircle2 size={14} /> Guardado</>
                  : <><Save size={14} /> Guardar</>}
              </button>
            </div>

            <div className="gh-view-controls">
              <select
                className="mock-input mock-select gh-view-select"
                value={viewGrado}
                onChange={e => { setViewGrado(e.target.value); setViewAño(''); setViewSem('') }}
              >
                <option value="">Selecciona un grado</option>
                {Object.keys(gradoColors).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <select
                className="mock-input mock-select gh-view-select"
                value={viewAño}
                onChange={e => { setViewAño(e.target.value); setViewSem('') }}
                disabled={!viewGrado}
              >
                <option value="">Año</option>
                {[1, 2, 3, 4].map(a => <option key={a} value={a}>Año {a}</option>)}
              </select>
              <select
                className="mock-input mock-select gh-view-select"
                value={viewSem}
                onChange={e => setViewSem(e.target.value)}
                disabled={!viewAño}
              >
                <option value="">Semestre</option>
                {[1, 2].map(s => <option key={s} value={s}>Semestre {s}</option>)}
              </select>
              {hasView && (
                <span className="gh-view-chip" style={{ background: gradoColors[viewGrado] }}>
                  {viewGrado} · Año {viewAño} · Sem {viewSem}
                </span>
              )}
            </div>
          </div>

          {/* Zona scrollable: grid + conflictos */}
          <div className="gh-main-body">
          {hasView ? (
            <>
              {/* Grid */}
              <div className="gh-grid-wrap">
                <table className="gh-grid">
                  <thead>
                    <tr>
                      <th className="gh-th-hora"></th>
                      {dias.map(d => (
                        <th
                          key={d}
                          className="gh-th-dia"
                          style={{ borderBottom: `3px solid ${gradoColors[viewGrado]}` }}
                        >
                          {d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {franjas.map(f => (
                      <tr key={f.id}>
                        <td className="gh-td-hora">{f.label}</td>
                        {dias.map(d => {
                          const slotKey  = `${d}-${f.id}`
                          const celda    = vistaActual[slotKey] ?? []
                          const occupied = celda.length > 0
                          const isOver   = dragOver === slotKey && !!dragging &&
                            !celda.some(a => a.codigo === dragging.codigo)
                          return (
                            <td
                              key={d}
                              className={`gh-cell ${occupied ? 'gh-cell-filled' : 'gh-cell-empty'} ${isOver ? 'gh-cell-dragover' : ''}`}
                              onDragOver={e => { e.preventDefault(); setDragOver(slotKey) }}
                              onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOver(null) }}
                              onDrop={() => handleDrop(slotKey)}
                            >
                              {occupied && (
                                <div className="gh-cell-slots">
                                  {celda.map(asig => (
                                    <div key={asig.codigo} className="gh-slot" style={{ background: gradoColors[viewGrado] }}>
                                      <button
                                        className="gh-slot-remove"
                                        onClick={() => removeFromGrid(slotKey, asig.codigo)}
                                        title="Quitar"
                                      >
                                        <X size={9} />
                                      </button>
                                      <span className="gh-slot-code">{asig.codigo}</span>
                                      <span className="gh-slot-name">{asig.nombre}</span>
                                      {asig.profesor && (
                                        <span className="gh-slot-prof">{asig.profesor.split(' ')[0]}</span>
                                      )}
                                    </div>
                                  ))}
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
            </>
          ) : (
            <div className="gh-empty-state">
              <Calendar size={44} className="gh-empty-icon" />
              <h3 className="gh-empty-title">Selecciona un horario</h3>
              <p className="gh-empty-desc">Elige un grado, año y semestre para ver y construir el horario</p>
            </div>
          )}

          {/* ── Validador de conflictos ── */}
          {conflictos.length > 0 && (
            <div className="gh-conflicts-section">
              <div className="gh-conflicts-header">
                <AlertTriangle size={15} />
                <span>
                  {conflictos.length} conflicto{conflictos.length !== 1 ? 's' : ''} detectado{conflictos.length !== 1 ? 's' : ''} en tiempo real
                </span>
              </div>

              <div className="gh-conflict-list">
                {conflictos.map((c, i) => {
                  const franjaLabel = franjas.find(f => f.id === c.franjaId)?.label ?? c.franjaId
                  return (
                    <div key={i} className="gh-conflict-card">

                      <div className="gh-conflict-info">
                        <div className="gh-conflict-title">
                          <AlertTriangle size={12} className="gh-conflict-warn-icon" />
                          <strong>{c.tipo === 'profesor' ? 'Profesor' : 'Aula'}:</strong>&nbsp;{c.recurso}
                        </div>
                        <div className="gh-conflict-when">{c.dia} · {franjaLabel}</div>

                        <div className="gh-conflict-asig-row">
                          {c.items.map((asig, j) => (
                            <div key={j} className="gh-conflict-asig" style={{ borderLeftColor: gradoColors[asig.grados[0]] }}>
                              <span className="gh-conflict-code">{asig.codigo}</span>
                              <span className="gh-conflict-name">{asig.nombre}</span>
                              <div className="gh-grado-chips" style={{ marginTop: 2 }}>
                                {asig.grados.map(g => (
                                  <span key={g} className="gh-grado-chip" style={{ background: gradoColors[g] }}>{g}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mini tabla 5×12 */}
                      <div className="gh-mini-grid">
                        <div className="gh-mini-header-row">
                          {dias.map(d => (
                            <div key={d} className={`gh-mini-head ${d === c.dia ? 'gh-mini-head-active' : ''}`}>
                              {d.slice(0, 2)}
                            </div>
                          ))}
                        </div>
                        {franjas.map(f => (
                          <div key={f.id} className="gh-mini-row">
                            {dias.map(d => (
                              <div
                                key={d}
                                className={`gh-mini-cell ${d === c.dia && f.id === c.franjaId ? 'gh-mini-cell-conflict' : 'gh-mini-cell-empty'}`}
                              />
                            ))}
                          </div>
                        ))}
                      </div>

                    </div>
                  )
                })}
              </div>
            </div>
          )}

          </div>{/* gh-main-body */}
        </main>
      </div>
    </div>
  )
}
