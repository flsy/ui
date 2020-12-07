import { ReactNode } from 'react';
import styled from 'styled-components';

const Grid = styled.div<{ children: any }>`
  display: grid;
  grid-template-columns: ${({ children }) => children.filter((c: ReactNode) => c).reduce((acc: string) => `${acc} 1fr `, '')};
  grid-column-gap: 10px;
`;

export default Grid;
