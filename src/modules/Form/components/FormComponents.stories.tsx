import React, { useState } from 'react';
import { IForm } from 'metaforms';
import { withKnobs } from '@storybook/addon-knobs';
import { Form, Modal } from '../../../index';
import FormTags from './Tag/FormTags';

const mockOptions = [
  {
    value: 1,
    label: 'Terminal 1',
  },
  {
    value: 2,
    label: 'Terminal 2',
  },
  {
    value: 3,
    label: 'Terminal 3',
  },
];

const form = {
  name: {
    type: 'text',
    label: 'Name',
  },
  areas: {
    type: 'tags',
    label: 'Areas',
    options: mockOptions,
  },
  'areas-preselected': {
    type: 'tags',
    label: 'Preselected areas',
    values: [2, 17],
    options: mockOptions,
  },
  'areas-addabble': {
    type: 'tags',
    label: 'Addable',
    values: [2, 98],
    options: mockOptions,
  },
  submit: {
    type: 'submit',
    label: 'Submit',
  },
};

export const Tags = () => {
  const [fields, setFields] = useState<any>(form);

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [subFormFields, setSubFormFields] = useState<IForm<any>>({
    name: {
      type: 'text',
      label: 'Name',
    },
    submit: {
      type: 'submit',
      label: 'Add group',
    },
  });

  return (
    <>
      <Modal isOpen={isFormOpen} close={() => setIsFormOpen(false)}>
        <Form onSubmit={console.log} form={subFormFields} onFormChange={setSubFormFields} />
      </Modal>
      <Form
        onSubmit={({ formData }) => console.log(formData)}
        form={fields}
        onFormChange={(f) => setFields(f)}
        components={(props) => {
          if (props.component.type === 'tags') {
            // @ts-ignore
            return <FormTags {...props.actions} name={props.name} {...props.component} onCreateClick={() => setIsFormOpen(true)} />;
          }

          return null;
        }}
      />
    </>
  );
};

export default {
  title: 'Form/Components',
  decorators: [withKnobs],
};