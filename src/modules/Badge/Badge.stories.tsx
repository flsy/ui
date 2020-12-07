import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button } from '../../index';
import Badge from './Badge';

storiesOf('Badge', module)
  .add('badge', () => (
    <>
      Hello <Badge value={10} />
    </>
  ))
  .add('button badge', () => (
    <Badge value={10}>
      <Button>Abc</Button>
    </Badge>
  ));
