import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import SelectYearAndMonth from './components/SelectYearAndMonth';
import Calendar from './components/Calendar';
import { isInRange, isSameDay, isToday } from './utils';
import TimePicker from './TimePicker';
import { IDateRange } from './interfaces';
import Flex from '../Layout/Flex';
import { RangeDay } from './RangeDay';

interface IWithPreviousMonthProps {
  year: number;
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  setYear: Dispatch<SetStateAction<number>>;
  onDateClick: (d: number, m: number, y: number) => void;
  setHoverDate: (date: Date) => void;
  dateRange: IDateRange;
  hoverDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  withTimePicker?: boolean;
}

const FlexNoWrap = styled(Flex)`
  flex-wrap: nowrap;
`;

export const WithPreviousMonth = ({
  year,
  month,
  setMonth,
  setYear,
  onDateClick,
  setHoverDate,
  dateRange: { startDate, endDate },
  hoverDate,
  withTimePicker,
  setStartDate,
  setEndDate,
}: IWithPreviousMonthProps) => {
  return (
    <>
      <SelectYearAndMonth month={month} setMonth={setMonth} year={year} setYear={setYear} withPreviousMonth={true} />
      <FlexNoWrap horizontal={true}>
        <Calendar year={year} month={month - 1}>
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
      </FlexNoWrap>
      <div>{withTimePicker && startDate && <TimePicker value={startDate} onChange={setStartDate} label="Začátek" />}</div>
      <div>{withTimePicker && endDate && <TimePicker value={endDate} onChange={setEndDate} label="Konec" />}</div>
    </>
  );
};

WithPreviousMonth.defaultProps = {
  withTimePicker: false,
};
