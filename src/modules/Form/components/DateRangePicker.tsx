import React, { useState } from 'react';
import { FieldProps } from 'react-metaforms';
import styled from 'styled-components';
import Input from '../../inputs/Input';
import { PopupWrapper } from '../../Popup/Popup';
import DateRangePickerComponent from '../../DatePicker/DateRangePicker';
import { IDateRange } from '../../DatePicker/interfaces';
import InlineGroup from './InlineGroup';
import CalendarPopup from '../../DatePicker/CalendarPopup';

const Wrapper = styled.div`
  width: 100%;

  ${PopupWrapper} {
    margin-top: -1.2em;
  }
`;

export interface IDateRangePickerProps extends FieldProps<number> {
  withTimePicker?: boolean;
  withPreviousMonth?: boolean;
  fields: { 'Start Time': FieldProps<number>; 'End Time': FieldProps<number> };
}

export const pad = (n: number) => (n < 10 ? `0${n}` : n);

// DD-MM-YYYY hh:mm
const toStringDateTime = (date: Date): string => {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const timestampToDate = (timestamp: number): Date => new Date(timestamp * 1000);
const timeReadable = (timestamp: number) => toStringDateTime(timestampToDate(timestamp));

const toTimestamp = (date: Date): number => Math.round(date.valueOf() / 1000);

const dateTimeToDate = (dateTime: string): Date => {
  const [date, time] = dateTime.trim().split(' ');
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
const isValidDateTime = (dateTime?: number): boolean => {
  try {
    return dateTime && !Number.isNaN(timestampToDate(dateTime).getTime());
  } catch (e) {
    return false;
  }
};

const isSame = (date: Date, n?: number): boolean => isValidDateTime(n) && toStringDateTime(date) === timeReadable(n);

const getDateRange = (value: { from: string; to: string }): IDateRange => {
  return {
    startDate: isValidDate(value.from) ? dateTimeToDate(value.from) : undefined,
    endDate: isValidDate(value.to) ? dateTimeToDate(value.to) : undefined,
  };
};

const cond = (a, b) => (a ? b() : undefined);

const rangeToValue = (fields: IDateRangePickerProps['fields']): IState => ({
  from: cond(fields['Start Time'].value, () => timeReadable(fields['Start Time'].value)),
  to: cond(fields['End Time'].value, () => timeReadable(fields['End Time'].value)),
});

interface IState {
  from: string;
  to: string;
}

const DateRangePicker = ({ withTimePicker, updateAndValidate, name, fields, withPreviousMonth, ...props }: IDateRangePickerProps) => {
  const [isShown, showDatePicker] = useState<'none' | 'from' | 'to'>('none');
  const [value, setValue] = useState<IState>({ from: '', to: '' });

  React.useEffect(() => {
    setValue(rangeToValue(fields));
  }, [fields]);

  const setDateRange = (dateRange: IDateRange) => {
    if (dateRange.startDate && !isSame(dateRange.startDate, fields['Start Time'].value)) {
      updateAndValidate([name, 'Start Time'].join('.'), toTimestamp(dateRange.startDate));
    }
    if (dateRange.endDate && !isSame(dateRange.endDate, fields['End Time'].value)) {
      updateAndValidate([name, 'End Time'].join('.'), toTimestamp(dateRange.endDate));
    }
  };

  const onBlur = (fieldName: string, property: keyof IState) => () => {
    if (isValidDate(value[property])) {
      updateAndValidate([name, fieldName].join('.'), toTimestamp(dateTimeToDate(value[property])));
    }
  };

  const getErrorMessage = (prop: keyof IState) => {
    return value[prop] && !isValidDate(value[prop]) ? 'Datum není ve správném formátu' : undefined;
  };

  return (
    <Wrapper>
      <InlineGroup>
        <Input
          {...props}
          {...fields['Start Time']}
          errorMessage={getErrorMessage('from')}
          update={(path, from) => setValue({ ...value, from })}
          updateAndValidate={() => null}
          value={value.from}
          onFocus={() => showDatePicker('from')}
          onBlur={onBlur('Star Time', 'from')}
        />
        <Input
          {...props}
          {...fields['End Time']}
          errorMessage={getErrorMessage('to')}
          update={(path, to) => setValue({ ...value, to })}
          updateAndValidate={() => null}
          value={value.to}
          onFocus={() => showDatePicker('to')}
          onBlur={onBlur('End Time', 'to')}
        />
      </InlineGroup>
      <CalendarPopup isOpen={isShown !== 'none'} onClose={() => showDatePicker('none')} isRight={isShown === 'to'}>
        <DateRangePickerComponent
          setDateRange={setDateRange}
          dateRange={getDateRange(value)}
          withTimePicker={withTimePicker}
          startedWithEndDate={isShown === 'to'}
          withPreviousMonth={withPreviousMonth}
        />
      </CalendarPopup>
    </Wrapper>
  );
};

export default DateRangePicker;
export const DateTimeRangePicker = (props: IDateRangePickerProps) => <DateRangePicker {...props} withTimePicker={true} withPreviousMonth={true} />;
