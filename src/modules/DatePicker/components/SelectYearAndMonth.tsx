import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import React from 'react';
import styled, { css } from 'styled-components';
import Button from '../../Button/Button';
import { monthMap } from '../utils';
import { FlexGrow1 } from '../../Layout/Flex';

const selectYearAndMonthCss = css`
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 4px;
    line-height: 1.5;
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
  months?: number[];
}

const isLast = <T extends number>(value: T, months: Array<T>) => months[months.length - 1] === value;
const isFirst = <T extends number>(value: T, array: T[]) => {
  const [first] = array;
  return value === first;
};
const tail = <T extends unknown>(array: T[]): T => array[array.length - 1];

const getMonthName = (month: number, monthArray: string[]): string => (month < 0 ? monthArray[monthArray.length + month] : monthArray[month]);

const renderYear = (year: number, month: number, months?: number[]) => {
  if (months.length > 1) {
    return month < 0 ? year - 1 : year;
  }
  return year;
};

const isOnArrayEdges = (month: number, months: number[]): boolean => {
  if (months.length === 1) {
    return true;
  }
  return isFirst(month, months) || isLast(month, months);
};

const isInner = (month: number, months: number[]): boolean => {
  if (months.length === 1) {
    return true;
  }
  return !isFirst(month, months) || isLast(month, months);
};

const SelectYearAndMonth = ({ year, setYear, month, setMonth, className, months }: IProps) => (
  <div className={className}>
    <div>
      <FlexGrow1>
        {isOnArrayEdges(month, months) && isFirst(month, months) && <Button link={true} type="button" onClick={() => setYear(year - 1)} icon={<LeftOutlined />} />}
      </FlexGrow1>
      <FlexGrow1>
        <span>{renderYear(year, month, months)}</span>
      </FlexGrow1>
      {isOnArrayEdges(month, months) && isInner(month, months) && <Button link={true} type="button" onClick={() => setYear(year + 1)} icon={<RightOutlined />} />}
    </div>

    <div>
      <FlexGrow1>
        {isOnArrayEdges(month, months) && isFirst(month, months) && (
          <Button link={true} type="button" onClick={() => updateMonth(tail(months) - 1, year, setMonth, setYear)} icon={<LeftOutlined />} />
        )}
      </FlexGrow1>
      <FlexGrow1>
        <span>{getMonthName(month, monthMap)}</span>
      </FlexGrow1>
      {isOnArrayEdges(month, months) && isInner(month, months) && (
        <Button link={true} type="button" onClick={() => updateMonth(tail(months) + 1, year, setMonth, setYear)} icon={<RightOutlined />} />
      )}
    </div>
    <hr />
  </div>
);

SelectYearAndMonth.defaultProps = {
  className: undefined,
  months: [],
};

export default styled(SelectYearAndMonth)`
  ${selectYearAndMonthCss}
`;
