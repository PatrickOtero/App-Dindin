import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dindin_logo from '../../assets/logo.svg'
import useLoginReqs from '../../pages/Login/hooks/requisitions/useLoginReqs'
import arrow_icon from './assets/icone-seta.svg'
import './styles/styles.css'

function Header({ headerType }) {
  const [profileModal, setProfileModal] = useState(false)
  const { userName, removeToken, removeUserName } = useLoginReqs()

  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    removeUserName()

    navigate('/')
  }
  return (
    <div className={`${headerType}`}>
      <img src={dindin_logo} alt="Logo" />
      {headerType === 'Header' && (
        <div className="header-profile-container">
          <h1>{`Bem vindo, ${userName}`}</h1>
          <img
            onClick={() => setProfileModal(!profileModal)}
            src={arrow_icon}
            alt="seta"
          />
          {profileModal && (
            <div className="header-profile-modal-container">
              <button onClick={() => handleLogout()} type="button">
                Sair
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Header
