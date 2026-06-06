import { useState } from 'react'
import { Search, Plus, Pencil, Trash2 } from 'lucide-react'
import Navbar from './Navbar'
import FormModal from './FormModal'
import './shared.css'
import './AbrirAsignaturas.css'

interface Asignatura {
  codigo: string
  nombre: string
  creditos: string
  curso: string
  semestre: string
  profesor: string
  grados: string[]
}

const ROW_MIN = 5

const gradosList = [
  { codigo: 'GII',   nombre: 'Grado en Ingeniería Informática' },
  { codigo: 'CAFYD', nombre: 'Grado en Ciencias de la Actividad Física y del Deporte' },
  { codigo: 'GPSI',  nombre: 'Grado en Psicología' },
  { codigo: 'GCTA',  nombre: 'Grado en Ciencia y Tecnología de los Alimentos' },
  { codigo: 'GADE',  nombre: 'Grado en Administración y Dirección de Empresas' },
]

const profesores = ['Juan García', 'María López', 'Carlos Rodríguez', 'Ana Martínez']
const semestres  = ['1º Semestre', '2º Semestre']
const cursos     = ['1er Año', '2do Año', '3er Año', '4to Año']

const asignaturas: Asignatura[] = [
  { codigo: 'MAT101', nombre: 'Cálculo I',                creditos: '4', curso: '1er Año', semestre: '1º Semestre', profesor: 'Juan García',    grados: ['GII','GCTA'] },
  { codigo: 'MAT102', nombre: 'Cálculo II',               creditos: '4', curso: '1er Año', semestre: '2º Semestre', profesor: 'Juan García',    grados: ['GII'] },
  { codigo: 'EST201', nombre: 'Estadística',              creditos: '4', curso: '2do Año', semestre: '1º Semestre', profesor: 'María López',    grados: ['GII','GPSI','GADE'] },
  { codigo: 'PRG301', nombre: 'Programación Avanzada',    creditos: '5', curso: '3er Año', semestre: '1º Semestre', profesor: 'Carlos Rodríguez',grados: ['GII'] },
  { codigo: 'ING401', nombre: 'Ingeniería del Software',  creditos: '6', curso: '4to Año', semestre: '2º Semestre', profesor: 'Carlos Rodríguez',grados: ['GII'] },
  { codigo: 'FIS301', nombre: 'Fisiología del Ejercicio', creditos: '5', curso: '2do Año', semestre: '1º Semestre', profesor: 'Ana Martínez',   grados: ['CAFYD'] },
  { codigo: 'NUT101', nombre: 'Nutrición Deportiva',      creditos: '4', curso: '1er Año', semestre: '2º Semestre', profesor: 'Ana Martínez',   grados: ['CAFYD','GCTA'] },
  { codigo: 'ECO101', nombre: 'Economía',                 creditos: '4', curso: '1er Año', semestre: '1º Semestre', profesor: 'María López',    grados: ['CAFYD','GADE'] },
  { codigo: 'PSI201', nombre: 'Psicología del Deporte',   creditos: '3', curso: '2do Año', semestre: '2º Semestre', profesor: 'Ana Martínez',   grados: ['CAFYD','GPSI'] },
  { codigo: 'PSI101', nombre: 'Psicología General',       creditos: '6', curso: '1er Año', semestre: '1º Semestre', profesor: 'Ana Martínez',   grados: ['GPSI'] },
  { codigo: 'PSI301', nombre: 'Psicología Clínica',       creditos: '5', curso: '3er Año', semestre: '1º Semestre', profesor: 'Ana Martínez',   grados: ['GPSI'] },
  { codigo: 'ALI101', nombre: 'Ciencia de los Alimentos', creditos: '5', curso: '1er Año', semestre: '1º Semestre', profesor: 'Juan García',    grados: ['GCTA'] },
  { codigo: 'MIC201', nombre: 'Microbiología Alimentaria',creditos: '4', curso: '2do Año', semestre: '2º Semestre', profesor: 'Juan García',    grados: ['GCTA'] },
  { codigo: 'GES301', nombre: 'Gestión Empresarial',      creditos: '5', curso: '3er Año', semestre: '2º Semestre', profesor: 'María López',    grados: ['GADE'] },
  { codigo: 'MKT201', nombre: 'Marketing',                creditos: '4', curso: '2do Año', semestre: '1º Semestre', profesor: 'María López',    grados: ['GADE'] },
]

const fields = [
  { key: 'codigo',   label: 'Código',    placeholder: 'Ej: MAT101' },
  { key: 'nombre',   label: 'Nombre',    placeholder: 'Ej: Cálculo I' },
  { key: 'creditos', label: 'Créditos',  placeholder: 'Ej: 4', type: 'number' as const },
  { key: 'curso',    label: 'Curso',     placeholder: 'Seleccione un curso',     type: 'select' as const, options: cursos },
  { key: 'semestre', label: 'Semestre',  placeholder: 'Seleccione un semestre',  type: 'select' as const, options: semestres },
  { key: 'grados',   label: 'Grados',    type: 'checkboxes' as const, options: gradosList.map(g => `${g.codigo} — ${g.nombre}`) },
]

export default function AbrirAsignaturas() {
  const [search,          setSearch]          = useState('')
  const [filterGrado,     setFilterGrado]     = useState('')
  const [filterProfesor,  setFilterProfesor]  = useState('')
  const [filterSemestre,  setFilterSemestre]  = useState('')
  const [filterCurso,     setFilterCurso]     = useState('')
  const [showForm,        setShowForm]        = useState(false)

  const anyFilter = filterGrado || filterProfesor || filterSemestre || filterCurso

  const clearFilters = () => {
    setFilterGrado(''); setFilterProfesor(''); setFilterSemestre(''); setFilterCurso('')
  }

  const matches = (a: Asignatura) => {
    if (search        && ![a.codigo, a.nombre].some(v => v.toLowerCase().includes(search.toLowerCase()))) return false
    if (filterProfesor && a.profesor !== filterProfesor)   return false
    if (filterSemestre && a.semestre !== filterSemestre)   return false
    if (filterCurso    && a.curso    !== filterCurso)      return false
    return true
  }

  const gradosToShow = filterGrado
    ? gradosList.filter(g => g.codigo === filterGrado)
    : gradosList

  return (
    <div className="mock-page">
      <Navbar />
      <div className="aa-content">

        <div className="aa-header">
          <h1 className="aa-title">Asignaturas</h1>
          <button className="mock-btn mock-btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={14} /> Nueva Asignatura
          </button>
        </div>

        {/* Filtros */}
        <div className="aa-filters">
          <select className="mock-input mock-select aa-filter-select" value={filterGrado} onChange={e => setFilterGrado(e.target.value)}>
            <option value="">Todos los grados</option>
            {gradosList.map(g => <option key={g.codigo} value={g.codigo}>{g.codigo} — {g.nombre}</option>)}
          </select>
          <select className="mock-input mock-select aa-filter-select" value={filterProfesor} onChange={e => setFilterProfesor(e.target.value)}>
            <option value="">Todos los profesores</option>
            {profesores.map(p => <option key={p}>{p}</option>)}
          </select>
          <select className="mock-input mock-select aa-filter-select" value={filterSemestre} onChange={e => setFilterSemestre(e.target.value)}>
            <option value="">Todos los semestres</option>
            {semestres.map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="mock-input mock-select aa-filter-select" value={filterCurso} onChange={e => setFilterCurso(e.target.value)}>
            <option value="">Todos los cursos</option>
            {cursos.map(c => <option key={c}>{c}</option>)}
          </select>
          {anyFilter && (
            <button className="mock-btn mock-btn-outline aa-clear-btn" onClick={clearFilters}>
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Buscador */}
        <div className="mock-search">
          <Search size={14} className="mock-search-icon" />
          <input
            placeholder="Buscar asignatura..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Grid 2 columnas */}
        <div className={`aa-grid ${filterGrado ? 'aa-grid-single' : ''}`}>
          {gradosToShow.map(g => {
            const filas = asignaturas.filter(a => a.grados.includes(g.codigo) && matches(a))
            if (filas.length === 0) return null
            return (
              <div key={g.codigo} className="aa-section">
                <div className="aa-section-header">
                  <span className="aa-grado-code">{g.codigo}</span>
                  <span className="aa-grado-name">{g.nombre}</span>
                  <span className="aa-grado-count">{filas.length} asignatura{filas.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="mock-card">
                  <div className="aa-table-wrap">
                    <table className="mock-table">
                      <thead>
                        <tr>
                          <th>Código</th>
                          <th>Nombre</th>
                          <th>Créditos</th>
                          <th>Curso</th>
                          <th>Semestre</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filas.map(a => (
                          <tr key={a.codigo}>
                            <td><span className="aa-codigo">{a.codigo}</span></td>
                            <td>{a.nombre}</td>
                            <td>{a.creditos}</td>
                            <td>{a.curso}</td>
                            <td><span className="aa-semestre">{a.semestre}</span></td>
                            <td>
                              <div className="lp-actions">
                                <button className="mock-icon-btn" onClick={() => setShowForm(true)} title="Editar"><Pencil size={13} /></button>
                                <button className="mock-icon-btn lp-delete" title="Eliminar"><Trash2 size={13} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {Array.from({ length: Math.max(0, ROW_MIN - filas.length) }).map((_, i) => (
                          <tr key={`empty-${i}`} className="aa-row-empty">
                            <td></td><td></td><td></td><td></td><td></td><td></td>
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
          title="Nueva Asignatura"
          fields={fields}
          onCancel={() => setShowForm(false)}
          onSave={() => setShowForm(false)}
        />
      )}
    </div>
  )
}
