import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Column, Columns, getFilterFormValue, unsetAllSortFormValues } from 'metatable';
import { Field } from 'metaforms';
import { lensPath, pipe, set, view } from 'ramda';
import { Colours } from '../../mainStyles';
import Form from '../Form/Form';
import FilterIcon from '../Icon/FilterIcon';
import { Submit } from '../inputs/Button';
import Popup from '../Popup/Popup';
import { DataTableContext } from './context';
import SortForm from './SortForm';
import TextFilter from './filters/TextFilter';
import Button from '../Button/Button';

export const STh = styled.th`
  padding: 0;
  height: 2.6em;
  font-weight: 600;
  background-color: ${Colours.background};
  border-bottom: 1px solid ${Colours.smidgenGrey};
  border-right: 2px solid #fff;
  position: sticky;
  top: 0;
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

const Th = <Types extends unknown>({ columns, columnPath }: { columns: Columns<Types>; columnPath: string[] }) => {
  const columnPathLens = lensPath(columnPath);
  const column: Column<Types> = view(columnPathLens)(columns);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fields, setFields] = React.useState(column.filterForm);
  const { columnsChanged } = useContext(DataTableContext);

  const isFilterable = !!column.filterForm;
  const isFiltered = isFilterable && !!getFilterFormValue(column.filterForm);

  const valueOfFilterLens = lensPath([...columnPath, 'filterForm', ...columnPath, 'fields', 'filters', 'value']);
  const filterFormValueLens = lensPath([...columnPath, 'fields', 'filters', 'value']);

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

  const handleReset = () => {
    const resetColsFilter = set(valueOfFilterLens, undefined, columns);
    const resetFieldsValue = set(filterFormValueLens, undefined, fields);
    setFields(resetFieldsValue);
    columnsChanged(resetColsFilter);
  };

  useEffect(() => {
    if (!isOpen) {
      setFields(column.filterForm);
    }
  }, [isOpen]);

  return (
    <STh>
      <SContent isFilterable={isFilterable}>
        <SortForm label={column.label} path={columnPath} sortForm={column.sortForm} onSubmit={handleSort} />
        {isFilterable && (
          <>
            <Popup
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              styles={{ top: '45px', padding: '7px', textAlign: 'left' }}
              content={
                <Form
                  form={fields}
                  onSubmit={({ form }) => handleFilter(form)}
                  onFormChange={setFields}
                  components={({ component, name, groupChildren, actions }) => {
                    if (component?.type === 'text') {
                      return <TextFilter name={name} {...component} {...actions} value={component.value as any} />;
                    }

                    if (component?.type === 'submit') {
                      return <Submit {...component} type="submit" size="xs" />;
                    }

                    if (component?.type === 'reset') {
                      return (
                        <Button {...component} size="xs" type="reset" onClick={handleReset}>
                          {component.label}
                        </Button>
                      );
                    }

                    if (component?.type === 'group') {
                      return <React.Fragment key={name}>{groupChildren}</React.Fragment>;
                    }

                    return;
                  }}
                />
              }
            >
              <SFilter isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                <FilterIcon isFilled={isFiltered} isActive={isOpen} />
              </SFilter>
            </Popup>
          </>
        )}
      </SContent>
    </STh>
  );
};

export default Th;
