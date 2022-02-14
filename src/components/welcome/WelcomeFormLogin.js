import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap-floating-label";

import { HanddleLoginSubmit } from "../../services/api.js";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState("Entrar");

  const [showPassword, setShowPassword] = useState("password");

  const showPasswordInput = () => {
    document.querySelector("input#showPassword").checked === true
      ? setShowPassword("text")
      : setShowPassword("password");
  };

  async function HanddleLoginVal(e) {
    e.preventDefault();

    setLoad(<i className="bx bx-loader-alt bx-spin bx-flip-horizontal" />);

    if (email !== "" && password !== "") {
      const body = {
        email_l: email,
        password_l: password,
      };

      let res = await HanddleLoginSubmit(
        body,
        document.querySelector("input#keepL").checked
      );

      switch (res) {
        default:
          setLoad("Entrar");
      }
    } else {
      alert("Preencha todos os campos !!!");
      setLoad("Entrar");
    }
  }

  return (
    <div>
      <Form>
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
            type={showPassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Entre com sua senha"
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
          {["checkbox"].map((type) => (
            <div key={`default-${type}`} className="mb-3">
              <Form.Check type={type} id={`keepL`} label={`Manter Logado`} />
            </div>
          ))}
        </Form.Group>
        <Button onClick={HanddleLoginVal} variant="success">
          {load}
        </Button>
      </Form>
    </div>
  );
}

export default FormLogin;
