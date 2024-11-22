export interface IBarChartProps {
  chartData: Array<[string, number]>;
  title: string;
  color?: string;
  style?: React.CSSProperties;
  hideLegend?: boolean;
  height?: string;
  barWidths?: number;
  yAxisLabel?: string;
  formatYAxisAsUSD?: boolean;
}
