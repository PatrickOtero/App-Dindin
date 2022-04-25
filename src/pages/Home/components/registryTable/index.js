import { useEffect, useState } from 'react'
import useLogicHelpers from '../../hooks/helpers/useLogicHelpers'
import edit_icon from '../../assets/caneta1.svg'
import delete_icon from '../../assets/lixeira.svg'
import setaBaixo from '../../assets/setaBaixo.svg'
import setaCima from '../../assets/setaCima.svg'
import useHomeContext from '../../hooks/requisitions/useHomeContext'
import RegistryModal from '../modals/registryModal'
import './styles/styles.css'

function RegistryTable() {
  const [dateOrdenation, setDateOrdenation] = useState(0)
  const [weekDaysOrdenation, setWeekDaysOrdenation] = useState(0)
  const [toggle, setToggle] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [sortsAndFilters, setSortsAndFilters] = useState('allTransactions')

  const {
    handleListAllRegistries,
    allRegistries,
    emptyTableWarning,
    setRegistry_id,
    setRegistry_value,
    setCategory,
    setRegistry_date,
    setDescription,
    setTypeButton,
    registryMessage,
    registryMessageValue,
    registry_id,
    handleDeleteRegistry,
    setRegistryMessageValue,
  } = useHomeContext()

  console.log(sortsAndFilters)
  console.log(dateOrdenation)

  const { getOnlyNumber, dateToJavascriptFormat } = useLogicHelpers()

  const handleDateOrder = () => {
    setDateOrdenation(dateOrdenation + 1)
    if (dateOrdenation === 2) setDateOrdenation(0)

    // if (dateOrdenation === 0) setSortsAndFilters('allTransactions')
    // if (dateOrdenation === 1) setSortsAndFilters('dateDescendent')
    // if (dateOrdenation === 2) setSortsAndFilters('dateAscendent')
    // if (dateOrdenation === 2) setDateOrdenation(0)
  }

  const handleWeekDaysOrder = () => {
    setWeekDaysOrdenation(weekDaysOrdenation + 1)
    if (weekDaysOrdenation === 2) setWeekDaysOrdenation(0)
    // if (weekDaysOrdenation === 0) setSortsAndFilters('allTransactions')
    // if (weekDaysOrdenation === 1) setSortsAndFilters('weekDescendent')
    // if (weekDaysOrdenation === 2) setSortsAndFilters('weekAscendent')
    // if (weekDaysOrdenation === 2) setWeekDaysOrdenation(0)
  }

  useEffect(() => {
    if (dateOrdenation === 0) setSortsAndFilters('allTransactions')
    if (dateOrdenation === 1) setSortsAndFilters('dateDescendent')
    if (dateOrdenation === 2) setSortsAndFilters('dateAscendent')
  }, [dateOrdenation])

  useEffect(() => {
    if (weekDaysOrdenation === 0) setSortsAndFilters('allTransactions')
    if (weekDaysOrdenation === 1) setSortsAndFilters('weekDescendent')
    if (weekDaysOrdenation === 2) setSortsAndFilters('weekAscendent')
  }, [weekDaysOrdenation])

  useEffect(() => {
    const handleLoadAllRegistriesList = async () => {
      await handleListAllRegistries()
    }
    handleLoadAllRegistriesList()
  }, [registryMessageValue, dateOrdenation, weekDaysOrdenation])

  useEffect(() => {
    setRegistryMessageValue('')
  }, [])

  return (
    <div className="Registries">
      {(registryMessageValue === 'deleteError' ||
        registryMessageValue === 'deleteSuccess') && (
        <h2 className="table-info-message">
          {registryMessage[registryMessageValue]}
        </h2>
      )}
      <div className="table-container">
        <div className="table-head">
          <div className="table-headers">
            <div className="table-head-date-arrow">
              <b
                onClick={() => handleDateOrder()}
                className="table-header date"
              >
                Data
              </b>
              {dateOrdenation === 1 && (
                <img src={setaBaixo} alt="decrescente" />
              )}
              {dateOrdenation === 2 && <img src={setaCima} alt="crescente" />}
            </div>
            <div className="table-head-desc-arrow">
              <b onClick={() => handleWeekDaysOrder()} className="table-header">
                Dia da Semana
              </b>
              {weekDaysOrdenation === 1 && (
                <img src={setaBaixo} alt="decrescente" />
              )}
              {weekDaysOrdenation === 2 && (
                <img src={setaCima} alt="crescente" />
              )}
            </div>
            <b className="table-header desc">Descrição</b>
            <b className="table-header">Categoria</b>
            <b className="table-header">Valor</b>
            <b className="table-header empty"></b>
          </div>
        </div>
        <div className="table-body">
          {!emptyTableWarning &&
            allRegistries[sortsAndFilters] &&
            allRegistries[sortsAndFilters].map((registry) => {
              return (
                <div key={registry.id} className="table-lines">
                  <b className="table-line date">{registry.registry_date}</b>
                  <b className="table-line">{registry.week_day}</b>
                  <b className="table-line desc">{registry.description}</b>
                  <b className="table-line">{registry.category}</b>
                  <b className={`table-value-line-${registry.registry_type}`}>
                    {registry.registry_value}
                  </b>
                  <div className="table-line-icons">
                    <img
                      onClick={() => {
                        setRegistry_id(registry.id)
                        setRegistry_value(
                          getOnlyNumber(registry.registry_value),
                        )
                        setCategory(registry.category)
                        setRegistry_date(
                          dateToJavascriptFormat(registry.registry_date),
                        )
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
            })}
          {emptyTableWarning && (
            <h3 className="empty-table-warning">{emptyTableWarning}</h3>
          )}
        </div>
      </div>
      {toggle && <RegistryModal modalType="Edit" setToggle={setToggle} />}
    </div>
  )
}

export default RegistryTable
