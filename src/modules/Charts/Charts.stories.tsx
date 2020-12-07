import { storiesOf } from '@storybook/react';
import React from 'react';
import { Charts } from '../../index';
import { ChartType } from './interfaces';

const charts: ChartType[] = [
  {
    type: 'line',
    title: 'Line chart #1',
    colour: '#70D6FF',
    data: [
      { key: 1, value: 20 },
      { key: 2, value: 15 },
      { key: 3, value: 20 },
      { key: 4, value: 50 },
      { key: 6, value: 20 },
      { key: 8, value: 30 },
      { key: 10, value: 20 },
    ],
  },
  {
    type: 'number',
    title: 'Number chart #2',
    data: 42,
    colour: '#70D6FF',
  },
  {
    title: 'Donut chart #3',
    type: 'donut',
    data: [
      { label: 'value A', value: 20, colour: '#E9FF70' },
      { label: 'value B', value: 30, colour: '#FFD670' },
      { label: 'value C', value: 10, colour: '#FF9770' },
      { label: 'value D', value: 30, colour: '#70D6FF' },
    ],
  },
  {
    type: 'row',
    title: 'Row chart #4',
    colour: '#F374AE',
    data: [
      { value: 20, key: 'data #1' },
      { value: 80, key: 'data #2' },
      { value: 98, key: 'data #3' },
      { value: 10, key: 'data #4' },
      { value: 44, key: 'data #5' },
    ],
  },
  {
    type: 'bar',
    title: 'Bar chart #5',
    colour: '#FFD670',
    data: [
      { key: 'bar #1', value: 5 },
      { key: 'bar #2', value: 8 },
      { key: 'bar #3', value: 12 },
      { key: 'bar #4', value: 10 },
    ],
  },
];

storiesOf('Charts', module).add('basic usage', () => <Charts charts={charts} />);
