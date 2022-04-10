import './styles/styles.css'
import filter_icon from '../../assets/filtro.svg'

function FiltersContainer() {
  return (
    <div className="Filters">
      <div className="show-filters-button-container">
        <img src={filter_icon} alt="ícone de filtro" />
        <span>Filtrar</span>
      </div>
      <div className="filters-container">
        <div className="filter-type-main-container">
          <b>Dia da semana</b>
          <div className="filter-type-container">
            <div className="filter-card">
              <span>Domingo</span>
              <span>+</span>
            </div>
            <div className="filter-card">
              <span>Segunda</span>
              <span>+</span>
            </div>
            <div className="filter-card">
              <span>Terça</span>
              <span>+</span>
            </div>
            <div className="filter-card">
              <span>Quarta</span>
              <span>+</span>
            </div>
            <div className="filter-card">
              <span>Quinta</span>
              <span>+</span>
            </div>
            <div className="filter-card">
              <span>Sexta</span>
              <span>+</span>
            </div>
            <div className="filter-card">
              <span>Sábado</span>
              <span>+</span>
            </div>
          </div>
        </div>
        <div className="filter-type-main-container">
          <b>Categoria</b>
          <div className="filter-type-container">
            <div className="filter-card">
              <span>Contas</span>
              <span>+</span>
            </div>
            <div className="filter-card">
              <span>Depósito</span>
              <span>+</span>
            </div>
            <div className="filter-card">
              <span>Lazer</span>
              <span>+</span>
            </div>
            <div className="filter-card">
              <span>TED</span>
              <span>+</span>
            </div>
            <div className="filter-card">
              <span>Compras</span>
              <span>+</span>
            </div>
            <div className="filter-card">
              <span>Pix</span>
              <span>+</span>
            </div>
            <div className="filter-card">
              <span>Alimetação</span>
              <span>+</span>
            </div>
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
    </div>
  )
}

export default FiltersContainer
