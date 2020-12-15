import { isRequired } from 'metaforms';
import React from 'react';
import { FieldProps } from 'react-metaforms';
import styled from 'styled-components';
import { defaultTo } from 'ramda';
import { ErrorMessage, Inputs, InputWrapper, Label } from './sharedStyles';

export const InputStyled = styled.input`
  ${Inputs}
`;

interface IProps extends FieldProps<string> {
  disabled?: boolean;
  inputMode?: 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef((props: IProps, ref: React.Ref<HTMLInputElement>) => {
  return (
    <InputWrapper>
      {props.label && <Label fieldId={props.name} label={props.label} isRequired={isRequired(props.validation)} />}
      <InputStyled
        ref={ref}
        id={props.name}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={defaultTo('', props.value)}
        disabled={props.disabled}
        onChange={(e) => props.update(props.name, e.target.value)}
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

Input.defaultProps = {
  disabled: false,
  inputMode: 'text',
  onFocus: undefined,
  onBlur: undefined,
};

export default Input;
