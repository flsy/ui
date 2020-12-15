import React, { useContext, useState } from 'react';
import { getFormData } from 'react-metaforms';
import styled from 'styled-components';
import { Column, unsetAllSortFormValues } from 'metatable';
import { Field } from 'metaforms';
import { compose } from 'metacharts/lib/utils';
import { lensPath, pipe, set, view } from 'ramda';
import { Colours } from '../../mainStyles';
import Form from '../Form/Form';
import FilterIcon from '../Icon/FilterIcon';
import { Submit } from '../inputs/Button';
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

const SContent = styled.div<{ isFilterable?: boolean }>`
  display: grid;
  height: 100%;
  position: relative;
  align-items: center;
  grid-template-columns: ${({ isFilterable }) => (isFilterable ? `auto 30px` : `auto`)};
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

  const isFilterable = !!column.filterForm;
  const isFiltered = isFilterable && !!Object.values(getFormData(column.filterForm)).filter((v) => v).length;

  const handleFilter = (form: object) => {
    if (columnsChanged) {
      columnsChanged(set(lensPath([...columnPath, 'filterForm']), form, columns));
      setIsOpen(false);
    }
  };

  const handleSort = (form: Field) => {
    if (columnsChanged) {
      columnsChanged(pipe(unsetAllSortFormValues, set(lensPath([...columnPath, 'sortForm']), form))(columns));
    }
  };

  return (
    <STh>
      <SContent isFilterable={isFilterable}>
        <SortForm label={column.label} path={columnPath} sortForm={column.sortForm} onSubmit={handleSort} />
        {isFilterable && (
          <>
            <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} styles={{ top: '45px', padding: '7px', textAlign: 'left' }}>
              <Form
                form={fields}
                onSubmit={({ form }) => handleFilter(form)}
                onFormChange={setFields}
                components={({ component, name, groupChildren }) => {
                  if (component?.type === 'submit') {
                    return <Submit {...component} type="submit" size="xs" />;
                  }

                  if (component?.type === 'group') {
                    return <React.Fragment key={name}>{groupChildren}</React.Fragment>;
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
