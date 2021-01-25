import React, { Children, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { DataTableContext } from './context';
import { IHeadTr } from './interfaces';
import { STh } from './Th';

const first = keyframes`
  0% {
    left: -100%;
    width: 100%;
  }
  100% {
    left: 100%;
    width: 20%;
  }
`;

const SLinear = styled.div`
  position: absolute;
  top: -2px;
  overflow: hidden;
  width: 100%;
  height: 4px;
`;

const SIntermediate = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.main.lighter};

  :before {
    content: '';
    position: absolute;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.main.primary};
    animation: ${first} 1s infinite ease-out;
  }
`;

const SLoaderTd = styled.td`
  position: sticky;
  top: 2.5em;
`;

const HeadTr: IHeadTr = ({ children }) => {
  const dataTable = useContext(DataTableContext);

  return (
    <>
      <tr>
        {dataTable.expandedRowRender && <STh key="expand-btn" />}
        {children}
      </tr>
      <tr>
        <SLoaderTd colSpan={Children.count(children) + (dataTable.expandedRowRender ? 1 : 0)}>
          <SLinear>{dataTable.isLoading && <SIntermediate data-test="datatable-loader" />}</SLinear>
        </SLoaderTd>
      </tr>
    </>
  );
};

export default HeadTr;
