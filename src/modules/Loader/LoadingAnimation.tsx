import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Colours } from '../../mainStyles';

const load = keyframes`
0%,
  80%,
  100% {
      box-shadow: 0 0;
      height: 4em;
  }
  40% {
      box-shadow: 0 -2em;
      height: 5em;
  }
`;

const SLoadingAnimation = styled.div<{ size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>`
  height: ${({ size }) => {
    switch (size) {
      case 'xs':
      case 'sm':
        return '18px';
      default:
        return '4em';
    }
  }};
`;

const SLoader = styled.div<{ size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; inverted?: boolean }>`
  color: ${({ inverted, theme }) => (inverted ? '#fff' : theme.colors.main.dark)};
  margin: 20px auto;
  position: relative;
  font-size: 11px;
  transform: translateZ(0);
  animation-delay: -0.16s;

  &,
  &:before,
  &:after {
    background: ${({ inverted, theme }) => (inverted ? '#fff' : theme.colors.main.dark)};
    animation: ${load} 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }

  ${({ size }) =>
    size === 'xs' &&
    css`
      & {
        font-size: 3px;
        margin: 3px auto;
      }
    `}

  &:before, &:after {
    position: absolute;
    top: 0;
    content: '';
  }

  &:before {
    left: -1.5em;
    animation-delay: -0.32s;
  }

  &:after {
    left: 1.5em;
  }
`;

interface IProps {
  inverted?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const LoadingAnimation = ({ size, inverted }: IProps) => (
  <SLoadingAnimation size={size}>
    <SLoader size={size} inverted={inverted} />
  </SLoadingAnimation>
);

LoadingAnimation.defaultProps = {
  size: 'md',
  inverted: false,
};

export default LoadingAnimation;
