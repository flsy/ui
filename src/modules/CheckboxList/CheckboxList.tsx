import React, { useState } from 'react';
import styled from 'styled-components';
import { CheckBox } from '../inputs/Checkbox';
import { InputStyled } from '../inputs/Input';
import Flex from '../Layout/Flex';

const SCheckboxList = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 600px;
  max-width: 300px;
  overflow-wrap: break-word;
  padding: 8px;
`;

interface ICheckboxListProps {
  name: string;
  values?: number[];
  options?: Array<{ value: number; label: string }>;
  onChange: (values: number[]) => void;
  labels: {
    search: string;
    empty: string;
  };
}

const CheckboxList = ({ options, values = [], onChange, labels, name }: ICheckboxListProps) => {
  const [filter, setFilter] = useState<string>('');

  if (!options || options.length <= 0) {
    return <p>{labels.empty}</p>;
  }

  const filteredData = options.filter((option) => (option.label ? option.label.toLowerCase().includes(filter.toLowerCase()) : 'Nevyplněno'));

  const onAdd = (id: number) => onChange([...values, id]);
  const onRemove = (id: number) => onChange(values.filter((val) => val !== id));

  return (
    <SCheckboxList>
      {options?.length > 9 && <InputStyled type="text" placeholder={labels.search} value={filter} onChange={(e) => setFilter(e.target.value)} />}
      <Flex>
        {filteredData.map((option) => (
          <CheckBox
            key={option.value}
            label={option.label}
            name={`${name}-option-${option.value}`}
            defaultChecked={values?.some((val) => val === option.value)}
            onChange={(checked) => (checked ? onAdd(option.value) : onRemove(option.value))}
            data-test-id={`checkbox-list-${name}-checkbox-${option.value}`}
          />
        ))}
      </Flex>
    </SCheckboxList>
  );
};

export default CheckboxList;
