import { useState, useEffect } from "react";
import './Css/main-containers.css';
import './Css/header.css';
import './Css/filters.css';
import './Css/table.css';
import './Css/resume.css';
import './Css/modal.css';
import logo from "./assets/logo.svg";
import caneta from "./assets/caneta1.svg";
import filtroIcone from "./assets/filtro.svg";
import filtroMais from "./assets/filtro-mais.svg";
import lixeira from "./assets/lixeira.svg";
import setaCima from "./assets/setaCima.svg";
import setaBaixo from "./assets/setaBaixo.svg";
import xis from "./assets/xis.svg"

function Chip ({texto, onClick, classe}) {
  return (
    <div className={"container-chip " + classe}>
      <button onClick={onClick}>{texto}</button>
      <div className="chip-mais">
        <img className="icon-filter" src={filtroMais} alt="Cadê o mais?"></img>
      </div>
    </div>
  );
}

function Campo ({nome, relacao, rotulo, tipoCampo, valorReferencia, onChange}) {
  return (
  <div className="campo">
    <label htmlFor={relacao}>{rotulo}</label>
    <input name={nome} value={valorReferencia} id={relacao} type={tipoCampo} onChange={onChange}></input>
  </div>
  );
}

function ItensTabela ({classe, conteudo, classeAdicional, onClick, ident}) {
  return (
  <span onClick={onClick} className={classe + " " + classeAdicional} id={ident}>{conteudo}</span>
  );
}

function Main() {
  const [dadosTransacao, setdadosTransacao] = useState([]);
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [emEdicao, setEmEdicao] = useState(false);
  const [transacaoEdicao, setTransacaoEdicao] = useState();
  const [modalLinha, setModalLinha] = useState(false);
  const [modalAtivo, setModalAtivo] = useState();
  const [modalFiltros, setModalFiltros] = useState(false);
  const [registroAberto, setRegistroAberto] = useState(false);
  const [botaoEntrada, setBotaoEntrada] = useState(false);
  const [botaoSaida, setBotaoSaida] = useState(true);
  const [erroModal, setErroModal] = useState(false);
  const [filtro, setFiltro] = useState("tudo");
  const [setaData, setSetaData] = useState(true);
  const [setaSemana, setSetaSemana] = useState(true);
  const [setaValor, setSetaValor] = useState(true);
  const [dataOrdem, setDataOrdem] = useState(false);
  const [diaOrdem, setDiaOrdem] = useState(false);
  const [valorOrdem, setValorOrdem] = useState(false);
  const [chipsSemana, setChipsSemana] = useState([]);
  const [chipsCategoria, setChipsCategoria] = useState([]);
  const [chipsSemanaNoFiltro, setChipSemanaNoFiltro] = useState([])
  const [chipsCategoriaNoFiltro, setChipCategoriaNoFiltro] = useState([])
  const [valorMin, setValorMin] = useState();
  const [valorMax, setValorMax] = useState();
  const [valorMinNoFiltro, setValorMinNoFiltro] = useState();
  const [valorMaxNoFiltro, setValorMaxNoFiltro] = useState();

  let entradas = 0;
  let saidas = 0;
  let saldo = 0;

  const carregarTransacoes = async () => {
    try {
      const dados = await (await fetch("/transactions", {method: "GET"})).json();
      setdadosTransacao(dados);

    } catch (error) {
      console.log({mensagem: error});
    }
  }

  useEffect(() => {
    setFiltro("tudo");
    setSetaData(false);
    setSetaSemana(false);
    setSetaValor(false);
    async function load() {
      await carregarTransacoes();
    }
     load()
  },[])

  useEffect(() => {
    async function load() {
      await carregarTransacoes();
    }
     load()
  }, [filtro]);

  const cadastrarTransacoes = async () => {
    if (!data || !descricao || !valor || !categoria) {
      setErroModal(true) 
      return;
    }

    const diasDaSemana = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
    const date1 = new Date(data + "T00:00:00");
    const diaSemana = date1.getDay();

    const body = {
      date: data,
      week_day: diasDaSemana[diaSemana],
      description: descricao.toLowerCase(),
      value: valor,
      category: categoria.toLowerCase(),
      type: botaoSaida ? "debit" : "credit"
    }
    try {
    await fetch("/transactions", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)});

    await carregarTransacoes();
    } catch (error) {
      console.log({mensagem: error});
    }
    setData("");
    setDescricao("");
    setValor("");
    setCategoria("");
    setErroModal(false);
  }

  const editarTransacao = async (transId) => {
    if (!data || !descricao || !valor || !categoria) {
      setErroModal(true) 
      return;
    }

    const diasDaSemana = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
    const date1 = new Date(data + "T00:00:00");
    const diaSemana = date1.getDay();

    const body = {
      date: data,
      week_day: diasDaSemana[diaSemana],
      description: descricao.toLowerCase(),
      value: valor,
      category: categoria.toLowerCase(),
      type: botaoSaida ? "debit" : "credit"
    }

    try {
      await fetch("/transactions/" + transId, { method: "PUT", headers: { "Content-Type": "application/json"}, body: JSON.stringify(body)});

      await carregarTransacoes()
    } catch (error) {
      console.log({mensagem: error})
    }
  }

  const deletarTransacao = async (transId) => {
    try {
      await fetch("/transactions/" + transId, { method: "DELETE"});

      carregarTransacoes()
    } catch (error) {
      console.log({mensagem: error})
    }
  }

  const lista = (transacao) => {

    const diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    const date = new Date(transacao.date + "T00:00:00");
    const dia = date.getDate();
    const mes = date.getMonth() +1;
    const ano = date.getFullYear();
    const diaSemana = date.getDay();

    entradas += transacao.type === "credit" && Number(transacao.value);
    saidas += transacao.type === "debit" && Number(transacao.value);
    saldo = entradas - saidas;
    
  return (
    <div key={transacao.id} className="table-line">
      <ItensTabela classe="line-items" conteudo={dia + "/" + mes + "/" + ano} classeAdicional="line-date"/>
      <ItensTabela classe="line-items" classeAdicional="line-week-day" conteudo={diasDaSemana[diaSemana]}/>
      <ItensTabela classe="line-items" classeAdicional="line-description" conteudo={transacao.description.slice(0, 1).toUpperCase() + transacao.description.slice(1).toLowerCase()}/>
      <ItensTabela classe="line-items" classeAdicional="line-category" conteudo={transacao.category.slice(0, 1).toUpperCase() + transacao.category.slice(1).toLowerCase()}/>
      <ItensTabela classe={"line-items"} classeAdicional={transacao.type === "debit" ? "line-value orange-value" : "line-value purple-value"} conteudo={"R$ " + Number(transacao.value).toFixed(2)}/>
      <span className="line-items icones"><img className="edit-icon" src={caneta} alt="Editar" onClick={() => {
        setEmEdicao(true);
        setRegistroAberto(true);
        setTransacaoEdicao(transacao.id);
        setValor(transacao.value);
        setCategoria(transacao.category);
        setData(transacao.date);
        setDescricao(transacao.description);
      }}/><img className="delete-icon" src={lixeira} alt="Excluir" onClick={() => {
        setModalLinha(true)
        setModalAtivo(transacao.id);
      }}/></span>
      {modalLinha && modalAtivo === transacao.id && 
      <div className={"container-confirm-delete"}>
          <span>Apagar item?</span>
          <div className="btns-modal-linha">
            <span className="btn-actions-confirm-delete sim" onClick={() => deletarTransacao(transacao.id)}>Sim</span>
            <span className="btn-actions-confirm-delete nao" onClick={() => setModalLinha(false)}>Não</span>
          </div>
      </div>}
    </div>
  )
  } 

  const filtros = {
    tudo: () => dadosTransacao.map(lista),
    crescenteData: () => dadosTransacao.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date))).map(lista),
    decrescenteData: () => dadosTransacao.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date))).map(lista),
    crescenteDia: () => dadosTransacao.sort((a, b) => {
      if (a.week_day.toLowerCase() > b.week_day.toLowerCase()) {
        return 1;
      }
      if (a.week_day.toLowerCase() < b.week_day.toLowerCase()) {
        return -1;
      }
        return 0;
    }).map(lista),
    decrescenteDia: () => dadosTransacao.sort((a, b) => {
      if (a.week_day.toLowerCase() < b.week_day.toLowerCase()) {
        return 1;
      }
      if (a.week_day.toLowerCase() > b.week_day.toLowerCase()) {
        return -1;
      }
        return 0;
    }).map(lista),
    crescenteValor: () => dadosTransacao.sort((a, b) => Number(a.value) - Number(b.value)).map(lista),
    decrescenteValor: () => dadosTransacao.sort((a, b) => Number(b.value) - Number(a.value)).map(lista),
    chipsFiltros: () => {
      const filtroDiaSemana = (transacoes) => transacoes.filter(transacao => chipsSemanaNoFiltro.some(chip => chip === transacao.week_day.toLowerCase()))
      const filtroCategoria = (transacoes) => transacoes.filter(transacao => chipsCategoriaNoFiltro.some(chip => chip === transacao.category.toLowerCase()))
      const filtroValorMin = (transacoes) => transacoes.filter(transacao => Number(transacao.value) >= valorMinNoFiltro)
      const filtroValorMax = (transacoes) => transacoes.filter(transacao => Number(transacao.value) <= valorMaxNoFiltro)
      const filtroValores = (transacoes) => transacoes.filter(transacao => Number(transacao.value) >= valorMinNoFiltro && Number(transacao.value) <= valorMaxNoFiltro);

      let transacoesFiltradas = [...dadosTransacao];

      if (chipsSemanaNoFiltro.length > 0) {
        transacoesFiltradas = filtroDiaSemana(transacoesFiltradas)
      }

      if (chipsCategoriaNoFiltro.length > 0) {
        transacoesFiltradas = filtroCategoria(transacoesFiltradas)
      }

      if (valorMinNoFiltro) {
        transacoesFiltradas = filtroValorMin(transacoesFiltradas)
      }
      
      if (valorMaxNoFiltro) {
        transacoesFiltradas = filtroValorMax(transacoesFiltradas)
      }

      if (valorMaxNoFiltro && valorMinNoFiltro) {
        transacoesFiltradas = filtroValores(transacoesFiltradas)
      }
      return transacoesFiltradas.map(lista)
    }
  }
  
  return (
<div className="App">
     <div className="container-header">
       <img src={logo} alt="Cadê o logo desse web app?"></img>
     </div>

  <div className="container-main">
    <button onClick={() => setModalFiltros(!modalFiltros)}className="open-filters-button"><img src={filtroIcone} alt="Onde está a imagem do filtro?"/>Filtrar</button>

    { modalFiltros && <div className="container-filters">
      <div className="dias-da-semana-filtro">
        <span className="titulo-filtros">Dias da semana</span>
        <div className="filtros-semana">
          <Chip classe={chipsSemana.some(chip => chip === "segunda") ? "chip-ativo" : ""}onClick={() => {
            if (chipsSemana.indexOf("segunda") !== -1) {
              setChipsSemana(chipsSemana.filter(chip => chip !== "segunda"));
            } else {
              setChipsSemana([...chipsSemana, "segunda"])
            }
        }}texto="Segunda"/>
          <Chip classe={chipsSemana.some(chip => chip === "terça") ? "chip-ativo" : ""}onClick={() => {
            if (chipsSemana.indexOf("terça") !== -1) {
              setChipsSemana(chipsSemana.filter(chip => chip !== "terça"));
            } else {
              setChipsSemana([...chipsSemana, "terça"])
            }
        }}texto="Terça"/>
          <Chip classe={chipsSemana.some(chip => chip === "quarta") ? "chip-ativo" : ""}onClick={() => {
            if (chipsSemana.indexOf("quarta") !== -1) {
              setChipsSemana(chipsSemana.filter(chip => chip !== "quarta"));
            } else {
              setChipsSemana([...chipsSemana, "quarta"])
            }
        }}texto="Quarta"/>
          <Chip classe={chipsSemana.some(chip => chip === "quinta") ? "chip-ativo" : ""}onClick={() => {
            if (chipsSemana.indexOf("quinta") !== -1) {
              setChipsSemana(chipsSemana.filter(chip => chip !== "quinta"));
            } else {
              setChipsSemana([...chipsSemana, "quinta"])
            }
        }}texto="Quinta"/>
          <Chip classe={chipsSemana.some(chip => chip === "sexta") ? "chip-ativo" : ""}onClick={() => {
            if (chipsSemana.indexOf("sexta") !== -1) {
              setChipsSemana(chipsSemana.filter(chip => chip !== "sexta"));
            } else {
              setChipsSemana([...chipsSemana, "sexta"])
            }
        }}texto="Sexta"/>
          <Chip classe={chipsSemana.some(chip => chip === "sábado") ? "chip-ativo" : ""}onClick={() => {
            if (chipsSemana.indexOf("sábado") !== -1) {
              setChipsSemana(chipsSemana.filter(chip => chip !== "sábado"));
            } else {
              setChipsSemana([...chipsSemana, "sábado"])
            }
        }}texto="Sábado"/>
          <Chip classe={chipsSemana.some(chip => chip === "domingo") ? "chip-ativo" : ""}onClick={() => {
            if (chipsSemana.indexOf("domingo") !== -1) {
              setChipsSemana(chipsSemana.filter(chip => chip !== "domingo"));
            } else {
              setChipsSemana([...chipsSemana, "domingo"])
            }
        }}texto="Domingo"/>
        </div>
      </div>
      <div className="categorias-filtro">
        <span className="titulo-filtros">Categorias</span>
        <div className="filtros-categoria">
        <Chip classe={chipsCategoria.some(chip => chip === "compras") ? "chip-ativo" : ""}onClick={() => {
            if (chipsCategoria.indexOf("compras") !== -1) {
              setChipsCategoria(chipsCategoria.filter(chip => chip !== "compras"));
            } else {
              setChipsCategoria([...chipsCategoria, "compras"])
            }
        }}texto="Compras"/>
          <Chip classe={chipsCategoria.some(chip => chip === "lazer") ? "chip-ativo" : ""}onClick={() => {
            if (chipsCategoria.indexOf("lazer") !== -1) {
              setChipsCategoria(chipsCategoria.filter(chip => chip !== "lazer"));
            } else {
              setChipsCategoria([...chipsCategoria, "lazer"])
            }
        }}texto="Lazer"/>
          <Chip classe={chipsCategoria.some(chip => chip === "Contas") ? "chip-ativo" : ""}onClick={() => {
            if (chipsCategoria.indexOf("Contas") !== -1) {
              setChipsCategoria(chipsCategoria.filter(chip => chip !== "Contas"));
            } else {
              setChipsCategoria([...chipsCategoria, "Contas"])
            }
        }}texto="Contas"/>
          <Chip classe={chipsCategoria.some(chip => chip === "alimentação") ? "chip-ativo" : ""}onClick={() => {
            if (chipsCategoria.indexOf("alimentação") !== -1) {
              setChipsCategoria(chipsCategoria.filter(chip => chip !== "alimentação"));
            } else {
              setChipsCategoria([...chipsCategoria, "alimentação"])
            }
        }}texto="Alimentação"/>
          <Chip classe={chipsCategoria.some(chip => chip === "depósito") ? "chip-ativo" : ""}onClick={() => {
            if (chipsCategoria.indexOf("depósito") !== -1) {
              setChipsCategoria(chipsCategoria.filter(chip => chip !== "depósito"));
            } else {
              setChipsCategoria([...chipsCategoria, "depósito"])
            }
        }}texto="Depósito"/>
          <Chip classe={chipsCategoria.some(chip => chip === "ted") ? "chip-ativo" : ""}onClick={() => {
            if (chipsCategoria.indexOf("ted") !== -1) {
              setChipsCategoria(chipsCategoria.filter(chip => chip !== "ted"));
            } else {
              setChipsCategoria([...chipsCategoria, "ted"])
            }
        }}texto="TED"/>
          <Chip classe={chipsCategoria.some(chip => chip === "pix") ? "chip-ativo" : ""}onClick={() => {
            if (chipsCategoria.indexOf("pix") !== -1) {
              setChipsCategoria(chipsCategoria.filter(chip => chip !== "pix"));
            } else {
              setChipsCategoria([...chipsCategoria, "pix"])
            }
        }}texto="PIX"/>
        </div>
      </div>
      <div className="valor-filtro">
        <div className="campos-filtros">
          <span>Valor</span>
          <label htmlFor="min-value">Min</label>
          <input value={valorMin}type="number" id="min-value" onChange={(e) => setValorMin(e.target.value)
          }></input>
          <label htmlFor="max-value">Max</label>
          <input value={valorMax}type="number" id="max-value" onChange={(e) => setValorMax(e.target.value)
          }></input>
        </div>

        <div className="botoes-filtros">
          <span className="btn-clear-filters" onClick={() => {
            setChipsSemana([]);
            setChipsCategoria([]);
            setValorMax("");
            setValorMin("");
            setFiltro("tudo")
          }}>Limpar filtros</span>
          <span className="btn-apply-filters" onClick={() => {
            setChipSemanaNoFiltro(chipsSemana);
            setChipCategoriaNoFiltro(chipsCategoria);
            setValorMinNoFiltro(valorMin)
            setValorMaxNoFiltro(valorMax)
            setFiltro(chipsSemana.length === 0 && chipsCategoria.length === 0 && !valorMin && !valorMax ? "tudo" : "chipsFiltros");
        }}>Aplicar filtros</span>
        </div>
      </div>
    </div> }

    <main>
       <div className="table">
          <div className="table-head">
            <ItensTabela onClick={() => {
              setSetaData(true)
              setDataOrdem(!dataOrdem)
              setSetaSemana(false)
              setSetaValor(false)
              setFiltro(dataOrdem ? "crescenteData" : "decrescenteData");
              }} classe="column-title" conteudo="Data" ident="date"/>
            {setaData && <img className="setaCima" src={dataOrdem ? setaBaixo : setaCima} alt="Cadê a setinha"/>}

            <ItensTabela onClick={() => {
              setSetaSemana(true)
              setDiaOrdem(!diaOrdem)
              setSetaData(false)
              setSetaValor(false)
              setFiltro(diaOrdem ? "crescenteDia" : "decrescenteDia");
            }} classe="column-title" conteudo="Dia da semana" ident="week-day"/>
            {setaSemana && <img className="setaCima seta-semana" src={diaOrdem ? setaBaixo : setaCima} alt="Cadê a setinha"/>}

            <ItensTabela classe="column-title" conteudo="Descriçao" classeAdicional="head-description"/>
            <ItensTabela classe="column-title" conteudo="Categoria"/>

            <ItensTabela onClick={() => {
              setSetaValor(true)
              setValorOrdem(!valorOrdem)
              setSetaData(false)
              setSetaSemana(false)
              setFiltro(valorOrdem ? "crescenteValor" : "decrescenteValor");
            }}classe="column-title" conteudo="Valor" ident="value"/>
            {setaValor && <img className="setaCima seta-valor" src={valorOrdem ? setaBaixo : setaCima} alt="Cadê a setinha"/>}
          </div>
          <div className="table-body">
          {filtros[filtro]()}
        </div>
      </div>

      <div className="resumo">
        <div className="container-resume">
          <div className="valores-resumo">
            <h1>Resumo</h1>
            <div className="entradas-resumo">
              <span>Entradas</span>
              <span className="in">{entradas}</span>
            </div>
            <div className="saidas-resumo">
              <span>Saídas</span>
              <span className="out">{saidas}</span>
            </div>
          </div>
          <div className="balanco-resumo">
            <span>Saldo</span>
            <span className="balance">{saldo}</span>
          </div>
        </div>
        <button onClick={() => {
          setRegistroAberto(true)
          setBotaoSaida(true)
          setBotaoEntrada(false);
          }}className="btn-add">Adicionar Registro</button>
      </div>
    </main>

    { registroAberto && <div className="backdrop">
      <div className="modal-container">
        <div className="titulo-e-X-registro">
        <h1>{emEdicao ? "Editar registro" : "Adicionar Registro"}</h1>
        <img onClick={() => {
          setRegistroAberto(false)
          setErroModal(false);
          setEmEdicao(false);
          }} src={xis} alt="Cadê o 'x' ?" className="close-icon"></img>
        </div>
        <div className="btns-add-modal">
          <button onClick={() => {
            setBotaoEntrada(true)
            setBotaoSaida(false)
            }}className={botaoEntrada ? "credit-focus" : ""}id={botaoEntrada ? "" : "credit-button"}>Entrada</button>
          <button onClick={() => {
            setBotaoSaida(true)
            setBotaoEntrada(false)
            }}className={botaoSaida ? "debit-focus" : ""} id={botaoSaida ? "" : "debit-button"}>Saída</button>
        </div>
        <div className="campos">
          {erroModal && <span className="erroModal">Todos os campos precisam ser preenchidos!</span>}
          <Campo nome="value" relacao="valor" rotulo="Valor" tipoCampo="number" valorReferencia={valor} onChange={(e) => setValor(e.target.value)}/>
          <Campo nome="category" relacao="categoria" rotulo="Categoria" tipoCampo="text" valorReferencia={categoria} onChange={(e) => setCategoria(e.target.value)}/>
          <Campo nome="date" relacao="data" rotulo="Data" tipoCampo="text" valorReferencia={data} onChange={(e) => setData(e.target.value)}/>
          <Campo nome="description" relacao="descricao2" rotulo="Descrição" tipoCampo="text" valorReferencia={descricao} onChange={(e) => setDescricao(e.target.value)}/>
        </div>
        {!emEdicao && <button className="btn-insert" onClick={() => {
          cadastrarTransacoes();
        }}>Confirmar</button>}
        {emEdicao && <button className="btn-insert" onClick={() => {
          editarTransacao(transacaoEdicao);
        }}>Confirmar</button>}
      </div>
     </div> }
   </div>
  </div>
  );
}

export default Main; 
 