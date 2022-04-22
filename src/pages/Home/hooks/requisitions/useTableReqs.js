import { useState } from 'react'
import useLoginReqs from '../../../Login/hooks/requisitions/useLoginReqs'

const useTableReqs = () => {
  const [emptyTableWarning, setEmptyTableWarning] = useState('')
  const [allRegistries, setAllRegistries] = useState([])
  const [incoming, setIncoming] = useState(0)
  const [outgoing, setOutgoing] = useState(0)
  const [balance, setBalance] = useState(0)

  const [createRegistryError, setCreateRegistryError] = useState({})
  const [editRegistryError, setEditRegistryError] = useState({})
  const [createRegistrySuccess, setCreateRegistrySuccess] = useState({})
  const [editRegistrySuccess, setEditRegistrySuccess] = useState({})

  const [registry_value, setRegistry_value] = useState()
  const [registry_date, setRegistry_date] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const { token } = useLoginReqs()
  const [addTypeButton, setAddTypeButton] = useState('Incoming')

  console.log(addTypeButton)

  const handleListAllRegistries = async () => {
    try {
      const allRegistriesResponse = await fetch(
        'https://dindin-api-test.herokuapp.com/transactions',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
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

  const handleAddRegistry = async () => {
    console.log(registry_date)

    const body = {
      registry_value,
      registry_date,
      category,
      description,
      registry_type: addTypeButton,
    }

    try {
      const createRegistryResponse = await fetch(
        'https://dindin-api-test.herokuapp.com/transactions',
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const createRegistryData = await createRegistryResponse.json()

      if (!createRegistryData.ok) {
        setCreateRegistryError(createRegistryData)
        return
      }

      setCreateRegistrySuccess(createRegistryData)
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
    handleAddRegistry,
    createRegistryError,
    setCreateRegistryError,
    editRegistryError,
    createRegistrySuccess,
    setCreateRegistrySuccess,
    editRegistrySuccess,
    registry_value,
    setRegistry_value,
    registry_date,
    setRegistry_date,
    category,
    setCategory,
    description,
    setDescription,
    addTypeButton,
    setAddTypeButton,
  }
}

export default useTableReqs
