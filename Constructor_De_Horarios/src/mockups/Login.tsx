import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import './shared.css'
import './Login.css'

export default function Login() {
  const navigate  = useNavigate()
  const [usuario, setUsuario]   = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (usuario === 'antonio' && password === '1234') {
      setError(false)
      navigate('/mockups/vista-principal')
    } else {
      setError(true)
    }
  }

  return (
    <div className="login-layout">

      {/* Panel izquierdo — Branding */}
      <div className="login-left">
        <div className="login-brand">
          <img src={logo} alt="Universidad Europea del Atlántico" className="login-logo" />
          <p className="login-university">Universidad Europea del Atlántico</p>
          <h1 className="login-system">Constructor de Horarios</h1>
          <p className="login-subtitle">Sistema de gestión de horarios académicos</p>
        </div>
      </div>

      {/* Panel derecho — Formulario */}
      <div className="login-right">
        <div className="login-form-box">
          <div className="login-form-header">
            <h2 className="login-form-title">Iniciar Sesión</h2>
            <p className="login-form-subtitle">Accede con tus credenciales</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="mock-field">
              <label className="mock-label">Usuario</label>
              <input
                className={`mock-input ${error ? 'input-error' : ''}`}
                type="text"
                placeholder="Ingrese su usuario"
                value={usuario}
                onChange={e => { setUsuario(e.target.value); setError(false) }}
              />
            </div>

            <div className="mock-field">
              <label className="mock-label">Contraseña</label>
              <div className="mock-input-wrap">
                <input
                  className={`mock-input ${error ? 'input-error' : ''}`}
                  type={showPass ? 'text' : 'password'}
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(false) }}
                />
                <span className="mock-input-icon" onClick={() => setShowPass(p => !p)}>
                  {showPass ? '🙈' : '👁'}
                </span>
              </div>
            </div>

            <button className="mock-btn mock-btn-blue" type="submit">
              Iniciar Sesión
            </button>

            {error && <p className="mock-error">Usuario o contraseña incorrectos</p>}
          </form>
        </div>
      </div>

    </div>
  )
}
