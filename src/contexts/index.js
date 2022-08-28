import { createContext } from 'react'
import useUserContextProvider from '../hooks/useUserContextProvider'

const userContext = createContext({})

export function UserContextProvider(props) {
  const userContextProvider = useUserContextProvider()
  return (
    <userContext.Provider value={userContextProvider}>
      {props.children}
    </userContext.Provider>
  )
}

export default userContext
