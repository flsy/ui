import styled, { css } from 'styled-components';
import { Colours } from '../../../mainStyles';

const Day = styled.div<{ isDisabled?: boolean; isCurrent?: boolean; isSelected?: boolean }>`
  padding: 0.5em;
  cursor: pointer;

  &:hover {
    color: ${Colours.background};
    background-color: ${Colours.lighterMain};
    outline: none;
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: ${Colours.disabled};
      background-color: ${Colours.border};
    `}

  ${({ isCurrent }) =>
    isCurrent &&
    css`
      outline: 1.25px dashed ${Colours.smidgenInfo};
    `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: ${Colours.background};
      background: ${Colours.main};
      outline: none;
    `}
`;

export default Day;
