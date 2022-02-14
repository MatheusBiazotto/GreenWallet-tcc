import React from "react";
import { Chart } from "react-google-charts";

export function Grafico() {
  const data = [
    ["Orçamento", "Disponível e Gasto"],
    ["Gasto", 300.66],
    ["Disponível", 1000],
  ];

  const options = {
    title: "",
    pieHole: 0.4,
    is3D: false,
    fontSize: 18,
    fontName: "Poppins",
    colors: ["#e2c626", "#59139e"],
    legend: {
      position: "bottom",
      alignment: "center",
    },
    backgroundColor: "#ffffff",
    pieSliceText: "porcentage",
  };

  return (
    <div id="graph">
      <Chart
        chartType="PieChart"
        width={"100%"}
        height={"400px"}
        data={data}
        options={options}
      />
    </div>
  );
}
