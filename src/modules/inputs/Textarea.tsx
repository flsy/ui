import { isRequired } from 'metaforms';
import * as React from 'react';
import { FieldProps } from 'react-metaforms';
import styled from 'styled-components';
import { ErrorMessage, Inputs, InputWrapper, Label } from './sharedStyles';

interface IProps extends FieldProps<string> {
  disabled?: boolean;
}

export const TextareaStyled = styled.textarea`
  ${Inputs}
`;

const Textarea = React.forwardRef((props: IProps, ref: React.Ref<HTMLTextAreaElement>) => {
  const { label, name, validation, placeholder, value, disabled, update, validate, errorMessage } = props;

  return (
    <InputWrapper>
      {label ? <Label fieldId={name} label={label} isRequired={isRequired(validation)} /> : null}
      <TextareaStyled
        ref={ref}
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        disabled={disabled}
        onChange={(e) => update(name, e.target.value)}
        onBlur={() => validate(name)}
        hasError={!!errorMessage}
      />
      {errorMessage ? <ErrorMessage message={errorMessage} name={name} /> : null}
    </InputWrapper>
  );
});

Textarea.defaultProps = {
  disabled: false,
};

export default Textarea;
