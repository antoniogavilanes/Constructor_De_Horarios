import { useState } from 'react'
import { Search, Plus, Pencil, Trash2, Phone, Mail } from 'lucide-react'
import Navbar from './Navbar'
import FormModal from './FormModal'
import './shared.css'
import './AbrirProfesores.css'

interface Profesor {
  dni: string
  nombre: string
  apellidos: string
  telefono: string
  correo: string
}

const profesores: Profesor[] = [
  { dni: '12345678A', nombre: 'Juan',   apellidos: 'García López',    telefono: '600123456', correo: 'juan@uneat.es' },
  { dni: '87654321B', nombre: 'María',  apellidos: 'López Martínez',  telefono: '600654321', correo: 'maria@uneat.es' },
  { dni: '11223344C', nombre: 'Carlos', apellidos: 'Rodríguez Pérez', telefono: '600112233', correo: 'carlos@uneat.es' },
  { dni: '55667788D', nombre: 'Ana',    apellidos: 'Martínez Sanz',   telefono: '600556677', correo: 'ana@uneat.es' },
]

const fields = [
  { key: 'dni',       label: 'DNI',       placeholder: 'Ej: 12345678A' },
  { key: 'nombre',    label: 'Nombre',    placeholder: 'Ej: Juan' },
  { key: 'apellidos', label: 'Apellidos', placeholder: 'Ej: García López' },
  { key: 'telefono',  label: 'Teléfono',  placeholder: 'Ej: 600123456', type: 'tel' as const },
  { key: 'correo',    label: 'Correo',    placeholder: 'Ej: juan@uneat.es', type: 'email' as const },
]

function getInitials(nombre: string, apellidos: string) {
  return (nombre[0] + apellidos[0]).toUpperCase()
}

export default function AbrirProfesores() {
  const [search,   setSearch]   = useState('')
  const [showForm, setShowForm] = useState(false)

  const filtered = profesores.filter(p =>
    [p.nombre, p.apellidos, p.dni, p.correo].some(v =>
      v.toLowerCase().includes(search.toLowerCase())
    )
  )

  return (
    <div className="mock-page">
      <Navbar />
      <div className="ap-content">

        <div className="ap-header">
          <h1 className="ap-title">Profesores</h1>
          <button className="mock-btn mock-btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={14} /> Nuevo Profesor
          </button>
        </div>

        <div className="mock-search">
          <Search size={14} className="mock-search-icon" />
          <input
            placeholder="Buscar profesor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="ap-grid"> 
          {filtered.map(p => (
            <div key={p.dni} className="mock-card ap-card">
              <div className="ap-card-header">
                <div className="ap-avatar">{getInitials(p.nombre, p.apellidos)}</div>
                <div className="ap-card-info">
                  <div className="ap-nombre">{p.nombre} {p.apellidos}</div>
                  <span className="ap-dni-badge">{p.dni}</span>
                </div>
                <div className="ap-card-actions">
                  <button className="mock-icon-btn" onClick={() => setShowForm(true)} title="Editar">
                    <Pencil size={13} />
                  </button>
                  <button className="mock-icon-btn lp-delete" title="Eliminar">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div className="ap-card-body">
                <div className="ap-info-row">
                  <Phone size={13} className="ap-info-icon" />
                  <span>{p.telefono}</span>
                </div>
                <div className="ap-info-row">
                  <Mail size={13} className="ap-info-icon" />
                  <span>{p.correo}</span>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="ap-empty">No se encontraron profesores.</p>
          )}
        </div>

      </div>

      {showForm && (
        <FormModal
          title="Nuevo Profesor"
          fields={fields}
          onCancel={() => setShowForm(false)}
          onSave={() => setShowForm(false)}
        />
      )}
    </div>
  )
}
