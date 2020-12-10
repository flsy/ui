import React from 'react';
import styled from 'styled-components';
import Select from '../inputs/Select';
import { pad } from './utils';

const hours = Array(24)
  .fill(0)
  .map((_, index) => ({ value: index.toString() }));
const minutes = Array(60)
  .fill(0)
  .map((_, index) => ({ value: pad(index) }));

const TimepickerWrapper = styled.div`
  padding: 4px;
  display: flex;
`;

const TimePickerLabel = styled.div`
  display: block;
  font-weight: 600;
  padding: 4px;
  margin-top: 4px;
`;

interface IProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
}

const TimePicker = ({ value, onChange, label }: IProps) => {
  const onHourChange = (hour: string) => {
    const date = new Date(value.getTime());
    date.setHours(parseInt(hour, 10), date.getMinutes(), 0, 0);
    onChange(date);
  };

  const onMinuteChange = (minute: string) => {
    const date = new Date(value.getTime());
    date.setMinutes(parseInt(minute, 10), 0, 0);
    onChange(date);
  };

  return (
    <>
      {label && <TimePickerLabel>{label}</TimePickerLabel>}
      <TimepickerWrapper>
        <Select
          label="hodiny"
          value={pad(value.getHours())}
          options={hours}
          name="hodiny"
          type="select"
          updateAndValidate={(_, v) => onHourChange(v)}
          update={() => {}}
          validate={() => {}}
        />
        <Select
          label="minuty"
          value={pad(value.getMinutes())}
          options={minutes}
          name="minuty"
          type="select"
          updateAndValidate={(_, v) => onMinuteChange(v)}
          update={() => {}}
          validate={() => {}}
        />
      </TimepickerWrapper>
    </>
  );
};

TimePicker.defaultProps = {
  label: undefined,
};

export default TimePicker;
