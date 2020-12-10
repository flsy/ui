import { isRequired } from 'metaforms';
import React from 'react';
import { FieldProps } from 'react-metaforms';
import styled from 'styled-components';
import { ErrorMessage, Inputs, InputWrapper, Label } from './sharedStyles';

export const SelectStyled = styled.select`
  ${Inputs}
`;

interface IProps<Value> extends FieldProps<Value> {
  disabled?: boolean;
  options: {
    value: Value;
    label?: string;
  }[];
}
const Select = React.forwardRef(<Value extends string>(props: IProps<Value>, ref: React.Ref<HTMLSelectElement>) => {
  return (
    <InputWrapper>
      {props.label && <Label fieldId={props.name} label={props.label} isRequired={isRequired(props.validation)} />}
      <SelectStyled
        ref={ref}
        id={props.name}
        name={props.name}
        disabled={props.disabled}
        defaultValue={props.value || ''}
        onChange={(event) => props.updateAndValidate(props.name, event.target.value as any)}
        data-test-id={`form-select-${props.name}`}
        hasError={!!props.errorMessage}
      >
        {props.placeholder ? <option value="">{props.placeholder}</option> : null}
        {(props.options || []).map((option) => (
          <option value={option.value} key={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </SelectStyled>
      {props.errorMessage ? <ErrorMessage message={props.errorMessage} name={props.name} /> : null}
    </InputWrapper>
  );
});

Select.defaultProps = {
  disabled: false,
};

export default Select;
