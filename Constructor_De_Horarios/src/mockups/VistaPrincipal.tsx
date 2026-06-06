import { BookOpen, Users, GraduationCap, Building2, Layers, CalendarDays, Eye, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import './shared.css'
import './VistaPrincipal.css'

const sections = [
  {
    title: 'Gestión de Entidades',
    modules: [
      { icon: BookOpen,      label: 'Asignaturas',  desc: 'Catálogo de asignaturas',        path: '/mockups/abrir-asignaturas'      },
      { icon: Users,         label: 'Profesores',   desc: 'Equipo docente',                  path: '/mockups/abrir-profesores'       },
      { icon: GraduationCap, label: 'Grados',       desc: 'Planes de estudio',               path: '/mockups/abrir-grados'           },
      { icon: Building2,     label: 'Aulas',        desc: 'Espacios físicos',                path: '/mockups/abrir-aulas'            },
    ],
  },
  {
    title: 'Planificación',
    modules: [
      { icon: Layers,       label: 'Asignaciones',      desc: 'Asigna profesores y aulas',      path: '/mockups/gestionar-asignaciones' },
      { icon: CalendarDays, label: 'Generar Horario',   desc: 'Construye la matriz horaria',     path: '/mockups/generar-horario'        },
      { icon: Eye,          label: 'Consultar Horario', desc: 'Visualiza el horario publicado',  path: '/mockups/consultar-horario'      },
    ],
  },
]

export default function VistaPrincipal() {
  const navigate = useNavigate()

  return (
    <div className="mock-page">
      <Navbar />

      <div className="vp-content">
        <div className="vp-header">
          <h1 className="vp-title">Panel de Control</h1>
          <p className="vp-subtitle">Selecciona un módulo para comenzar</p>
        </div>

        {sections.map(section => (
          <div key={section.title} className="vp-section">
            <h2 className="vp-section-title">{section.title}</h2>
            <div className="vp-grid">
              {section.modules.map(m => {
                const Icon = m.icon
                return (
                  <button
                    key={m.label}
                    className="vp-card"
                    onClick={() => navigate(m.path)}
                  >
                    <div className="vp-card-icon">
                      <Icon size={26} strokeWidth={1.5} />
                    </div>
                    <div className="vp-card-body">
                      <span className="vp-card-label">{m.label}</span>
                      <span className="vp-card-desc">{m.desc}</span>
                    </div>
                    <ArrowRight size={16} className="vp-card-arrow" />
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
