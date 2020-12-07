import React, { Dispatch, SetStateAction, useState } from 'react';
import styled, { css } from 'styled-components';
import { Colours } from '../../mainStyles';
import Calendar from './components/Calendar';
import Day from './components/Day';
import SelectYearAndMonth from './components/SelectYearAndMonth';
import { IDateRange } from './interfaces';
import TimePicker from './TimePicker';
import { isInRange, isSameDay, isToday } from './utils';

interface IProps {
  dateRange: IDateRange;
  setDateRange: Dispatch<SetStateAction<IDateRange>>;
  withTimePicker?: boolean;
}

const RangeDay = styled(Day)<{ isHighlighted: boolean }>`
  ${({ isHighlighted, isSelected }) =>
    isHighlighted &&
    !isSelected &&
    css`
      color: ${Colours.background};
      background: ${Colours.lightMain};
      outline: none;

      &:hover {
        color: ${Colours.background};
        background: ${Colours.lighterMain};
      }
    `}
`;

const DateRangePicker = ({ setDateRange, dateRange: { startDate, endDate }, withTimePicker }: IProps) => {
  const [year, setYear] = useState(startDate?.getFullYear() || new Date().getFullYear());
  const [month, setMonth] = useState(startDate?.getMonth() || new Date().getMonth());
  const [hoverDate, setHoverDate] = useState<Date>();

  const onDateClick = (d: number, m: number, y: number) => {
    const now = new Date();
    const pickDay = new Date(y, m, d, now.getHours(), now.getMinutes(), now.getSeconds());

    if (!startDate && !endDate) {
      return setDateRange({ startDate: pickDay });
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
    return setDateRange({});
  };

  const setStartDate = (d: Date) => setDateRange({ startDate: d, endDate });
  const setEndDate = (d: Date) => setDateRange({ startDate, endDate: d });

  return (
    <div>
      <SelectYearAndMonth month={month} setMonth={setMonth} year={year} setYear={setYear} />
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
    </div>
  );
};

export default DateRangePicker;
