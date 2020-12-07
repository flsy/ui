import { BarChart, DonutChart, LineChart, NumberChart, RowChart } from 'metacharts';
import React from 'react';
import { dateReadable } from '../../utils/utils';
import { ChartType } from './interfaces';

interface IProps {
  chart: ChartType;
  height: number;
  width: number;
}

const Chart: React.FC<IProps> = ({ chart, width, height }) => {
  switch (chart.type) {
    case 'donut':
      return <DonutChart width={width} height={height} data={chart.data} valueFormat={(value) => `${Math.floor(value)}`} />;

    case 'bar':
      return <BarChart width={width} height={height} colour={chart.colour} data={chart.data} />;

    case 'line':
      return (
        <LineChart
          width={width}
          height={height}
          colour={chart.colour}
          data={chart.data}
          xAxisTicksRotate={-90} // todo: this should come from dbint
          // @ts-ignore // this is mistake in metacharts
          keyFormat={dateReadable} // todo: this does not always have to be timestamp
        />
      );

    case 'row':
      return <RowChart width={width} colour={chart.colour} data={chart.data} />;

    case 'number':
      return <NumberChart value={chart.data} label={chart.label} valueFormat={(value) => `${Math.floor(value)}`} width={width - 100} color={chart.colour} />;
    default:
      return null;
  }
};

export default Chart;
