import { useEffect, useState } from 'react'
import useFunctions from '../../../../hooks/helpers/useFunctions'
import edit_icon from '../../assets/caneta1.svg'
import delete_icon from '../../assets/lixeira.svg'
import setaBaixo from '../../assets/setaBaixo.svg'
import setaCima from '../../assets/setaCima.svg'
import useTableReqs from '../../hooks/requisitions/useTableReqs'
import RegistryModal from '../modals/registryModal'
import './styles/styles.css'

function RegistryTable() {
  const [dateOrdenation, setDateOrdenation] = useState(0)
  const [weekDaysOrdenation, setWeekDaysOrdenation] = useState(0)
  const [editRegistryModal, setEditRegistryModal] = useState(false)
  const [editTypeButton, setEditTypeButton] = useState('')
  const [toggle, setToggle] = useState(false)

  const {
    handleListAllRegistries,
    allRegistries,
    emptyTableWarning,
    setRegistry_value,
    setCategory,
    setRegistry_date,
    setDescription,
    registry_value,
    category,
    registry_date,
    description,
  } = useTableReqs()

  const { getOnlyNumber, dateToJavascriptFormat } = useFunctions()

  const handleDateOrder = () => {
    setDateOrdenation(dateOrdenation + 1)

    if (dateOrdenation === 2) setDateOrdenation(0)
  }

  const handleWeekDaysOrder = () => {
    setWeekDaysOrdenation(weekDaysOrdenation + 1)

    if (weekDaysOrdenation === 2) setWeekDaysOrdenation(0)
  }

  useEffect(() => {
    const handleLoadAllRegistriesList = async () => {
      await handleListAllRegistries()
    }
    handleLoadAllRegistriesList()
  }, [])

  return (
    <div className="Registries">
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
          {allRegistries.length &&
            allRegistries.map((registry) => {
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
                        setRegistry_value(
                          getOnlyNumber(registry.registry_value),
                        )
                        setCategory(registry.category)
                        setRegistry_date(
                          dateToJavascriptFormat(registry.registry_date),
                        )
                        setDescription(registry.description)
                        setEditTypeButton(registry.registry_type)

                        setToggle(true)
                      }}
                      src={edit_icon}
                      alt="editar"
                    />
                    <img src={delete_icon} alt="editar" />
                  </div>
                </div>
              )
            })}
          {emptyTableWarning && <h2>{emptyTableWarning.message}</h2>}
        </div>
      </div>
      {toggle && (
        <RegistryModal
          modalType="Edit"
          setToggle={setToggle}
          registry_value={registry_value}
          category={category}
          registry_date={registry_date}
          description={description}
          editTypeButton={editTypeButton}
          setEditTypeButton={setEditTypeButton}
        />
      )}
    </div>
  )
}

export default RegistryTable
