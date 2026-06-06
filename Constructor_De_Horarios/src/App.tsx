import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MockupsHub          from './mockups/index'
import Login               from './mockups/Login'
import VistaPrincipal      from './mockups/VistaPrincipal'
import AbrirAsignaturas    from './mockups/AbrirAsignaturas'
import AbrirProfesores     from './mockups/AbrirProfesores'
import AbrirGrados         from './mockups/AbrirGrados'
import AbrirAulas          from './mockups/AbrirAulas'
import GestionarAsignaciones from './mockups/GestionarAsignaciones'
import GenerarHorario      from './mockups/GenerarHorario'
import ConsultarHorario    from './mockups/ConsultarHorario'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                               element={<Navigate to="/mockups" replace />} />
        <Route path="/mockups"                        element={<MockupsHub />} />
        <Route path="/mockups/login"                  element={<Login />} />
        <Route path="/mockups/vista-principal"        element={<VistaPrincipal />} />
        <Route path="/mockups/abrir-asignaturas"      element={<AbrirAsignaturas />} />
        <Route path="/mockups/asignatura-formulario"  element={<AbrirAsignaturas />} />
        <Route path="/mockups/abrir-profesores"       element={<AbrirProfesores />} />
        <Route path="/mockups/profesor-formulario"    element={<AbrirProfesores />} />
        <Route path="/mockups/abrir-grados"           element={<AbrirGrados />} />
        <Route path="/mockups/grado-formulario"       element={<AbrirGrados />} />
        <Route path="/mockups/abrir-aulas"            element={<AbrirAulas />} />
        <Route path="/mockups/aula-formulario"        element={<AbrirAulas />} />
        <Route path="/mockups/gestionar-asignaciones" element={<GestionarAsignaciones />} />
        <Route path="/mockups/generar-horario"        element={<GenerarHorario />} />
        <Route path="/mockups/consultar-horario"      element={<ConsultarHorario />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
