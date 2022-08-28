import { useContext } from 'react'
import homeContext from '../../contexts/index'

function useHomeContext() {
  return useContext(homeContext)
}

export default useHomeContext
