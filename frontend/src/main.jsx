import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LOGO_COWORKING_URL } from '@/lib/imagens'

const favicon = document.querySelector('link[rel="icon"]')
if (favicon) favicon.href = LOGO_COWORKING_URL

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
