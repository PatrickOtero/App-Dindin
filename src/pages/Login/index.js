import Header from '../../components/header'
import useLoginContext from './hooks/requisitions/useLoginContext'
import './styles.css'
import passEye from '../../assets/passEye.svg'
import slashedPassEye from '../../assets/slashedPassEye.svg'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [seePass, setSeePass] = useState('password')
  const {
    handleUserLogin,
    loginError,
    token,
    user_email,
    user_password,
    setUser_email,
    setUser_password,
    userName,
    removeToken,
    removeUserName,
    setLoginError,
  } = useLoginContext()

  const navigate = useNavigate()

  function handleAuthentication() {
    if (token === 'jwt expired') {
      removeToken()
      removeUserName()
      return
    }

    if (!token) return navigate('/')

    navigate('/Home/' + userName)
  }

  useEffect(() => {
    setLoginError('')
  }, [])

  useEffect(() => {
    handleAuthentication()
  }, [token, userName])

  return (
    <div className="LoginPage">
      <header>
        <Header headerType="HeaderLoginScreen" />
      </header>
      <main>
        {loginError && (
          <div className="loginErrors">
            <h1>{loginError}</h1>
          </div>
        )}
        <form>
          <h1>
            Bem vindo ao app Dindin. Por favor, faça login com a sua conta
          </h1>
          <div className="login-inputs">
            <label htmlFor="userEmail">E-mail</label>
            <input
              value={user_email}
              onChange={(e) => setUser_email(e.target.value)}
              id="userEmail"
              type="email"
            />
            <div className="login-pass-input">
              <label htmlFor="userPassword">Senha</label>
              <input
                value={user_password}
                onChange={(e) => setUser_password(e.target.value)}
                id="userPassword"
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
          <div className="login-button">
            <button
              onClick={() => {
                handleUserLogin()
              }}
              type="button"
            >
              Entrar
            </button>
          </div>
        </form>

        <section>
          <b> Precisa criar uma conta?</b>
          <button onClick={() => navigate("/register")}type="button">Registre-se</button>
        </section>
      </main>
    </div>
  )
}

export default LoginPage
