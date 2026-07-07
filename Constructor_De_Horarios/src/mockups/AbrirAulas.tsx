import { useState } from 'react'
import { Search, Plus, Pencil, Trash2 } from 'lucide-react'
import Navbar from './Navbar'
import FormModal from './FormModal'
import './shared.css'
import './AbrirAulas.css'

interface Aula {
  codigo: string
  nombre: string
  capacidad: number
  piso: string
}

const pisos = [
  { id: '-2', nombre: 'Planta -2' },
  { id: '-1', nombre: 'Planta -1' },
  { id: '0',  nombre: 'Planta 0'  },
  { id: '1',  nombre: 'Planta 1'  },
]

const aulas: Aula[] = [
  // Planta -2
  { codigo: '-2.1', nombre: 'Salón de Actos',      capacidad: 300, piso: '-2' },
  { codigo: '-2.2', nombre: 'Salón de Actos',      capacidad: 300, piso: '-2' },
  { codigo: '-2.3', nombre: 'Estudio de Televisión', capacidad: 20, piso: '-2' },
  { codigo: '-2.4', nombre: 'Práctica Becarios',   capacidad: 15,  piso: '-2' },

  // Planta -1
  { codigo: '-1.1', nombre: 'Sala de Exposiciones',    capacidad: 50, piso: '-1' },
  { codigo: '-1.2', nombre: 'Laboratorio Biomecánica', capacidad: 25, piso: '-1' },
  { codigo: '-1.3', nombre: 'Aula -1.3',               capacidad: 40, piso: '-1' },
  { codigo: '-1.4', nombre: 'Aula -1.4',               capacidad: 40, piso: '-1' },
  { codigo: '-1.5', nombre: 'Aula -1.5',               capacidad: 40, piso: '-1' },
  { codigo: '-1.6', nombre: 'Aula -1.6',               capacidad: 40, piso: '-1' },

  // Planta 0
  { codigo: '0.1',  nombre: 'Aula 0.1',           capacidad: 40, piso: '0' },
  { codigo: '0.2',  nombre: 'Sala de Reuniones',  capacidad: 15, piso: '0' },
  { codigo: '0.3',  nombre: 'Sala de Reuniones',  capacidad: 15, piso: '0' },
  { codigo: '0.4',  nombre: 'Sala de Reuniones',  capacidad: 15, piso: '0' },
  { codigo: '0.5',  nombre: 'Sala de Reuniones',  capacidad: 15, piso: '0' },
  { codigo: '0.6',  nombre: 'Sala de Reuniones',  capacidad: 15, piso: '0' },
  { codigo: '0.7',  nombre: 'Sala de Eventos',    capacidad: 80, piso: '0' },

  // Planta 1
  { codigo: '1.1',  nombre: 'Sala de Radio', capacidad: 10, piso: '1' },
  { codigo: '1.2',  nombre: 'Aula 1.2',      capacidad: 40, piso: '1' },
  { codigo: '1.3',  nombre: 'Aula 1.3',      capacidad: 40, piso: '1' },
  { codigo: '1.4',  nombre: 'Aula 1.4',      capacidad: 40, piso: '1' },
  { codigo: '1.5',  nombre: 'Aula 1.5',      capacidad: 40, piso: '1' },
  { codigo: '1.6',  nombre: 'Aula 1.6',      capacidad: 40, piso: '1' },
  { codigo: '1.7',  nombre: 'Aula 1.7',      capacidad: 40, piso: '1' },
  { codigo: '1.8',  nombre: 'Aula 1.8',      capacidad: 40, piso: '1' },
]

const fields = [
  { key: 'codigo',    label: 'Código',    placeholder: 'Ej: 1.9' },
  { key: 'nombre',    label: 'Nombre',    placeholder: 'Ej: Aula 1.9' },
  { key: 'capacidad', label: 'Capacidad', placeholder: 'Ej: 40', type: 'number' as const },
]

const ROW_MIN = 4

export default function AbrirAulas() {
  const [search,     setSearch]     = useState('')
  const [filterPiso, setFilterPiso] = useState('')
  const [showForm,   setShowForm]   = useState(false)

  const pisosToShow = filterPiso
    ? pisos.filter(p => p.id === filterPiso)
    : pisos

  const matches = (a: Aula) => {
    if (search && ![a.codigo, a.nombre].some(v => v.toLowerCase().includes(search.toLowerCase()))) return false
    return true
  }

  return (
    <div className="mock-page">
      <Navbar />
      <div className="au-content">

        <div className="au-header">
          <h1 className="au-title">Aulas</h1>
          <button className="mock-btn mock-btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={14} /> Nueva Aula
          </button>
        </div>

        {/* Filtro por piso */}
        <div className="au-filters">
          <select
            className="mock-input mock-select au-filter-select"
            value={filterPiso}
            onChange={e => setFilterPiso(e.target.value)}
          >
            <option value="">Todas las plantas</option>
            {pisos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
          {filterPiso && (
            <button className="mock-btn mock-btn-outline au-clear-btn" onClick={() => setFilterPiso('')}>
              Limpiar filtro
            </button>
          )}
        </div>

        {/* Buscador */}
        <div className="mock-search">
          <Search size={14} className="mock-search-icon" />
          <input
            placeholder="Buscar aula..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Grid por pisos */}
        <div className={`au-grid ${filterPiso ? 'au-grid-single' : ''}`}>
          {pisosToShow.map(p => {
            const filas = aulas.filter(a => a.piso === p.id && matches(a))
            if (filas.length === 0) return null
            return (
              <div key={p.id} className="au-section">
                <div className="au-section-header">
                  <span className="au-piso-badge">{p.nombre}</span>
                  <span className="au-piso-count">{filas.length} aula{filas.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="mock-card">
                  <div className="au-table-wrap">
                    <table className="mock-table">
                      <thead>
                        <tr>
                          <th>Código</th>
                          <th>Nombre</th>
                          <th>Capacidad</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filas.map(a => (
                          <tr key={a.codigo}>
                            <td><span className="au-codigo">{a.codigo}</span></td>
                            <td>{a.nombre}</td>
                            <td>{a.capacidad} pers.</td>
                            <td>
                              <div className="lp-actions">
                                <button className="mock-icon-btn" onClick={() => setShowForm(true)} title="Editar"><Pencil size={13} /></button>
                                <button className="mock-icon-btn lp-delete" title="Eliminar"><Trash2 size={13} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {Array.from({ length: Math.max(0, ROW_MIN - filas.length) }).map((_, i) => (
                          <tr key={`empty-${i}`} className="au-row-empty">
                            <td></td><td></td><td></td><td></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      {showForm && (
        <FormModal
          title="Nueva Aula"
          fields={fields}
          onCancel={() => setShowForm(false)}
          onSave={() => setShowForm(false)}
        />
      )}
    </div>
  )
}
