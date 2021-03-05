import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import React from 'react';
import styled, { css } from 'styled-components';
import Button from '../../Button/Button';
import { monthMap } from '../utils';

const selectYearAndMonthCss = css`
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 4px;
  }
`;

const updateMonth = (myMonth: number, year: number, setMonth: (value: number) => void, setYear: (value: number) => void) => {
  if (myMonth === -1) {
    setMonth(11);
    setYear(year - 1);
  } else if (myMonth === 12) {
    setMonth(0);
    setYear(year + 1);
  } else {
    setMonth(myMonth);
  }
};

interface IProps {
  year: number;
  setYear: (year: number) => void;
  month: number;
  setMonth: (month: number) => void;
  className?: string;
  previousMonths?: number;
}

const getMonthName = (month: number, monthArray: string[]): string => (month === -1 ? monthArray[11] : monthArray[month]);

const renderMonthName = (month: number, monthArray: string[], previousMonths?: number): string => {
  if (previousMonths) {
    return [getMonthName(month - 1, monthArray), getMonthName(month, monthArray)].join(' - ');
  }
  return getMonthName(month, monthArray);
};

const renderYear = (year: number, month: number, previousMonths?: number) => {
  if (previousMonths) {
    return month === 0 ? [year - 1, year].join(' - ') : year;
  }
  return year;
};

const SelectYearAndMonth = ({ year, setYear, month, setMonth, className, previousMonths }: IProps) => (
  <div className={className}>
    <div>
      <Button link={true} type="button" onClick={() => setYear(year - 1)} icon={<LeftOutlined />} />
      <span>{renderYear(year, month, previousMonths)}</span>
      <Button link={true} type="button" onClick={() => setYear(year + 1)} icon={<RightOutlined />} />
    </div>

    <div>
      <Button link={true} type="button" onClick={() => updateMonth(month - 1, year, setMonth, setYear)} icon={<LeftOutlined />} />
      <span>{renderMonthName(month, monthMap, previousMonths)}</span>
      <Button link={true} type="button" onClick={() => updateMonth(month + 1, year, setMonth, setYear)} icon={<RightOutlined />} />
    </div>
    <hr />
  </div>
);

SelectYearAndMonth.defaultProps = {
  className: undefined,
  previousMonths: 0,
};

export default styled(SelectYearAndMonth)`
  ${selectYearAndMonthCss}
`;
