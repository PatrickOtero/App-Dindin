import { createContext } from 'react'
import useLoginContextProvider from '../hooks/requisitions/useLoginContextProvider'

const loginContext = createContext({})

export function LoginContextProvider(props) {
  const loginContextProvider = useLoginContextProvider()
  return (
    <loginContext.Provider value={loginContextProvider}>
      {props.children}
    </loginContext.Provider>
  )
}

export default loginContext
