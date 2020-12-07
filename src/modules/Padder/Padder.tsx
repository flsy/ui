import React from 'react';
import styled, { css } from 'styled-components';

type PaddingType = 'left' | 'right' | 'bottom' | 'top' | 'horizontal' | 'vertical' | 'all';

interface IProps {
  type: PaddingType;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const getPadding = (px: number, type: PaddingType) => {
  const isLeft = type === 'left' || type === 'horizontal' || type === 'all';
  const isRight = type === 'right' || type === 'horizontal' || type === 'all';
  const isTop = type === 'top' || type === 'vertical' || type === 'all';
  const isBottom = type === 'bottom' || type === 'vertical' || type === 'all';

  return `${isTop ? px : 0}px ${isRight ? px : 0}px ${isBottom ? px : 0}px ${isLeft ? px : 0}px`;
};

const SPadder = styled.div<IProps>`
  ${({ size, type }) =>
    size === 'xs' &&
    css`
      padding: ${getPadding(2, type)};
    `};
  ${({ size, type }) =>
    size === 'sm' &&
    css`
      padding: ${getPadding(4, type)};
    `};
  ${({ size, type }) =>
    size === 'md' &&
    css`
      padding: ${getPadding(8, type)};
    `};
  ${({ size, type }) =>
    size === 'lg' &&
    css`
      padding: ${getPadding(12, type)};
    `};
  ${({ size, type }) =>
    size === 'xl' &&
    css`
      padding: ${getPadding(16, type)};
    `};
`;

const Padder: React.FC<Partial<IProps>> = ({ children, size = 'md', type = 'all' }) => (
  <SPadder size={size} type={type}>
    {children}
  </SPadder>
);

export default Padder;
