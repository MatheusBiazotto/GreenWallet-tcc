import React from "react";
import { Chart } from "react-google-charts";

export function BarGraph() {
  const data = [
    ["Mês", "Renda", "Gasto", "Sobra"],
    ["Abril", 1000, 800, 200],
    ["Maio", 1170, 460, 250],
    ["Junho", 660, 660, 0],
    ["Julho", 1030, 540, 350],
  ];

  const options = {
    legend: {
      position: "bottom",
      alignment: "center",
    },
  };

  return (
    <div id="BarGraph">
      <Chart
        chartType="Bar"
        width={"100%"}
        height={"350px"}
        data={data}
        options={options}
      />
    </div>
  );
}
