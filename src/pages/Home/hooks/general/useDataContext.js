import { useContext } from 'react'
import dataContext from '../../contexts/generalDataContext/index'

function useDataContext() {
  return useContext(dataContext)
}

export default useDataContext