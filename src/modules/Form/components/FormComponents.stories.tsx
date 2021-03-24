import React, { useState } from 'react';
import { array, IForm, required } from 'metaforms';
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

export const Tags = (): JSX.Element => {
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
        onFormChange={setFields}
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

export const RangePicker = (): JSX.Element => {
  const [fields, setFields] = useState<any>({
    range: {
      type: 'dateRange',
      label: 'Range',
      dateInputPlaceholder: ['From', 'To'],
    },
    rangeWTime: {
      type: 'dateRange',
      label: 'Range with time',
      withTimePicker: true,
      dateInputPlaceholder: ['From', 'To'],
    },
    rangeWDefault: {
      type: 'dateRange',
      label: 'Range with default value',
      value: [1613319172, 1613819172],
      dateInputPlaceholder: ['From', 'To'],
    },
    rangeWValidation: {
      type: 'dateRange',
      label: 'Range with validation',
      dateInputPlaceholder: ['From', 'To'],
      validation: [array([required('This is required')])],
    },
    submit: {
      type: 'submit',
      label: 'Submit',
    },
  });

  return <Form onSubmit={(v) => console.log(v)} form={fields} onFormChange={(f) => setFields(f)} />;
};

export default {
  title: 'Form/Components',
  decorators: [withKnobs],
};
