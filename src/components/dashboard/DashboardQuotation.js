import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { HanddleCoinQuotation } from "../../services/api.js";
import { QuotationChart } from "./DashboardChart.js";

function Quotation() {
  const [selectCoin0, setSelectCoin0] = useState("USD-BRL");
  const [enbSelect0, setEnbSelect0] = useState(false);
  const [coin0, setCoin0] = useState([]);
  const [chartBid, setChartBid] = useState([["x", "Compra"]]);
  const [chartAsk, setChartAsk] = useState([["x", "Venda"]]);
  const [coinIn, setCoinIn] = useState(1);
  const [coinConvert, setCoinConvert] = useState(0);

  const coins = [
    { coin: "", value: "", disable: true },
    { coin: "Real (Dólar)", value: "BRL-USD", format: "USD", disable: false },
    { coin: "Real (Euro)", value: "BRL-EUR", format: "EUR", disable: false },
    { coin: "Dólar (Real)", value: "USD-BRL", format: "BRL", disable: false },
    { coin: "Dólar (Euro)", value: "USD-EUR", format: "EUR", disable: false },
    { coin: "Euro (Real)", value: "EUR-BRL", format: "BRL", disable: false },
    { coin: "Euro (Dólar)", value: "EUR-USD", format: "USD", disable: false },
    {
      coin: "Libra Esterlina(Real)",
      value: "GBP-BRL",
      format: "BRL",
      disable: false,
    },
    {
      coin: "Libra Esterlina(Dólar)",
      value: "GBP-USD",
      format: "USD",
      disable: false,
    },
    {
      coin: "Libra Esterlina(Euro)",
      value: "GBP-EUR",
      format: "EUR",
      disable: false,
    },
    {
      coin: "Yen Japonês (Real)",
      value: "JPY-BRL",
      format: "BRL",
      disable: false,
    },
    {
      coin: "Yen Japonês (Dólar)",
      value: "JPY-USD",
      format: "USD",
      disable: false,
    },
    {
      coin: "Yen Japonês (Euro)",
      value: "JPY-EUR",
      format: "EUR",
      disable: false,
    },
    {
      coin: "Yuan Chinês (Real)",
      value: "CNY-BRL",
      format: "BRL",
      disable: false,
    },
    {
      coin: "Yuan Chinês (Dólar)",
      value: "CNY-USD",
      format: "USD",
      disable: false,
    },
    {
      coin: "Yuan Chinês (Euro)",
      value: "CNY-EUR",
      format: "EUR",
      disable: false,
    },
    {
      coin: "Rublo Russo (Real)",
      value: "RUB-BRL",
      format: "BRL",
      disable: false,
    },
    {
      coin: "Rublo Russo (Dólar)",
      value: "RUB-USD",
      format: "USD",
      disable: false,
    },
    {
      coin: "Rublo Russo (Euro)",
      value: "RUB-EUR",
      format: "EUR",
      disable: false,
    },
    { coin: "Bitcoin (Real)", value: "BTC-BRL", format: "BRL", disable: false },
    {
      coin: "Bitcoin (Dólar)",
      value: "BTC-USD",
      format: "USD",
      disable: false,
    },
    { coin: "Bitcoin (Euro)", value: "BTC-EUR", format: "EUR", disable: false },
    {
      coin: "Ethereum (Real)",
      value: "ETH-BRL",
      format: "BRL",
      disable: false,
    },
    {
      coin: "Ethereum (Dólar)",
      value: "ETH-USD",
      format: "USD",
      disable: false,
    },
    {
      coin: "Ethereum (Euro)",
      value: "ETH-EUR",
      format: "EUR",
      disable: false,
    },
  ];

  async function quotation(coins, format) {
    let res = await HanddleCoinQuotation({ coin: coins });

    let dataBid = [["x", "Compra"]];
    let dataAsk = [["x", "Venda"]];

    if (typeof res[1] === "object" && typeof res[1] !== "undefined") {
      if (Object.keys(res[1]).length > 0) {
        for (let x = 0; Object.keys(res[1]).length > x; x++) {
          dataBid[x + 1] = [x, res[1][x].bid];
          dataAsk[x + 1] = [x, res[1][x].ask];
        }
        setChartBid(dataBid);
        setChartAsk(dataAsk);
      }
    }

    if (typeof res[0] === "object" && typeof res[0] !== "undefined") {
      res[0].bid = Number.parseFloat(res[0].bid);
      res[0].ask = Number.parseFloat(res[0].ask);
      res[0].low = Number.parseFloat(res[0].low);
      res[0].high = Number.parseFloat(res[0].high);
      res[0].format = format;
      setCoin0([res[0]]);
      setCoinConvert(res[0].bid);
    }
  }

  useEffect(() => {
    setEnbSelect0(true);
    quotation(
      selectCoin0,
      coins.find((element) => element.value === selectCoin0).format
    );
    setEnbSelect0(false);
    // eslint-disable-next-line
  }, [selectCoin0]);

  if (Object.keys(coin0).length < 1) {
    quotation(
      selectCoin0,
      coins.find((element) => element.value === selectCoin0).format
    );
  }

  return (
    <>
      <div className="container-wallet">
        <div className="quotation-card">
          <div className="coin-title">
            <h3>Cotação de Moedas</h3>
          </div>
          <div>
            <div className="coin-select0">
              <Form.Control
                as="select"
                custom
                value={selectCoin0}
                onChange={(e) => setSelectCoin0(e.target.value)}
                disabled={enbSelect0}
              >
                {coins.map((opt, index) => (
                  <option
                    value={opt.value}
                    key={index}
                    disabled={opt.disable}
                    format={opt.format}
                  >
                    {opt.coin}
                  </option>
                ))}
              </Form.Control>
            </div>
            <div>
              <Form.Group className="number-coin">
                <InputGroup>
                  <Form.Control
                    type="number"
                    style={{ marginTop: "1rem" }}
                    value={coinIn}
                    onChange={(e) => setCoinIn(e.target.value)}
                    onInput={(e) => setCoinConvert(e.target.value * coin0[0].bid)}
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text style={{ marginTop: "1rem" }}>
                    {coin0.map((c) => (c.code))}
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
                <InputGroup>
                  <Form.Control
                    type="number"
                    style={{ marginTop: ".5rem" }}
                    value={coinConvert}
                    onChange={(e) => setCoinConvert(e.target.value)}
                    onInput={(e) => setCoinIn(e.target.value / coin0[0].bid)}
                  />
                  <InputGroup.Prepend>
                    <InputGroup.Text style={{ marginTop: ".5rem" }}>
                      {coin0.map((c) => (c.codein))}
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
            </div>
            {coin0.map((c, index) => (
              <div key={index}>
                <p style={{ marginTop: "2rem" }}>
                  <strong>Moeda:</strong> {c.name}
                </p>
                <p>
                  <strong>Código:</strong> {c.code}
                </p>
                <p>
                  <strong>Valor mais alto:</strong>{" "}
                  {c.high === "undefined"
                    ? "Erro"
                    : c.high.toLocaleString("pt-br", {
                        style: "currency",
                        currency: c.format,
                      })}
                </p>
                <p>
                  <strong>Valor mais baixo:</strong>
                  {c.low === "undefined"
                    ? "Erro"
                    : c.low.toLocaleString("pt-br", {
                        style: "currency",
                        currency: c.format,
                      })}
                </p>
                <p>
                  <strong>Valor de compra:</strong>
                  {c.bid === "undefined"
                    ? "Erro"
                    : c.bid.toLocaleString("pt-br", {
                        style: "currency",
                        currency: c.format,
                      })}
                </p>
                <p>
                  <strong>Valor de venda:</strong>
                  {c.ask === "undefined"
                    ? "Erro"
                    : c.ask.toLocaleString("pt-br", {
                        style: "currency",
                        currency: c.format,
                      })}
                </p>
                <p>
                  <strong>Percetual de mudança:</strong> {c.pctChange.replace(".", ",")}%
                </p>
              </div>
            ))}
          </div>
          <div>
            <QuotationChart
              chartBid={chartBid}
              chartAsk={chartAsk}
              currency={
                coins.find((element) => element.value === selectCoin0).format
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Quotation;
