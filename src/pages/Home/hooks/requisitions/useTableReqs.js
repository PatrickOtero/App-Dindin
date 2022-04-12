import { useState } from 'react'
import useLoginReqs from '../../../Login/hooks/requisitions/useLoginReqs'

const useTableReqs = () => {
  const [emptyTableWarning, setEmptyTableWarning] = useState('')
  const [allRegistries, setAllRegistries] = useState([])
  const [incoming, setIncoming] = useState(0)
  const [outgoing, setOutgoing] = useState(0)
  const [balance, setBalance] = useState(0)
  const { token } = useLoginReqs()

  const handleListAllRegistries = async () => {
    try {
      const allRegistriesResponse = await fetch(
        'https://dindin-api-test.herokuapp.com/transactions',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )
      const {
        allTransactions,
        totalIncoming,
        totalOutgoing,
        balance,
      } = await allRegistriesResponse.json()

      if (!allTransactions.length) {
        return setEmptyTableWarning('Não há nenhum registro para exibir')
      }

      setAllRegistries(allTransactions)
      setIncoming(totalIncoming)
      setOutgoing(totalOutgoing)
      setBalance(balance)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    handleListAllRegistries,
    allRegistries,
    emptyTableWarning,
    incoming,
    outgoing,
    balance,
  }
}

export default useTableReqs
