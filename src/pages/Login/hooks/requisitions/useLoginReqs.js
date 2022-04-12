import { useState } from 'react'
import { useLocalStorage } from 'react-use'
const useLoginReqs = () => {
  const [token, setToken, removeToken] = useLocalStorage('Token', '')
  const [loginError, setLoginError] = useState({})
  const [userName, setUserName, removeUserName] = useLocalStorage('User', '')
  const [user_email, setUser_email] = useState('')
  const [user_password, setUser_password] = useState('')

  const handleUserLogin = async () => {
    const body = {
      user_email,
      user_password,
    }
    try {
      const loginResponse = await fetch(
        'https://dindin-api-test.herokuapp.com/user/login',
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body),
        },
      )
      const loginData = await loginResponse.json()

      if (!loginResponse.ok) {
        setLoginError(loginData)
        const errorInterval = setInterval(() => {
          setLoginError('')
          clearInterval(errorInterval)
        }, 2000)
        return
      }
      setUserName(loginData.userData.user_name)
      setToken(loginData.token)
    } catch (error) {
      console.log(error)
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
    userName,
    removeToken,
    removeUserName,
    setLoginError,
  }
}

export default useLoginReqs
