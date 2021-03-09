import React, { useState } from 'react';
import Calendar from './components/Calendar';
import Day from './components/Day';
import SelectYearAndMonth from './components/SelectYearAndMonth';
import TimePicker from './TimePicker';
import { IDayDetails, isSameDay, isToday } from './utils';

interface IProps {
  value?: Date;
  onChange: (date: Date) => void;
  withTimePicker?: boolean;
  isDisabled?: (day: IDayDetails) => boolean;
}

const DatePicker = ({ onChange, withTimePicker, value, isDisabled }: IProps) => {
  const [year, setYear] = useState((value || new Date()).getFullYear());
  const [month, setMonth] = useState((value || new Date()).getMonth());

  const onDateClick = (d: number, m: number, y: number) => {
    if (withTimePicker) {
      return onChange(new Date(y, m, d, value.getHours(), value.getMinutes(), value.getSeconds()));
    }
    return onChange(new Date(y, m, d));
  };

  return (
    <>
      <SelectYearAndMonth month={month} setMonth={setMonth} year={year} setYear={setYear} months={[month]} />
      <Calendar year={year} month={month}>
        {(day) => {
          const disabled = isDisabled ? isDisabled(day) : false;
          return day.day ? (
            <Day
              key={day.index}
              onClick={!disabled ? () => onDateClick(day.day, day.month, day.year) : undefined}
              isDisabled={disabled}
              isCurrentMonth={day.isCurrentMonth}
              isCurrent={isToday(day.date)}
              isSelected={isSameDay(day.date, value)}
            >
              {day.day}
            </Day>
          ) : (
            <div />
          )
        }
        }
      </Calendar>
      <div>{withTimePicker && <TimePicker value={value} onChange={onChange} label="Vyberte hodinu a minutu" />}</div>
    </>
  );
};

DatePicker.defaultProps = {
  value: undefined,
  isDisabled: undefined,
  withTimePicker: false,
};

export default DatePicker;
