import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { FormData } from 'react-metaforms';
import { required } from 'metaforms';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { Form } from '../../index';
import DatePicker from './DatePicker';
import { toISOStringDate, toISOStringDateTime } from './utils';
import RangePicker, { RangePickerValue } from './RangePicker';

const datePickerForm = {
  start: {
    label: 'Enter start date',
    type: 'date',
    value: toISOStringDate(new Date()),
  },
  end: {
    label: 'Enter end date',
    type: 'datetime-local',
    value: toISOStringDateTime(new Date()),
    validation: [required('Toto pole je povinné')],
  },
  dateRange: {
    type: 'dateRange',
    label: 'label',
  },
  name: {
    label: 'Another text field',
    type: 'text',
  },
  submit: {
    type: 'submit',
    label: 'Submit',
  },
};

const DatePickerStory = () => {
  const [fields, setFields] = React.useState(datePickerForm);
  const [date, setDate] = React.useState(new Date());
  const [submitted, onSubmit] = React.useState<FormData<any>>();

  return (
    <>
      <h3>DatePicker in Form</h3>
      <Form<any> title="Datepicker form example" form={fields} onFormChange={(f) => setFields(f)} onSubmit={({ formData }) => onSubmit(formData)} />
      <pre>{JSON.stringify(submitted, null, 2)}</pre>

      <h3>DatePicker</h3>
      <DatePicker value={date} onChange={setDate} />
      <p>{toISOStringDate(date)}</p>

      <h3>DatePicker with TimePicker</h3>
      <DatePicker value={date} onChange={setDate} withTimePicker={true} />
      <p>{toISOStringDateTime(date)}</p>
    </>
  );
};

const RangeExample = () => {
  const [value, setValue] = useState<RangePickerValue>();
  return <RangePicker onChange={setValue} value={value} placeholder="Select range:" withTimePicker={boolean('with time picker', false)} name="select-range" />;
};

storiesOf('Date picker', module)
  .addDecorator(withKnobs)
  .add('basic usage', () => <DatePickerStory />)
  .add('range', () => <RangeExample />);
