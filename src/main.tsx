import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
if (import.meta.env.VITE_ENABLE_AXE === 'true') {
  // @ts-expect-error - module CJS sans typage officiel
  import('../scripts/setup-axe.cjs').then((module) => {
    const initAxe = (module as { default?: () => void }).default ?? (module as () => void);
    if (typeof initAxe === 'function') {
      initAxe();
    }
  });
}


const root = createRoot(document.getElementById('root')!)
root.render(<React.StrictMode><App /></React.StrictMode>)


