import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { daysMap, getMonthDetails, IDayDetails } from '../utils';

interface ICalendarProps {
  year: number;
  month: number;
  children: (day: IDayDetails) => ReactNode;
  hasMoreMonths?: boolean;
}

const CalendarWrapper = styled.div`
  padding: 4px 8px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(7, auto);
`;

const DayName = styled.div`
  padding: 0.5em;
  cursor: pointer;
`;

const Calendar = ({ year, month, children, hasMoreMonths }: ICalendarProps) => {
  return (
    <CalendarWrapper>
      {daysMap.map((day) => (
        <DayName key={day}>{day}</DayName>
      ))}
      {getMonthDetails(year, month, hasMoreMonths).map((day) => children(day))}
    </CalendarWrapper>
  );
};

Calendar.defaultProps = {
  hasMoreMonths: undefined,
};

export default Calendar;
