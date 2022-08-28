import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dindin_logo from '../../assets/logo.svg'
import useUserContext from '../../hooks/useUserContext'
import useLoginContext from '../../pages/Login/hooks/requisitions/useLoginContext'
import arrow_icon from './assets/icone-seta.svg'
import './styles/styles.css'

function Header({ headerType }) {
  const [arrowModal, setArrowModal] = useState(false);
  
  const { userName, removeToken, removeUserName } = useLoginContext()

  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    removeUserName()
    navigate('/')
  }

  const { setProfileModal } = useUserContext()

  return (
    <div className={`${headerType}`}>
      <img src={dindin_logo} alt="Logo" />
      {headerType === 'Header' && (
        <div className="header-profile-container">
          <h1>{`Bem vindo, ${userName}`}</h1>
          <img
            onClick={() => setArrowModal(!arrowModal)}
            src={arrow_icon}
            alt="seta"
          />
          {arrowModal && (
            <div className="header-profile-modal-container">
              <button onClick={() => {
                setProfileModal(true)
                setArrowModal(false);
                }} type="button">
                Editar perfil
              </button>
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
