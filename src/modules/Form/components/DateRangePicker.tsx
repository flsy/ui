import React from 'react';
import { FieldProps } from 'react-metaforms';
import { isRequired } from 'metaforms';
import moment from 'moment';
import RangePicker, { isValidRange, RangePickerValue } from '../../DatePicker/RangePicker';
import { ErrorMessage, InputWrapper, Label } from '../../inputs/sharedStyles';

export interface IDateRangePickerProps extends FieldProps<[number, number]> {
  withTimePicker?: boolean;
  dateInputPlaceholder?: [string, string];
}

const DateRangePicker = ({ withTimePicker, name, placeholder, value, update, label, validation, dateInputPlaceholder, validate, errorMessage }: IDateRangePickerProps) => {
  const pickerValue: RangePickerValue = isValidRange(value) ? [moment.unix(value[0]), moment.unix(value[1])] : undefined;

  const handleBlur = () => {
    validate(name);
  };

  const handleChange = (v: RangePickerValue) => {
    if (isValidRange(v)) {
      return update(name, [moment(v[0]).unix(), moment(v[1]).unix()]);
    }
    update(name, undefined);
  };

  return (
    <InputWrapper>
      {label && <Label fieldId={name} label={label} isRequired={isRequired(validation)} />}
      <RangePicker
        onChange={handleChange}
        onBlur={handleBlur}
        value={pickerValue}
        placeholder={placeholder}
        withTimePicker={withTimePicker}
        dateInputPlaceholder={dateInputPlaceholder}
      />
      {errorMessage ? <ErrorMessage message={errorMessage} name={name} /> : null}
    </InputWrapper>
  );
};

export default DateRangePicker;
