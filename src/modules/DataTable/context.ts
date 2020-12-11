import { createContext, ReactNode } from 'react';
import { Columns } from 'metatable';

export const DataTableContext = createContext<{
  rowType?: (row: any) => 'primary' | 'warning' | undefined;
  onRowSelect?: (row: any) => void;
  isRowSelected?: (row: any) => boolean;
  isKeyboardSelect?: boolean;
  expandedRowRender?: (row: any) => ReactNode;
  onLoadMore?: () => void;
  columnsChanged?: (columns: Columns<any>) => void;
  labels?: {
    empty?: string;
    loading?: string;
  };
  isLoading?: boolean;
}>({});
