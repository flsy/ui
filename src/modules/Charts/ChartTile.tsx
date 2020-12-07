import React from 'react';
import styled from 'styled-components';
import Chart from './Chart';
import { ChartType } from './interfaces';

export interface IProps {
  chart: ChartType;
  width: number;
  height: number;
}

const ChartTitleWrapper = styled.div<{ width?: number; height?: number }>`
  margin: 10px;
  min-width: ${({ width }) => width || 300}px;
  min-height: ${({ height }) => height || 300}px;
`;

const ChartTile: React.FC<IProps> = ({ chart, width, height }) => {
  return (
    <ChartTitleWrapper>
      <h2>{chart.title}</h2>
      <Chart chart={chart} height={height} width={width} />
    </ChartTitleWrapper>
  );
};

export default ChartTile;
