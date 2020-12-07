import React, { useContext, useState } from 'react';
import { getFormData } from 'react-metaforms';
import styled from 'styled-components';
import { Colours } from '../../mainStyles';
import { lensPath, set, view } from '../../utils/lens';
import Form from '../Form/Form';
import FilterIcon from '../Icon/FilterIcon';
import { Submit } from '../inputs/Button';
import { Column, setColumnsSortFormValue } from '../MetaTable';
import Popup from '../Popup/Popup';
import { DataTableContext } from './context';
import { AllTypes, ITh } from './interfaces';
import SortForm from './SortForm';

export const STh = styled.th`
  padding: 0;
  height: 2.6em;
  font-weight: 600;
  background-color: ${Colours.background};
  border-bottom: 1px solid ${Colours.smidgenGrey};
  border-right: 2px solid #fff;
  position: sticky;
  top: 0em;
`;

const SSort = styled.div<{ isSortable?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 12px;

  ${({ isSortable }) =>
    isSortable &&
    `
    padding: 0 4px 0 12px;

    &:hover {
      cursor: pointer;
      background: ${Colours.smidgenGrey};
    }
  `}
`;

const SContent = styled.div<{ isFilterable?: boolean }>`
  display: grid;
  height: 100%;
  position: relative;
  align-items: center;
  grid-template-columns: ${({ isFilterable }) => (isFilterable ? `auto 30px` : `auto`)};
`;

const SLabel = styled.span`
  white-space: nowrap;
`;

const SFilter = styled.div<{ isOpen: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ isOpen }) =>
    isOpen &&
    `
      background: ${Colours.smidgenGrey};
  `}

  &:hover {
    cursor: pointer;
    background: ${Colours.smidgenGrey};
  }
`;

const Th: ITh = ({ columns, columnPath }) => {
  const columnPathLens = lensPath(columnPath);
  const column: Column<AllTypes> = view(columnPathLens)(columns);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fields, setFields] = React.useState(column.filterForm);
  const { columnsChanged } = useContext(DataTableContext);

  const isSortable = !!column.sortForm;
  const isFilterable = !!column.filterForm;
  const isFiltered = isFilterable && !!view(columnPathLens)(getFormData(column.filterForm));

  const handleFilter = (form: object) => {
    if (columnsChanged) {
      columnsChanged(set(lensPath([...columnPath, 'filterForm']))(form)(columns));
      setIsOpen(false);
    }
  };

  const handleSort = () => {
    if (columnsChanged) {
      const valueLens = lensPath([...columnPath, 'value']);
      const value = view(valueLens)(column.sortForm);
      const form = set(valueLens)(value === 'DESC' ? 'ASC' : 'DESC')(column.sortForm);
      columnsChanged(set(lensPath([...columnPath, 'sortForm']))(form)(setColumnsSortFormValue(undefined, columns)));
    }
  };

  return (
    <STh>
      <SContent isFilterable={isFilterable}>
        <SSort isSortable={isSortable} onClick={handleSort}>
          <SLabel data-test-id={`datatable-head-column-label-${String(columnPath.join('-'))}`}>{column.label}</SLabel>
          {isSortable && <SortForm path={columnPath} sortForm={column.sortForm} />}
        </SSort>
        {isFilterable && (
          <>
            <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} styles={{ top: '45px', padding: '7px', textAlign: 'left' }}>
              <Form
                form={fields}
                onSubmit={({ form }) => handleFilter(form)}
                onFormChange={setFields}
                components={({ component }) => {
                  if (component?.type === 'submit') {
                    return <Submit {...component} size="xs" />;
                  }

                  return;
                }}
              />
            </Popup>
            <SFilter isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
              <FilterIcon isFilled={isFiltered} isActive={isOpen} />
            </SFilter>
          </>
        )}
      </SContent>
    </STh>
  );
};

export default Th;
