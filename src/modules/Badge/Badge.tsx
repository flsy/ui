import React, { ReactChild, ReactNode } from 'react';
import styled from 'styled-components';

const Circle = styled.div<{ hasChild: boolean }>`
  font-size: 0.8em;
  padding: 2px 6px;
  border-radius: 50%;
  background: red;
  color: white;

  ${({ hasChild }) =>
    hasChild &&
    `
    position: absolute;
    top: -10px;
    right: -10px;
  `}
`;

interface IProps {
  className?: string;
  children?: ReactChild;
  value?: ReactNode;
}

export const Badge = ({ className, children, value }: IProps): JSX.Element => (
  <div className={className}>
    {children}
    {value ? <Circle hasChild={!!children}>{value}</Circle> : null}
  </div>
);

Badge.defaultProps = {
  className: undefined,
  children: undefined,
  value: undefined,
};

export default styled(Badge)`
  position: relative;
  display: inline-block;
`;
