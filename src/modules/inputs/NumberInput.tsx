import { isRequired } from 'metaforms';
import * as React from 'react';
import { FieldProps } from 'react-metaforms';
import styled from 'styled-components';
import { ErrorMessage, Inputs, InputWrapper, Label } from './sharedStyles';

export const InputStyled = styled.input`
  ${Inputs}
`;

interface NumberProps extends FieldProps<number> {
  disabled?: boolean;
  inputMode?: 'numeric' | 'decimal';
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
}

const NumberInput = React.forwardRef((props: NumberProps, ref: React.Ref<HTMLInputElement>) => {
  return (
    <InputWrapper>
      {props.label && <Label fieldId={props.name} label={props.label} isRequired={isRequired(props.validation)} />}
      <InputStyled
        ref={ref}
        id={props.name}
        type={props.type}
        name={props.name}
        min={props.min}
        max={props.max}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
        onChange={(e) => props.update(props.name, parseInt(e.target.value, 10))}
        onBlur={(e) => (props.onBlur ? props.onBlur(e) : props.validate(props.name))}
        onFocus={props.onFocus}
        inputMode={props.inputMode}
        hasError={!!props.errorMessage}
        data-test-id={`form-input-${props.name}`}
      />
      {props.errorMessage ? <ErrorMessage message={props.errorMessage} name={props.name} /> : null}
    </InputWrapper>
  );
});

NumberInput.defaultProps = {
  disabled: false,
  inputMode: 'decimal',
  onFocus: undefined,
  onBlur: undefined,
  min: undefined,
  max: undefined,
};

export default NumberInput;
