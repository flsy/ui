import React from 'react';
import { ErrorMessage, InputWrapper } from '../inputs/sharedStyles';
import { IOption } from './interfaces';
import TagListPopup from './TagListPopup';
import Tags from './Tags';

const texts = {
  empty: 'žádné výsledky',
  addButton: 'Přidat',
  editButton: 'Upravit',
  search: 'Vyhledat...',
};

interface ITagsProps {
  name: string;
  label?: string;
  errorMessage?: string;
  values?: number[];
  options?: IOption[];
  onChange: (options: number[]) => void;
  onCreateClick?: () => void;
}

const TagInput = ({ label, name, values, options, onChange, errorMessage, onCreateClick }: ITagsProps) => {
  const selectedOptions = options.filter((o) => values.includes(o.value));

  return (
    <InputWrapper>
      {label}
      <Tags>
        {selectedOptions.map((o) => (
          <Tags.Tag key={o.value} {...o} />
        ))}
      </Tags>
      <TagListPopup onCreateClick={onCreateClick} labels={texts} options={options ?? []} values={values ?? []} onChange={onChange} name={name} />
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
};

export default TagInput;
