import React, { ReactChild } from 'react';
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

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

interface IProps {
  children?: ReactChild;
  value?: number;
}

const Badge = ({ children, value }: IProps) => (
  <Wrapper>
    {children}
    {value ? <Circle hasChild={!!children}>{value}</Circle> : null}
  </Wrapper>
);

export default Badge;
