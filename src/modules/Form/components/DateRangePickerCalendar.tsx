import React, { useState } from 'react';
import { isRequired } from 'metaforms';
import moment from 'moment';
import cs_CZ from 'rc-calendar/lib/locale/cs_CZ';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import { defaultDateFormat, isValidRange, RangeCalendarStyled, RangePickerValue } from '../../DatePicker/RangePicker';
import { ErrorMessage, InputWrapper, Label } from '../../inputs/sharedStyles';
import { getDateRangePickerValue, IDateRangePickerProps } from './DateRangePicker';

const DateRangePickerCalendar = ({ withTimePicker, name, value, validate, update, label, validation, dateInputPlaceholder, errorMessage, format }: IDateRangePickerProps) => {
  const [hoverValue, setHoverValue] = useState([]);

  moment.locale('cs-CZ');
  const now = moment();

  const handleChange = (pickerValue: RangePickerValue) => {
    if (isValidRange(pickerValue)) {
      validate(name);
      return update(name, [moment(pickerValue[0]).unix(), moment(pickerValue[1]).unix()]);
    }
    update(name, undefined);
  };

  return (
    <InputWrapper>
      {label && <Label fieldId={name} label={label} isRequired={isRequired(validation)} />}
      <RangeCalendarStyled
        onChange={handleChange}
        locale={cs_CZ}
        format={format || defaultDateFormat(withTimePicker)}
        hoverValue={hoverValue}
        onHoverChange={setHoverValue}
        showWeekNumber={false}
        dateInputPlaceholder={dateInputPlaceholder}
        defaultValue={[now, now.clone().add(1, 'months')]}
        defaultSelectedValue={getDateRangePickerValue(value)}
        timePicker={withTimePicker ? <TimePickerPanel showSecond={false} defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]} /> : undefined}
      />
      {errorMessage ? <ErrorMessage message={errorMessage} name={name} /> : null}
    </InputWrapper>
  );
};

export default DateRangePickerCalendar;
