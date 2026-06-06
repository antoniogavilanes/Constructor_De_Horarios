import Navbar from './Navbar'
import './shared.css'
import './ConsultarHorario.css'

const dias  = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
const horas = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00']

type Sesion = { codigo: string; nombre: string; profesor: string; aula: string; color: string }
const horario: Record<string, Sesion> = {
  'Lunes-09:00':     { codigo: 'MAT101', nombre: 'Cálculo I',               profesor: 'Juan García',     aula: 'A101', color: '#629EF9' },
  'Lunes-10:00':     { codigo: 'MAT101', nombre: 'Cálculo I',               profesor: 'Juan García',     aula: 'A101', color: '#629EF9' },
  'Martes-11:00':    { codigo: 'FIS201', nombre: 'Física General',          profesor: 'María López',     aula: 'B205', color: '#F2AC4E' },
  'Miércoles-09:00': { codigo: 'PRG301', nombre: 'Programación Avanzada',   profesor: 'Carlos Rodríguez',aula: 'LAB1', color: '#b5bd68' },
  'Miércoles-10:00': { codigo: 'PRG301', nombre: 'Programación Avanzada',   profesor: 'Carlos Rodríguez',aula: 'LAB1', color: '#b5bd68' },
  'Jueves-09:00':    { codigo: 'FIS201', nombre: 'Física General',          profesor: 'María López',     aula: 'B205', color: '#F2AC4E' },
  'Viernes-11:00':   { codigo: 'ING401', nombre: 'Ingeniería del Software', profesor: 'María López',     aula: 'B205', color: '#c792ea' },
  'Viernes-12:00':   { codigo: 'ING401', nombre: 'Ingeniería del Software', profesor: 'María López',     aula: 'B205', color: '#c792ea' },
}

export default function ConsultarHorario() {
  return (
    <div className="mock-page">
      <Navbar />
      <div className="ch-content">
        <div className="ch-header">
          <h1 className="ch-title">Consultar Horario</h1>
          <div className="ch-filters">
            <select className="mock-input mock-select ch-select">
              <option>Todos los profesores</option>
              <option>Juan García</option>
              <option>María López</option>
              <option>Carlos Rodríguez</option>
            </select>
            <select className="mock-input mock-select ch-select">
              <option>Todas las aulas</option>
              <option>A101</option>
              <option>B205</option>
              <option>LAB1</option>
            </select>
          </div>
        </div>

        <div className="mock-card ch-grid-wrap">
          <table className="ch-grid">
            <thead>
              <tr>
                <th className="ch-th-hora"></th>
                {dias.map(d => <th key={d} className="ch-th-dia">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {horas.map(h => (
                <tr key={h}>
                  <td className="ch-td-hora">{h}</td>
                  {dias.map(d => {
                    const s = horario[`${d}-${h}`]
                    return (
                      <td key={d} className={`ch-cell ${s ? 'ch-cell-filled' : 'ch-cell-empty'}`}>
                        {s && (
                          <div className="ch-slot" style={{ background: s.color }}>
                            <span className="ch-slot-code">{s.codigo}</span>
                            <span className="ch-slot-name">{s.nombre}</span>
                            <span className="ch-slot-meta">{s.profesor} · {s.aula}</span>
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

      </div>
    </div>
  )
}
