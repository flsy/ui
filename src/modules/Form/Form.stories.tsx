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
  upload: {
    type: 'upload',
    label: 'Upload file',
    accept: '.req',
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
  filters: {
    type: 'dateRangeCalendar',
    withTimePicker: true,
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
  message: {
    type: 'message',
    messageType: 'success',
    text: 'Success happened',
    description: 'Hello there...',
  },
  submit: {
    type: 'submit',
    label: 'Login',
  },
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const Basic = () => {
  const [fields, setFields] = React.useState<MyForm>(form);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      <input type="checkbox" id="isLoading" defaultChecked={isLoading} onChange={(event) => setIsLoading(event.target.checked)} />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="isLoading">isLoading</label>

      <Container size="lg">
        <Form
          title="Some example"
          form={fields}
          onFormChange={setFields}
          onSubmit={async ({ formData }) => {
            await delay(2000);
            console.log(formData);
          }}
          isLoading={boolean('isLoading', false)}
        />
        <Button onClick={() => setFields(form)}>Reset</Button>
      </Container>
    </>
  );
};

export default {
  title: 'Form',
  decorators: [withKnobs],
};
