import { GripVertical } from 'lucide-react'
import Navbar from './Navbar'
import './shared.css'
import './GenerarHorario.css'

const dias   = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
const horas  = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00']

const asignaturas = [
  { codigo: 'PRG301', nombre: 'Programación Avanzada', profesor: 'Carlos Rodríguez', aula: 'LAB1' },
  { codigo: 'ING401', nombre: 'Ingeniería del Software', profesor: 'María López', aula: 'B205' },
]

type Celda = { codigo: string; nombre: string; color: string }
const ocupadas: Record<string, Celda> = {
  'Lunes-09:00':     { codigo: 'MAT101', nombre: 'Cálculo I',       color: '#629EF9' },
  'Martes-11:00':    { codigo: 'FIS201', nombre: 'Física General',  color: '#F2AC4E' },
  'Miércoles-10:00': { codigo: 'MAT101', nombre: 'Cálculo I',       color: '#629EF9' },
  'Jueves-09:00':    { codigo: 'FIS201', nombre: 'Física General',  color: '#F2AC4E' },
}

export default function GenerarHorario() {
  return (
    <div className="mock-page">
      <Navbar />
      <div className="gh-layout">

        {/* Panel lateral */}
        <aside className="gh-sidebar">
          <h2 className="gh-sidebar-title">Asignaturas</h2>
          <p className="gh-sidebar-hint">Arrastra al horario</p>
          <div className="gh-cards">
            {asignaturas.map(a => (
              <div key={a.codigo} className="gh-subject-card" draggable>
                <GripVertical size={14} className="gh-grip" />
                <div>
                  <div className="gh-subject-code">{a.codigo}</div>
                  <div className="gh-subject-name">{a.nombre}</div>
                  <div className="gh-subject-meta">{a.profesor} · {a.aula}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Matriz horaria */}
        <main className="gh-main">
          <h2 className="gh-main-title">Matriz Horaria</h2>
          <div className="gh-grid-wrap mock-card">
            <table className="gh-grid">
              <thead>
                <tr>
                  <th className="gh-th-hora"></th>
                  {dias.map(d => <th key={d} className="gh-th-dia">{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {horas.map(h => (
                  <tr key={h}>
                    <td className="gh-td-hora">{h}</td>
                    {dias.map(d => {
                      const celda = ocupadas[`${d}-${h}`]
                      return (
                        <td key={d} className={`gh-cell ${celda ? 'gh-cell-filled' : 'gh-cell-empty'}`}>
                          {celda && (
                            <div className="gh-slot" style={{ background: celda.color }}>
                              <span className="gh-slot-code">{celda.codigo}</span>
                              <span className="gh-slot-name">{celda.nombre}</span>
                            </div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

      </div>
    </div>
  )
}
