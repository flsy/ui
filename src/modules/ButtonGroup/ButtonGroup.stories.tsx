import React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { Button } from '../../index';
import ButtonGroup from './ButtonGroup';

export const Default = () => (
  <div>
    <h2>One button</h2>
    <ButtonGroup isCentered={boolean('is centered', false)}>
      <Button>first</Button>
    </ButtonGroup>
    <h2>Two buttons</h2>
    <ButtonGroup isCentered={boolean('is centered', false)}>
      <Button>first</Button>
      <Button>second</Button>
    </ButtonGroup>
    <h2>Three buttons</h2>
    <ButtonGroup isCentered={boolean('is centered', false)}>
      <Button>first</Button>
      <Button>second</Button>
      <Button>third</Button>
    </ButtonGroup>
  </div>
);

export default {
  title: 'Components/ButtonGroup',
  decorators: [withKnobs],
};
