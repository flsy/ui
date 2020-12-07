import DownOutlined from '@ant-design/icons/DownOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import React, { Children, useContext, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Colours } from '../../mainStyles';
import { DataTableContext } from './context';
import { ITr } from './interfaces';
import { STd } from './Td';

export const STr = styled.tr<{ isClickable?: boolean; isSelected?: boolean; type?: 'primary' | 'warning' }>`
  ${({ isClickable }) =>
    isClickable &&
    css`
      cursor: pointer;
    `}

  ${({ isSelected }) =>
    !isSelected &&
    css`
      &:hover ${STd} {
        background-color: ${Colours.background};
      }
    `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      ${STd} {
        background-color: ${Colours.smidgenMain};
      }
    `}

    ${({ type }) =>
    type === 'warning' &&
    css`
      border-left: 3px solid ${Colours.smidgenWarning};
    `}

    ${({ type }) =>
    type === 'primary' &&
    css`
      border-left: 3px solid ${Colours.main};
    `}
`;

export const SExpandedTr = styled(STr)`
  background: #fdfdfd;
  border: 1px solid #f2f2f2;

  & ${STd} {
    padding: 8px 14px;
  }
`;

export const SExpandableTd = styled(STd)<{ isSelected: boolean }>`
  color: ${Colours.grey};
  font-size: 0.65em;
  text-align: center;

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${Colours.smidgenMain};
    `}
`;

const ExpandableTd = ({ hasRender, isSelected }: { isSelected: boolean; hasRender: boolean }) => {
  if (hasRender) {
    return <SExpandableTd isSelected={isSelected}>{isSelected ? <UpOutlined /> : <DownOutlined />}</SExpandableTd>;
  }

  return <SExpandableTd isSelected={isSelected} />;
};

const Tr: ITr = ({ row, children }) => {
  const rowRef = useRef<HTMLTableRowElement>(null);
  const dataTable = useContext(DataTableContext);
  const isSelected = !!(dataTable?.isRowSelected && dataTable.isRowSelected(row));

  useEffect(() => {
    if (isSelected && dataTable.isKeyboardSelect && rowRef && rowRef?.current) {
      rowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isSelected, dataTable.isKeyboardSelect]);

  const handleSelect = () => {
    if (dataTable?.onRowSelect) {
      dataTable.onRowSelect(row);
    }
  };

  const rowType = dataTable?.rowType ? dataTable.rowType(row) : undefined;
  return (
    <>
      <STr ref={rowRef} isSelected={isSelected} isClickable={!!dataTable?.onRowSelect} onClick={handleSelect} type={rowType}>
        {dataTable.expandedRowRender && <ExpandableTd key="expandable-td" isSelected={isSelected} hasRender={!!dataTable.expandedRowRender(row)} />}
        {children}
      </STr>
      {isSelected && dataTable.expandedRowRender && dataTable.expandedRowRender(row) ? (
        <SExpandedTr type={rowType}>
          <td colSpan={Children.count(children) + 1}>{dataTable.expandedRowRender(row)}</td>
        </SExpandedTr>
      ) : null}
    </>
  );
};

export default Tr;
