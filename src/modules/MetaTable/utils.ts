import { Column, Columns, IImageTd, OneOrMany } from './interfaces';
import { defaultsToArray, head, prop } from '../../utils/utils';
import { lensPath, set, view } from '../../utils/lens';

export const getCellValue = <TRow>(bits: string[], cellType?: string) => (object: TRow): OneOrMany<any> => {
  const [property, ...rest] = bits;
  const value = prop(property, object);

  if (cellType === 'imageList') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((v) => getCellValue(rest)(v));
  }
  if (value && head(rest)) {
    return getCellValue(rest)(value);
  }
  return value;
};

export const renderValue = (value: OneOrMany<string | number | boolean | IImageTd>): string => {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  return value.toString();
};

export const isColumn = <TTypes>(column: Column<TTypes> | Columns<TTypes>): column is Column<TTypes> => typeof column.type === 'string';

export const getColumnPaths = <TColumns extends Columns<TTypes>, TTypes>(columns: TColumns, parentKey: string[] = []): string[][] =>
  Object.entries(columns).reduce((acc, [name, column]) => {
    if (isColumn(column)) {
      return [...acc, [...parentKey, name]];
    }

    return [...acc, ...getColumnPaths(column, [...parentKey, name])];
  }, []);

export const findColumnPath = <TColumns extends Columns<TTypes>, TTypes>(find: (column: Column<TTypes>) => boolean) => (columns: TColumns): string[] =>
  defaultsToArray(getColumnPaths(columns).find((colPath) => find(view(lensPath(colPath))(columns))));

export const filterColumnPaths = <TColumns extends Columns<TTypes>, TTypes>(filter: (column: Column<TTypes>) => boolean) => (columns: TColumns): string[][] =>
  defaultsToArray(getColumnPaths(columns).filter((colPath) => filter(view(lensPath(colPath))(columns))));

export const setColumnsValue = <TColumns extends Columns<TTypes>, TTypes, TValue>(propPath: string[], value: TValue, columns: TColumns) =>
  getColumnPaths(columns).reduce((acc, columnPath) => {
    const l = lensPath([...columnPath, ...propPath]);
    return set(l)(value)(acc);
  }, columns);

export const setColumnsSortFormValue = <TColumns extends Columns<TTypes>, TTypes, TValue>(value: TValue, columns: TColumns) =>
  getColumnPaths(columns).reduce((acc, columnPath) => {
    const l = lensPath([...columnPath, 'sortForm', [...columnPath].pop(), 'value']);
    if (view(l)(acc)) {
      return set(l)(value)(acc);
    }
    return acc;
  }, columns);
