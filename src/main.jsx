import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.jsx'
import { applyTheme } from './utils/applyTheme'
import { applySiteMeta } from './utils/applySiteMeta'

// Apply theme colors and site meta before the first render
applyTheme()
applySiteMeta()

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)