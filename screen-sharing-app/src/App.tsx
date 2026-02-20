import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import ScreenTest from './Pages/ScreenTest'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/screen-test" element={<ScreenTest />} />
    </Routes>
  )
}

export default App
