import { useEffect, useState } from "react";
import { Form, Col, Button, InputGroup, Image } from "react-bootstrap";
import {
  Userdata,
  HanddleConsultWalletSpentProfitSubmit,
} from "../../services/api";

import { ModalAtt, ModalAttInfo, ModalAttSenha } from "./DashboardModals.js";
import { currentDate } from "./DashboardData.js";

const assets = [
  "https://greenwallet-team.github.io/assets/new-images/men.jpg",
  "https://greenwallet-team.github.io/assets/new-images/woman.jpg",
  "https://greenwallet-team.github.io/assets/new-images/astro_pfp.jpg",
  "https://greenwallet-team.github.io/assets/images/logo.png",
];

function Settings() {
  let userdata = Userdata();

  const initialName = userdata.name;
  const initialSurname = userdata.surname;
  let initialLimit = "";
  const initialEmail = userdata.email;
  const initialGender = userdata.gender;

  const [name, setName] = useState(initialName);
  const [surname, setSurname] = useState(initialSurname);
  const [email, setEmail] = useState(initialEmail);
  const [image, setImage] = useState(initialGender);
  const [limit, setLimit] = useState("");
  const [password, setPassword] = useState("");
  const [modalValShow, setModalValShow] = useState(false);
  const [stateReload, setStateReload] = useState(false);
  const [enbBtn, setEnbBtn] = useState(true);
  const [readOnlyInput0, setReadOnlyInput0] = useState(true);
  const [readOnlyInput1, setReadOnlyInput1] = useState(true);
  const [readOnlyInput2, setReadOnlyInput2] = useState(false);
  const [readOnlyInput3, setReadOnlyInput3] = useState(true);
  const [readOnlyInput4, setReadOnlyInput4] = useState(false);
  
  async function limitValue() {
    let res = await HanddleConsultWalletSpentProfitSubmit({
      id_usuario: userdata.id,
      mes: currentDate()[2],
      ano: currentDate()[3],
    });

    if (typeof res[0] === "object" && typeof res[0] !== "undefined") {
      initialLimit = res[0].saldo - res[0].lucros + res[0].gastos;
      setLimit(initialLimit);
    } else {
      setLimit("0");
    }
  }

  useEffect(() => {
    if (stateReload === true) {
      window.location.replace("/dashboard/settings")

      return setStateReload(false);
    }
  }, [stateReload]);

  useEffect(() => {
    if (
      readOnlyInput0 === false ||
      readOnlyInput1 === false ||
      readOnlyInput3 === false ||
      initialGender !== image
    )
      setEnbBtn(false);
    else {
      setEnbBtn(true);
    }
  }, [
    readOnlyInput0,
    readOnlyInput1,
    readOnlyInput3,
    image,
    initialGender,
  ]);

  if (limit === "") {
    limitValue();
  }

  return (
    <div className="container-wallet">
      <div className="settings-card">
        <h2 className="settings-title">Configurações</h2>
        <div className="hr-wallet" />
        <div>
          <Form>
            <Form.Row>
              <Form.Group as={Col} className="settings-input">
                <Form.Label>Nome:</Form.Label>
                <InputGroup>
                  <Form.Control
                    maxLength="12"
                    type="text"
                    placeholder="Nome"
                    readOnly={readOnlyInput0}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      onClick={(e) =>
                        readOnlyInput0 === true
                          ? setReadOnlyInput0(false)
                          : (setReadOnlyInput0(true), setName(initialName))
                      }
                    >
                      {readOnlyInput0 === true ? (
                        <i className="bx bx-pencil" />
                      ) : (
                        <i className="bx bx-x" />
                      )}
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} className="settings-input">
                <Form.Label>Sobrenome:</Form.Label>
                <InputGroup>
                  <Form.Control
                    maxLength="12"
                    type="text"
                    placeholder="Sobrenome"
                    readOnly={readOnlyInput1}
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      onClick={(e) =>
                        readOnlyInput1 === true
                          ? setReadOnlyInput1(false)
                          : (setReadOnlyInput1(true),
                            setSurname(initialSurname))
                      }
                    >
                      {readOnlyInput1 === true ? (
                        <i className="bx bx-pencil" />
                      ) : (
                        <i className="bx bx-x" />
                      )}
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Group className="settings-input">
              <Form.Label>Limite Informado:</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="Limite"
                  readOnly={true}
                  value={limit}
                />
                <InputGroup.Prepend>
                  <InputGroup.Text onClick={(e) => setReadOnlyInput2(true)}>
                    <i className="bx bx-pencil" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
            </Form.Group>

            <Form.Row >
              <Form.Group as={Col} className="settings-input">
                <Form.Label>Email:</Form.Label>
                <InputGroup>
                  <Form.Control
                    maxLength="60"
                    type="email"
                    placeholder="Email"
                    readOnly={readOnlyInput3}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      onClick={(e) =>
                        readOnlyInput3 === true
                          ? setReadOnlyInput3(false)
                          : (setReadOnlyInput3(true), setEmail(initialEmail))
                      }
                    >
                      {readOnlyInput3 === true ? (
                        <i className="bx bx-pencil" />
                      ) : (
                        <i className="bx bx-x" />
                      )}
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} className="settings-input">
                <Form.Label>Senha:</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="password"
                    placeholder={`*****`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    readOnly={true}
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      onClick={(e) => setReadOnlyInput4(true)}
                    >
                      <i className="bx bx-pencil" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row className="settings-check">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Imagem:</Form.Label>
                <div>
                  <Form.Label>
                    <Image src={assets[0]} width={"100px"} />
                  </Form.Label>
                  <InputGroup>
                    <Form.Check
                      inline
                      label="1"
                      name="group1"
                      type={"radio"}
                      checked={image === 0 ? true : ""}
                      onChange={(e) => setImage(0)}
                    />
                  </InputGroup>
                </div>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>&nbsp;</Form.Label>
                <div>
                  <Form.Label>
                    <Image src={assets[1]} width={"100px"} />
                  </Form.Label>
                  <InputGroup>
                    <Form.Check
                      inline
                      label="2"
                      name="group1"
                      type={"radio"}
                      checked={image === 1 ? true : ""}
                      onChange={(e) => setImage(1)}
                    />
                  </InputGroup>
                </div>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>&nbsp;</Form.Label>
                <div>
                  <Form.Label>
                    {" "}
                    <Image src={assets[2]} width={"100px"} />
                  </Form.Label>
                  <InputGroup>
                    <Form.Check
                      inline
                      label="3"
                      name="group1"
                      type={"radio"}
                      checked={image === 2 ? true : ""}
                      onChange={(e) => setImage(2)}
                    />
                  </InputGroup>
                </div>
              </Form.Group>
            </Form.Row>
            <Button
              style={{ fontWeight: "bold" }}
              className="settings-save"
              variant="success"
              onClick={(e) => setModalValShow(true)}
              disabled={enbBtn}
            >
              Salvar
            </Button>
          </Form>
          <div>
            <ModalAttInfo
              show={modalValShow}
              onHide={() => setModalValShow(false)}
              nameA={name}
              surnameA={surname}
              emailA={email}
              passwordA={password}
              imagemA={image}
              limitA={limit}
              inpReadOnly={[
                readOnlyInput0,
                readOnlyInput1,
                readOnlyInput3,
                readOnlyInput4,
              ]}
              reloading={(e) => setStateReload(true)}
            />
          </div>
          <div>
            <ModalAtt
              show={readOnlyInput2}
              onHide={() => setReadOnlyInput2(false)}
              reloading={() => setStateReload(true)}
            />
          </div>
          <div>
            <ModalAttSenha
              show={readOnlyInput4}
              onHide={() => setReadOnlyInput4(false)}
              reloading={() => setStateReload(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
