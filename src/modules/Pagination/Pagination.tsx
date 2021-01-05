import React from 'react';
import styled, { css } from 'styled-components';
import { times } from 'ramda';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import DoubleLeftOutlined from '@ant-design/icons/DoubleLeftOutlined';
import DoubleRightOutlined from '@ant-design/icons/DoubleRightOutlined';
import Button from '../Button/Button';

interface IPagination {
  className?: string;
  total: number;
  current: number;
  onChange: (page: number) => void;
}

const styles = css`
  display: flex;
`;

const PaginationButton = styled(Button)`
  & + & {
    margin-left: 0.5em;
  }
`;

const getPaginationConfig = (total: number, current: number) => {
  if (total < 10) {
    return {
      isLeftFF: false,
      isRightFF: false,
      leftCount: Math.min(1, current - 1),
      rightCount: Math.min(total, total - current),
    };
  }

  const isLeftFF = current >= 5;
  const isRightFF = total - current > 3;

  let leftCount = 2;
  let rightCount = 2;

  if (!isLeftFF) {
    leftCount = Math.max(0, current - 1);
    rightCount = Math.max(2, 4 - leftCount);
  }

  if (!isRightFF) {
    rightCount = Math.max(0, total - current);
    leftCount = Math.max(2, 4 - rightCount);
  }

  return {
    isLeftFF,
    isRightFF,
    leftCount,
    rightCount,
  };
};

const Pagination = ({ className, total, current, onChange }: IPagination) => {
  const { isLeftFF, isRightFF, leftCount, rightCount } = getPaginationConfig(total, current);

  return (
    <div className={className}>
      <PaginationButton disabled={current <= 1} onClick={() => onChange(current - 1)} size="xs" icon={<LeftOutlined />} />

      {isLeftFF && (
        <>
          <PaginationButton primary={current === 1} onClick={() => onChange(1)} size="xs">{`${1}`}</PaginationButton>
          <PaginationButton onClick={() => onChange(Math.max(current - 5, 1))} size="xs" icon={<DoubleLeftOutlined />} />
        </>
      )}

      {times(
        (i) => (
          <PaginationButton onClick={() => onChange(current - leftCount + i)} size="xs" key={i}>{`${current - leftCount + i}`}</PaginationButton>
        ),
        leftCount,
      )}

      <PaginationButton primary={true} onClick={() => onChange(current)} size="xs">{`${current}`}</PaginationButton>

      {times(
        (i) => (
          <PaginationButton onClick={() => onChange(current + i + 1)} size="xs" key={i}>{`${current + i + 1}`}</PaginationButton>
        ),
        rightCount,
      )}

      {isRightFF && (
        <>
          <PaginationButton onClick={() => onChange(Math.min(current + 5, total))} size="xs" icon={<DoubleRightOutlined />} />
          <PaginationButton primary={current === total} onClick={() => onChange(total)} size="xs">{`${total}`}</PaginationButton>
        </>
      )}

      <PaginationButton disabled={current >= total} onClick={() => onChange(current + 1)} size="xs" icon={<RightOutlined />} />
    </div>
  );
};

Pagination.defaultProps = {
  className: undefined,
};

export default styled(Pagination)`
  ${styles}
`;
