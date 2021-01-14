import { boolean, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { IForm } from 'react-metaforms';
import { Container, Form } from '../../index';

type MyForm = IForm<any>;

const form: MyForm = {
  username: {
    label: 'Username',
    type: 'text',
    validation: [
      {
        type: 'required',
        message: 'This field is required',
      },
      {
        type: 'minlength',
        message: 'Too short',
        value: 2,
      },
    ],
  },
  image: {
    type: 'image',
    label: 'Cat image',
  },
  csv: {
    type: 'csv',
    label: 'Select CSV',
  },
  password: {
    type: 'password',
    label: 'Password',
    validation: [
      {
        type: 'required',
        message: 'This field is required',
      },
    ],
  },
  'select-example': {
    type: 'select',
    label: 'Okno?',
    options: [{ value: 'ok' }, { value: 'no' }],
  },
  'checkbox-example': {
    type: 'checkbox',
    label: 'doIt',
  },
  submit: {
    type: 'submit',
    label: 'Login',
  },
};

export const Basic = () => {
  const [fields, setFields] = React.useState<MyForm>(form);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      <input type="checkbox" id="isLoading" defaultChecked={isLoading} onChange={(event) => setIsLoading(event.target.checked)} />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="isLoading">isLoading</label>

      <Container size="sm">
        <Form title="Login example" form={fields} onFormChange={setFields} onSubmit={({ formData }) => console.log(formData)} isLoading={boolean('isLoading', false)} />
      </Container>
    </>
  );
};

export default {
  title: 'Form',
  decorators: [withKnobs],
};
