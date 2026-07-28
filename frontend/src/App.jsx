import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import TelaLogin from './pages/TelaLogin'
import TelaCadastro from './pages/TelaCadastro'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<TelaLogin />} />
        <Route path='/cadastro' element={<TelaCadastro />} />
        <Route path="/salas" element={<div className="p-8">Salas (em breve)</div>} />
      </Routes>
    </BrowserRouter>
  )
   
}

export default App
