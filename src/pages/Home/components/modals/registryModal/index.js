import useTableReqs from '../../../hooks/requisitions/useTableReqs'
import close from './assets/close.svg'
import './styles.css'

const RegistryModal = ({
  modalType,
  setToggle,
  registry_value,
  category,
  registry_date,
  description,
  setEditTypeButton,
  editTypeButton,
}) => {
  const {
    handleAddRegistry,
    createRegistryError,
    createRegistrySuccess,
    setCreateRegistryError,
    setCreateRegistrySuccess,
    setRegistry_value,
    setRegistry_date,
    setCategory,
    setDescription,
    addTypeButton,
    setAddTypeButton,
  } = useTableReqs()

  const handleCloseModal = () => {
    setToggle(false)
  }
  return (
    <div className="registry-modal-backdrop">
      <div className="registry">
        {createRegistryError.message && <h2>{createRegistryError.message}</h2>}
        {createRegistrySuccess.message && (
          <h2>{createRegistrySuccess.message}</h2>
        )}

        <form>
          <div className="title-and-closeIcon">
            {modalType === 'Add' && <h1>Adicionar Registro</h1>}
            {modalType === 'Edit' && <h1>Editar Registro</h1>}
            <img
              onClick={() => {
                setCreateRegistryError('')
                setCreateRegistrySuccess('')
                handleCloseModal()
              }}
              src={close}
              alt="fechar"
            />
          </div>
          <div className="registry-types-container">
            <button
              onClick={() => {
                if (modalType === 'Edit') {
                  setEditTypeButton('Incoming')
                  return
                }
                setAddTypeButton('Incoming')
              }}
              className={`incoming-button ${
                modalType === 'Add' ? addTypeButton : editTypeButton
              }`}
              type="button"
            >
              Entrada
            </button>
            <button
              onClick={() => {
                if (modalType === 'Edit') {
                  setEditTypeButton('Outgoing')
                  return
                }
                setAddTypeButton('Outgoing')
              }}
              className={`outgoing-button ${
                modalType === 'Add' ? addTypeButton : editTypeButton
              }`}
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
          <input
            value={category}
            id="category-input"
            type="text"
            onChange={(e) => setCategory(e.target.value)}
          />
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
                setCreateRegistryError('')
                setCreateRegistrySuccess('')
                handleAddRegistry()
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
