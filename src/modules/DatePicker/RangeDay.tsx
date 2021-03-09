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
      outline: none;
      border: none;

      &:hover {
        background: ${theme.colors.main.dark};
      }
    `}
`;
