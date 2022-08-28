import Header from '../../components/header'
import './styles.css'
import passEye from '../../assets/passEye.svg'
import slashedPassEye from '../../assets/slashedPassEye.svg'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserContext from '../../hooks/useUserContext'

const RegistrationPage = () => {
    const [seePass, setSeePass] = useState('password')

  const {
    handleUserRegistration,
    registerMessages,
    setUser_name,
    user_name,
    setUser_email,
    user_email,
    setUser_password,
    user_password,
    setUser_confirm_password,
    user_confirm_password
  } = useUserContext()

  const navigate = useNavigate()

  useEffect(() => {
    setUser_name("")
    setUser_email("")
    setUser_password("")
    setUser_confirm_password("");
  }, [])

  return (
    <div className="RegistrationPage">
      <header>
        <Header headerType="HeaderLoginScreen" />
      </header>
      <main>
        {registerMessages && (
          <div className="registerErrors">
            <h1>{registerMessages}</h1>
          </div>
        )}
        <form>
          <h1>
            Insira seus dados para registro
          </h1>
          <div className="register-inputs">
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
            <div className="register-pass-input">
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
          </div>
          <div className="register-button">
            <button
              onClick={() => {
                handleUserRegistration()
              }}
              type="button"
            >
              Registrar
            </button>
          </div>
        </form>

        <section>
          <b> Já tem uma conta?</b>
          <button onClick={() => navigate("/")} type="button">Fazer login</button>
        </section>
      </main>
    </div>
  )
}

export default RegistrationPage
