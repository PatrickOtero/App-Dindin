import { useEffect, useState } from 'react'
import edit_icon from '../../assets/caneta1.svg'
import delete_icon from '../../assets/lixeira.svg'
import setaBaixo from '../../assets/setaBaixo.svg'
import setaCima from '../../assets/setaCima.svg'
import useTableReqs from '../../hooks/requisitions/useTableReqs'
import './styles/styles.css'

function RegistryTable() {
  const [dateOrdenation, setDateOrdenation] = useState(0)
  const [weekDaysOrdenation, setWeekDaysOrdenation] = useState(0)
  const {
    handleListAllRegistries,
    allRegistries,
    emptyTableWarning,
  } = useTableReqs()

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
      <table>
        <thead>
          <tr>
            <div className="table-head-date">
              <th className="data-head" onClick={() => handleDateOrder()}>
                Data
              </th>
              {dateOrdenation === 1 && <img src={setaCima} alt="seta" />}
              {dateOrdenation === 2 && <img src={setaBaixo} alt="seta" />}
            </div>
            <div className="table-head-weekdays">
              <th className="week-head" onClick={() => handleWeekDaysOrder()}>
                Dia da semana
              </th>
              {weekDaysOrdenation === 1 && <img src={setaCima} alt="seta" />}
              {weekDaysOrdenation === 2 && <img src={setaBaixo} alt="seta" />}
            </div>
            <th className="desc-head">Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <div className="table-body">
            {allRegistries.length &&
              allRegistries.map((registry) => {
                return (
                  <tr>
                    <td className="data-row">{registry.registry_date}</td>
                    <td className="week-row">{registry.week_day}</td>
                    <td className="desc-row">{registry.description}</td>
                    <td>{registry.category}</td>
                    <td className="value-row">{registry.registry_value}</td>
                    <div className="table-row-icons">
                      <img src={edit_icon} alt="caneta"></img>
                      <img src={delete_icon} alt="lixeira"></img>
                    </div>
                  </tr>
                )
              })}
            {!allRegistries.length && <h1>{emptyTableWarning}</h1>}
          </div>
        </tbody>
      </table>
    </div>
  )
}

export default RegistryTable
