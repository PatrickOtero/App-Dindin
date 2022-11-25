import './styles.css'
import passEye from '../../../../assets/passEye.svg'
import slashedPassEye from '../../../../assets/slashedPassEye.svg'
import closeButton from "../../assets/xis.svg"
import { useState } from 'react'
import useUserContext from '../../../../hooks/useUserContext'
import useLoginContext from '../../../../pages/Login/hooks/requisitions/useLoginContext'

const ProfileModal = () => {

    const [seePass, setSeePass] = useState("password")

  const {
    handleEditUser,
    setProfileMessages,
    profileMessages,
    setUser_name,
    user_name,
    setUser_email,
    user_email,
    setUser_password,
    user_password,
    setUser_confirm_password,
    user_confirm_password,
    setProfileModal,
  } = useUserContext()

  const { setUserName } = useLoginContext()

  return (
    <div className="ProfileModal">
        {profileMessages && (
          <div className="profileErrors">
            <h1>{profileMessages}</h1>
          </div>
        )}
        <form>
            <div className='top-profile-modal'>   
                <h1>
                    Edite suas informações
                </h1>
                <img onClick={() => {
                    setProfileMessages("");
                    setProfileModal(false)
                    }} src={closeButton} alt="sair"/>
            </div>
          <div className="profile-inputs">
          <label htmlFor="userName">Nome</label>
            <input
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
              id="userName"
              type="text"
            />

            <label htmlFor="userEmail">E-mail</label>
            <input
              value={user_email}
              onChange={(e) => setUser_email(e.target.value)}
              id="userEmail"
              type="email"
            />
              <label htmlFor="userPassword">Senha</label>
              <input
                value={user_password}
                onChange={(e) => setUser_password(e.target.value)}
                id="userPassword"
                type={seePass}
              />
              <label htmlFor="userConfirmPassword">Confirmação de senha</label>
              <input
                value={user_confirm_password}
                onChange={(e) => setUser_confirm_password(e.target.value)}
                id="userConfirmPassword"
                type={seePass}
              />
              <img
                onClick={() =>
                  setSeePass(seePass === 'password' ? 'text' : 'password')
                }
                src={seePass === 'password' ? slashedPassEye : passEye}
                alt="Ver/Não ver"
              />
          </div>
          <div className="profile-button">
            <button
              onClick={() => {
                handleEditUser(setUserName)
              }}
              type="button"
            >
              Confirmar
            </button>
          </div>
        </form>
    </div>
  )
}

export default ProfileModal
