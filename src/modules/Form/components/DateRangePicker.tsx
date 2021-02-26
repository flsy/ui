import React, { useState } from 'react';
import { FieldProps } from 'react-metaforms';
import styled from 'styled-components';
import Input from '../../inputs/Input';
import Popup, { PopupWrapper } from '../../Popup/Popup';
import DateRangePickerComponent from '../../DatePicker/DateRangePicker';
import { IDateRange } from '../../DatePicker/interfaces';

const Wrapper = styled.div`
  width: 100%;

  ${PopupWrapper} {
    margin-top: -1.2em;
  }
`;

export interface IDateRangePickerProps extends FieldProps<number> {
  withTimePicker?: boolean;
  fields: { 'Start Time': FieldProps<number>; 'End Time': FieldProps<number> };
}

export const pad = (n: number) => (n < 10 ? `0${n}` : n);

// DD-MM-YYYY hh:mm
const toStringDateTime = (date: Date) => {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const timeReadable = (timestamp?: number) => {
  if (!timestamp) {
    return '';
  }
  return toStringDateTime(new Date(timestamp * 1000));
};

const dateTimeToDate = (dateTime: string) => {
  const [date, time] = dateTime.split(' ');
  const [day, month, year] = date.split('.').map((s) => parseInt(s, 10));
  const [hour, minutes] = time.split(':').map((s) => parseInt(s, 10));

  return new Date(year, month, day, hour, minutes);
};

const isValidDate = (date?: string): boolean => date && !Number.isNaN(dateTimeToDate(date).getTime());

const splitStringDate = (date: string): string[] => {
  const split = date.split('-').map((d) => d.trim());
  return split;
};

const getDateRange = (value: string[]): IDateRange => {
  const [startDate, endDate] = value.filter(isValidDate).map(dateTimeToDate);

  return { startDate, endDate };
};

const rangeToValue = (fields: IDateRangePickerProps['fields']) => `${timeReadable(fields['Start Time'].value)} - ${timeReadable(fields['End Time'].value)}`;

const DateRangePicker = ({ withTimePicker, updateAndValidate, name, fields, ...props }: IDateRangePickerProps) => {
  const [isShown, showDatePicker] = useState<boolean>(false);
  const [value, setValue] = useState<string>(rangeToValue(fields));

  const onInputUpdate = (path: string, fieldValue: string) => {
    const range = getDateRange(splitStringDate(fieldValue));
    setValue(fieldValue);

    if (range) {
      if (range.startDate) {
        updateAndValidate([name, 'Start Time'].join('.'), range.startDate.valueOf());
      }
      if (range.endDate) {
        updateAndValidate([name, 'End Time'].join('.'), range.endDate.valueOf());
      }
    } else {
      // handle errors
    }
  };

  const setDateRange = (range: IDateRange) => {
    if (range.startDate) {
      updateAndValidate([name, 'Start Time'].join('.'), range.startDate.valueOf());
    }
    if (range.endDate) {
      updateAndValidate([name, 'End Time'].join('.'), range.endDate.valueOf());
    }
  };

  return (
    <Wrapper>
      <Input {...props} name={name} update={onInputUpdate} validation={[]} updateAndValidate={() => {}} value={value} type="text" onFocus={() => showDatePicker(true)} />
      <Popup isOpen={isShown} onClose={() => showDatePicker(false)}>
        <DateRangePickerComponent setDateRange={setDateRange} dateRange={getDateRange(splitStringDate(value))} withTimePicker={withTimePicker} />
      </Popup>
    </Wrapper>
  );
};

export default DateRangePicker;
export const DateTimeRangePicker = (props: IDateRangePickerProps) => <DateRangePicker {...props} withTimePicker={true} />;
