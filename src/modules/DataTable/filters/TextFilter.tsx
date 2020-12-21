import React from 'react';
import { FieldProps } from 'react-metaforms';
import Input from '../../inputs/Input';

const TextFilter = (props: FieldProps<{ value: string; type: 'LIKE' | 'EQ' }>) => {
  return (
    <Input
      {...props}
      value={props.value?.value || ''}
      update={(path, value) => props.update(path, { value, type: 'EQ' })}
      updateAndValidate={(path, value) => props.updateAndValidate(path, { value, type: 'EQ' })}
    />
  );
};

export default TextFilter;
