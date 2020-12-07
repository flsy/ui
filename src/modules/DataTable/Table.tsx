import styled from 'styled-components';
import { STh } from './Th';

const Table = styled.table`
  position: relative;
  width: 100%;
  border-collapse: collapse;

  ${STh}:last-of-type {
    border-right: 0;
  }
`;

export default Table;
