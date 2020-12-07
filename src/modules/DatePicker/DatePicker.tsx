import React, { useState } from 'react';
import Calendar from './components/Calendar';
import Day from './components/Day';
import SelectYearAndMonth from './components/SelectYearAndMonth';
import TimePicker from './TimePicker';
import { isSameDay, isToday } from './utils';

interface IProps {
  value: Date;
  onChange: (date: Date) => void;
  withTimePicker?: boolean;
}

const DatePicker = ({ value, onChange, withTimePicker }: IProps) => {
  const [year, setYear] = useState(value.getFullYear());
  const [month, setMonth] = useState(value.getMonth());

  const onDateClick = (d: number, m: number, y: number) => {
    if (withTimePicker) {
      return onChange(new Date(y, m, d, value.getHours(), value.getMinutes(), value.getSeconds()));
    }
    return onChange(new Date(y, m, d));
  };

  return (
    <>
      <SelectYearAndMonth month={month} setMonth={setMonth} year={year} setYear={setYear} />
      <Calendar year={year} month={month}>
        {(day) => (
          <Day
            key={day.index}
            onClick={() => onDateClick(day.day, day.month, day.year)}
            isDisabled={!day.isCurrentMonth}
            isCurrent={isToday(day.date)}
            isSelected={isSameDay(day.date, value)}
          >
            {day.day}
          </Day>
        )}
      </Calendar>
      <div>{withTimePicker && <TimePicker value={value} onChange={onChange} label="Vyberte hodinu a minutu" />}</div>
    </>
  );
};

export default DatePicker;
