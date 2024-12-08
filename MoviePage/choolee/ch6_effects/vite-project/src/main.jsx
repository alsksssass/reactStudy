import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import CleanUp from './Cleanup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
	{/* <CleanUp /> */}
  </StrictMode>,
)
