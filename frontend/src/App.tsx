import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/router'

/**
 * App Component - Root Entry Point
 * 
 * WHY RouterProvider: This wraps the entire app to enable routing.
 * Without this, the router created in router.tsx won't work and nothing
 * will be rendered to the page.
 */
function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
