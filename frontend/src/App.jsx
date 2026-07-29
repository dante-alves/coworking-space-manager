import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RotaProtegida } from '@/components/layout/RotaProtegida'
import { LayoutPrincipal } from '@/components/layout/LayoutPrincipal'

import TelaHome from './pages/TelaHome'
import TelaLogin from './pages/TelaLogin'
import TelaCadastro from './pages/TelaCadastro'
import TelaSalas from './pages/TelaSalas'
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
                <div className="p-8">Minhas Reservas (em breve)</div>
              </RotaProtegida>
            }
          />

          <Route
            path="/perfil"
            element={
              <RotaProtegida>
                <div className="p-8">Perfil (em breve)</div>
              </RotaProtegida>
            }
          />

        </Route>
      </Routes>
    </BrowserRouter>
  )
   
}

export default App
