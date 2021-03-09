import styled, { css } from 'styled-components';

const Day = styled.div<{ isDisabled?: boolean; isCurrent?: boolean; isCurrentMonth?: boolean; isSelected?: boolean }>`
  padding: 0.5em;
  cursor: pointer;

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
    `}

  ${({ isCurrent, theme }) =>
    isCurrent &&
    css`
      border: 1px dashed ${theme.colors.main.light};
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
