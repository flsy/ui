import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Pulse from './Pulse';

storiesOf('Pulse', module)
  .addDecorator(withKnobs)
  .add('basic usage', () => <Pulse isAnimated={boolean('isAnimated', true)} />);
