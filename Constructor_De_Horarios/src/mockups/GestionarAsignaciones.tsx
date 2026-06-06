import { CheckCircle2 } from 'lucide-react'
import Navbar from './Navbar'
import './shared.css'
import './GestionarAsignaciones.css'

const pendientes = [
  { codigo: 'PRG301', nombre: 'Programación Avanzada' },
  { codigo: 'ING401', nombre: 'Ingeniería del Software' },
]

const completadas = [
  { codigo: 'MAT101', nombre: 'Cálculo I',        profesor: '12345678A — Juan García',  aula: 'A101' },
  { codigo: 'FIS201', nombre: 'Física General',   profesor: '87654321B — María López',  aula: 'B205' },
]

const profesores = ['12345678A — Juan García', '87654321B — María López', '11223344C — Carlos Rodríguez']
const aulas      = ['A101', 'B205', 'C301', 'LAB1']

export default function GestionarAsignaciones() {
  return (
    <div className="mock-page">
      <Navbar />
      <div className="ga-content">

        {/* Pendientes */}
        <div className="ga-panel">
          <div className="ga-panel-header">
            <h2 className="ga-panel-title">Asignaciones Pendientes</h2>
            <span className="ga-badge">{pendientes.length}</span>
          </div>
          <div className="ga-list">
            {pendientes.map(a => (
              <div key={a.codigo} className="ga-card">
                <div className="ga-card-top">
                  <span className="ga-codigo">{a.codigo}</span>
                  <span className="ga-nombre">{a.nombre}</span>
                </div>
                <div className="mock-field">
                  <label className="mock-label">Profesor</label>
                  <select className="mock-input mock-select">
                    <option value="">Seleccionar profesor</option>
                    {profesores.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div className="mock-field">
                  <label className="mock-label">Aula</label>
                  <select className="mock-input mock-select">
                    <option value="">Seleccionar aula</option>
                    {aulas.map(au => <option key={au}>{au}</option>)}
                  </select>
                </div>
                <button className="mock-btn mock-btn-primary ga-btn">Guardar asignación</button>
              </div>
            ))}
          </div>
        </div>

        {/* Completadas */}
        <div className="ga-panel">
          <div className="ga-panel-header">
            <h2 className="ga-panel-title">Asignaciones Completadas</h2>
            <span className="ga-badge ga-badge-ok">{completadas.length}</span>
          </div>
          <div className="ga-list">
            {completadas.map(a => (
              <div key={a.codigo} className="ga-card ga-card-done">
                <div className="ga-done-row">
                  <CheckCircle2 size={16} className="ga-check" />
                  <div>
                    <div className="ga-done-title">{a.codigo} — {a.nombre}</div>
                    <div className="ga-done-sub">Profesor: {a.profesor}</div>
                    <div className="ga-done-sub">Aula: {a.aula}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
