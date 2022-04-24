import { useContext } from 'react'
import loginContext from '../../contexts/index'

function useLoginContext() {
  return useContext(loginContext)
}

export default useLoginContext
