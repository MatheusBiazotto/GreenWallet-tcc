import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap-floating-label";

import { HanddleRegisterSubmit } from "../services/api.js";

export default function FormRegister() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");

  const [showPassword, setShowPassword] = useState("password");

  const showPasswordInput = () => {
    document.querySelector("input#showPassword").checked === true
      ? setShowPassword("text")
      : setShowPassword("password");
  };

  async function HanddleSignupVal(e) {
    e.preventDefault();

    if (document.querySelector("input#userContract").checked === true) {
      if (
        name !== "" &&
        surname !== "" &&
        email !== "" &&
        password !== "" &&
        Cpassword !== ""
      ) {
        if (password === Cpassword) {
          const body = {
            name_c: name,
            surname_c: surname,
            email_c: email,
            password_c: password,
          };

          HanddleRegisterSubmit(body);
        } else {
          alert("As senhas não conicidem !!!");
        }
      } else {
        alert("Preencha todos os campos !!!");
      }
    } else {
      alert("Aceite o Contrato de Termos de Uso !!!");
    }
  }

  function maxLength() {
      document.querySelector("input#name-input").setAttribute("maxlength", "15")
  }

  return (
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
          label="Último nome"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <FloatingLabel
          label="Endereço de Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <FloatingLabel
          id="showPassword"
          type={showPassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Crie uma Senha"
        />
        <Form.Group></Form.Group>
        <FloatingLabel
          id="showPassword"
          type={showPassword}
          value={Cpassword}
          onChange={(e) => setCPassword(e.target.value)}
          label="Confirmar Senha"
        />
      </Form.Group>
      <Form.Group>
        {["checkbox"].map((type) => (
          <div key={`default-${type}`} className="mb-3">
            <Form.Check
              type={type}
              id={`showPassword`}
              label={`Mostar senha`}
              onChange={showPasswordInput}
            />
          </div>
        ))}
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

      <Button onClick={HanddleSignupVal} variant="success" type="submit">
        Cadastrar
      </Button>
    </Form>
  );
}
