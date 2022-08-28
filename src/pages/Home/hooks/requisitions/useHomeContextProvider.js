import { useState } from 'react'
import { apiAuth } from '../../../../services/axios'

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

  const [typeButton, setTypeButton] = useState('Incoming')

  const [updateList, setUpdateList] = useState('')

  const [sortsAndFilters, setSortsAndFilters] = useState('allTransactions')

  const handleListAllRegistries = async () => {
    setEmptyTableWarning("");

    try {
      await apiAuth.get(
        '/transactions').then(finalResponse => {
          const {
            allTransactions,
            totalIncoming,
            totalOutgoing,
            balance,
            dateDescendent,
            dateAscendent,
            weekDescendent,
            weekAscendent,
          } = finalResponse.data;

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

          setIncoming(totalIncoming)
          setOutgoing(totalOutgoing)
          setBalance(balance)
        })

    } catch (error) {
      console.log(error)
    }
  }

  const handleAddRegistry = async () => {

    const body = {
      registry_value,
      registry_date,
      category,
      description,
      registry_type: typeButton,
    }

    try {
      await apiAuth.post(
        '/transactions', body).then(finalResponse => {
          setRegistryMessage({ createSuccess: finalResponse.data.message })
          setRegistryMessageValue('createSuccess')
          setRegistry_value(0)
          setCategory('')
          setRegistry_date('')
          setDescription('')
        })
    } catch (error) {
      setRegistryMessage({ createError: error.response.data.message })
      setRegistryMessageValue('createError')
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
      await apiAuth.put(
        '/transactions/' + registryId, body).then(finalResponse => {

          setRegistryMessage({ editSuccess: finalResponse.data.message })
          setRegistryMessageValue('editSuccess')
          setRegistry_value(0)
          setCategory('')
          setRegistry_date('')
          setDescription('')
        })

    } catch (error) {
      setRegistryMessage({ editError: error.response.data.message })
      setRegistryMessageValue('editError')
    }
  }

  const handleDeleteRegistry = async (registryId) => {
    try {
      await apiAuth.delete(
        '/transactions/' + registryId).then(finalResponse => {

          setUpdateList('delete')
          setRegistryMessage({ deleteSuccess: finalResponse.data.message })
          setRegistryMessageValue('deleteSuccess')
        })

    } catch (error) {
      setRegistryMessage({ deleteError: error.response.data.message })
      setRegistryMessageValue('deleteError')
    }
  }

  return {
    handleListAllRegistries,
    allRegistries,
    setAllRegistries,
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
