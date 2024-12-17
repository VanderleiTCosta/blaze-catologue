import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// Componente DonutChart que pode ser utilizado em outros componentes
const DonutChart = ({ value1, value2, value3 }) => {
  const [series] = useState([value1, value2, value3]);
  const [options] = useState({
    chart: {
      type: 'donut',
      width: '100%',  // Garante que o gráfico utilize 100% do contêiner
      height: '100%', // Define uma altura fixa para o gráfico
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%', // Ajuste o tamanho do donut
          labels: {
            show: false, // Faltando títulos das fatias, caso deseje manter, altere para true
          },
        },
      },
    },
    stroke: {
      show: true, // Exibe o stroke
      width: 1, // O valor aqui define a grossura das bordas, ajuste conforme desejado
      colors: ['rgba(210, 210, 210, 0.2)'], 
      boxShadow: "2px 2px 10x rgba(0,0,0,1)"
    },
    colors: ['rgba(210, 210, 210, 1)', 'rgba(180, 0, 0, 1)', '#000000'], // Branco, Vermelho, Preto - altere para as cores desejadas
    legend: {
      show: false, // Removendo a legenda
    },
  });

  return (
    <div style={{ width: '100%', height: '100%' }}> {/* Configure o tamanho desejado aqui */}
      <div id="chart">
        <ReactApexChart options={options} series={series} type="donut" />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default DonutChart;