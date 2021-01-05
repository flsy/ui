import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { DataTableContext } from './context';
import { ITfoot } from '../MetaTable/interfaces';

const SContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 0px 8px;
`;

const Tfoot: ITfoot = ({ colSpan }) => {
  const { onLoadMore } = useContext(DataTableContext);
  return (
    <tfoot>
      <tr>
        <td colSpan={colSpan}>
          {onLoadMore && (
            <SContent>
              <Button onClick={onLoadMore}>Načíst více</Button>
            </SContent>
          )}
        </td>
      </tr>
    </tfoot>
  );
};

export default Tfoot;
