import React from 'react';
import { ErrorMessage, InputWrapper } from '../../../inputs/sharedStyles';
import TagListPopup from './TagListPopup';
import { Tag } from '../../../Tag';

interface ITagsProps {
  name: string;
  label?: string;
  errorMessage?: string;
  values?: number[];
  options?: Array<{
    value: number;
    label: string;
  }>;
  labels?: {
    empty: string;
    addButton: string;
    editButton: string;
    search: string;
  };
  onChange: (options: number[]) => void;
  onCreateClick?: () => void;
}

const TagInput = ({ label, labels, name, values, options, onChange, errorMessage, onCreateClick }: ITagsProps) => {
  const selectedOptions = options.filter((o) => values.includes(o.value));

  return (
    <InputWrapper>
      {label}
      <div>
        {selectedOptions.map((o) => (
          <Tag key={o.value} {...o} />
        ))}
      </div>
      <TagListPopup onCreateClick={onCreateClick} labels={labels} options={options ?? []} values={values ?? []} onChange={onChange} name={name} />
      {errorMessage && <ErrorMessage name={name} message={errorMessage} />}
    </InputWrapper>
  );
};

TagInput.defaultProps = {
  label: undefined,
  errorMessage: undefined,
  values: [],
  options: [],
  onCreateClick: undefined,
  labels: {
    empty: 'No results',
    addButton: 'Add',
    editButton: 'Edit',
    search: 'Search...',
  },
};

export default TagInput;
