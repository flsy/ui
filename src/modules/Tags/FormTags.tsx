import React, { useEffect } from 'react';
import { IOption } from './interfaces';
import TagInput from './TagInput';

export interface IFormTagsProps {
  name: string;
  groupName?: string;
  label?: string;
  value?: number[];
  values?: number[];
  options?: IOption[];
  onCreateClick?: () => void;
  updateAndValidate: (name: string, value: number[]) => void;
  update: (name: string, value: number[]) => void;
}

const FormTags = ({ name, label, value, values: defaultValues, options, updateAndValidate, onCreateClick, update }: IFormTagsProps) => {
  useEffect(() => {
    if (!value) {
      update(name, defaultValues ?? []);
    }
  }, [value, defaultValues, update]);

  return (
    <TagInput
      onCreateClick={onCreateClick}
      options={options}
      name={name}
      values={value || []}
      label={label}
      onChange={(v) => {
        updateAndValidate(name, v);
      }}
    />
  );
};

export default FormTags;
