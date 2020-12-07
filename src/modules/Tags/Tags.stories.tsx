import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { IForm } from 'react-metaforms';
import { Form, Modal } from '../../index';
import { IOption } from './interfaces';
import Tags from './Tags';

const mockOptions: IOption[] = [
  {
    value: 1,
    label: 'Terminal 1',
    // @ts-ignore
    description: 'oblast terminalu 1',
  },
  {
    value: 2,
    label: 'Hala',
    // @ts-ignore
    description: 'oblast u hlavni haly',
  },
  {
    value: 3,
    label: 'Terminal 2',
  },
  {
    value: 4,
    label: 'Terminal 3',
  },
  {
    value: 5,
    label: 'Recepce',
  },
  {
    value: 17,
    label: 'Gate K asdadasdaadsa Gate K asdadasdaadsaGateKasdadasdaadsaGateKasdadasdaadsaGateK',
  },
  {
    value: 98,
    label: 'Ramp 1',
    // @ts-ignore
    description: 'Departure ramp',
  },
  {
    value: 99,
    label: 'Check-in',
  },
];

const form = {
  name: {
    type: 'text',
    label: 'Nazev',
  },
  areas: {
    type: 'tags',
    label: 'Oblasti',
    options: mockOptions,
  },
  'areas-preselected': {
    type: 'tags',
    label: 'Preselected areas',
    // @ts-ignore
    values: [2, 17],
    options: mockOptions,
  },
  'areas-empty': {
    type: 'tags',
    label: 'Empty areas',
    options: mockOptions,
  },
  'areas-addabble': {
    type: 'tags',
    label: 'Addable areas',
    // @ts-ignore
    values: [2, 98],
    options: mockOptions,
  },
  submit: {
    type: 'submit',
    label: 'Odeslat',
  },
};

const TagsStory = () => {
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
      <Form onSubmit={({ formData }) => console.log(formData)} form={fields} onFormChange={(f) => setFields(f)} />
    </>
  );
};

storiesOf('Tags', module)
  .addDecorator(withKnobs)
  .add('one tag', () => <Tags.Tag isLoading={boolean('is loading', false)} label={text('label', 'Tag 1')} description={text('description', '')} />)
  .add('tag list', () => (
    <Tags>
      {Array.from(Array(number('number of tags', 10, { min: 0 })).keys()).map((v) => (
        <Tags.Tag isLoading={boolean('is loading', false)} label={`Tag ${v}`} description={`description ${v}`} />
      ))}
    </Tags>
  ))
  .add('in form', () => <TagsStory />);
