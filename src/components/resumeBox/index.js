import './styles/styles.css'

function ResumeBox() {
  return (
    <div className="Resume">
      <div className="resume-container">
        <b>Resumo</b>
        <div className="resume-values">
          <div className="resume-value">
            <b>Entradas</b>
            <b className="resume-incoming-numbers">R$ 232,00</b>
          </div>
          <div className="resume-value">
            <b>Saídas</b>
            <b className="resume-outgoing-numbers">R$ 123,00</b>
          </div>
        </div>
        <div className="resume-value balance">
          <b>Saldo</b>
          <b className="resume-balance-numbers">R$ 109,00</b>
        </div>
      </div>
      <button type="button">Adicionar Registro</button>
    </div>
  )
}

export default ResumeBox
