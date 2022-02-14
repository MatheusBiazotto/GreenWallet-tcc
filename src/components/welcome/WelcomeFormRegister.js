import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap-floating-label";

import { HanddleRegisterSubmit } from "../../services/api.js";

const maxLength = () => ((
  document.querySelector("input#name-input").setAttribute("maxlength", "12"),
  document.querySelector("input#lastname-input").setAttribute("maxlength", "12"),
  document.querySelector("input#email-input").setAttribute("maxlength", "60"),
  document.querySelector("input#showPassword-input").setAttribute("maxlength", "100"),
  document.querySelector("input#showCPassword-input").setAttribute("maxlength", "100")
));

const displayReg = () => {
  return document.querySelector("div#reg01").style.display === "block"
    ? ((document.querySelector("div#reg01").style.display = "none"),
      (document.querySelector("div#reg02").style.display = "block"),
      (document.querySelector("img#img-signup").style.marginTop = "12%"))
    : ((document.querySelector("div#reg01").style.display = "block"),
      (document.querySelector("div#reg02").style.display = "none"),
      (document.querySelector("img#img-signup").style.marginTop = "25%"));
};

function FormRegister() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [gender, setGender] = useState("");
  const [income, setIncome] = useState(1);

  const [load, setLoad] = useState("Cadastrar");
  const [btnNext, enableBtnNext] = useState(true)

  const [showPassword, setShowPassword] = useState("password");

  const showPasswordInput = () => {
    document.querySelector("input#showPassword").checked === true
      ? setShowPassword("text")
      : setShowPassword("password");
  };

  const nextReg = () => {
    if (
      name !== "" &&
      lastname !== "" &&
      email !== "" &&
      password !== "" &&
      Cpassword !== "" &&
      gender !== ""
    ) {
      enableBtnNext(false)
    }
    else {
      enableBtnNext(true)
    }
  }

  useEffect(() => {
    window.addEventListener("change", (e) => {
      nextReg()
    });

    window.addEventListener("input", (e) => {
      nextReg()
    });
  },);

  async function HanddleSignupVal(e) {
    e.preventDefault();

    setLoad(<i class="bx bx-loader-alt bx-spin bx-flip-horizontal" />);

    if (document.querySelector("input#userContract").checked === true) {
      if (
        name !== "" &&
        lastname !== "" &&
        email !== "" &&
        password !== "" &&
        Cpassword !== "" &&
        gender !== ""
        
      ) {
        if (password === Cpassword) {
          if (income < 100000 && income > -100000) {
            let res = await HanddleRegisterSubmit({
              name_c: name,
              surname_c: lastname,
              email_c: email,
              password_c: password,
              gender: gender,
              income: income,
            });
  
            switch (res) {
              default:
                setLoad("Cadastrar");
            }
          } else {
            alert("Insira um valor entre 100.000 e -100.000");
            setLoad("Cadastrar");
          }
        } else {
          alert("As senhas não conicidem !!!");
          setLoad("Cadastrar");
        }
      } else {
        alert("Preencha todos os campos !!!");
        setLoad("Cadastrar");
      }
    } else {
      alert("Aceite o Contrato de Termos de Uso !!!");
      setLoad("Cadastrar");
    }
  }

  return (
    <>
      <div id="reg01" style={{ display: "block" }}>
        <Form>
          <Form.Group>
            <FloatingLabel
              id="name"
              label="Primeiro Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={maxLength}
            />
          </Form.Group>
          <Form.Group>
            <FloatingLabel
              id="lastname"
              label="Último nome"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              onFocus={maxLength}
            />
          </Form.Group>
          <Form.Group>
            <FloatingLabel
              id="email"
              label="Endereço de Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={maxLength}
            />
          </Form.Group>
          <Form.Group>
            <FloatingLabel
              id="showPassword"
              type={showPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Crie uma Senha"
              onFocus={maxLength}
            />
          </Form.Group>
          <Form.Group>
            <FloatingLabel
              id="showCPassword"
              type={showPassword}
              value={Cpassword}
              onChange={(e) => setCPassword(e.target.value)}
              label="Confirmar Senha"
              onFocus={maxLength}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control as="select" id="sex" onChange={(e) => setGender(e.target.value)} custom defaultValue="default">
              <option value="default" disabled>Sexo</option>
              <option value="0">Masculino</option>
              <option value="1">Feminino</option>
              <option value="2">Outro</option>
            </Form.Control>
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
          <Button variant="success" disabled={btnNext} id="next" onClick={displayReg} >
            Próximo
          </Button>
        </Form>
      </div>
      <div id="reg02" style={{ display: "none" }}>
        <Form>
          <Form.Label>Vamos criar sua carteira:</Form.Label>
          <Form.Group>
            <FloatingLabel
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              label="Renda Inicial"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control as="select" defaultValue={"default"}>
              <option disabled value="default">
                BRL
              </option>
              <option disabled>Em breve</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            {["checkbox"].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  type={type}
                  id={`userContract`}
                  label={
                    <>
                      Para continuar você deve concordar que leu e aceitou os{" "}
                      <a
                        href="https://greenwallet-team.github.io/assets/files/contract-user.pdf"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Contrato de Termos de Uso
                      </a>
                    </>
                  }
                />
              </div>
            ))}
          </Form.Group>
          <Button onClick={HanddleSignupVal} variant="success">
            {load}
          </Button>
          <Button variant="success" onClick={displayReg}>
            Voltar
          </Button>
        </Form>
      </div>
    </>
  );
}

export default FormRegister;
