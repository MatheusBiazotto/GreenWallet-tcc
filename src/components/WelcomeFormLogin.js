import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap-floating-label";

import { HanddleLoginSubmit } from "../services/api.js";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState("password");

  const showPasswordInput = () => {
    document.querySelector("input#showPassword").checked === true
      ? setShowPassword("text")
      : setShowPassword("password");
  }

  async function HanddleLoginVal(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      const body = {
        email_l: email,
        password_l: password
      };
      
      HanddleLoginSubmit(body, document.querySelector("input#keepL").checked);
    } else {
      alert("Preencha todos os campos !!!")
    }
  }

  return (
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
              label={`Mostar senha`}
              onChange={showPasswordInput}
            />
          </div>
        ))}
        {["checkbox"].map((type) => (
          <div key={`default-${type}`} className="mb-3">
            <Form.Check
              type={type}
              id={`keepL`}
              label={`Manter Logado`}
            />
          </div>
        ))}
      </Form.Group>
      <Button onClick={HanddleLoginVal} variant="success">
        Entrar
      </Button>
    </Form>
  );
}

export default FormLogin;
