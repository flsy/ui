import styled, { css } from 'styled-components';

type Size = 'sm' | 'md' | 'lg';

const getHeight = (size?: Size) => {
  switch (size) {
    case 'sm':
      return css`
        height: 6px;
      `;
    case 'lg':
      return css`
        height: 12px;
      `;
    default:
      return css`
        height: 18px;
      `;
  }
};

const getWidth = (size?: Size) => {
  switch (size) {
    case 'sm':
      return css`
        width: 6px;
      `;
    case 'lg':
      return css`
        width: 12px;
      `;
    default:
      return css`
        width: 18px;
      `;
  }
};

const Spacer = styled.div<{ size?: Size; horizontal?: boolean }>`
  ${({ horizontal }) =>
    !horizontal &&
    css`
      width: 100%;
    `}

  ${({ horizontal, size }) => !horizontal && getHeight(size)}
  ${({ horizontal, size }) => horizontal && getWidth(size)}
`;

export default Spacer;
