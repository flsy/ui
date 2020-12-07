import React, { useState } from 'react';
import styled, { ITooltipProps, ITooltipTextProps } from 'styled-components';
import { borderRadius, Colours } from '../../mainStyles';

export const TooltipText = styled.span<ITooltipTextProps>`
  background-color: ${Colours.tooltipBackground};
  bottom: 150%;
  color: ${Colours.background};
  border-radius: ${borderRadius};
  left: 50%;
  margin-left: -60px;
  padding: 4px 8px;
  position: absolute;
  text-align: center;
  width: 120px;
  z-index: 1000;

  &:after {
    border-color: ${Colours.tooltipBackground} transparent transparent transparent;
    border-style: solid;
    border-width: 5px;
    content: '';
    left: 50%;
    margin-left: -5px;
    position: absolute;
    top: 100%;
  }
`;

export const TooltipWrapper = styled.div<{ children: React.ReactNode }>`
  position: relative;
  display: inline-block;
`;

const Tooltip: React.FC<ITooltipProps> = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <TooltipWrapper onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && <TooltipText>{text}</TooltipText>}
    </TooltipWrapper>
  );
};

export default Tooltip;
