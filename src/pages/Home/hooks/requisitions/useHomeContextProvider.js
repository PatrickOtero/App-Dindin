import { useState } from 'react'
import useLoginContext from '../../../Login/hooks/requisitions/useLoginContext'

const useHomeContextProvider = () => {
  const [emptyTableWarning, setEmptyTableWarning] = useState('')
  const [allRegistries, setAllRegistries] = useState({})
  const [incoming, setIncoming] = useState(0)
  const [outgoing, setOutgoing] = useState(0)
  const [balance, setBalance] = useState(0)

  const [registryMessage, setRegistryMessage] = useState({})
  const [registryMessageValue, setRegistryMessageValue] = useState('')

  const [registry_id, setRegistry_id] = useState()
  const [registry_value, setRegistry_value] = useState()
  const [registry_date, setRegistry_date] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const { token } = useLoginContext()
  const [typeButton, setTypeButton] = useState('Incoming')

  const [updateList, setUpdateList] = useState('')

  const [sortsAndFilters, setSortsAndFilters] = useState('default')

  console.log(typeButton)

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
        dateDescendent,
        dateAscendent,
        weekDescendent,
        weekAscendent,
      } = await allRegistriesResponse.json()

      if (!allTransactions.length) {
        return setEmptyTableWarning('Não há nenhum registro para exibir')
      }

      setAllRegistries({
        allTransactions,
        dateDescendent,
        dateAscendent,
        weekDescendent,
        weekAscendent,
      })

      console.log(allRegistries)

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
      registry_type: typeButton,
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
        setRegistryMessage({ createError: createRegistryData.message })
        setRegistryMessageValue('createError')
        return
      }

      setRegistryMessage({ createSuccess: createRegistryData.message })
      setRegistryMessageValue('createSuccess')
      setRegistry_value(0)
      setCategory('')
      setRegistry_date('')
      setDescription('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditRegistry = async (registryId) => {
    const body = {
      registry_value,
      registry_date,
      category,
      description,
      registry_type: typeButton,
    }

    try {
      const editRegistryResponse = await fetch(
        'https://dindin-api-test.herokuapp.com/transactions/' + registryId,
        {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const editRegistryData = await editRegistryResponse.json()

      if (!editRegistryData.ok) {
        setRegistryMessage({ editError: editRegistryData.message })
        setRegistryMessageValue('editError')
        return
      }

      setRegistryMessage({ editSuccess: editRegistryData.message })
      setRegistryMessageValue('editSuccess')
      setRegistry_value(0)
      setCategory('')
      setRegistry_date('')
      setDescription('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteRegistry = async (registryId) => {
    try {
      const deleteRegistryResponse = await fetch(
        'https://dindin-api-test.herokuapp.com/transactions/' + registryId,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const deleteRegistryData = await deleteRegistryResponse.json()

      if (!deleteRegistryData.ok) {
        setRegistryMessage({ deleteError: deleteRegistryData.message })
        setRegistryMessageValue('deleteError')
        return
      }

      setUpdateList('delete')
      setRegistryMessage({ deleteSuccess: deleteRegistryData.message })
      setRegistryMessageValue('deleteSuccess')
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
    setRegistryMessage,
    registryMessage,
    registryMessageValue,
    setRegistryMessageValue,
    registry_id,
    setRegistry_id,
    registry_value,
    setRegistry_value,
    registry_date,
    setRegistry_date,
    category,
    setCategory,
    description,
    setDescription,
    typeButton,
    setTypeButton,
    handleEditRegistry,
    handleDeleteRegistry,
    updateList,
    sortsAndFilters,
    setSortsAndFilters,
  }
}

export default useHomeContextProvider
