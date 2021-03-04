import React, { useState } from 'react';
import Calendar from './components/Calendar';
import SelectYearAndMonth from './components/SelectYearAndMonth';
import { IDateRange } from './interfaces';
import TimePicker from './TimePicker';
import { isInRange, isSameDay, isToday } from './utils';
import { WithPreviousMonth } from './WithPreviousMonth';
import { RangeDay } from './RangeDay';

interface IDatePickerProps {
  startedWithEndDate?: boolean;
  withPreviousMonth?: boolean;
  setDateRange: (dateRange: IDateRange) => void;
  dateRange: IDateRange;
  withTimePicker?: boolean;
}

const getInitialDate = ({ endDate, startDate }: IDateRange, startedWithEndDate?: boolean): Date => {
  if (startedWithEndDate) {
    return endDate || new Date();
  }
  return startDate || new Date();
};

const DateRangePicker = ({ setDateRange, dateRange: { startDate, endDate }, withTimePicker, startedWithEndDate, withPreviousMonth }: IDatePickerProps) => {
  const [year, setYear] = useState(getInitialDate({ startDate, endDate }, startedWithEndDate).getFullYear());
  const [month, setMonth] = useState(getInitialDate({ startDate, endDate }, startedWithEndDate).getMonth());
  const [hoverDate, setHoverDate] = useState<Date>();

  const onDateClick = (d: number, m: number, y: number) => {
    const now = new Date();
    const pickDay = new Date(y, m, d, now.getHours(), now.getMinutes(), now.getSeconds());

    // todo refactor this
    if (startedWithEndDate) {
      if (startDate < pickDay && endDate > pickDay) {
        return setDateRange({ startDate, endDate: pickDay });
      }

      if (startDate && endDate > pickDay) {
        return setDateRange({ startDate: pickDay, endDate });
      }

      if (!startDate && endDate && pickDay > endDate) {
        return setDateRange({ endDate: pickDay });
      }

      if (!startDate && !endDate) {
        return setDateRange({ endDate: pickDay });
      }
      if (!startDate && endDate) {
        return setDateRange({ startDate: pickDay, endDate });
      }
      if (startDate && endDate) {
        return setDateRange({ startDate, endDate: pickDay });
      }
      if (startDate && !endDate) {
        return setDateRange({ startDate, endDate: pickDay });
      }
    } else {
      if (!startDate && !endDate) {
        return setDateRange({ startDate: pickDay });
      }
      if (pickDay > endDate) {
        return setDateRange({ startDate: endDate, endDate: pickDay });
      }
      if (startDate && startDate > pickDay) {
        return setDateRange({ startDate: pickDay });
      }
      if (startDate && !endDate) {
        return setDateRange({ startDate, endDate: pickDay });
      }
      if (startDate && endDate) {
        return setDateRange({ startDate: pickDay });
      }
      if (!startDate && endDate) {
        return setDateRange({ startDate: pickDay, endDate });
      }
    }
    return setDateRange({});
  };

  const setStartDate = (d: Date) => setDateRange({ startDate: d, endDate });
  const setEndDate = (d: Date) => setDateRange({ startDate, endDate: d });

  if (withPreviousMonth) {
    return (
      <WithPreviousMonth
        year={year}
        month={month}
        dateRange={{ startDate, endDate }}
        hoverDate={hoverDate}
        onDateClick={onDateClick}
        setHoverDate={setHoverDate}
        setMonth={setMonth}
        setYear={setYear}
        withTimePicker={withTimePicker}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    );
  }

  return (
    <>
      <SelectYearAndMonth month={month} setMonth={setMonth} year={year} setYear={setYear} withPreviousMonth={withPreviousMonth} />
      <Calendar year={year} month={month}>
        {(day) => (
          <RangeDay
            key={day.index}
            onClick={() => onDateClick(day.day, day.month, day.year)}
            onMouseEnter={() => setHoverDate(day.date)}
            isDisabled={!day.isCurrentMonth}
            isCurrent={isToday(day.date)}
            isHighlighted={isInRange(day.date, { startDate, endDate: endDate || hoverDate })}
            isSelected={isSameDay(day.date, startDate) || isSameDay(day.date, endDate)}
          >
            {day.day}
          </RangeDay>
        )}
      </Calendar>
      <div>{withTimePicker && startDate && <TimePicker value={startDate} onChange={setStartDate} label="Začátek" />}</div>
      <div>{withTimePicker && endDate && <TimePicker value={endDate} onChange={setEndDate} label="Konec" />}</div>
    </>
  );
};

DateRangePicker.defaultProps = {
  withTimePicker: false,
  withPreviousMonth: false,
  startedWithEndDate: false,
};

export default DateRangePicker;
