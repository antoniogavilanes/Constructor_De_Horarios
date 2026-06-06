import { useState } from 'react'
import ListPage from './ListPage'
import FormModal from './FormModal'

const columns = [
  { key: 'codigo', label: 'Código' },
  { key: 'nombre', label: 'Nombre' },
]

const rows = [
  { codigo: 'GINF', nombre: 'Grado en Ingeniería Informática' },
  { codigo: 'GMAT', nombre: 'Grado en Matemáticas' },
  { codigo: 'GFIS', nombre: 'Grado en Física' },
  { codigo: 'GTEL', nombre: 'Grado en Telecomunicaciones' },
]

const fields = [
  { key: 'codigo', label: 'Código', placeholder: 'Ej: GINF' },
  { key: 'nombre', label: 'Nombre', placeholder: 'Ej: Grado en Ingeniería Informática' },
]

export default function AbrirGrados() {
  const [showForm, setShowForm] = useState(false)
  return (
    <>
      <ListPage
        title="Grados"
        columns={columns}
        rows={rows}
        newLabel="Nuevo Grado"
        onNew={() => setShowForm(true)}
        onEdit={() => setShowForm(true)}
        searchPlaceholder="Buscar grado..."
      />
      {showForm && (
        <FormModal
          title="Nuevo Grado"
          fields={fields}
          onCancel={() => setShowForm(false)}
          onSave={() => setShowForm(false)}
        />
      )}
    </>
  )
}
