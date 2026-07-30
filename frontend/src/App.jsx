import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RotaProtegida } from '@/components/layout/RotaProtegida'
import { LayoutPrincipal } from '@/components/layout/LayoutPrincipal'

import TelaHome from './pages/TelaHome'
import TelaLogin from './pages/TelaLogin'
import TelaCadastro from './pages/TelaCadastro'
import TelaSalas from './pages/TelaSalas'
import TelaPerfil from './pages/TelaPerfil'
import TelaMinhasReservas from './pages/TelaMinhasReservas'
import TelaAdminLayout from './pages/admin/TelaAdminLayout'
import TelaAdminSalas from './pages/admin/TelaAdminSalas'
import TelaAdminReservas from './pages/admin/TelaAdminReservas'
import TelaAdminClientes from './pages/admin/TelaAdminClientes'
import { RotaAdmin } from '@/components/layout/RotaAdmin'
import { Navigate } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPrincipal />}>
          <Route path="/" element={<TelaHome />} />
          <Route path="/login" element={<TelaLogin />} />
          <Route path='/cadastro' element={<TelaCadastro />} />

          <Route path="/salas" 
            element={
              <RotaProtegida>
                <TelaSalas />
              </RotaProtegida>
            } 
          />

          <Route
            path="/minhas-reservas"
            element={
              <RotaProtegida>
                <TelaMinhasReservas />
              </RotaProtegida>
            }
          />

          <Route
            path="/perfil"
            element={
              <RotaProtegida>
                <TelaPerfil />
              </RotaProtegida>
            }
          />

          <Route
            path="/admin"
            element={
              <RotaAdmin>
                <TelaAdminLayout />
              </RotaAdmin>
            }
          >
            <Route index element={<Navigate to="salas" replace />} />
            <Route path="salas" element={<TelaAdminSalas />} />
            <Route path="reservas" element={<TelaAdminReservas />} />
            <Route path="clientes" element={<TelaAdminClientes />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
   
}

export default App
