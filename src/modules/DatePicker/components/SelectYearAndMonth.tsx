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
  withPrevMonth?: boolean;
}

const SelectYearAndMonth = ({ year, setYear, month, setMonth, className, withPrevMonth }: IProps) => (
  <div className={className}>
    <div>
      <Button link={true} type="button" onClick={() => setYear(year - 1)} icon={<LeftOutlined />} />
      <span>{month >= 0 ? year : year - 1}</span>
      <Button link={true} type="button" onClick={() => setYear(year + 1)} icon={<RightOutlined />} />
    </div>

    <div>
      <Button link={true} type="button" onClick={() => updateMonth(withPrevMonth ? month : month - 1, year, setMonth, setYear)} icon={<LeftOutlined />} />
      <span>{month === -1 ? monthMap[11] : monthMap[month]}</span>
      <Button link={true} type="button" onClick={() => updateMonth(withPrevMonth ? month + 2 : month + 1, year, setMonth, setYear)} icon={<RightOutlined />} />
    </div>
    <hr />
  </div>
);

SelectYearAndMonth.defaultProps = {
  className: undefined,
  withPrevMonth: false,
};

export default styled(SelectYearAndMonth)`
  ${selectYearAndMonthCss}
`;
