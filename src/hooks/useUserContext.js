import { useContext } from 'react'
import userContext from '../contexts/index'

function useUserContext() {
  return useContext(userContext)
}

export default useUserContext
