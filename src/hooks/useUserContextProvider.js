import { useState } from 'react'
import { api, apiAuth } from '../services/axios'

const useUserContextProvider = () => {
  const [registerMessages, setRegisterMessages] = useState("")
  const [profileMessages, setProfileMessages] = useState("")
  const [user_name, setUser_name] = useState("")
  const [user_email, setUser_email] = useState('')
  const [user_password, setUser_password] = useState('')
  const [user_confirm_password, setUser_confirm_password] = useState("");

  const [profileModal, setProfileModal] = useState(false);

  const [ userEdited, setUserEdited ] = useState(false);

  const handleUserRegistration = async () => {
    setRegisterMessages('')

    if (user_password !== user_confirm_password) {
        setRegisterMessages("Senhas não estão iguais")
        return
    }

    const body = {
        user_name,
        user_email,
        user_password,
    }

    try {
      await api.post(
        '/user/registration', body).then(finalResponse => {
          
            setRegisterMessages(finalResponse.data.message)

            setUser_name("")
            setUser_email("")
            setUser_password("")
            setUser_confirm_password("")
        })

    } catch (error) {
      setRegisterMessages(error.response.data.message)
      const errorInterval = setInterval(() => {
        setRegisterMessages('')
        clearInterval(errorInterval)
      }, 2000)
    }
  }

  const handleEditUser = async (changeName) => {
    setProfileMessages("")

    if (user_password !== user_confirm_password) {
        setProfileMessages("Senhas não estão iguais")
        return
    }

    const body = {
        user_name,
        user_email,
        user_password,
    }

    try {
      await apiAuth.put(
        '/users/edit', body).then(finalResponse => {
          
            setProfileMessages(finalResponse.data.message)

            setUser_name("")
            setUser_email("")
            setUser_password("")
            setUser_confirm_password("")

            changeName(user_name);
        })

    } catch (error) {
      setProfileMessages(error.response.data.message)
      const errorInterval = setInterval(() => {
        setProfileMessages('')
        clearInterval(errorInterval)
      }, 2000)
    }
  }

  return {
    handleUserRegistration,
    handleEditUser,
    setRegisterMessages,
    setProfileMessages,
    registerMessages,
    profileMessages,
    user_name,
    user_email,
    user_password,
    user_confirm_password,
    setUser_name,
    setUser_email,
    setUser_password,
    setUser_confirm_password,
    profileModal,
    setProfileModal,
    setUserEdited,
    userEdited
  }
}

export default useUserContextProvider
