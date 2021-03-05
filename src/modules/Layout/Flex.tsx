import styled, { css } from 'styled-components';

const Flex = styled.div<{ horizontal?: boolean; reverse?: boolean }>`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'column-reverse' : 'column')};

  ${({ horizontal, reverse }) =>
    horizontal &&
    css`
      flex-flow: ${reverse ? 'row-reverse' : 'row'} wrap;
    `}
`;

export const FlexGrow1 = styled.div`
  flex-grow: 1;
`;

export default Flex;
