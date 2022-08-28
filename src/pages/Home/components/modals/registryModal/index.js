import useHomeContext from '../../../hooks/requisitions/useHomeContext'
import close from './assets/close.svg'
import './styles.css'

const RegistryModal = ({ modalType, setToggle }) => {
  const {
    handleAddRegistry,
    setRegistry_value,
    setRegistry_date,
    setCategory,
    setDescription,
    typeButton,
    setTypeButton,
    handleEditRegistry,
    registry_id,
    registry_value,
    category,
    registry_date,
    description,
    registryMessage,
    registryMessageValue,
    setRegistryMessageValue,
  } = useHomeContext()

  const handleCloseModal = () => {
    setToggle(false)
  }

  return (
    <div className="registry-modal-backdrop">
      <div className="registry">
        {registryMessageValue && (
          <h2>{registryMessage[registryMessageValue]}</h2>
        )}

        <form>
          <div className="title-and-closeIcon">
            {modalType === 'Add' && <h1>Adicionar Registro</h1>}
            {modalType === 'Edit' && <h1>Editar Registro</h1>}
            <img
              onClick={() => {
                setRegistryMessageValue('')
                setRegistry_value(0)
                handleCloseModal()
              }}
              src={close}
              alt="fechar"
            />
          </div>
          <div className="registry-types-container">
            <button
              onClick={() => setTypeButton('Incoming')}
              className={`incoming-button ${typeButton}`}
              type="button"
            >
              Entrada
            </button>
            <button
              onClick={() => setTypeButton('Outgoing')}
              className={`outgoing-button ${typeButton}`}
              type="button"
            >
              Saída
            </button>
          </div>
          <label htmlFor="value-input">Valor</label>
          <input
            value={registry_value}
            id="value-input"
            type="number"
            onChange={(e) => setRegistry_value(e.target.value)}
          />
          <label htmlFor="category-input">Categoria</label>
          <select
            value={category}
            id="category-input"
            type="text"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            <option value="Pix">Pix</option>
            <option value="TED">TED</option>
            <option value="Depósito">Depósito</option>
            <option value="Compras">Compras</option>
            <option value="Lazer">Lazer</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Contas">Contas</option>
            </select>
          <label htmlFor="date-input">Data</label>
          <input
            value={registry_date}
            id="date-input"
            type="date"
            onChange={(e) => setRegistry_date(e.target.value)}
          />
          <label htmlFor="description-input">Descrição</label>
          <input
            value={description}
            id="description-input"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="registry-modal-bottom-button">
            <button
              onClick={() => {
                setRegistryMessageValue('')
                if (modalType === 'Add') handleAddRegistry()
                if (modalType === 'Edit') handleEditRegistry(registry_id)
              }}
              type="button"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistryModal
