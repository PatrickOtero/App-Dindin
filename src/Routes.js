import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './app.css'
import Home from './pages/Home'
import { HomeContextProvider } from './pages/Home/contexts'
import { DataContextProvider } from './pages/Home/contexts/generalDataContext'
import LoginPage from './pages/Login'
import { LoginContextProvider } from './pages/Login/contexts'
import RegistrationPage from './pages/Registration'
import { UserContextProvider } from './contexts'

const App = () => {
  return (
    <div className="App">
      <Router>
        <LoginContextProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>         
          <HomeContextProvider>
            <DataContextProvider>
              <UserContextProvider>
                <Routes>
                  <Route path='/register' element={<RegistrationPage />} />
                  <Route path="/Home/:userName" element={<Home />} />
                </Routes>
              </UserContextProvider>
            </DataContextProvider>
          </HomeContextProvider>
        </LoginContextProvider>
      </Router>
    </div>
  )
}

export default App
