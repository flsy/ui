import React, { ReactNode, useEffect } from 'react';
import { Columns, IMetaTableProps, MetaTable } from 'metatable';
import useKeyPress, { KeyboardKey } from '../../utils/useKeyPress';
import { DataTableContext } from './context';
import HeadTr from './HeadTr';
import { AllTypes } from './interfaces';
import Table from './Table';
import Tbody from './Tbody';
import Td from './Td';
import Tfoot from './Tfoot';
import Th from './Th';
import Tr from './Tr';

type IColumns = Columns<AllTypes>;

interface IDataTableProps<TRow> {
  data?: TRow[];
  columns?: IColumns;
  labels?: {
    empty?: string;
  };
  rowType?: (row: TRow) => 'primary' | 'warning' | undefined;
  onRowSelect?: (row: TRow) => void;
  isRowSelected?: (row: TRow) => boolean;
  isKeyboardSelect?: boolean;
  expandedRowRender?: (row: TRow) => ReactNode;
  isLoading?: boolean;
  render?: IMetaTableProps<IColumns, TRow, AllTypes>['render'];
  onLoadMore?: () => void;
  onColumnsChange?: (columns: IColumns) => void;
}

const DataTable = <TRow extends {}>({
  data,
  columns,
  render,
  rowType,
  isRowSelected,
  isKeyboardSelect,
  expandedRowRender,
  labels,
  onRowSelect,
  isLoading,
  onLoadMore,
  onColumnsChange,
}: IDataTableProps<TRow>) => {
  const downPress = useKeyPress(KeyboardKey.arrowDown, !isKeyboardSelect);
  const upPress = useKeyPress(KeyboardKey.arrowUp, !isKeyboardSelect);

  useEffect(() => {
    if (data && isRowSelected && onRowSelect) {
      const selectedRowIndex = data.findIndex((row) => isRowSelected(row));
      const row = data[selectedRowIndex + (downPress ? 1 : -1)];
      if (row && (downPress || upPress)) {
        onRowSelect(row);
      }
    }
  }, [downPress, upPress]);

  const columnsChanged = (changedColumns: Columns<AllTypes>) => {
    if (onColumnsChange) {
      onColumnsChange(changedColumns);
    }
  };

  return (
    <DataTableContext.Provider
      value={{
        onRowSelect,
        isRowSelected,
        rowType,
        columnsChanged,
        expandedRowRender,
        isKeyboardSelect,
        labels,
        isLoading,
        onLoadMore,
      }}
    >
      <MetaTable<IColumns, TRow, AllTypes> data={data} columns={columns} render={{ Th, Tr, Table, Td, HeadTr, Tbody, Tfoot, ...render }} />
    </DataTableContext.Provider>
  );
};

DataTable.defaultProps = {
  data: [],
  columns: {},
  labels: {
    empty: 'No data',
  },
  rowType: undefined,
  onRowSelect: undefined,
  isRowSelected: undefined,
  isKeyboardSelect: false,
  expandedRowRender: undefined,
  isLoading: false,
  render: undefined,
  onLoadMore: undefined,
  onColumnsChange: undefined,
};

export default DataTable;
