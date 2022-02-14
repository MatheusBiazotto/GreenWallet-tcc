import Chart from "react-google-charts";
import { Button } from "react-bootstrap";
import { useState } from "react";

function Graph(props) {
  const [gview, setGview] = useState("l");

  return (
    <>
      <div className="panel-chart-btn">
        <Button variant="success" onClick={() => setGview("l")}>
          Limite Disponivel
        </Button>
        <Button variant="success" onClick={() => setGview("m")}>
          Movimentações
        </Button>
      </div>
      <div className="hr-panel" />
      <h3 className="panel-chart-title">
        {gview === "m" ? "Movimentações" : "Limite Restante"}
      </h3>
      {gview === "m" ? (
        props.s !== 0 || props.p !== 0 ? (
          <Chart
            chartType="PieChart"
            style={{ height: "23rem" }}
            loader={<div>Carregando...</div>}
            data={[
              ["Type", "Value"],
              ["Gasto", props.s],
              ["Lucro", props.p],
            ]}
            options={{
              legend: "none",
              colors: ["#e2c626", "#4CAF50"],
              fontSize: 18,
            }}
          />
        ) : (
          <>
            <br />
            <div className="non-spent-list-item">
              Nenhum gasto ou lucro cadastrado.
            </div>
          </>
        )
      ) : (
        <Chart
          chartType="PieChart"
          style={{ height: "23rem" }}
          loader={<div>Carregando...</div>}
          data={
            props.l > props.s
              ? [
                  ["Type", "Value"],
                  ["Limite Restante", props.l],
                  ["Limite Gasto", props.s],
                ]
              : [
                  ["Type", "Value"],
                  ["Limite Gasto", props.s],
                ]
          }
          options={{
            legend: "none",
            colors: props.l > props.s ? ["#841ded", "#e2c626"] : ["#e2c626"],
            fontSize: 18,
          }}
        />
      )}
    </>
  );
}

function QuotationChart(props) {
  return (
    <>
      <Chart
        style={{ height: "14rem" }}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={props.chartBid}
        options={{
          hAxis: {
            title: "Tempo (Dias)",
          },
          vAxis: {
            title: `Valor de Compra (${props.currency})`,
          },
          legend: "none",
          colors: ["#4CAF50"],
          fontSize: 14,
        }}
      />
      <Chart
        style={{ height: "14rem" }}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={props.chartAsk}
        options={{
          hAxis: {
            title: "Tempo (Dias)",
          },
          vAxis: {
            title: `Valor de Venda (${props.currency})`,
          },
          legend: "none",
          colors: ["#841ded"],
          fontSize: 14,
        }}
      />
    </>
  );
}

function HistoryChart(props) {
  const paymantType = [
    "Contas",
    "Saúde",
    "Alimentação",
    "Emergência",
    "Lazer",
    "Bens",
  ];

  const chartData = {
    maxSpent: function () {
      let arr = [
        props.contas,
        props.saude,
        props.alimentacao,
        props.emergencia,
        props.lazer,
        props.bens,
      ];

      var indexes = "",
        i = -1;
      for (i = 0; i < arr.length; i++) {
        if (arr[i] === Math.max(...arr)) {
          indexes += `${paymantType[i]} `;
        }
      }

      return { value: Math.max(...arr), index: indexes };
    },

    minSpent: function () {
      let arr = [
        props.contas,
        props.saude,
        props.alimentacao,
        props.emergencia,
        props.lazer,
        props.bens,
      ];

      var indexes = [],
        i = -1;
      for (i = 0; i < arr.length; i++) {
        if (arr[i] === Math.min(...arr)) {
          indexes += `${paymantType[i]} `;
        }
      }

      return { value: Math.min(...arr), index: indexes };
    },
  };

  return (
    <>
      <Chart
        chartType="PieChart"
        style={{ height: "23rem" }}
        loader={<div>Carregando...</div>}
        data={[
          ["Type", "Value"],
          ["Contas", props.contas],
          ["Saúde", props.saude],
          ["Alimentação", props.alimentacao],
          ["Emergência", props.emergencia],
          ["Lazer", props.lazer],
          ["Bens", props.bens],
        ]}
        options={{
          legend: "none",
          colors: [
            "#e2c626",
            "#59139e",
            "#4CAF50",
            "#7f00ff",
            "#ff0000",
            "#29802c",
          ],
          fontSize: 18,
        }}
      />
      <p>
        <strong>Categoria(s) com maior valor gasto: </strong>
        {chartData.maxSpent().index} - R${chartData.maxSpent().value}
      </p>
      <p>
        <strong>Categoria(s) com menor valor gasto: </strong>
        {chartData.minSpent().index} - R${chartData.minSpent().value}
      </p>
    </>
  );
}

export default Graph;
export { QuotationChart, HistoryChart };
