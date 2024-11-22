import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { IBarChartProps } from "../types";

echarts.use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
  GridComponent,
]);

const BarChartComponent: React.FC<IBarChartProps> = ({
  chartData,
  title,
  color = "#1890ff",
  style = undefined,
  hideLegend = false,
  height = "400px",
  yAxisLabel = "",
  formatYAxisAsUSD = false,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      /* 
      Attempting to adjust the barWidth dynamically based on number of data points and chart width.
      This is a rough implementation and should be thoroughly tested and adjusted.
      */
      const calculateBarWidth = () => {
        const chartWidth = chartInstance.getWidth();
        return Math.max(5, chartWidth / (chartData.length * 2));
      };

      const option = {
        title: {
          text: title,
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          show: !hideLegend,
        },
        xAxis: {
          type: "category",
          data: chartData.map((item) => item[0]),
        },
        yAxis: {
          type: "value",
          name: yAxisLabel,
          axisLabel: {
            formatter: formatYAxisAsUSD
              ? (value: number) => `$${value.toFixed(2)}`
              : undefined,
          },
        },
        series: [
          {
            data: chartData.map((item) => item[1]),
            type: "bar",
            itemStyle: {
              color: color,
            },
            barWidth: calculateBarWidth(),
          },
        ],
      };

      chartInstance.setOption(option);

      const handleResize = () => {
        option.series[0].barWidth = calculateBarWidth();
        chartInstance.setOption(option);
        chartInstance.resize();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        chartInstance.dispose();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [chartData, title, color, hideLegend, yAxisLabel]);

  return <div ref={chartRef} style={{ width: "100%", height, ...style }} />;
};

export default BarChartComponent;
