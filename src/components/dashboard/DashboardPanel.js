import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModalAtt } from "./DashboardModals.js";
import { currentDate } from "./DashboardData.js";
import {
  Userdata,
  HanddleConsultWalletSpentProfitSubmit,
} from "../../services/api.js";
import Graph from "./DashboardChart";

function Panel() {
  const [spent, setSpent] = useState("");
  const [wallet, setWallet] = useState("");
  const [profit, setProfit] = useState("");
  const [limit, setLimit] = useState("");
  const [spentList, setSpentList] = useState([]);
  const [profitList, setProfitList] = useState([]);
  const [loadState, setLoadState] = useState(false);
  const [modalAttShow, setModalAttShow] = useState(false);

  const [spentDataView, setSpentDataView] = useState("spent-list-ok");
  const [profitDataView, setProfitDataView] = useState("profit-list-ok");

  const paymantMethod = [
    "Dinheiro",
    "PIX",
    "Débito",
    "Crédito",
    "Boleto",
    "Cheque",
  ];
  const paymantType = [
    "Contas",
    "Saúde",
    "Alimentação",
    "Lazer",
    "Emergência",
    "Bens",
  ];

  useEffect(() => {
    if (loadState === true) {
      setWallet("0");
      setSpent("0");
      setLimit("0");
      setProfit("0");
      HanddleConsultWalletSpentProfitVal();

      return setLoadState(false);
    }
  }, [loadState]);

  async function HanddleConsultWalletSpentProfitVal() {
    let userdata = Userdata();

    let res = await HanddleConsultWalletSpentProfitSubmit({
      id_usuario: userdata.id,
      mes: currentDate()[2],
      ano: currentDate()[3],
    });

    if (typeof res[0] === "object" && typeof res[0] !== "undefined") {
      setWallet(res[0].saldo);
      setSpent(res[0].gastos);
      setLimit(res[0].saldo - res[0].lucros + res[0].gastos);
      setProfit(res[0].lucros);
    } else {
      setWallet(0);
      setSpent(0);
      setLimit(0);
      setProfit(0);
    }

    if (typeof res[1] === "object" && typeof res[1] !== "undefined") {
      let spents = Object.keys(res[1]).length;
      if (spents === 0) {
        setSpentDataView("spent-list-none");
        setSpentList([]);
      } else if (spents > 0) {
        setSpentDataView("spent-list-ok");
        if (spents < 3) {
          setSpentList(res[1]);
        } else {
          let recents = [];
          for (let x = 0; x < 2; x++) {
            recents.push(Object(res[1])[x]);
          }
          setSpentList(recents);
        }
      }
    } else {
      setSpentDataView("spent-list-error");
      setSpentList([]);
    }

    if (typeof res[2] === "object" && typeof res[2] !== "undefined") {
      let profit = Object.keys(res[2]).length;
      if (profit === 0) {
        setProfitDataView("profit-list-none");
        setProfitList([]);
      } else if (profit > 0) {
        setProfitDataView("profit-list-ok");
        if (profit < 3) {
          setProfitList(res[2]);
        } else {
          let recents = [];
          for (let x = 0; x < 2; x++) {
            recents.push(Object(res[2])[x]);
          }
          setProfitList(recents);
        }
      }
    } else {
      setProfitDataView("profit-list-error");
      setProfitList([]);
    }
  }

  function testeLista(lista) {
    let error = false;

    if (Object.keys(lista).length > 0) {
      for (let x = 0; x <= Object.keys(lista).length; x++) {
        if (lista[x] !== "undefined") {
          error = false;
        } else {
          error = true;
          break;
        }
      }
    }
    return error;
  }

  if (spent === "" && wallet === "" && limit === "" && profit === "") {
    HanddleConsultWalletSpentProfitVal();
  }

  return (
    <>
      <div className="container-panel" id="panel">
        <div className="panel-card-1 panel-card">
          <h5>Saldo disponível:</h5>
          <div
            style={
              wallet < 0 ? { color: "var(--red)" } : { color: "var(--white)" }
            }
          >
            {typeof wallet === "undefined"
              ? "Erro"
              : wallet.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
          </div>
        </div>
        <div className="panel-card-2 panel-card">
          <h5>Gasto:</h5>
          <div>
            <i className="bx bx-down-arrow-alt" />
            {typeof spent === "undefined"
              ? "Erro"
              : spent.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
          </div>
        </div>
        <div className="panel-card-3 panel-card">
          <h5>Lucro:</h5>
          <div>
            <i className="bx bx-up-arrow-alt" />
            {typeof profit === "undefined"
              ? "Erro"
              : profit.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
          </div>
        </div>
        <div
          className="panel-card-4 panel-card"
          onClick={() => {
            setModalAttShow(true);
          }}
        >
          <h5>Limite Informado:</h5>
          <div>
            {typeof limit === "undefined"
              ? "Erro"
              : limit.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
          </div>
        </div>

        <div className="content-card">
          <Graph p={profit} s={spent} l={limit} />
        </div>

        <div className="recent-wallet">
          <h3>Movimentações Recentes - {currentDate()[2]}/{currentDate()[3]}</h3>
          <div className="hr-panel" />
          <div className="view-card">
            <div className={spentDataView}>
              <span className="non-spent-list-item" id="erroAoGerarSpentList">
                Erro ao obter lista de gastos
              </span>
              <span className="non-spent-list-item" id="nenhumGasto">
                Nenhum gasto cadastrado
              </span>
              <div className="spents-card spent-list-item">
                {testeLista(spentList) === true
                  ? "Erro"
                  : spentList.map((sList, index) => (
                      <Link to="/dashboard/wallet" key={index}>
                       <h4
                          style={{
                            color: "var(--red)",
                            fontWeight: "bolder",
                            justifyContent: "left",
                          }}
                        >
                          {sList.descricao === "undefined"
                            ? "Erro"
                            : sList.descricao === ""
                            ? "Nenhuma descrição"
                            : sList.descricao}
                        </h4>
                        <div>
                          <strong>Categoria:</strong>{" "}
                          {paymantType[sList.tipo_gasto]}
                        </div>
                        <div>
                          <strong>Valor:</strong> -
                          {sList.valor === "undefined"
                            ? "Erro"
                            : sList.valor.toLocaleString("pt-br", {
                                style: "currency",
                                currency: "BRL",
                              })}
                        </div>
                        <div>
                          <strong>Pagamento:</strong>{" "}
                          {sList.tipo_pagamento === "undefined"
                            ? "Erro"
                            : paymantMethod[sList.tipo_pagamento]}
                        </div>
                        <div>
                          <strong>Data:</strong>{" "}
                          {sList.data === "undefined"
                            ? "Error"
                            : sList.data.split("-").reverse().join("/")}
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
            <div className="hw-wallet" />
            <div className={profitDataView}>
              <span className="non-spent-list-item" id="erroAoGerarProfitList">
                Erro ao obter lista de lucros
              </span>
              <span className="non-spent-list-item" id="nenhumLucro">
                Nenhum lucro cadastrado
              </span>
              <div className="profits-card spent-list-item">
                {testeLista(profitList) === true
                  ? "Erro"
                  : profitList.map((pList, index) => (
                      <Link to="/dashboard/wallet" key={index}>
                        <h4
                          style={{
                            color: "var(--green)",
                            fontWeight: "bolder",
                            justifyContent: "left",
                          }}
                        >
                          {pList.descricao === ""
                            ? "Nenhuma descrição"
                            : pList.descricao}
                        </h4>
                        <div>
                          <strong>Valor:</strong> +
                          {pList.valor.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </div>
                        <div>
                          <strong>Data:</strong>{" "}
                          {pList.data === "undefined"
                            ? "Error"
                            : pList.data.split("-").reverse().join("/")}
                        </div>
                      </Link>
                    ))}
              </div>
            </div>
          </div>
          <div id="modal-att">
            <ModalAtt
              show={modalAttShow}
              onHide={() => setModalAttShow(false)}
              reloading={() => setLoadState(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Panel;
export { currentDate };
