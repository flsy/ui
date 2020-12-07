import React from 'react';
import styled from 'styled-components';
import ChartTile from './ChartTile';
import { ChartType } from './interfaces';

interface IProps {
  charts: ChartType[];
}

const ChartsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .DonutChart table tr td {
    padding: 0 4px;
  }

  .DonutChart svg {
    display: block;
  }

  .NumberChart {
    font-size: 4em;
    border-radius: 50%;
    text-align: center;
  }
`;

const Charts: React.FC<IProps> = ({ charts }) => {
  return (
    <ChartsWrapper>
      {charts.map((chart) => (
        <ChartTile key={chart.title} chart={chart} width={350} height={350} />
      ))}
    </ChartsWrapper>
  );
};

export default Charts;
