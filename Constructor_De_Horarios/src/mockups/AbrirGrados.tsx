import { useState } from 'react'
import { Search, Plus, Pencil, Trash2 } from 'lucide-react'
import Navbar from './Navbar'
import FormModal from './FormModal'
import './shared.css'
import './AbrirGrados.css'

interface Grado {
  codigo: string
  nombre: string
  color: string
}

const grados: Grado[] = [
  { codigo: 'GII',   nombre: 'Grado en Ingeniería Informática',                       color: '#1A7CC1' },
  { codigo: 'CAFYD', nombre: 'Grado en Ciencias de la Actividad Física y del Deporte', color: '#16a085' },
  { codigo: 'GPSI',  nombre: 'Grado en Psicología',                                   color: '#8e44ad' },
  { codigo: 'GCTA',  nombre: 'Grado en Ciencia y Tecnología de los Alimentos',        color: '#e67e22' },
  { codigo: 'GADE',  nombre: 'Grado en Administración y Dirección de Empresas',       color: '#c0392b' },
]

const fields = [
  { key: 'codigo', label: 'Código', placeholder: 'Ej: GII' },
  { key: 'nombre', label: 'Nombre', placeholder: 'Ej: Grado en Ingeniería Informática' },
]

export default function AbrirGrados() {
  const [search,   setSearch]   = useState('')
  const [showForm, setShowForm] = useState(false)

  const filtered = grados.filter(g =>
    [g.codigo, g.nombre].some(v =>
      v.toLowerCase().includes(search.toLowerCase())
    )
  )

  return (
    <div className="mock-page">
      <Navbar />
      <div className="ag-content">

        <div className="ag-header">
          <h1 className="ag-title">Grados</h1>
          <button className="mock-btn mock-btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={14} /> Nuevo Grado
          </button>
        </div>

        <div className="mock-search">
          <Search size={14} className="mock-search-icon" />
          <input
            placeholder="Buscar grado..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="ag-grid">
          {filtered.map(g => (
            <div key={g.codigo} className="mock-card ag-card">
              <div className="ag-card-banner" style={{ background: g.color }}>
                <span className="ag-codigo">{g.codigo}</span>
              </div>
              <div className="ag-card-body">
                <span className="ag-nombre">{g.nombre}</span>
                <div className="ag-card-actions">
                  <button className="mock-icon-btn" onClick={() => setShowForm(true)} title="Editar">
                    <Pencil size={13} />
                  </button>
                  <button className="mock-icon-btn lp-delete" title="Eliminar">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="ag-empty">No se encontraron grados.</p>
          )}
        </div>

      </div>

      {showForm && (
        <FormModal
          title="Nuevo Grado"
          fields={fields}
          onCancel={() => setShowForm(false)}
          onSave={() => setShowForm(false)}
        />
      )}
    </div>
  )
}
