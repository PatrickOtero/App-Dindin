import { useState } from 'react'
import filter_icon from '../../assets/filtro.svg'
import useDataContext from '../../hooks/general/useDataContext'
import useHomeContext from '../../hooks/requisitions/useHomeContext'
import './styles/styles.css'

function FiltersContainer() {
  const [filterModal, setFilterModal] = useState(false)

  const {
    weekDayCards,
    categoryCards,
    weekDaysList,
    setWeekDaysList,
    categoriesList,
    setCategoriesList,
    setMinValue,
    minValue,
    setMaxValue,
    maxValue
  } = useDataContext()

  const { setSortsAndFilters } = useHomeContext()

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
              { weekDayCards.map((weekDay) => {
                  return (
                    <div
                      className={`filter-card ${weekDaysList.some(card => card === weekDay) ? "selected" : "" }`}
                      onClick={() => {
                        if (weekDaysList.some(card => card === weekDay)) {
                          setWeekDaysList(weekDaysList.filter(card => card !== weekDay));
                        } else {
                          setWeekDaysList([...weekDaysList, weekDay])
                        }
                      }}
                      key={weekDay}
                    >
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
              { categoryCards.map((category) => {
                  return (
                    <div
                      className={`filter-card ${categoriesList.some(card => card === category) ? "selected" : "" }`}
                      onClick={() => {
                        if (categoriesList.some(card => card === category)) {
                          setCategoriesList(categoriesList.filter(card => card !== category));
                        } else {
                          setCategoriesList([...categoriesList, category])
                        }
                      }}
                      key={category}
                    >
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
                <input value={minValue} onChange={(e) => setMinValue(e.target.value)}type="number" name="min-value" />
                <label htmlFor="max-value">Max</label>
                <input value={maxValue} onChange={(e) => setMaxValue(e.target.value)}type="number" name="max-value" />
              </div>
            </div>
          </div>
          <div className="filterButtons">
            <button
              onClick={() => {
                setWeekDaysList([])
                setCategoriesList([])
                setSortsAndFilters('allTransactions')
              }}
              className="clear-button"
            >
              Limpar filtros
            </button>
            <button
              onClick={() => setSortsAndFilters('filters')}
              className="apply-button"
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FiltersContainer
