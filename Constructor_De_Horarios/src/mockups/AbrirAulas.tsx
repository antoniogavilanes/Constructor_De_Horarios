import { useState } from 'react'
import ListPage from './ListPage'
import FormModal from './FormModal'

const columns = [
  { key: 'codigo',    label: 'Código' },
  { key: 'capacidad', label: 'Capacidad' },
]

const rows = [
  { codigo: 'A101',  capacidad: '30' },
  { codigo: 'B205',  capacidad: '50' },
  { codigo: 'C301',  capacidad: '25' },
  { codigo: 'LAB1',  capacidad: '20' },
]

const fields = [
  { key: 'codigo',    label: 'Código',    placeholder: 'Ej: A101' },
  { key: 'capacidad', label: 'Capacidad', placeholder: 'Ej: 30', type: 'number' as const },
]

export default function AbrirAulas() {
  const [showForm, setShowForm] = useState(false)
  return (
    <>
      <ListPage
        title="Aulas"
        columns={columns}
        rows={rows}
        newLabel="Nueva Aula"
        onNew={() => setShowForm(true)}
        onEdit={() => setShowForm(true)}
        searchPlaceholder="Buscar aula..."
      />
      {showForm && (
        <FormModal
          title="Nueva Aula"
          fields={fields}
          onCancel={() => setShowForm(false)}
          onSave={() => setShowForm(false)}
        />
      )}
    </>
  )
}
