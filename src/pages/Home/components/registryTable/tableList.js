import { useState } from 'react'
import './styles/styles.css'
import edit_icon from '../../assets/caneta1.svg'
import delete_icon from '../../assets/lixeira.svg'
import useLogicHelpers from '../../hooks/helpers/useLogicHelpers'
import useHomeContext from '../../hooks/requisitions/useHomeContext'
import useDataContext from '../../hooks/general/useDataContext'

const useList = ({ setToggle }) => {
  const [deleteModal, setDeleteModal] = useState(false)

  const {
    setRegistry_id,
    setRegistry_value,
    setCategory,
    setRegistry_date,
    setDescription,
    setTypeButton,
    registry_id,
    handleDeleteRegistry,
    setRegistryMessageValue,
    allRegistries,
  } = useHomeContext()

  const {
    allTransactions,
    dateDescendent,
    dateAscendent,
    weekDescendent,
    weekAscendent,
  } = allRegistries

  const { weekDaysList, categoriesList, minValue, maxValue } = useDataContext()

  const { getOnlyNumber, dateToJavascriptFormat } = useLogicHelpers()

  const tableList = (registry) => {
    return (
      <div key={registry.id} className="table-lines">
        <b className="table-line date">{registry.registry_date}</b>
        <b className="table-line">{registry.week_day}</b>
        <b className="table-line desc">{registry.description}</b>
        <b className="table-line">{registry.category}</b>
        <b className={`table-value-line-${registry.registry_type}`}>
          {`R$ ${registry.registry_value},00`}
        </b>
        <div className="table-line-icons">
          <img
            onClick={() => {
              setRegistry_id(registry.id)
              setRegistry_value(registry.registry_value)
              setCategory(registry.category)
              setRegistry_date(dateToJavascriptFormat(registry.registry_date))
              setDescription(registry.description)
              setTypeButton(registry.registry_type)

              setToggle(true)
            }}
            src={edit_icon}
            alt="editar"
          />
          <div className="delete-modal-zone">
            <img
              onClick={() => {
                setRegistry_id(registry.id)
                setDeleteModal(true)
              }}
              src={delete_icon}
              alt="deletar"
            />
            {registry_id === registry.id && deleteModal && (
              <div className="table-line-delete-modal">
                <b>Apagar item?</b>
                <div className="table-line-delete-buttons">
                  <button
                    className="delete-button1"
                    onClick={() => setDeleteModal(false)}
                  >
                    Não
                  </button>
                  <button
                    className="delete-button2"
                    onClick={() => {
                      setRegistryMessageValue('')
                      handleDeleteRegistry(registry.id)
                      setDeleteModal(false)
                    }}
                  >
                    Sim
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const allRegistriesList = {
    allTransactions: () => allTransactions.map(tableList),
    dateDescendent: () => dateDescendent.map(tableList),
    dateAscendent: () => dateAscendent.map(tableList),
    weekDescendent: () => weekDescendent.map(tableList),
    weekAscendent: () => weekAscendent.map(tableList),
    filters: () => {
      const weekDayFilter = (registries) =>
        registries.filter((registry) =>
          weekDaysList.some((chip) => chip === registry.week_day),
        )
      const categoryFilter = (registries) =>
        registries.filter((registry) =>
          categoriesList.some((chip) => chip === registry.category),
        )

        const minMaxValueFilter = (registries) => registries.filter((registry) => registry.registry_value >= minValue && registry.registry_value <= maxValue
        )

      let filteredRegistries = [...allTransactions]

      if (weekDaysList.length > 0) {
        filteredRegistries = weekDayFilter(filteredRegistries)
      }

      if (categoriesList.length > 0) {
        filteredRegistries = categoryFilter(filteredRegistries)
      }

      if (minValue > 0 || maxValue > 0) {
        filteredRegistries = minMaxValueFilter(filteredRegistries);
      }

      return filteredRegistries.map(tableList)
    },
  }

  return { allRegistriesList }
}

export default useList
