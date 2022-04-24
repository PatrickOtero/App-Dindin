import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './app.css'
import Home from './pages/Home'
import { HomeContextProvider } from './pages/Home/contexts'
import LoginPage from './pages/Login'
import { LoginContextProvider } from './pages/Login/contexts'

const App = () => {
  return (
    <div className="App">
      <Router>
        <LoginContextProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
          <HomeContextProvider>
            <Routes>
              <Route path="/Home/:userName" element={<Home />} />
            </Routes>
          </HomeContextProvider>
        </LoginContextProvider>
      </Router>
    </div>
  )
}

export default App
