import { useEffect, useState } from "react";
import { currentDate } from "./DashboardData";
import { Form, Button } from "react-bootstrap";
import { ModalAnalyze } from "./DashboardModals";
import {
  HanddleConsultWalletSpentProfitSubmit,
  Userdata,
} from "../../services/api";

function History() {
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");

  const [spent0, setSpent0] = useState("");
  const [profit0, setProfit0] = useState("");
  const [spentList0, setSpentList0] = useState([]);
  const [profitList0, setProfitList0] = useState([]);
  const [spentDataView0, setSpentDataView0] = useState("spent-list-ok");
  const [profitDataView0, setProfitDataView0] = useState("profit-list-ok");

  const [spentList1, setSpentList1] = useState([]);
  const [profitList1, setProfitList1] = useState([]);
  const [spentDataView1, setSpentDataView1] = useState("spent-list-ok");
  const [profitDataView1, setProfitDataView1] = useState("profit-list-ok");
  const [spent1, setSpent1] = useState("");
  const [profit1, setProfit1] = useState("");

  const [spentList2, setSpentList2] = useState([]);
  const [profitList2, setProfitList2] = useState([]);
  const [spentDataView2, setSpentDataView2] = useState("spent-list-ok");
  const [profitDataView2, setProfitDataView2] = useState("profit-list-ok");
  const [spent2, setSpent2] = useState("");
  const [profit2, setProfit2] = useState("");
  const [enbSelect0, setEnbSelect0] = useState(false);
  const [enbSelect1, setEnbSelect1] = useState(false);

  const [showModalAnalyze, setModalAnalyze] = useState(false);
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [enbAnalyze0, setEnbAnalyze0] = useState(true);
  const [enbAnalyze1, setEnbAnalyze1] = useState(true);
  const [enbAnalyze2, setEnbAnalyze2] = useState(true);
  

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

  const opnModalAnalyze = (mes, ano) => {
    setModalAnalyze(true);
    setMes(mes);
    setAno(ano);
  };

  async function HanddleConsultWalletSpentProfitVal() {
    let userdata = Userdata();
    if (currentDate()[3] >= 1946 && currentDate()[3] < currentDate()[3] + 1) {
      let res1 = await HanddleConsultWalletSpentProfitSubmit({
        id_usuario: userdata.id,
        mes: currentDate()[2] - 1 === 0 ? 12 : currentDate()[2] - 1,
        ano:
          currentDate()[2] - 1 === 0 ? currentDate()[3] - 1 : currentDate()[3],
      });

      if (typeof res1[0] === "object" && typeof res1[0] !== "undefined") {
        setSpent1(res1[0].gastos);
        setProfit1(res1[0].lucros);
      } else {
        setSpent1(0);
        setProfit1(0);
      }

      if (typeof res1[1] === "object" && typeof res1[1] !== "undefined") {
        let spents = Object.keys(res1[1]).length;
        if (spents === 0) {
          setSpentDataView1("spent-list-none");
          setSpentList1([]);
          setEnbAnalyze1(true)
        } else if (spents > 0) {
          setSpentDataView1("spent-list-ok");
          setSpentList1(res1[1]);
          setEnbAnalyze1(false)
        }
      } else {
        setSpentDataView1("spent-list-error");
        setSpentList1([]);
        setEnbAnalyze1(true)
      }

      if (typeof res1[2] === "object" && typeof res1[2] !== "undefined") {
        let profit = Object.keys(res1[2]).length;
        if (profit === 0) {
          setProfitDataView1("profit-list-none");
          setProfitList1([]);
        } else if (profit > 0) {
          setProfitDataView1("profit-list-ok");
          setProfitList1(res1[2]);
        }
      } else {
        setProfitDataView1("profit-list-error");
        setProfitList1([]);
      }

      let res2 = await HanddleConsultWalletSpentProfitSubmit({
        id_usuario: userdata.id,
        mes:
          currentDate()[2] - 2 === -1
            ? 11
            : currentDate()[2] - 2 === 0
            ? 12
            : currentDate()[2] - 2,
        ano:
          currentDate()[2] - 2 <= 0 ? currentDate()[3] - 1 : currentDate()[3],
      });

      if (typeof res2[0] === "object" && typeof res2[0] !== "undefined") {
        setSpent2(res2[0].gastos);
        setProfit2(res2[0].lucros);
      } else {
        setSpent1(0);
        setProfit1(0);
      }

      if (typeof res2[1] === "object" && typeof res2[1] !== "undefined") {
        let spents = Object.keys(res2[1]).length;
        if (spents === 0) {
          setSpentDataView2("spent-list-none");
          setSpentList2([]);
          setEnbAnalyze2(true)
        } else if (spents > 0) {
          setSpentDataView2("spent-list-ok");
          setSpentList2(res2[1]);
          setEnbAnalyze2(false)
        }
      } else {
        setSpentDataView2("spent-list-error");
        setSpentList2([]);
        setEnbAnalyze2(true)
      }

      if (typeof res2[2] === "object" && typeof res2[2] !== "undefined") {
        let profit = Object.keys(res2[2]).length;
        if (profit === 0) {
          setProfitDataView2("profit-list-none");
          setProfitList2([]);
        } else if (profit > 0) {
          setProfitDataView2("profit-list-ok");
          setProfitList2(res2[2]);
        }
      } else {
        setProfitDataView2("profit-list-error");
        setProfitList2([]);
      }
    } else {
      alert("A data do sistema esta incorreta !!!");
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

  function DataSelect() {
    let year = [{ value: "", text: "", disable: true }];
    let month = [{ value: "", text: "", disable: true }];

    for (let x = 1; x <= 12; x++) {
      month.push({ value: x, text: x, disable: false });
    }

    for (let x = currentDate()[3]; x >= 1946; x--) {
      year.push({ value: x, text: x, disable: false });
    }

    return (
      <>
        <Form.Group id="selects-history" className="selects-history">
          <Form.Control
            as="select"
            custom
            value={selectMonth}
            onChange={(e) => setSelectMonth(e.target.value)}
            disabled={enbSelect0}
            className="left-select"
          >
            {month.map((opt, index) => (
              <option value={opt.value} key={index} disabled={opt.disable}>
                {opt.text}
              </option>
            ))}
          </Form.Control>
          <span>/</span>
          <Form.Control
            as="select"
            custom
            value={selectYear}
            onChange={(e) => setSelectYear(e.target.value)}
            disabled={enbSelect1}
            className="right-select"
          >
            {year.map((opt, index) => (
              <option value={opt.value} key={index} disabled={opt.disable}>
                {opt.text}
              </option>
            ))}
          </Form.Control>
          <Button
            style={{ fontWeight: "bolder" }}
            variant="outline-success"
            id="button-history"
            onClick={(e) => opnModalAnalyze(selectMonth, selectYear)}
            disabled={enbAnalyze0}
          >
            Análise
          </Button>
        </Form.Group>
      </>
    );
  }

  async function SelectHistoryData() {
    if (selectYear !== "" && selectMonth !== "") {
      let userdata = Userdata();

      setEnbSelect0(true);
      setEnbSelect1(true);

      let res = await HanddleConsultWalletSpentProfitSubmit({
        id_usuario: userdata.id,
        mes: selectMonth,
        ano: selectYear,
      });

      if (typeof res[0] === "object" && typeof res[0] !== "undefined") {
        setSpent0(res[0].gastos);
        setProfit0(res[0].lucros);
      } else {
        setSpent0(0);
        setProfit0(0);
      }

      if (typeof res[1] === "object" && typeof res[1] !== "undefined") {
        let spents = Object.keys(res[1]).length;
        if (spents === 0) {
          setSpentDataView0("spent-list-none");
          setSpentList0([]);
          setEnbAnalyze0(true)
        } else if (spents > 0) {
          setSpentDataView0("spent-list-ok");
          setSpentList0(res[1]);
          setEnbAnalyze0(false)
        }
      } else {
        setSpentDataView0("spent-list-error");
        setSpentList0([]);
        setEnbAnalyze0(true)
      }

      if (typeof res[2] === "object" && typeof res[2] !== "undefined") {
        let profit = Object.keys(res[2]).length;
        if (profit === 0) {
          setProfitDataView0("profit-list-none");
          setProfitList0([]);
        } else if (profit > 0) {
          setProfitDataView0("profit-list-ok");
          setProfitList0(res[2]);
        }
      } else {
        setProfitDataView0("profit-list-error");
        setProfitList0([]);
      }

      setEnbSelect0(false);
      setEnbSelect1(false);
    }
  }

  useEffect(() => {
    if (selectYear !== "" && selectMonth !== "") {
      SelectHistoryData();
    }
    // eslint-disable-next-line
  }, [selectYear, selectMonth]);

  if (spent1 === "" && profit1 === "" && spent2 === "" && profit2 === "") {
    HanddleConsultWalletSpentProfitVal();
  }

  return (
    <>
      <div className="container-wallet">
        <div className="history-card">
          <div className="history-select">
            <h3 style={{ textAlign: "center" }}>Selecione o mês e o ano</h3>
            <DataSelect />
            <div className="hr-wallet" />
            <div className="history-spent-card">
              <div className="history-spent-card1">
                <h5>Gasto:</h5>
                <div>
                  <i className="bx bx-down-arrow-alt" />
                  {typeof spent0 === "undefined"
                    ? "Erro"
                    : spent0.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                </div>
              </div>
              <div className="history-spent-card2">
                <h5>Lucro:</h5>
                <div>
                  <i className="bx bx-up-arrow-alt" />
                  {typeof profit0 === "undefined"
                    ? "Erro"
                    : profit0.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                </div>
              </div>
            </div>
            <div className="hr-history" />
            <div className="view-card">
              <div className={spentDataView0}>
                <span className="non-spent-list-item" id="erroAoGerarSpentList">
                  Erro ao obter lista de gastos
                </span>
                <span className="non-spent-list-item" id="nenhumGasto">
                  Nenhum gasto cadastrado
                </span>
                <div className="spents-card spent-list-item">
                  {testeLista(spentList0) === true
                    ? "Erro"
                    : spentList0.map((sList, index) => (
                        <div key={index}>
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
                        </div>
                      ))}
                </div>
              </div>
              <div className="hw-wallet" />
              <div className={profitDataView0}>
                <span
                  className="non-spent-list-item"
                  id="erroAoGerarProfitList"
                >
                  Erro ao obter lista de lucros
                </span>
                <span className="non-spent-list-item" id="nenhumLucro">
                  Nenhum lucro cadastrado
                </span>
                <div className="profits-card spent-list-item">
                  {testeLista(profitList0) === true
                    ? "Erro"
                    : profitList0.map((pList, index) => (
                        <div key={index}>
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
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="header-history">
              <h3>
                Carteira -{" "}
                {currentDate()[2] - 1 === 0 ? 12 : currentDate()[2] - 1}/
                {currentDate()[2] - 1 === 0
                  ? currentDate()[3] - 1
                  : currentDate()[3]}
              </h3>
              <Button
                style={{ fontWeight: "bolder" }}
                variant="outline-success"
                id="button-history"
                disabled={enbAnalyze1}
                onClick={(e) =>
                  opnModalAnalyze(
                    currentDate()[2] - 1 === 0 ? 12 : currentDate()[2] - 1,
                    currentDate()[2] - 1 === 0
                      ? currentDate()[3] - 1
                      : currentDate()[3]
                  )
                }
              >
                Análise
              </Button>
            </div>
            <div className="hr-wallet" />
            <div className="history-spent-card">
              <div className="history-spent-card1">
                <h5>Gasto:</h5>
                <div>
                  <i className="bx bx-down-arrow-alt" />
                  {typeof spent1 === "undefined"
                    ? "Erro"
                    : spent1.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                </div>
              </div>
              <div className="history-spent-card2">
                <h5>Lucro:</h5>
                <div>
                  <i className="bx bx-up-arrow-alt" />
                  {typeof profit1 === "undefined"
                    ? "Erro"
                    : profit1.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                </div>
              </div>
            </div>
            <div className="hr-history" />
            <div className="view-card">
              <div className={spentDataView1}>
                <span className="non-spent-list-item" id="erroAoGerarSpentList">
                  Erro ao obter lista de gastos
                </span>
                <span className="non-spent-list-item" id="nenhumGasto">
                  Nenhum gasto cadastrado
                </span>
                <div className="spents-card spent-list-item">
                  {testeLista(spentList1) === true
                    ? "Erro"
                    : spentList1.map((sList, index) => (
                        <div key={index}>
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
                        </div>
                      ))}
                </div>
              </div>
              <div className="hw-wallet" />
              <div className={profitDataView1}>
                <span
                  className="non-spent-list-item"
                  id="erroAoGerarProfitList"
                >
                  Erro ao obter lista de lucros
                </span>
                <span className="non-spent-list-item" id="nenhumLucro">
                  Nenhum lucro cadastrado
                </span>
                <div className="profits-card spent-list-item">
                  {testeLista(profitList1) === true
                    ? "Erro"
                    : profitList1.map((pList, index) => (
                        <div key={index}>
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
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="header-history">
              <h3>
                Carteira -{" "}
                {currentDate()[2] - 2 === -1
                  ? 11
                  : currentDate()[2] - 2 === 0
                  ? 12
                  : currentDate()[2] - 2}
                /
                {currentDate()[2] - 2 <= 0
                  ? currentDate()[3] - 1
                  : currentDate()[3]}
              </h3>
              <Button
                style={{ fontWeight: "bolder" }}
                variant="outline-success"
                id="button-history"
                disabled={enbAnalyze2}
                onClick={(e) =>
                  opnModalAnalyze(
                    currentDate()[2] - 2 === -1 ? 11 : currentDate()[2] - 2 === 0 ? 12 : currentDate()[2] - 2,
                    currentDate()[2] - 2 <= 0 ? currentDate()[3] - 1 : currentDate()[3]
                  )
                }
              >
                Análise
              </Button>
            </div>
            <div className="hr-wallet" />
            <div className="history-spent-card">
              <div className="history-spent-card1">
                <h5>Gasto:</h5>
                <div>
                  <i className="bx bx-down-arrow-alt" />
                  {typeof spent2 === "undefined"
                    ? "Erro"
                    : spent2.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                </div>
              </div>
              <div className="history-spent-card2">
                <h5>Lucro:</h5>
                <div>
                  <i className="bx bx-up-arrow-alt" />
                  {typeof profit2 === "undefined"
                    ? "Erro"
                    : profit2.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                </div>
              </div>
            </div>
            <div className="hr-history" />
            <div className="view-card">
              <div className={spentDataView2}>
                <span className="non-spent-list-item" id="erroAoGerarSpentList">
                  Erro ao obter lista de gastos
                </span>
                <span className="non-spent-list-item" id="nenhumGasto">
                  Nenhum gasto cadastrado
                </span>
                <div className="spents-card spent-list-item">
                  {testeLista(spentList2) === true
                    ? "Erro"
                    : spentList2.map((sList, index) => (
                        <div key={index}>
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
                        </div>
                      ))}
                </div>
              </div>
              <div className="hw-wallet" />
              <div className={profitDataView2}>
                <span
                  className="non-spent-list-item"
                  id="erroAoGerarProfitList"
                >
                  Erro ao obter lista de lucros
                </span>
                <span className="non-spent-list-item" id="nenhumLucro">
                  Nenhum lucro cadastrado
                </span>
                <div className="profits-card spent-list-item">
                  {testeLista(profitList2) === true
                    ? "Erro"
                    : profitList2.map((pList, index) => (
                        <div key={index}>
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
                        </div>
                      ))}
                </div>
              </div>
            </div>
            <div>
              <ModalAnalyze
                show={showModalAnalyze}
                onHide={() => setModalAnalyze(false)}
                ano={ano}
                mes={mes}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
