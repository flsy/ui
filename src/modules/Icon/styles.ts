import { css } from 'styled-components';
import { Colours } from '../../mainStyles';
import { Transient } from '../../types';

export type ActiveProps = Transient<{
  isActive?: boolean;
}>;

export const ActiveStyle = css<ActiveProps>`
  ${({ $isActive }) =>
    $isActive &&
    `
      color: ${Colours.main}
  `}
`;
