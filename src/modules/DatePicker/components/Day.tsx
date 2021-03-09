import styled, { css } from 'styled-components';
import { Colours } from '../../../mainStyles';

const Day = styled.div<{ isDisabled?: boolean; isCurrent?: boolean; isCurrentMonth?: boolean; isSelected?: boolean }>`
  padding: 0.5em;
  cursor: pointer;
  border: 1px solid ${Colours.border};
  margin: -1px 0 0 -1px;

  ${({ theme }) => css`
    color: ${theme.colors.text};
    &:hover {
      color: #fff;
      background-color: ${theme.colors.main.dark};
    }
  `}

  ${({ isCurrentMonth }) =>
    !isCurrentMonth &&
    css`
      color: #999;
    `}

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      background-color: #bbb;
      border: none;
    `}

  ${({ isCurrent, theme }) =>
    isCurrent &&
    css`
      border: none;
      outline: 1px dashed ${theme.colors.main.light};
    `}

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      color: #fff;
      background: ${theme.colors.main.primary};
      border: none;
    `}
`;

export default Day;
