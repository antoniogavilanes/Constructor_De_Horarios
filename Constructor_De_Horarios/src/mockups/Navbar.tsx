import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import './shared.css'

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <nav className="mock-navbar">
      <button className="mock-navbar-brand" onClick={() => navigate('/mockups/vista-principal')}>
        <img src={logo} alt="Logo UNEAT" className="mock-navbar-logo" />
        <span className="mock-navbar-title">Universidad Europea del Atlántico</span>
      </button>
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
