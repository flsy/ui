import React from 'react';
import CheckboxList from './CheckboxList';

export interface IFormCheckboxListProps {
  name: string;
  groupName?: string;
  labels: {
    search: string;
    empty: string;
  };
  value?: number[];
  options?: Array<{ label: string; value: number }>;
  updateAndValidate: (props: { name: string; value: number[]; groupName?: string }) => void;
  update: (props: { name: string; value: number[]; groupName?: string }) => void;
}

const FormCheckboxList = ({ name, groupName, labels, value, options, updateAndValidate }: IFormCheckboxListProps) => (
  <CheckboxList
    options={options}
    name={name}
    values={value}
    labels={labels}
    onChange={(v) => {
      updateAndValidate({ name, value: v, groupName });
    }}
  />
);

export default FormCheckboxList;
