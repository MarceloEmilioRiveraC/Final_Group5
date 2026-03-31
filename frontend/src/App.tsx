import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './presentation/pages/Home'
// import { CataloguePage } from '@presentation/pages/Catalogue'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/catalogue" element={<CataloguePage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App