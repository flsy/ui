import React, { Dispatch, SetStateAction, useState } from 'react';
import styled, { css } from 'styled-components';
import { Colours } from '../../mainStyles';
import Calendar from './components/Calendar';
import Day from './components/Day';
import SelectYearAndMonth from './components/SelectYearAndMonth';
import { IDateRange } from './interfaces';
import TimePicker from './TimePicker';
import { isInRange, isSameDay, isToday } from './utils';
import Flex from '../Layout/Flex';

interface IDatePickerProps {
  dateRange: IDateRange;
  setDateRange: (dateRange: IDateRange) => void;
  withTimePicker?: boolean;
  startedWithEndDate?: boolean;
  withPrevMonth?: boolean;
}

interface IComponentProps extends IDatePickerProps {
  month: number;
  year: number;
  setMonth: Dispatch<SetStateAction<number>>;
  setYear: Dispatch<SetStateAction<number>>;
}

const SCalendarWrapper = styled.div`
  padding: 8px;
`;

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

const getInitialDate = ({ endDate, startDate }: IDateRange, startedWithEndDate?: boolean): Date => {
  if (startedWithEndDate) {
    return endDate;
  }
  return startDate || new Date();
};

const DateRangePickerComponent = ({
  setDateRange,
  dateRange: { startDate, endDate },
  withTimePicker,
  startedWithEndDate,
  month,
  setMonth,
  year,
  setYear,
  withPrevMonth,
}: IComponentProps) => {
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
    <SCalendarWrapper>
      <SelectYearAndMonth month={month} setMonth={setMonth} year={year} setYear={setYear} withPrevMonth={withPrevMonth} />
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
    </SCalendarWrapper>
  );
};

const DateRangePicker = ({ startedWithEndDate, dateRange, withPrevMonth, ...props }: IDatePickerProps) => {
  const [year, setYear] = useState(getInitialDate(dateRange, startedWithEndDate).getFullYear());
  const [month, setMonth] = useState(getInitialDate(dateRange, startedWithEndDate).getMonth());

  const rest = {
    dateRange,
    year,
    month,
    setYear,
    setMonth,
    startedWithEndDate,
  };

  if (withPrevMonth) {
    return (
      <Flex horizontal={true}>
        <DateRangePickerComponent {...props} {...rest} month={month - 1} withPrevMonth={withPrevMonth} />
        <DateRangePickerComponent {...props} {...rest} />
      </Flex>
    );
  }

  return <DateRangePickerComponent {...props} {...rest} />;
};

DateRangePicker.defaultProps = {
  withTimePicker: false,
  withPrevMonth: false,
  startedWithEndDate: false,
};

DateRangePickerComponent.defaultProps = {
  ...DateRangePicker.defaultProps,
};

export default DateRangePicker;
