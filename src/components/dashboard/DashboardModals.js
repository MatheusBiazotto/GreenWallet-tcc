import { Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { currentDate } from "./DashboardData.js";
import FloatingLabel from "react-bootstrap-floating-label";
import { HistoryChart } from "./DashboardChart.js";
import {
  Userdata,
  HanddleAttLimitSubmit,
  HanddleAddSpentSubmit,
  HanddleAddProfitSubmit,
  HanddleRemoveProfitSubmit,
  HanddleRemoveSpentSubmit,
  HanddleAttEmail,
  HanddleAttPassword,
  HanddleAnalyze,
} from "../../services/api";

function ModalAtt(props) {
  const [load, setLoad] = useState("Salvar");
  const [attLimit, setAttLimit] = useState("");
  const [attLimitS, setAttLimitS] = useState("");

  const [showPassword, setShowPassword] = useState("password");

  const showPasswordInput = () => {
    document.querySelector("input#showPassword").checked === true
      ? setShowPassword("text")
      : setShowPassword("password");
  };

  async function HanddleAttLimitVal() {
    setLoad(<i className="bx bx-loader-alt bx-spin bx-flip-horizontal" />);

    if (attLimit < 100000 && attLimit > -100000) {
      if (attLimitS !== "") {
        let userdata = Userdata();

        let res = await HanddleAttLimitSubmit({
          id_usuario: userdata.id,
          renda: attLimit,
          senha: attLimitS,
        });

        if (res === 200) {
          props.onHide();
          setAttLimit("");
          setAttLimitS("");
          props.reloading();
        }
      } else {
        alert("Preencha todos os campos !!!");
      }
    } else {
      alert("Insira um valor entre 100.000 e -100.000 !!!");
    }
    setLoad("Salvar");
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter-2">
            Atualizar Limite
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="attLimitModal">
            <Form.Group>
              <Form.Control
                placeholder="Novo Limite"
                type="number"
                value={attLimit}
                onChange={(e) => setAttLimit(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Confirmar senha"
                type={showPassword}
                value={attLimitS}
                onChange={(e) => setAttLimitS(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
            {["checkbox"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  type={type}
                  id={`showPassword`}
                  label={`Mostrar senha`}
                  onChange={showPasswordInput}
                />
              </div>
            ))}
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ fontWeight: "bolder" }}
            onClick={props.onHide}
            variant="danger"
          >
            Cancelar
          </Button>
          <Button
            style={{ fontWeight: "bolder" }}
            onClick={() => HanddleAttLimitVal()}
            variant="success"
          >
            {load}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function ModalAdd(props) {
  const [load, setLoad] = useState("Salvar");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [paymant, setPaymant] = useState("");
  const [spentType, setSpentType] = useState("");
  const [spentDate, setSpentDate] = useState("");

  async function HanddleAddSpentProfitVal() {
    let userdata = Userdata();

    setLoad(<i className="bx bx-loader-alt bx-spin bx-flip-horizontal" />);

    if (amount !== "" && spentDate !== "") {
      if (props.spentProfit === "Gasto") {
        if (paymant !== "" && spentType !== "") {
          if (amount > 0 && amount < 100000) {
            let res = await HanddleAddSpentSubmit({
              id_usuario: userdata.id,
              tipo_gasto: spentType,
              valor_gasto: amount,
              tipo_pagamento: paymant,
              data_gasto: spentDate,
              descricao: desc,
            });

            if (res === 201) {
              setSpentType("");
              setAmount("");
              setDesc("");
              setPaymant("");
              setSpentDate("");
              props.onHide();
              props.reloading();
            }
          } else {
            alert("Insira um valor maior do que 0 e menor do que 100.000!!!");
          }
        } else {
          alert("Preencha todos os campos !!!");
        }
      } else if (props.spentProfit === "Lucro") {
        if (amount > 0 && amount < 100000) {
          let res = await HanddleAddProfitSubmit({
            id_usuario: userdata.id,
            valor: amount,
            data: spentDate,
            descricao: desc,
          });

          if (res === 201) {
            setSpentType("");
            setAmount("");
            setDesc("");
            setPaymant("");
            setSpentDate("");
            props.onHide();
            props.reloading();
          }
        } else {
          alert("Insira um valor maior do que 0 !!!");
        }
      }
    } else {
      alert("Preencha todos os Campos !!!");
    }
    setLoad("Salvar");
  }

  const maxLengthModal = () => {
    document.getElementById("descModal-input").setAttribute("maxlength", "29");
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          className={props.spentProfitStyle}
          id="contained-modal-title-vcenter"
        >
          Adicionar Novo {props.spentProfit}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="addSpentModal">
          <Form.Group>
            <FloatingLabel
              label="Descrição"
              id="descModal"
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              onFocus={maxLengthModal}
            />
          </Form.Group>
          <Form.Group>
            <FloatingLabel
              label="Valor"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              id="type-spent"
              style={props.selectModalAddView}
              onChange={(e) => setSpentType(e.target.value)}
              custom
              defaultValue="default"
            >
              {[
                {
                  value: "default",
                  text: "Tipo de Gasto",
                  disable: true,
                },
                { value: "0", text: "Contas", disable: false },
                { value: "1", text: "Saúde", disable: false },
                { value: "2", text: "Alimentação", disable: false },
                { value: "3", text: "Lazer", disable: false },
                { value: "4", text: "Emergência", disable: false },
                { value: "5", text: "Bens", disable: false },
              ].map((opt, index) => (
                <option key={index} value={opt.value} disabled={opt.disable}>
                  {opt.text}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              id="type-pay"
              style={props.selectModalAddView}
              onChange={(e) => setPaymant(e.target.value)}
              custom
              defaultValue="default"
            >
              {[
                {
                  value: "default",
                  text: "Forma de Pagamento",
                  disable: true,
                },
                { value: "0", text: "Dinheiro", disable: false },
                { value: "1", text: "PIX", disable: false },
                { value: "2", text: "Débito", disable: false },
                { value: "3", text: "Crédito", disable: false },
                { value: "4", text: "Boleto", disable: false },
                { value: "5", text: "Cheque", disable: false },
              ].map((opt, index) => (
                <option key={index} value={opt.value} disabled={opt.disable}>
                  {opt.text}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="date"
              custom
              onChange={(e) => setSpentDate(e.target.value)}
              min={currentDate()[1]}
              max={currentDate()[0]}
              value={spentDate}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{ fontWeight: "bolder" }}
          onClick={props.onHide}
          variant="danger"
        >
          Cancelar
        </Button>
        <Button
          style={{ fontWeight: "bolder" }}
          onClick={HanddleAddSpentProfitVal}
          variant="success"
        >
          {load}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalRm(props) {
  const [load, setLoad] = useState("Salvar");

  async function HanddleRemoveSpentProfitVal(e) {
    e.preventDefault();

    setLoad(<i className="bx bx-loader-alt bx-spin bx-flip-horizontal" />);

    if (props.spentEditProfit === "Gasto") {
      if (props.editId !== "") {
        let userdata = Userdata();

        let res = await HanddleRemoveSpentSubmit({
          id_usuario: userdata.id,
          id_gasto: props.editId,
        });
        if (res === 200) {
          props.onHide()
          props.reloading();
          props.closeEdit();
        }
      } else {
        alert("Erro ao buscar identificador do gasto !!!");
        setLoad("Salvar");
      }
    } else if (props.spentEditProfit === "Lucro") {
      if (props.editId !== "") {
        let userdata = Userdata();

        let res = await HanddleRemoveProfitSubmit({
          id_usuario: userdata.id,
          id_lucro: props.editId,
        });

        if (res === 200) {
          props.onHide()
          props.reloading();
          props.closeEdit();
        }
      } else {
        alert("Erro ao buscar identificador do gasto !!!");
      }
    }
    setLoad("Salvar");
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter-1">
          Deletar {props.spentEditProfit}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Deseja continuar, as alterações serão irreversíveis.
      </Modal.Body>
      <Modal.Footer>
        <Form inline>
          <Form.Group>
            <Button
              style={{ fontWeight: "bolder", marginRight: "1vw" }}
              onClick={props.onHide}
              variant="success"
            >
              Cancelar
            </Button>
          </Form.Group>
          <Form.Group>
            <Button
              style={{ fontWeight: "bolder" }}
              onClick={HanddleRemoveSpentProfitVal}
              variant="danger"
            >
              {load}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Footer>
    </Modal>
  );
}

function ModalAttInfo(props) {
  let userdata = Userdata();

  const [load, setLoad] = useState("Salvar");
  const [attSenha, setAttSenha] = useState("");

  const [showPassword, setShowPassword] = useState("password");

  const showPasswordInput = () => {
    document.querySelector("input#showPassword").checked === true
      ? setShowPassword("text")
      : setShowPassword("password");
  };

  async function HanddleAttInfo() {
    setLoad(<i className="bx bx-loader-alt bx-spin bx-flip-horizontal" />);

    if (attSenha !== "") {
      if (
        (props.nameA !== userdata.name && props.nameA !== "" && props.inpReadOnly[0] === false) ||
        (props.surnameA !== userdata.surname && props.surnameA !== "" && props.inpReadOnly[1] === false) ||
        (props.emailA !== userdata.email && props.emailA !== "" && props.inpReadOnly[3] === false) ||
        (props.imagemA !== userdata.gender && props.imagemA !== "" )
      ) {
        let res = await HanddleAttEmail({
          id_usuario: userdata.id,
          email: props.emailA,
          senha: attSenha,
          img: props.imagemA,
          nome: props.nameA,
          sobrenome: props.surnameA
        })

        if (res === 200) {
          props.onHide()
          setAttSenha("")
          props.reloading()
        }
      } else if(props.inpReadOnly[3] === false) {
        alert("Preencha todos os campos antes de alterar e com valores diferentes !!!")
      }

    } else {
      alert("Senha Inválida")
    }
   
    setLoad("Salvar");
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter-2">
            Atualizar Dados
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="attLimitModal">
            <Form.Group>
              <Form.Control
                placeholder="Confirmar senha"
                type={showPassword}
                value={attSenha}
                onChange={(e) => setAttSenha(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
            {["checkbox"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  type={type}
                  id={`showPassword`}
                  label={`Mostrar senha`}
                  onChange={showPasswordInput}
                />
              </div>
            ))}
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ fontWeight: "bolder" }}
            onClick={props.onHide}
            variant="danger"
          >
            Cancelar
          </Button>
          <Button
            style={{ fontWeight: "bolder" }}
            onClick={() => HanddleAttInfo()}
            variant="success"
          >
            {load}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function ModalAttSenha(props) {
  const [load, setLoad] = useState("Salvar");
  const [attPassword, setAttPassword] = useState("");
  const [cAttPassword, setCAttPassword] = useState("");
  const [current, setCurrent] = useState("");

  const [showPassword, setShowPassword] = useState("password");

  const showPasswordInput = () => {
    document.querySelector("input#showPassword").checked === true
      ? setShowPassword("text")
      : setShowPassword("password");
  };

  async function HanddleAttPasswordVal() {
    setLoad(<i className="bx bx-loader-alt bx-spin bx-flip-horizontal" />);

    if (current !== "" && cAttPassword !== "" && attPassword !== "") {
      if (attPassword === cAttPassword) {
        let userdata = Userdata();

        let res = await HanddleAttPassword({
          id_usuario: userdata.id,
          nova_senha: attPassword,
          antiga_senha: current,
        });
  
        if (res === 200) {
          props.onHide();
          setAttPassword("");
          setCAttPassword("");
          setCurrent("");
          props.reloading();
        }
      } else {
        alert("A nova senha não coincide com a confirmação!!!")
      }
     
    } else {
      alert("Preencha todos os campos!!!");
    }
    setLoad("Salvar");
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter-2">
            Alterar Senha
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="attLimitModal">
            <Form.Group>
              <Form.Control
                placeholder="Nova Senha"
                type={showPassword}
                value={attPassword}
                onChange={(e) => setAttPassword(e.target.value)}
                maxLength="100"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Confirmar Nova Senha"
                type={showPassword}
                value={cAttPassword}
                onChange={(e) => setCAttPassword(e.target.value)}
                maxLength="100"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Senha Atual"
                type={showPassword}
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                maxLength="100"
              />
            </Form.Group>
            <Form.Group>
            {["checkbox"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  type={type}
                  id={`showPassword`}
                  label={`Mostrar senha`}
                  onChange={showPasswordInput}
                />
              </div>
            ))}
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ fontWeight: "bolder" }}
            onClick={props.onHide}
            variant="danger"
          >
            Cancelar
          </Button>
          <Button
            style={{ fontWeight: "bolder" }}
            onClick={() => HanddleAttPasswordVal()}
            variant="success"
          >
            {load}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function ModalAnalyze(props) {
  const [totalGasto1, setTotalGasto1] = useState("")
  const [totalGasto2, setTotalGasto2] = useState("")
  const [totalGasto3, setTotalGasto3] = useState("")
  const [totalGasto4, setTotalGasto4] = useState("")
  const [totalGasto5, setTotalGasto5] = useState("")
  const [totalGasto6, setTotalGasto6] = useState("")

  const hide = () => {
    props.onHide()
    setTotalGasto1("")
    setTotalGasto2("")
    setTotalGasto3("")
    setTotalGasto4("")
    setTotalGasto5("")
    setTotalGasto6("")
  }

  async function HanddleAnalyzeVal() {
    let userdata = Userdata()

    let res = await HanddleAnalyze({
      id_usuario: userdata.id,
      mes: props.mes,
      ano: props.ano,
    })

    if (res !== undefined) {
      setTotalGasto1(res.total_gasto1)
      setTotalGasto2(res.total_gasto2)
      setTotalGasto3(res.total_gasto3)
      setTotalGasto4(res.total_gasto4)
      setTotalGasto5(res.total_gasto5)
      setTotalGasto6(res.total_gasto6)
    }
  }

  if (totalGasto1 === "" && totalGasto2 === "" && totalGasto3 === "" && totalGasto4 === "" && totalGasto5 === "" && totalGasto6 === "" && props.show === true && props.mes !== "" && props.ano !== "") {
    HanddleAnalyzeVal()
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => hide()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter-2">
            Análise de Gasto - {(props.mes !== "") && (props.ano !== "") ? `${props.mes}/${props.ano}` : "Erro"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(props.mes !== "") && (props.ano !== "") ?
            <HistoryChart
            contas={totalGasto1}
            saude={totalGasto2}
            alimentacao={totalGasto3}
            emergencia={totalGasto5}
            lazer={totalGasto4}
            bens={totalGasto6}
            />
            : "Nenhum Mes ou Ano Selecionado !!!"}
          
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ fontWeight: "bolder" }}
            onClick={() => hide()}
            variant="success"
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { ModalAtt, ModalAdd, ModalRm, ModalAttInfo, ModalAttSenha, ModalAnalyze };
