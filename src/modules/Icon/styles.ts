import { css } from 'styled-components';
import { Colours } from '../../mainStyles';
import { Transient } from '../../types';

export interface IActiveProps {
  isActive?: boolean;
}

export const ActiveStyle = css<Transient<IActiveProps>>`
  ${({ $isActive }) =>
    $isActive &&
    `
      color: ${Colours.main}
  `}
`;
