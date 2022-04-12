import { useEffect } from 'react'
import useTableReqs from '../../hooks/requisitions/useTableReqs'
import './styles/styles.css'

function ResumeBox() {
  const {
    handleListAllRegistries,
    incoming,
    outgoing,
    balance,
  } = useTableReqs()

  useEffect(() => {
    const handleLoadAllRegistriesList = async () => {
      await handleListAllRegistries()
    }
    handleLoadAllRegistriesList()
  }, [])

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
      <button type="button">Adicionar Registro</button>
    </div>
  )
}

export default ResumeBox
