import styled, { css } from 'styled-components';

export const getBorder = (color: string) => css`
  border: 1px solid ${color};
  margin: -1px 0 0 -1px;
  outline: none;
`;

const Day = styled.div<{ isDisabled?: boolean; isCurrent?: boolean; isCurrentMonth?: boolean; isSelected?: boolean }>`
  padding: 0.5em;
  cursor: pointer;
  ${({ theme }) => getBorder(theme.colors.border)};

  ${({ theme }) => css`
    color: ${theme.colors.text};
    &:hover {
      color: #fff;
      background-color: ${theme.colors.main.dark};
      ${getBorder(theme.colors.main.dark)};
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
      outline: none;
    `}

  ${({ isCurrent, theme }) =>
    isCurrent &&
    css`
      outline: 1px dashed ${theme.colors.main.light};
      outline-offset: -2px;
    `}

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      color: #fff;
      background: ${theme.colors.main.primary};
      ${getBorder(theme.colors.main.primary)};
    `}
`;

export default Day;
