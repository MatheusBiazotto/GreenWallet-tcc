import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { currentDate } from "./DashboardData.js";
import {
  Userdata,
  HanddleConsultWalletSpentProfitSubmit,
  HanddleEditSpentSubmit,
  HanddleEditProfitSubmit,
} from "../../services/api";
import { ModalAdd, ModalAtt, ModalRm } from "./DashboardModals";

function Wallet() {
  const [edit, setEdit] = useState("container-wallet");
  const [spent, setSpent] = useState("");
  const [wallet, setWallet] = useState("");
  const [profit, setProfit] = useState("");
  const [limit, setLimit] = useState("");
  const [spentProfit, setSpentProfit] = useState("");
  const [spentEditProfit, setSpentEditProfit] = useState("");
  const [spentProfitStyle, setSpentProfitStyle] = useState("");
  const [modalAddShow, setModalAddShow] = useState(false);
  const [modalDelShow, setModalDelShow] = useState(false);
  const [modalAttShow, setModalAttShow] = useState(false);
  const [load, setLoad] = useState("Salvar");
  const [spentList, setSpentList] = useState([]);
  const [profitList, setProfitList] = useState([]);
  const [editId, setEditId] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editPaymant, setEditPaymant] = useState("");
  const [editSpentType, setEditSpentType] = useState("");
  const [editSpentDate, seteditSpentDate] = useState("");
  const [selectModalAddView, setSelectModalAddView] = useState({
    display: "block",
  });
  const [spentDataView, setSpentDataView] = useState("spent-list-ok");
  const [profitDataView, setProfitDataView] = useState("profit-list-ok");
  const [loadState, setLoadState] = useState(false);

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

  const opnAddLucro = () => ((
    setSelectModalAddView({ display: "none" }),
    setModalAddShow(true),
    setSpentProfit("Lucro"),
    setSpentProfitStyle("modal-add-profit")
  ));

  const opnAddGasto = () => ((
    setSelectModalAddView({ display: "block" }),
    setModalAddShow(true),
    setSpentProfit("Gasto"),
    setSpentProfitStyle("modal-add-spent")
  ));

  function openEdit(id, type) {
    setSpentEditProfit(type);
    if (type === "Gasto") {
      if (id !== "") {
        let editData = spentList.find((element) => element.id === id);
        setEditDesc(editData.descricao);
        setEditAmount(editData.valor);
        setEditPaymant(editData.tipo_pagamento);
        setEditSpentType(editData.tipo_gasto);
        seteditSpentDate(editData.data);
        setEditId(editData.id);
        setEdit("container-wallet open");
        document.querySelector("div.edit-card").style.display = "block";
      } else {
        alert("Erro ao buscar identificador do gasto");
      }
    } else if (type === "Lucro") {
      if (id !== "") {
        let editData = profitList.find((element) => element.id === id);
        setEditDesc(editData.descricao);
        setEditAmount(editData.valor);
        seteditSpentDate(editData.data);
        setEditId(editData.id);
        setEditPaymant("");
        setEditSpentType("");
        setEdit("container-wallet open");
        document.querySelector("div.edit-card").style.display = "block";
      } else {
        alert("Erro ao buscar identificador do gasto");
      }
    }
  }

  function closeEdit() {
    setEdit("container-wallet");
    document.querySelector("div.edit-card").style.display = "none";
  }

  useEffect(() => {
    if (loadState === true) {
      setWallet("0");
      setSpent("0");
      setLimit("0");
      setProfit("0");
      walletData();

      return setLoadState(false);
    }
  }, [loadState]);

  async function walletData() {
    let userdata = Userdata();

    let res = await HanddleConsultWalletSpentProfitSubmit({
      id_usuario: userdata.id,
      mes: currentDate()[2],
      ano: currentDate()[3],
    });

    if (typeof res[0] === "object" && typeof res[0] !== "undefined") {
      setWallet(res[0].saldo);
      setSpent(res[0].gastos);
      setProfit(res[0].lucros);
      setLimit(res[0].saldo - res[0].lucros + res[0].gastos);
    } else {
      setWallet("0");
      setSpent("0");
      setLimit("0");
      setProfit("0");
    }

    if (typeof res[1] === "object" && typeof res[1] !== "undefined") {
      let spents = Object.keys(res[1]).length;
      if (spents === 0) {
        setSpentDataView("spent-list-none");
        setSpentList([]);
      } else if (spents > 0) {
        setSpentDataView("spent-list-ok");
        setSpentList(res[1]);
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
        setProfitList(res[2]);
      }
    } else {
      setProfitDataView("profit-list-error");
      setProfitList([]);
    }
  }

  async function HanddleEditSpentProfitVal() {
    setLoad(<i className="bx bx-loader-alt bx-spin bx-flip-horizontal" />);

    let userdata = Userdata();

    if (editAmount > -100000 && editAmount < 100000) {
      if (spentEditProfit === "Gasto") {
        if (
          editAmount !== "" &&
          editPaymant !== "" &&
          editSpentDate !== "" &&
          editSpentType !== "" &&
          editId !== ""
        ) {
          let res = await HanddleEditSpentSubmit({
            id_gasto: editId,
            id_usuario: userdata.id,
            tipo_gasto: editSpentType,
            valor_gasto: editAmount,
            tipo_pagamento: editPaymant,
            data_gasto: editSpentDate,
            descricao: editDesc,
          });

          switch (res) {
            case 200:
              setLoad("Salvar");
              setLoadState(true);
              break;

            default:
              setLoad("Salvar");
          }
        } else {
          alert("Preencha todos os campos");
          setLoad("Salvar");
        }
      } else if (spentEditProfit === "Lucro") {
        if (editAmount !== "" && editSpentDate !== "" && editId !== "") {
          let res = await HanddleEditProfitSubmit({
            id_lucro: editId,
            id_usuario: userdata.id,
            valor: editAmount,
            data: editSpentDate,
            descricao: editDesc,
          });

          switch (res) {
            case 200:
              setLoad("Salvar");
              setLoadState(true);
              break;

            default:
              setLoad("Salvar");
          }
        } else {
          alert("Preencha todos os campos");
          setLoad("Salvar");
        }
      }
    } else {
      alert("Insira um valor entre 100.000 e -100.000");
      setLoad("Salvar");
    }
  }

  const EditSelect = () => (
    <>
      <Form.Group>
        <Form.Control
          as="select"
          custom
          value={editSpentType}
          onChange={(e) => setEditSpentType(e.target.value)}
        >
          {[
            { value: "0", text: "Contas" },
            { value: "1", text: "Saúde" },
            { value: "2", text: "Alimentação" },
            { value: "3", text: "Lazer" },
            { value: "4", text: "Emergência" },
            { value: "5", text: "Bens" },
          ].map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.text}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="select"
          custom
          value={editPaymant}
          onChange={(e) => setEditPaymant(e.target.value)}
        >
          {[
            { value: "0", text: "Dinheiro" },
            { value: "1", text: "PIX" },
            { value: "2", text: "Débito" },
            { value: "3", text: "Crédito" },
            { value: "4", text: "Boleto" },
            { value: "5", text: "Cheque" },
          ].map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.text}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </>
  );

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

  const maxLength = () => {
    document.getElementById("descEdit").setAttribute("maxlength", "29");
  };

  if (spent === "" && wallet === "" && limit === "" && profit === "") {
    walletData();
  }

  return (
    <>
      <div className={edit} id="panel">
        <div className="wallet-card">
          <div className="header-wallet">
            <h2>
              Carteira - {currentDate()[2]}/{currentDate()[3]}{" "}
            </h2>
            <Button variant="light" onClick={() => setLoadState(true)}>
              <i className="bx bx-revision" />
            </Button>
          </div>
          <div className="hr-wallet" />
          <div className="spent-card">
            <div className="spent-card1">
              <h5>Saldo disponível:</h5>
              <div
                style={
                  wallet < 0
                    ? { color: "var(--red)" }
                    : { color: "var(--white)" }
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
            <div className="spent-card2">
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
            <div className="spent-card3">
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
            <div className="spent-card4" onClick={() => setModalAttShow(true)}>
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
          </div>
          <div id="modal-att">
            <ModalAtt
              show={modalAttShow}
              onHide={() => setModalAttShow(false)}
              reloading={() => setLoadState(true)}
            />
          </div>

          <div className="btn-spent">
            <Button variant="danger" onClick={() => opnAddGasto()}>
              Adicionar Gasto <i className="bx bx-down-arrow-alt" />{" "}
            </Button>
            <Button variant="success" onClick={() => opnAddLucro()}>
              Adicionar Lucro <i className="bx bx-up-arrow-alt" />{" "}
            </Button>
          </div>
          <div id="modal">
            <ModalAdd
              show={modalAddShow}
              onHide={() => setModalAddShow(false)}
              spentProfit={spentProfit}
              spentProfitStyle={spentProfitStyle}
              selectModalAddView={selectModalAddView}
              reloading={() => setLoadState(true)}
            />
          </div>
          <div className="hr-wallet" />
          <div className="wallet-view">
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
                      <div
                        key={index}
                        onClick={() => openEdit(sList.id, "Gasto")}
                      >
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
                      <div
                        key={index}
                        onClick={() => openEdit(pList.id, "Lucro")}
                      >
                        <h4
                          style={{
                            color: "var(--green)",
                            fontWeight: "bolder",
                            justifyContent: "left",
                          }}
                        >
                        { pList.descricao === "undefined"
                          ? "Erro"
                          : pList.descricao === ""
                              ? "Nenhuma descrição"
                              : pList.descricao
                        }
                        </h4>
                        <div>
                          <strong>Valor:</strong> +
                        {
                          pList.valor === "undefined"
                            ? "Erro"
                            : pList.valor.toLocaleString("pt-br", {
                              style: "currency",
                              currency: "BRL",
                          })}
                        </div>
                        <div>
                          <strong>Data:</strong>{" "}
                          
                        {
                          pList.data === "undefined"
                            ? "Erro"
                            : pList.data.split("-").reverse().join("/")
                        }
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>

        <div className="edit-card" style={{ display: "none" }}>
          <div className="edit-header">
            <div>
              <i className="bx bx-x" onClick={closeEdit} />
            </div>
            <div className="edit-trash">
              <i
                className="bx bx-trash"
                onClick={() => setModalDelShow(true)}
              />
            </div>
          </div>
          <Form className="edit-form">
            <div>
              <h4>Editar</h4>
              <div className="hr-wallet" />
              <Form.Group>
                <Form.Control
                  type="text"
                  id="descEdit"
                  custom
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  placeholder="Descrição"
                  onFocus={(e) => maxLength()}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="number"
                  custom
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  placeholder="Valor"
                />
              </Form.Group>
              {spentEditProfit === "Gasto" ? <EditSelect /> : <></>}
              <Form.Group>
                <Form.Control
                  type="date"
                  custom
                  min={currentDate()[1]}
                  max={currentDate()[0]}
                  value={editSpentDate}
                  onChange={(e) => seteditSpentDate(e.target.value)}
                />
              </Form.Group>
            </div>
            <div>
              <Button
                style={{ fontWeight: "bolder" }}
                onClick={() => HanddleEditSpentProfitVal()}
                variant="success"
              >
                {load}
              </Button>
            </div>
          </Form>
          <div className="modal-delete">
            <ModalRm
              show={modalDelShow}
              onHide={() => setModalDelShow(false)}
              spentEditProfit={spentEditProfit}
              reloading={() => setLoadState(true)}
              closeEdit={() => closeEdit()}
              editId={editId}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Wallet;
