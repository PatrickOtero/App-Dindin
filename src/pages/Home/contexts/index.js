import { createContext } from 'react'
import useHomeContextProvider from '../hooks/requisitions/useHomeContextProvider'

const homeContext = createContext({})

export function HomeContextProvider(props) {
  const homeContextProvider = useHomeContextProvider()
  return (
    <homeContext.Provider value={homeContextProvider}>
      {props.children}
    </homeContext.Provider>
  )
}

export default homeContext
