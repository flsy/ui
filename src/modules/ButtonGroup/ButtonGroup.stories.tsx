import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button } from '../../index';
import ButtonGroup from './ButtonGroup';

const ButtonPreview = () => (
  <div>
    <h2>One button</h2>
    <ButtonGroup>
      <Button text="first" />
    </ButtonGroup>
    <h2>Two buttons</h2>
    <ButtonGroup isCentered={true}>
      <Button text="first" />
      <Button text="second" />
    </ButtonGroup>
    <h2>Three buttons</h2>
    <ButtonGroup isCentered={true}>
      <Button text="first" />
      <Button text="second" />
      <Button text="third" />
    </ButtonGroup>
  </div>
);

storiesOf('ButtonGroup', module).add('default', () => <ButtonPreview />);
