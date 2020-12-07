import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Group from './Group';
import Input from './Input';

const PreviewInput = ({ name }: { name: string }) => (
  <Input name={name} placeholder={name} label={name} validate={action('validate')} update={action('update')} updateAndValidate={action('updateAndValidate')} type="text" />
);

storiesOf('Group', module)
  .addDecorator(withKnobs)
  .add('basic usage', () => (
    <Group legend={text('legend', 'Inputs!!!')}>
      <PreviewInput name="i" />
      <PreviewInput name="love" />
      <PreviewInput name="inputs" />
    </Group>
  ));
