import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button, Tooltip } from '../../index';

const TooltipStory = () => (
  <>
    <h1>Tooltip</h1>
    <Tooltip text="I am hover! some long hover text" bgColour="#ccc" colour="#fff">
      <Button>Hover over me</Button>
    </Tooltip>
  </>
);

storiesOf('Tooltip', module).add('basic usage', () => <TooltipStory />);
