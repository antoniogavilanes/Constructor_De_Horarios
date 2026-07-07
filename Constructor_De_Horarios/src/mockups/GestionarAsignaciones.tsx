import { useState } from 'react'
import { Search, Pencil, X, CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import Navbar from './Navbar'
import './shared.css'
import './GestionarAsignaciones.css'

interface Asignacion {
  codigo: string
  nombre: string
  grado: string
  profesor: string
  aula: string
}

const gradosList = [
  { codigo: 'GII',   nombre: 'Ingeniería Informática' },
  { codigo: 'CAFYD', nombre: 'Actividad Física y Deporte' },
  { codigo: 'GPSI',  nombre: 'Psicología' },
  { codigo: 'GCTA',  nombre: 'Ciencia y Tecnología Alimentos' },
  { codigo: 'GADE',  nombre: 'Administración y Dirección Empresas' },
]

const profesoresList = [
  'Juan García',
  'María López',
  'Carlos Rodríguez',
  'Ana Martínez',
]

const aulasList = [
  '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8',
  '0.1', '0.7',
  '-1.3', '-1.4', '-1.5', '-1.6',
]

const asignaciones: Asignacion[] = [
  { codigo: 'MAT101', nombre: 'Cálculo I',                 grado: 'GII',   profesor: 'Juan García',     aula: '1.2'  },
  { codigo: 'MAT102', nombre: 'Cálculo II',                grado: 'GII',   profesor: 'Juan García',     aula: '1.3'  },
  { codigo: 'EST201', nombre: 'Estadística',               grado: 'GII',   profesor: 'María López',     aula: '1.4'  },
  { codigo: 'PRG301', nombre: 'Programación Avanzada',     grado: 'GII',   profesor: 'Carlos Rodríguez', aula: ''    },
  { codigo: 'ING401', nombre: 'Ingeniería del Software',   grado: 'GII',   profesor: 'Carlos Rodríguez', aula: '1.5' },
  { codigo: 'FIS301', nombre: 'Fisiología del Ejercicio',  grado: 'CAFYD', profesor: 'Ana Martínez',    aula: ''     },
  { codigo: 'NUT101', nombre: 'Nutrición Deportiva',       grado: 'CAFYD', profesor: 'Ana Martínez',    aula: ''     },
  { codigo: 'ECO101', nombre: 'Economía',                  grado: 'CAFYD', profesor: 'María López',     aula: '1.6'  },
  { codigo: 'PSI201', nombre: 'Psicología del Deporte',    grado: 'CAFYD', profesor: '',                aula: ''     },
  { codigo: 'PSI101', nombre: 'Psicología General',        grado: 'GPSI',  profesor: 'Ana Martínez',    aula: ''     },
  { codigo: 'PSI301', nombre: 'Psicología Clínica',        grado: 'GPSI',  profesor: '',                aula: ''     },
  { codigo: 'ALI101', nombre: 'Ciencia de los Alimentos',  grado: 'GCTA',  profesor: 'Juan García',     aula: ''     },
  { codigo: 'MIC201', nombre: 'Microbiología Alimentaria', grado: 'GCTA',  profesor: 'Juan García',     aula: ''     },
  { codigo: 'GES301', nombre: 'Gestión Empresarial',       grado: 'GADE',  profesor: 'María López',     aula: '1.7'  },
  { codigo: 'MKT201', nombre: 'Marketing',                 grado: 'GADE',  profesor: 'María López',     aula: ''     },
]

type Estado = 'completa' | 'parcial' | 'pendiente'

function getEstado(a: Asignacion): Estado {
  if (a.profesor && a.aula) return 'completa'
  if (a.profesor || a.aula) return 'parcial'
  return 'pendiente'
}

export default function GestionarAsignaciones() {
  const [datos,         setDatos]         = useState<Asignacion[]>(asignaciones)
  const [search,        setSearch]        = useState('')
  const [filterGrado,   setFilterGrado]   = useState('')
  const [filterEstado,  setFilterEstado]  = useState('')
  const [filterProfesor,setFilterProfesor]= useState('')
  const [filterAsig,    setFilterAsig]    = useState('')
  const [filterAula,    setFilterAula]    = useState('')
  const [editando,      setEditando]      = useState<Asignacion | null>(null)
  const [formProf,      setFormProf]      = useState('')
  const [formAula,      setFormAula]      = useState('')

  const anyFilter = filterGrado || filterEstado || filterProfesor || filterAsig || filterAula

  const clearFilters = () => {
    setFilterGrado(''); setFilterEstado(''); setFilterProfesor(''); setFilterAsig(''); setFilterAula('')
  }

  const filtradas = datos.filter(a => {
    if (filterGrado    && a.grado    !== filterGrado)           return false
    if (filterEstado   && getEstado(a) !== filterEstado)        return false
    if (filterProfesor && a.profesor !== filterProfesor)        return false
    if (filterAsig     && a.codigo   !== filterAsig)            return false
    if (filterAula     && a.aula     !== filterAula)            return false
    if (search && ![a.codigo, a.nombre, a.profesor, a.aula]
      .some(v => v.toLowerCase().includes(search.toLowerCase()))) return false
    return true
  })

  const aulasAsignadas = [...new Set(datos.map(a => a.aula).filter(Boolean))]

  const totales   = datos.length
  const completas = datos.filter(a => getEstado(a) === 'completa').length
  const parciales = datos.filter(a => getEstado(a) === 'parcial').length
  const pendientes= datos.filter(a => getEstado(a) === 'pendiente').length

  const openEdit = (a: Asignacion) => {
    setEditando(a)
    setFormProf(a.profesor)
    setFormAula(a.aula)
  }

  const saveEdit = () => {
    if (!editando) return
    setDatos(prev => prev.map(a =>
      a.codigo === editando.codigo ? { ...a, profesor: formProf, aula: formAula } : a
    ))
    setEditando(null)
  }

  const clearAsignacion = (codigo: string) => {
    setDatos(prev => prev.map(a =>
      a.codigo === codigo ? { ...a, profesor: '', aula: '' } : a
    ))
  }

  return (
    <div className="mock-page">
      <Navbar />
      <div className="ga-content">

        {/* Cabecera */}
        <div className="ga-header">
          <h1 className="ga-title">Gestionar Asignaciones</h1>
          <div className="ga-stats">
            <div className="ga-stat ga-stat-ok">
              <CheckCircle2 size={15} />
              <span>{completas} completas</span>
            </div>
            <div className="ga-stat ga-stat-warn">
              <AlertCircle size={15} />
              <span>{parciales} parciales</span>
            </div>
            <div className="ga-stat ga-stat-pend">
              <Clock size={15} />
              <span>{pendientes} pendientes</span>
            </div>
            <span className="ga-stat-total">{totales} asignaturas</span>
          </div>
        </div>

        {/* Filtros */}
        <div className="ga-filters">
          <select className="mock-input mock-select ga-filter-select" value={filterGrado} onChange={e => setFilterGrado(e.target.value)}>
            <option value="">Todos los grados</option>
            {gradosList.map(g => <option key={g.codigo} value={g.codigo}>{g.codigo} — {g.nombre}</option>)}
          </select>
          <select className="mock-input mock-select ga-filter-select" value={filterProfesor} onChange={e => setFilterProfesor(e.target.value)}>
            <option value="">Todos los profesores</option>
            {profesoresList.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select className="mock-input mock-select ga-filter-select" value={filterAsig} onChange={e => setFilterAsig(e.target.value)}>
            <option value="">Todas las asignaturas</option>
            {datos.map(a => <option key={a.codigo} value={a.codigo}>{a.codigo} — {a.nombre}</option>)}
          </select>
          <select className="mock-input mock-select ga-filter-select" value={filterAula} onChange={e => setFilterAula(e.target.value)}>
            <option value="">Todas las aulas</option>
            {aulasAsignadas.map(au => <option key={au} value={au}>{au}</option>)}
          </select>
          <select className="mock-input mock-select ga-filter-select" value={filterEstado} onChange={e => setFilterEstado(e.target.value)}>
            <option value="">Todos los estados</option>
            <option value="completa">Completa</option>
            <option value="parcial">Parcial</option>
            <option value="pendiente">Pendiente</option>
          </select>
          {anyFilter && (
            <button className="mock-btn mock-btn-outline ga-clear-btn" onClick={clearFilters}>
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Buscador */}
        <div className="mock-search">
          <Search size={14} className="mock-search-icon" />
          <input
            placeholder="Buscar asignatura, profesor o aula..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Tabla */}
        <div className="mock-card ga-table-card">
          <table className="mock-table">
            <thead>
              <tr>
                <th>Asignatura</th>
                <th>Grado</th>
                <th>Profesor</th>
                <th>Aula</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map(a => {
                const estado = getEstado(a)
                return (
                  <tr key={a.codigo}>
                    <td>
                      <div className="ga-asig-cell">
                        <span className="ga-codigo">{a.codigo}</span>
                        <span className="ga-nombre">{a.nombre}</span>
                      </div>
                    </td>
                    <td><span className="ga-grado-badge">{a.grado}</span></td>
                    <td className={!a.profesor ? 'ga-empty-cell' : ''}>
                      {a.profesor || <span className="ga-sin-asignar">Sin asignar</span>}
                    </td>
                    <td className={!a.aula ? 'ga-empty-cell' : ''}>
                      {a.aula || <span className="ga-sin-asignar">Sin asignar</span>}
                    </td>
                    <td>
                      <span className={`ga-estado ga-estado-${estado}`}>
                        {estado === 'completa'  && <CheckCircle2 size={12} />}
                        {estado === 'parcial'   && <AlertCircle  size={12} />}
                        {estado === 'pendiente' && <Clock        size={12} />}
                        {estado.charAt(0).toUpperCase() + estado.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="lp-actions">
                        <button className="mock-icon-btn" title="Editar asignación" onClick={() => openEdit(a)}>
                          <Pencil size={13} />
                        </button>
                        {estado !== 'pendiente' && (
                          <button className="mock-icon-btn lp-delete" title="Quitar asignación" onClick={() => clearAsignacion(a.codigo)}>
                            <X size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtradas.length === 0 && (
                <tr>
                  <td colSpan={6} className="ga-no-results">No se encontraron asignaturas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Modal de edición */}
      {editando && (
        <div className="ga-overlay" onClick={() => setEditando(null)}>
          <div className="ga-modal" onClick={e => e.stopPropagation()}>
            <div className="ga-modal-header">
              <div>
                <span className="ga-codigo">{editando.codigo}</span>
                <h2 className="ga-modal-title">{editando.nombre}</h2>
              </div>
              <button className="mock-icon-btn" onClick={() => setEditando(null)}><X size={15} /></button>
            </div>
            <div className="ga-modal-body">
              <div className="mock-field">
                <label className="mock-label">Profesor</label>
                <select className="mock-input mock-select" value={formProf} onChange={e => setFormProf(e.target.value)}>
                  <option value="">Sin asignar</option>
                  {profesoresList.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="mock-field">
                <label className="mock-label">Aula</label>
                <select className="mock-input mock-select" value={formAula} onChange={e => setFormAula(e.target.value)}>
                  <option value="">Sin asignar</option>
                  {aulasList.map(au => <option key={au} value={au}>{au}</option>)}
                </select>
              </div>
            </div>
            <div className="ga-modal-footer">
              <button className="mock-btn mock-btn-outline" onClick={() => setEditando(null)}>Cancelar</button>
              <button className="mock-btn mock-btn-primary" onClick={saveEdit}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
