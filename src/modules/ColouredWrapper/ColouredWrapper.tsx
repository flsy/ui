import styled, { css } from 'styled-components';
import { borderRadius } from '../../mainStyles';
import getColorByType from '../../utils/getColorByType';
import hexToRgb from '../../utils/hexToRgb';

export type ColorTypes = 'info' | 'warning' | 'error' | 'success';

export const ColouredWrapper = styled.div<{ type?: ColorTypes }>`
  border-radius: ${borderRadius};
  border: 1px solid;

  ${({ type }) => {
    const color = getColorByType(type);
    const rgb = hexToRgb(color);
    return css`
      border-color: ${color};
      background-color: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5);
    `;
  }}
`;
