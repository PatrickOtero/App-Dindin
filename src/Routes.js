import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './app.css'
import Home from './pages/Home'
import LoginPage from './pages/Login'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Home/:userName" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
