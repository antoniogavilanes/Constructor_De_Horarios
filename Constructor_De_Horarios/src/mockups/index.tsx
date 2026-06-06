import { Link } from 'react-router-dom'
import './shared.css'
import './MockupsHub.css'

const screens = [
  { path: 'login',                  label: 'Login',                   cap: 'Prioridad 1' },
  { path: 'vista-principal',        label: 'Vista Principal',         cap: 'Prioridad 1' },
  { path: 'abrir-asignaturas',      label: 'Abrir Asignaturas',       cap: 'Prioridad 2' },
  { path: 'asignatura-formulario',  label: 'Formulario Asignatura',   cap: 'Prioridad 2' },
  { path: 'abrir-profesores',       label: 'Abrir Profesores',        cap: 'Prioridad 2' },
  { path: 'profesor-formulario',    label: 'Formulario Profesor',     cap: 'Prioridad 2' },
  { path: 'abrir-grados',           label: 'Abrir Grados',            cap: 'Prioridad 2' },
  { path: 'grado-formulario',       label: 'Formulario Grado',        cap: 'Prioridad 2' },
  { path: 'abrir-aulas',            label: 'Abrir Aulas',             cap: 'Prioridad 2' },
  { path: 'aula-formulario',        label: 'Formulario Aula',         cap: 'Prioridad 2' },
  { path: 'gestionar-asignaciones', label: 'Gestionar Asignaciones',  cap: 'Prioridad 3' },
  { path: 'generar-horario',        label: 'Generar Horario',         cap: 'Prioridad 4' },
  { path: 'consultar-horario',      label: 'Consultar Horario',       cap: 'Prioridad 5' },
]

export default function MockupsHub() {
  return (
    <div className="hub-page">
      <div className="hub-header">
        <h1 className="hub-title">Constructor de Horarios</h1>
        <p className="hub-subtitle">Mockups v2 — Galería de pantallas</p>
      </div>
      <div className="hub-grid">
        {screens.map(s => (
          <Link key={s.path} to={`/mockups/${s.path}`} className="hub-card">
            <span className="hub-card-cap">{s.cap}</span>
            <span className="hub-card-label">{s.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
