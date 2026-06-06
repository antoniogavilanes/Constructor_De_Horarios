import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './shared.css'

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <nav className="mock-navbar">
      <span className="mock-navbar-title">Constructor de Horarios</span>
      <button
        className="mock-btn mock-btn-outline"
        onClick={() => navigate('/mockups/login')}
      >
        <LogOut size={15} />
        Cerrar Sesión
      </button>
    </nav>
  )
}
