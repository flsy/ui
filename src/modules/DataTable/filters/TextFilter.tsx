import React from 'react';
import { FieldProps } from 'react-metaforms';
import Input from '../../inputs/Input';

type TextFilterValue = Array<{ value: string; type: 'LIKE' | 'EQ' }>;

const TextFilter = (props: FieldProps<TextFilterValue>) => {
  const getValue = (input: string): TextFilterValue => {
    if (!input) {
      return;
    }
    return [{ value: input, type: 'EQ' }];
  };

  return (
    <Input
      {...props}
      value={(props.value || [])[0]?.value || ''}
      update={(path, input) => props.update(path, getValue(input))}
      updateAndValidate={(path, input) => props.updateAndValidate(path, getValue(input))}
    />
  );
};

export default TextFilter;
