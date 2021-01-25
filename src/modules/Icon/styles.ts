import { css } from 'styled-components';
import { Transient } from '../../types';

export type ActiveProps = Transient<{
  isActive?: boolean;
}>;

export const ActiveStyle = css<ActiveProps>`
  ${({ $isActive, theme }) =>
    $isActive &&
    `
      color: ${theme.colors.main.primary}
  `}
`;
