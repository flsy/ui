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
const trim = (s: string) => s.trim();

// DD-MM-YYYY hh:mm
const toStringDateTime = (date: Date): string => {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const timeReadable = (timestamp: number) => toStringDateTime(new Date(timestamp * 1000));

const toTimestamp = (date: Date): number => Math.round(date.valueOf() / 1000);

const dateTimeToDate = (dateTime: string): Date => {
  const [date, time] = dateTime.split(' ');
  const [day, month, year] = date.split('.').map((s) => parseInt(s, 10));
  const [hour, minutes] = time.split(':').map((s) => parseInt(s, 10));

  return new Date(year, month - 1, day, hour, minutes);
};

const isValidDate = (date?: string): boolean => {
  try {
    return date && !Number.isNaN(dateTimeToDate(date).getTime());
  } catch (e) {
    return false;
  }
};

const isSet = (val: unknown): boolean => !!val;

const splitStringDate = (date: string): string[] => date.split('-').map(trim);

const getDateRange = (value: string[]): IDateRange => {
  const [startDate, endDate] = value.filter(isValidDate).map(dateTimeToDate);

  return { startDate, endDate };
};

const rangeToValue = (fields: IDateRangePickerProps['fields']): string => [fields['Start Time'].value, fields['End Time'].value].filter(isSet).map(timeReadable).join(' - ');

const DateRangePicker = ({ withTimePicker, updateAndValidate, name, fields, ...props }: IDateRangePickerProps) => {
  const [isShown, showDatePicker] = useState<boolean>(false);
  const [value, setValue] = useState<string>(rangeToValue(fields));
  const [errorMessage, setErrorMessage] = useState<string>(props.errorMessage);

  React.useEffect(() => {
    const [from, to] = splitStringDate(value).filter(isValidDate);

    if (isValidDate(from)) {
      updateAndValidate([name, 'Start Time'].join('.'), toTimestamp(dateTimeToDate(from)));
    }
    if (isValidDate(to)) {
      updateAndValidate([name, 'End Time'].join('.'), toTimestamp(dateTimeToDate(to)));
    }
    if (isValidDate(from) && isValidDate(to)) {
      setErrorMessage(undefined);
    } else {
      setErrorMessage('invalid date range');
    }
  }, [value]);

  const setDateRange = (range: IDateRange) => {
    setValue([range.startDate, range.endDate].filter(isSet).map(toStringDateTime).join(' - '));
  };

  return (
    <Wrapper>
      <Input
        {...props}
        name={name}
        label={[fields['Start Time'].label, fields['End Time'].label].join(' - ')}
        errorMessage={errorMessage}
        update={(path, v) => setValue(v)}
        validation={[]}
        updateAndValidate={() => null}
        value={value}
        type="text"
        onFocus={() => showDatePicker(true)}
      />
      <Popup isOpen={isShown} onClose={() => showDatePicker(false)}>
        <DateRangePickerComponent setDateRange={setDateRange} dateRange={getDateRange(splitStringDate(value))} withTimePicker={withTimePicker} />
      </Popup>
    </Wrapper>
  );
};

export default DateRangePicker;
export const DateTimeRangePicker = (props: IDateRangePickerProps) => <DateRangePicker {...props} withTimePicker={true} />;
