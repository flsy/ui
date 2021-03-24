import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { FormData } from 'react-metaforms';
import { required } from 'metaforms';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { Form } from '../../index';
import DatePicker from './DatePicker';
import DateRangePicker from './DateRangePicker';
import { IDateRange } from './interfaces';
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
    type: 'dateTimeRange',
    label: 'label',
    previousMonths: 1,
    fields: {
      'Start Time': {
        label: 'Obdobi od',
        name: 'Start Time',
        type: 'text',
      },
      'End Time': {
        label: 'Obdobi do',
        name: 'End Time',
        type: 'text',
        value: 1613829172,
      },
    },
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

const DateRangePickerStory = () => {
  const [dateRange, setDateRange] = useState<IDateRange>({ startDate: undefined, endDate: undefined });

  return (
    <>
      <h3>DatePicker</h3>
      <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      <p>
        {dateRange?.startDate && toISOStringDate(dateRange.startDate)} - {dateRange?.endDate && toISOStringDate(dateRange.endDate)}
      </p>

      <h3>DateRangePicker with TimePicker</h3>
      <DateRangePicker withTimePicker={true} dateRange={dateRange} setDateRange={setDateRange} />
      <p>
        {dateRange?.startDate && toISOStringDateTime(dateRange.startDate)} - {dateRange?.endDate && toISOStringDateTime(dateRange.endDate)}
      </p>
    </>
  );
};

const DateRangePickerMonthsStory = () => {
  const [dateRange, setDateRange] = useState<IDateRange>({ startDate: undefined, endDate: undefined });

  return (
    <>
      <h3>Date range picker with a current month</h3>
      <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      <p>
        {dateRange?.startDate && toISOStringDate(dateRange.startDate)} - {dateRange?.endDate && toISOStringDate(dateRange.endDate)}
      </p>

      <h3>Date range picker with 1 previous and current month</h3>
      <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} previousMonths={1} />
      <p>
        {dateRange?.startDate && toISOStringDate(dateRange.startDate)} - {dateRange?.endDate && toISOStringDate(dateRange.endDate)}
      </p>
      <h3>Date range picker with 2 previous and current month</h3>
      <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} previousMonths={2} />
      <p>
        {dateRange?.startDate && toISOStringDate(dateRange.startDate)} - {dateRange?.endDate && toISOStringDate(dateRange.endDate)}
      </p>
    </>
  );
};

const RangeExample = () => {
  const [value, setValue] = useState<RangePickerValue>();
  return <RangePicker onChange={setValue} value={value} placeholder="Select range:" withTimePicker={boolean('with time picker', false)} />;
};

storiesOf('Date picker', module)
  .addDecorator(withKnobs)
  .add('basic usage', () => <DatePickerStory />)
  .add('Date range picker', () => <DateRangePickerStory />)
  .add('Date range picker more months', () => <DateRangePickerMonthsStory />)
  .add('range', () => <RangeExample />);
