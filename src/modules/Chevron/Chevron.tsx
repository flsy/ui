import styled, { css } from 'styled-components';
import { Colours } from '../../mainStyles';

interface IProps {
  direction?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean | null;
}

export default styled.span<IProps>`
  border-style: solid;
  border-width: 0.25em 0.25em 0 0;
  content: '';
  display: inline-block;
  height: 0.45em;
  left: 0.15em;
  position: relative;
  top: 0.15em;
  transform: rotate(-45deg);
  vertical-align: top;
  width: 0.45em;
  color: ${({ disabled }) => (disabled ? Colours.border : Colours.font)};

  ${({ direction }) =>
    direction === 'right' &&
    css`
      left: 0;
      transform: rotate(45deg);
    `}

  ${({ direction }) =>
    direction === 'left' &&
    css`
      left: 0.25em;
      transform: rotate(-135deg);
    `}

    ${({ direction }) =>
    direction === 'bottom' &&
    css`
      top: 0;
      transform: rotate(135deg);
    `}
`;
