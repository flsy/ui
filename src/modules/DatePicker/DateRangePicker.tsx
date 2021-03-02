import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Colours } from '../../mainStyles';
import Calendar from './components/Calendar';
import Day from './components/Day';
import SelectYearAndMonth from './components/SelectYearAndMonth';
import { IDateRange } from './interfaces';
import TimePicker from './TimePicker';
import { isInRange, isSameDay, isToday } from './utils';
import Flex from '../Layout/Flex';

interface IProps {
  dateRange: IDateRange;
  setDateRange: (dateRange: IDateRange) => void;
  withTimePicker?: boolean;
  startedWithEndDate?: boolean;
  showPrevMonth?: boolean;
}

const RangeDay = styled(Day)<{ isHighlighted: boolean }>`
  ${({ isHighlighted, isSelected, theme }) =>
    isHighlighted &&
    !isSelected &&
    css`
      color: ${Colours.background};
      background: ${theme.colors.main.light};
      outline: none;

      &:hover {
        color: ${Colours.background};
        background: ${theme.colors.main.dark};
      }
    `}
`;

const getMonth = (startDate?: Date, showPrevMonth?: boolean) => {
  if (startDate && !showPrevMonth) {
    return startDate.getMonth();
  }
  if (startDate && showPrevMonth) {
    return startDate.getMonth() - 1;
  }

  return showPrevMonth ? new Date().getMonth() - 1 : new Date().getMonth();
};

const DateRangePickerComponent = ({ setDateRange, dateRange: { startDate, endDate }, withTimePicker, startedWithEndDate, showPrevMonth }: IProps) => {
  const [year, setYear] = useState(startDate?.getFullYear() || new Date().getFullYear());
  const [month, setMonth] = useState(getMonth(startDate, showPrevMonth));
  const [hoverDate, setHoverDate] = useState<Date>();

  const onDateClick = (d: number, m: number, y: number) => {
    const now = new Date();
    const pickDay = new Date(y, m, d, now.getHours(), now.getMinutes(), now.getSeconds());

    // todo refactor this
    if (startedWithEndDate) {
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

const DateRangePicker = ({ showPrevMonth, ...props }: IProps) => {
  if (showPrevMonth) {
    return (
      <Flex horizontal={true}>
        <DateRangePickerComponent {...props} showPrevMonth={showPrevMonth} />
        <DateRangePickerComponent {...props} />
      </Flex>
    );
  }

  return <DateRangePickerComponent {...props} />;
};

DateRangePicker.defaultProps = {
  withTimePicker: false,
  startedWithEndDate: false,
  showPrevMonth: false,
};

DateRangePickerComponent.defaultProps = {
  ...DateRangePicker.defaultProps,
};

export default DateRangePicker;
