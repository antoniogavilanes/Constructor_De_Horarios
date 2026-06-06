import { useState } from 'react'
import ListPage from './ListPage'
import FormModal from './FormModal'

const columns = [
  { key: 'dni',       label: 'DNI' },
  { key: 'nombre',    label: 'Nombre' },
  { key: 'apellidos', label: 'Apellidos' },
  { key: 'telefono',  label: 'Teléfono' },
  { key: 'correo',    label: 'Correo' },
]

const rows = [
  { dni: '12345678A', nombre: 'Juan',   apellidos: 'García López',      telefono: '600123456', correo: 'juan@uneat.es' },
  { dni: '87654321B', nombre: 'María',  apellidos: 'López Martínez',    telefono: '600654321', correo: 'maria@uneat.es' },
  { dni: '11223344C', nombre: 'Carlos', apellidos: 'Rodríguez Pérez',   telefono: '600112233', correo: 'carlos@uneat.es' },
]

const fields = [
  { key: 'dni',       label: 'DNI',        placeholder: 'Ej: 12345678A' },
  { key: 'nombre',    label: 'Nombre',     placeholder: 'Ej: Juan' },
  { key: 'apellidos', label: 'Apellidos',  placeholder: 'Ej: García López' },
  { key: 'telefono',  label: 'Teléfono',   placeholder: 'Ej: 600123456', type: 'tel' as const },
  { key: 'correo',    label: 'Correo',     placeholder: 'Ej: juan@uneat.es', type: 'email' as const },
]

export default function AbrirProfesores() {
  const [showForm, setShowForm] = useState(false)
  return (
    <>
      <ListPage
        title="Profesores"
        columns={columns}
        rows={rows}
        newLabel="Nuevo Profesor"
        onNew={() => setShowForm(true)}
        onEdit={() => setShowForm(true)}
        searchPlaceholder="Buscar profesor..."
      />
      {showForm && (
        <FormModal
          title="Nuevo Profesor"
          fields={fields}
          onCancel={() => setShowForm(false)}
          onSave={() => setShowForm(false)}
        />
      )}
    </>
  )
}
