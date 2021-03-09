import styled, { css } from 'styled-components';

const Day = styled.div<{ isDisabled?: boolean; isCurrent?: boolean; isCurrentMonth?: boolean; isSelected?: boolean }>`
  padding: 0.5em;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin: -1px 0 0 -1px;

  ${({ theme }) => css`
    color: ${theme.colors.text};
    &:hover {
      color: #fff;
      background-color: ${theme.colors.main.dark};
      outline: none;
      margin: -1px 0 0 -1px;
      border: 1px solid ${theme.colors.main.dark};
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
      outline: none;
      border: 1px solid ${theme.colors.main.primary};
      margin: -1px 0 0 -1px;
    `}
`;

export default Day;
