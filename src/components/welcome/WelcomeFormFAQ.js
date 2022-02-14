import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function FormFaq() {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [load, setLoad] = useState("Enviar");

  async function HanddleFAQVal(e) {
    e.preventDefault();

    setLoad(<i class="bx bx-loader-alt bx-spin bx-flip-horizontal" />);

    if (email !== "" && title !== "" && content !== "") {
      setContent("")
      setEmail("")
      setTitle("")
      alert("Mensagem Enviada !!!")
    } else {
      alert("Preencha todos os campos !!!");
    }

    setLoad("Enviar");
  }

  return (
    <Form>
      <Form.Group>
        <Form.Control
          placeholder="Endereço de Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Assunto"
        />
      </Form.Group>
      <Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Mensagem"
            as="textarea"
            rows={3}
          />
        </Form.Group>
      </Form.Group>
      <Button onClick={HanddleFAQVal} variant="success">
        {load}
      </Button>
    </Form>
  );
}

export default FormFaq;
