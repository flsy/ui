import styled, { css } from 'styled-components';
import { Colours } from '../../../mainStyles';

const Day = styled.div<{ isDisabled?: boolean; isCurrent?: boolean; isSelected?: boolean }>`
  padding: 0.5em;
  cursor: pointer;

  &:hover {
    color: ${Colours.background};
    background-color: ${({ theme }) => theme.colors.main.dark};
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

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      color: ${Colours.background};
      background: ${theme.colors.main.primary};
      outline: none;
    `}
`;

export default Day;
