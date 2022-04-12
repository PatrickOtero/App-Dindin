import { useState } from 'react'
import filter_icon from '../../assets/filtro.svg'
import useData from '../../hooks/general/useData'
import './styles/styles.css'

function FiltersContainer() {
  const [filterModal, setFilterModal] = useState(false)
  const { weekDayCards, categoryCards } = useData()

  return (
    <div className="Filters">
      <div
        onClick={() => setFilterModal(!filterModal)}
        className="show-filters-button-container"
      >
        <img src={filter_icon} alt="ícone de filtro" />
        <span>Filtrar</span>
      </div>
      {filterModal && (
        <div className="filters-container">
          <div className="filter-type-main-container">
            <b>Dia da semana</b>
            <div className="filter-type-container">
              {weekDayCards.length &&
                weekDayCards.map((weekDay) => {
                  return (
                    <div className="filter-card">
                      <span>{weekDay}</span>
                      <span>+</span>
                    </div>
                  )
                })}
              {!weekDayCards.length && (
                <h3>Erro: Deveriam aparecer cards de filtro aqui</h3>
              )}
            </div>
          </div>
          <div className="filter-type-main-container">
            <b>Categoria</b>
            <div className="filter-type-container">
              {categoryCards.length &&
                categoryCards.map((category) => {
                  return (
                    <div className="filter-card">
                      <span>{category}</span>
                      <span>+</span>
                    </div>
                  )
                })}
              {!categoryCards.length && (
                <h3>Erro: Deveriam aparecer cards de filtro aqui</h3>
              )}
            </div>
          </div>
          <div className="filter-type-main-container">
            <b>Valor</b>
            <div className="filter-type-container">
              <div className="filter-value-inputs">
                <label htmlFor="min-value">Min</label>
                <input type="number" name="min-value" />
                <label htmlFor="max-value">Max</label>
                <input type="number" name="max-value" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FiltersContainer
