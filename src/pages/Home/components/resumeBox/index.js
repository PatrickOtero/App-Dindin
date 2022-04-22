import { useEffect, useState } from 'react'
import useTableReqs from '../../hooks/requisitions/useTableReqs'
import RegistryModal from '../modals/registryModal'
import './styles/styles.css'

function ResumeBox() {
  const {
    handleListAllRegistries,
    incoming,
    outgoing,
    balance,
    createRegistrySuccess,
    editRegistrySuccess,
    setRegistry_value,
    setCategory,
    setRegistry_date,
    setDescription,
  } = useTableReqs()

  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const handleLoadAllRegistriesList = async () => {
      await handleListAllRegistries()
    }
    handleLoadAllRegistriesList()
  }, [createRegistrySuccess, editRegistrySuccess])

  return (
    <div className="Resume">
      <div className="resume-container">
        <b>Resumo</b>
        <div className="resume-values">
          <div className="resume-value">
            <b>Entradas</b>
            <b className="resume-incoming-numbers">{incoming}</b>
          </div>
          <div className="resume-value">
            <b>Saídas</b>
            <b className="resume-outgoing-numbers">{outgoing}</b>
          </div>
        </div>
        <div className="resume-value balance">
          <b>Saldo</b>
          <b className="resume-balance-numbers">{balance}</b>
        </div>
      </div>
      <button
        className="resume-button"
        onClick={() => {
          setRegistry_value('')
          setCategory('')
          setRegistry_date('')
          setDescription('')
          setToggle(true)
        }}
        type="button"
      >
        Adicionar Registro
      </button>
      {toggle && <RegistryModal modalType="Add" setToggle={setToggle} />}
    </div>
  )
}

export default ResumeBox
