import { Row, Col } from "react-bootstrap";

function Panel() {
  return (
    <>
      <Row>
        <Col sm>
          <Row>
            <Col>
              <div className="container-panel-card">
                <h4>Saldo disponível:</h4>
                <h2>R$ 1000,00</h2>
              </div>
            </Col>
            <Col sm>
              <div className="container-panel-card">
                <h4>Gastos:</h4>
                <h2>R$ 1000,00</h2>
              </div>
            </Col>
            <Col sm>
              <div className="container-panel-card">
                <h4>Metas:</h4>
                <h2>R$ 1000,00</h2>
              </div>
            </Col>
          </Row>

          <Row className="container-panel">
            <Col sm>
              <h4>Gastos do mês de Julho</h4>
              <p>aaaaaaaaaaaaa</p>
            </Col>
            <Col sm>teste</Col>
          </Row>
        </Col>

        <Col sm>
          <div className="container-panel-view">
            <h4>Viauzalização:</h4>
            <h1>R$ 1000,00</h1>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Panel;
