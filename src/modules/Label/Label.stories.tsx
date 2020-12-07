import { storiesOf } from '@storybook/react';
import React from 'react';
import Label from './Label';

const LabelStory = () => {
  return (
    <div>
      <Label type="success">Success</Label>
      <Label type="info">Info</Label>
      <Label type="warning">Warning</Label>
      <Label type="error">Error</Label>
      <Label>Default</Label>
    </div>
  );
};

storiesOf('Label', module).add('basic usage', () => <LabelStory />);
