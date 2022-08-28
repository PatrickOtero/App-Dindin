import { useState } from 'react'
import { useLocalStorage } from 'react-use'
import { api } from '../../../../services/axios'

const useLoginContextProvider = () => {
  const [token, setToken, removeToken] = useLocalStorage('Token', '')
  const [loginError, setLoginError] = useState()
  const [userName, setUserName, removeUserName] = useLocalStorage('User', '')
  const [user_email, setUser_email] = useState('')
  const [user_password, setUser_password] = useState('')

  const handleUserLogin = async () => {
    const body = {
      user_email,
      user_password,
    }

    try {
      await api.post(
        '/user/login', body).then(finalResponse => {
          
          setUserName(finalResponse.data.userData.user_name)
          setToken(finalResponse.data.token)
        })

    } catch (error) {
      setLoginError(error.response.data.message)
      const errorInterval = setInterval(() => {
        setLoginError('')
        clearInterval(errorInterval)
      }, 2000)
      console.log(error.response.data.message)
    }
  }

  return {
    handleUserLogin,
    token,
    loginError,
    user_email,
    user_password,
    setUser_email,
    setUser_password,
    setUserName,
    userName,
    removeToken,
    removeUserName,
    setLoginError,
  }
}

export default useLoginContextProvider
