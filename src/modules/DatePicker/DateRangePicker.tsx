import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from './components/Calendar';
import SelectYearAndMonth from './components/SelectYearAndMonth';
import { IDateRange } from './interfaces';
import TimePicker from './TimePicker';
import { isInRange, isSameDay, isToday } from './utils';
import { RangeDay } from './RangeDay';
import Flex from '../Layout/Flex';

interface IDatePickerProps {
  startedWithEndDate?: boolean;
  previousMonths?: number;
  setDateRange: (dateRange: IDateRange) => void;
  dateRange: IDateRange;
  withTimePicker?: boolean;
}

const FlexNoWrap = styled(Flex)`
  flex-wrap: nowrap;
`;

const getInitialDate = ({ endDate, startDate }: IDateRange, startedWithEndDate?: boolean): Date => {
  if (startedWithEndDate) {
    return endDate || new Date();
  }
  return startDate || new Date();
};

export const getMonths = (month: number, previousMonths: number): number[] => [month, ...Array(previousMonths)].map((m, i) => month - i).reverse();

const DateRangePicker = ({ setDateRange, dateRange: { startDate, endDate }, withTimePicker, startedWithEndDate, previousMonths }: IDatePickerProps) => {
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

  const months = previousMonths >= 0 ? getMonths(month, previousMonths) : [];

  return (
    <>
      <FlexNoWrap horizontal={true}>
        {months.map((m: number) => (
          <div key={m}>
            <SelectYearAndMonth month={m} setMonth={setMonth} year={year} setYear={setYear} months={months} />
            <Calendar year={year} month={m}>
              {(day) =>
                day.day ? (
                  <RangeDay
                    key={day.index}
                    onClick={() => onDateClick(day.day, day.month, day.year)}
                    onMouseEnter={() => setHoverDate(day.date)}
                    isCurrentMonth={day.isCurrentMonth}
                    isCurrent={isToday(day.date)}
                    isHighlighted={isInRange(day.date, { startDate, endDate: endDate || hoverDate })}
                    isSelected={isSameDay(day.date, startDate) || isSameDay(day.date, endDate)}
                  >
                    {day.day}
                  </RangeDay>
                ) : (
                  <div />
                )
              }
            </Calendar>
          </div>
        ))}
      </FlexNoWrap>
      <div>{withTimePicker && startDate && <TimePicker value={startDate} onChange={setStartDate} label="Začátek" />}</div>
      <div>{withTimePicker && endDate && <TimePicker value={endDate} onChange={setEndDate} label="Konec" />}</div>
    </>
  );
};

DateRangePicker.defaultProps = {
  withTimePicker: false,
  previousMonths: 0,
  startedWithEndDate: false,
};

export default DateRangePicker;
