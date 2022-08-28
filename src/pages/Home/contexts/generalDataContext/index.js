import { createContext } from 'react'
import useDataContextProvider from '../../hooks/general/useDataContextProvider'

const dataContext = createContext({})

export function DataContextProvider(props) {
  const dataContextProvider = useDataContextProvider()
  return (
    <dataContext.Provider value={dataContextProvider}>
      {props.children}
    </dataContext.Provider>
  )
}

export default dataContext
