import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import FilterIcon from './FilterIcon';

storiesOf('Icon', module)
  .addDecorator(withKnobs)
  .add('filter icon', () => <FilterIcon isActive={boolean('isActive', false)} isFilled={boolean('isFilled', false)} />);
