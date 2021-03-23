import React from 'react';
import { FieldProps } from 'react-metaforms';
import { isRequired } from 'metaforms';
import RangePicker from '../../DatePicker/RangePicker';
import { InputWrapper, Label } from '../../inputs/sharedStyles';

export interface IDateRangePickerProps extends FieldProps<[string, string]> {
  withTimePicker?: boolean;
  dateInputPlaceholder?: [string, string];
}

const DateRangePicker = ({ withTimePicker, name, placeholder, value, update, label, validation, dateInputPlaceholder }: IDateRangePickerProps) => {
  // const onBlur = (fieldName: keyof IDateRangePickerProps['fields'], property: keyof IState) => () => {
  //   if (isValidDate(value[property])) {
  //     updateAndValidate([name, fieldName].join('.'), toTimestamp(dateTimeToDate(value[property])));
  //   }
  // };

  return (
    <InputWrapper>
      {label && <Label fieldId={name} label={label} isRequired={isRequired(validation)} />}
      <RangePicker onChange={(v) => update(name, v)} value={value} placeholder={placeholder} withTimePicker={withTimePicker} dateInputPlaceholder={dateInputPlaceholder} />
    </InputWrapper>
  );
};

export default DateRangePicker;
