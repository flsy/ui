import styled, { css } from 'styled-components';
import Day from './components/Day';
import { Colours } from '../../mainStyles';

export const RangeDay = styled(Day)<{ isHighlighted: boolean }>`
  ${({ isHighlighted, isSelected, theme }) =>
    isHighlighted &&
    !isSelected &&
    css`
      color: ${Colours.background};
      background: ${theme.colors.main.light};
      margin: -1px 0 0 -1px;
      border: 1px solid transparent;

      &:hover {
        background: ${theme.colors.main.dark};
      }
    `}
`;
