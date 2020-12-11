import { boolean, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import FilterIcon from './FilterIcon';
import UpIcon from './UpIcon';
import DownIcon from './DownIcon';

export const Filter = () => <FilterIcon isActive={boolean('isActive', false)} isFilled={boolean('isFilled', false)} />;
export const Up = () => <UpIcon isActive={boolean('isActive', false)} />;
export const Down = () => <DownIcon isActive={boolean('isActive', false)} />;

export default {
  title: 'Components/Icons',
  decorators: [withKnobs],
};
