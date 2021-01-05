import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button } from '../../index';
import ButtonGroup from './ButtonGroup';

const ButtonPreview = () => (
  <div>
    <h2>One button</h2>
    <ButtonGroup>
      <Button>first</Button>
    </ButtonGroup>
    <h2>Two buttons</h2>
    <ButtonGroup isCentered={true}>
      <Button>first</Button>
      <Button>second</Button>
    </ButtonGroup>
    <h2>Three buttons</h2>
    <ButtonGroup isCentered={true}>
      <Button>first</Button>
      <Button>second</Button>
      <Button>third</Button>
    </ButtonGroup>
  </div>
);

storiesOf('ButtonGroup', module).add('default', () => <ButtonPreview />);
