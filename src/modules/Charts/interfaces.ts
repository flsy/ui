interface DonutChartProps {
  title: string;
  type: 'donut';
  data: Array<{
    label: string;
    value: number;
    colour: string;
  }>;
}

interface BarChartProps {
  title: string;
  type: 'bar';
  colour: string;
  data: Array<{
    key: string;
    value: number;
  }>;
}

interface LineChartProps {
  title: string;
  type: 'line';
  colour: string;
  data: Array<{
    key: number;
    value: number;
  }>;
}

interface RowChartProps {
  title: string;
  type: 'row';
  colour: string;
  data: Array<{
    key: string;
    value: number;
  }>;
}

interface NumberChartProps {
  title: string;
  type: 'number';
  label?: string;
  colour: string;
  data: number;
}

export type ChartType = BarChartProps | DonutChartProps | LineChartProps | RowChartProps | NumberChartProps;
