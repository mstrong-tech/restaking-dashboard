"use client";
import "chart.js/auto";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { cloneDeep } from "lodash";

const dataConfig = {
  labels: [],

  datasets: [
    // {
    //   label: "Staked ETH",
    //   data: [],
    //   backgroundColor: "rgba(255, 99, 132, 0.2)",

    //   borderColor: ["rgba(255, 99, 132, 1)"],
    //   borderWidth: 1,
    // },
    {
      label: "stEth",
      data: [],
      backgroundColor: ["rgba(75, 192, 192, 0.2)"],
      borderColor: ["rgba(75, 192, 192, 1)"],
      borderWidth: 1,
    },
    {
      label: "rEth",
      data: [],
      backgroundColor: ["rgba(255, 206, 86, 0.2)"],
      borderColor: ["rgba(255, 206, 86, 1)"],
      borderWidth: 1,
    },
  ],
};

export default (data: any) => {
  const chartData = useMemo(() => {
    const internalChartData = cloneDeep(dataConfig);

    internalChartData.labels = data.data.labels;
    internalChartData.datasets.forEach((dataset, index) => {
      dataset.data = data.data.amounts[index];
      dataset.label = data.data.namedLabels[index];
    });
    // Todo: change dataset generation
    if (data.data.namedLabels.length === 1) {
      internalChartData.datasets.pop();
    }
    return internalChartData;
  }, [data]);

  return (
    <Bar
      data={chartData}
      options={{
        maintainAspectRatio: false,
        normalized: true,
        scales: {
          x: { stacked: true, min: 0, max: 30 },
          y: { stacked: true },
        },
      }}
    />
  );
};
