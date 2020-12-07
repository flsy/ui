import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Colours } from '../../mainStyles';

const pulseRing = keyframes`
  0% { transform: scale(.5); }
  80%, 100% { opacity: 0; }
`;

const pulseDot = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
`;

const SPulse = styled.div<{ isAnimated?: boolean }>`
   {
    ${({ isAnimated }) =>
      isAnimated &&
      css`
        animation: ${pulseDot} 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
      `}
    background-color: ${Colours.main};
    border-radius: 50%;
    box-sizing: border-box;
    height: 6px;
    width: 6px;

    ${({ isAnimated }) =>
      isAnimated &&
      css`
        &:before {
          animation: ${pulseRing} 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          background-color: ${Colours.main};
          border-radius: 45px;
          content: '';
          display: block;
          height: 300%;
          left: -100%;
          position: relative;
          top: -100%;
          width: 300%;
        }
      `}
  }
`;

interface IProps {
  isAnimated?: boolean;
}

const Pulse = ({ isAnimated }: IProps) => <SPulse isAnimated={isAnimated} />;
export default Pulse;
