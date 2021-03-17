import { boolean, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { IForm } from 'react-metaforms';
import { Container, Form } from '../../index';
import Button from '../Button/Button';

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
  'tree-select': {
    type: 'tree-select',
    label: 'Select me',
    value: ['u:jim'],
    treeData: [
      {
        label: 'Admin',
        value: 'g:admin',
        children: [
          {
            label: 'John',
            value: 'u:john',
          },
          {
            label: 'Joe',
            value: 'u:joe',
          },
        ],
      },
      {
        label: 'Auditor',
        value: 'g:auditor',
        children: [
          {
            label: 'Jenny',
            value: 'u:jenny',
          },
          {
            label: 'Jim',
            value: 'u:jim',
          },
        ],
      },
    ],
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
        <Button onClick={() => setFields(form)}>Reset</Button>
      </Container>
    </>
  );
};

export default {
  title: 'Form',
  decorators: [withKnobs],
};
