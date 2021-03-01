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

const SInlineGroup = styled.div`
  display: flex;
`;

export interface IDateRangePickerProps extends FieldProps<number> {
  withTimePicker?: boolean;
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

const isSame = (date: Date, n?: number): boolean => {
  if (isValidDateTime(n) && toStringDateTime(date) === timeReadable(n)) {
    return true;
  }

  return false;
};

const getDateRange = (value: { from: string; to: string }): IDateRange => {
  return {
    startDate: isValidDate(value.from) ? dateTimeToDate(value.from) : undefined,
    endDate: isValidDate(value.to) ? dateTimeToDate(value.to) : undefined,
  };
};

const cond = (a, b) => (a ? b() : undefined);

const rangeToValue = (fields: IDateRangePickerProps['fields']) => ({
  from: cond(fields['Start Time'].value, () => timeReadable(fields['Start Time'].value)),
  to: cond(fields['End Time'].value, () => timeReadable(fields['End Time'].value)),
});

const DateRangePicker = ({ withTimePicker, updateAndValidate, name, fields, ...props }: IDateRangePickerProps) => {
  const [isShown, showDatePicker] = useState<'none' | 'from' | 'to'>('none');
  const [value, setValue] = useState<{ from: string; to: string }>({ from: '', to: '' });

  React.useEffect(() => {
    const { from, to } = rangeToValue(fields);
    setValue({ from, to });
  }, [fields]);

  const setDateRange = (dateRange: IDateRange) => {
    if (dateRange.startDate && !isSame(dateRange.startDate, fields['Start Time'].value)) {
      updateAndValidate([name, 'Start Time'].join('.'), toTimestamp(dateRange.startDate));
    }
    if (dateRange.endDate && !isSame(dateRange.endDate, fields['End Time'].value)) {
      updateAndValidate([name, 'End Time'].join('.'), toTimestamp(dateRange.endDate));
    }
  };

  const onBlurFrom = () => {
    if (isValidDate(value.from)) {
      updateAndValidate([name, 'Start Time'].join('.'), toTimestamp(dateTimeToDate(value.from)));
    }
  };

  const onBlurTo = () => {
    if (isValidDate(value.to)) {
      updateAndValidate([name, 'End Time'].join('.'), toTimestamp(dateTimeToDate(value.to)));
    }
  };

  return (
    <Wrapper>
      <SInlineGroup>
        <Input
          {...props}
          name={name}
          label={fields['Start Time'].label}
          errorMessage={value.from && !isValidDate(value.from) ? 'Datum není ve správném formátu' : undefined}
          update={(path, from) => setValue({ from, to: value.to })}
          validation={fields['Start Time'].validation}
          updateAndValidate={() => null}
          value={value.from}
          type="text"
          onFocus={() => showDatePicker('from')}
          onBlur={onBlurFrom}
        />
        <Input
          {...props}
          name={name}
          label={fields['End Time'].label}
          errorMessage={value.to && !isValidDate(value.to) ? 'Datum není ve správném formátu' : undefined}
          update={(path, to) => setValue({ to, from: value.from })}
          validation={fields['End Time'].validation}
          updateAndValidate={() => null}
          value={value.to}
          type="text"
          onFocus={() => showDatePicker('to')}
          onBlur={onBlurTo}
        />
      </SInlineGroup>
      <Popup isOpen={isShown !== 'none'} onClose={() => showDatePicker('none')}>
        <DateRangePickerComponent setDateRange={setDateRange} dateRange={getDateRange(value)} withTimePicker={withTimePicker} startedWithEndDate={isShown === 'to'} />
      </Popup>
    </Wrapper>
  );
};

export default DateRangePicker;
export const DateTimeRangePicker = (props: IDateRangePickerProps) => <DateRangePicker {...props} withTimePicker={true} />;
