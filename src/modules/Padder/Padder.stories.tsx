import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Padder from './Padder';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
const types = ['top', 'bottom', 'left', 'right', 'horizontal', 'vertical', 'all'];

storiesOf('Padder', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <div style={{ background: 'lightGrey' }}>
      <Padder type={select<any>('Type', types, 'all')} size={select<any>('Size', sizes, 'md')}>
        Hello
      </Padder>
    </div>
  ));
