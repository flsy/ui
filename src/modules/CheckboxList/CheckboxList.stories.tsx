import { action } from '@storybook/addon-actions';
import { number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import Form from '../Form/Form';
import CheckboxList from './CheckboxList';

const form = {
  preselected: {
    type: 'multiselect',
    label: 'Preselected',
    value: [2],
    options: [
      { label: 'First', value: 1 },
      { label: 'Second', value: 2 },
      { label: 'Third', value: 3 },
    ],
  },
  submit: {
    type: 'submit',
    label: 'Odeslat',
  },
};

const FormCheckboxStory = () => {
  const [fields, setFields] = useState(form);
  return <Form onSubmit={({ formData }) => console.log(formData)} form={fields} onFormChange={(f) => setFields(f)} />;
};

storiesOf('Checkbox list', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <CheckboxList
      name="checkboxlist"
      labels={{ search: 'Hledat...', empty: 'Nothing to see' }}
      onChange={action('onchange')}
      options={Array.from(Array(number('number of items', 10, { min: 0 })).keys()).map((v) => ({ value: v, label: `option ${v}` }))}
    />
  ))
  .add('in form', () => <FormCheckboxStory />);
