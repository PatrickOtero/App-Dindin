import './styles/styles.css'
import setaCima from '../../assets/setaCima.svg'
import setaBaixo from '../../assets/setaBaixo.svg'
import edit_icon from '../../assets/caneta1.svg'
import delete_icon from '../../assets/lixeira.svg'
import { useState } from 'react'

function RegistryTable() {
  const [dateOrdenation, setDateOrdenation] = useState(0)
  const [weekDaysOrdenation, setWeekDaysOrdenation] = useState(0)

  const handleDateOrder = () => {
    setDateOrdenation(dateOrdenation + 1)

    if (dateOrdenation === 2) setDateOrdenation(0)

    console.log(dateOrdenation)
  }

  const handleWeekDaysOrder = () => {
    setWeekDaysOrdenation(weekDaysOrdenation + 1)

    if (weekDaysOrdenation === 2) setWeekDaysOrdenation(0)

    console.log(weekDaysOrdenation)
  }

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
            <tr>
              <td className="data-row">02/04/2022</td>
              <td className="week-row">Domingo</td>
              <td className="desc-row">Compras para Lazer</td>
              <td>Lazer</td>
              <td className="value-row">R$ 234,00</td>
              <div className="table-row-icons">
                <img src={edit_icon} alt="caneta"></img>
                <img src={delete_icon} alt="lixeira"></img>
              </div>
            </tr>
          </div>
        </tbody>
      </table>
    </div>
  )
}

export default RegistryTable
