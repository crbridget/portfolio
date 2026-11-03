import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './styles/base.css'
import './styles/layout.css'
import './styles/landing.css'
import './styles/profile.css'
import './styles/projects.css'
import './styles/modal.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
