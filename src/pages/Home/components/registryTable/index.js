import { useEffect, useState } from 'react'

import setaBaixo from '../../assets/setaBaixo.svg'
import setaCima from '../../assets/setaCima.svg'
import useHomeContext from '../../hooks/requisitions/useHomeContext'
import RegistryModal from '../modals/registryModal'
import './styles/styles.css'
import useList from './tableList'

function RegistryTable() {
  const [dateOrdenation, setDateOrdenation] = useState(0)
  const [weekDaysOrdenation, setWeekDaysOrdenation] = useState(0)
  const [toggle, setToggle] = useState(false)

  const {
    handleListAllRegistries,
    allRegistries,
    emptyTableWarning,
    registryMessage,
    registryMessageValue,
    setRegistryMessageValue,
    sortsAndFilters,
    setSortsAndFilters,
  } = useHomeContext()

  const { allRegistriesList } = useList({ toggle, setToggle })

  console.log(sortsAndFilters)
  console.log(dateOrdenation)

  const handleDateOrder = () => {
    setDateOrdenation(dateOrdenation + 1)
    if (dateOrdenation === 2) setDateOrdenation(0)
  }

  const handleWeekDaysOrder = () => {
    setWeekDaysOrdenation(weekDaysOrdenation + 1)
    if (weekDaysOrdenation === 2) setWeekDaysOrdenation(0)
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
            allRegistries.allTransactions &&
            allRegistriesList[sortsAndFilters]()}
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
