import { isRequired as isFieldRequired } from 'metaforms';
import React from 'react';
import { FieldProps } from 'react-metaforms';
import styled from 'styled-components';
import { borderRadius, Colours } from '../../mainStyles';
import { ErrorMessage, InputWrapper, Label } from './sharedStyles';

const CheckMark = styled.span<{ hasError?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  border-radius: ${borderRadius};
  border: 1px solid ${(props) => (props.hasError ? Colours.error : Colours.lightGrey)};
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    display: none;
  }
`;

export const SCheckBox = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  line-height: 1em;
  min-height: 1em;
  user-select: none;

  /* stylelint-disable selector-type-no-unknown   */
  input:checked ~ ${CheckMark}:after {
    display: block;
  }

  input:checked ~ ${CheckMark} {
    border: 1px solid ${Colours.main};
  }

  ${CheckMark}:after {
    left: 6.5px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid ${Colours.main};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  /* stylelint-enable selector-type-no-unknown   */
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
`;

interface ICheckBoxProps {
  name: string;
  label?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
  onChange?: (checked: boolean) => void;
}

type FormCheckBoxProps = FieldProps<boolean>;

export const CheckBox = React.forwardRef(({ name, label, defaultChecked, onChange, errorMessage, isRequired, checked }: ICheckBoxProps, ref: React.Ref<HTMLInputElement>) => (
  <SCheckBox>
    {label && <Label fieldId={name} label={label} isRequired={!!isRequired} />}
    <HiddenCheckbox
      ref={ref}
      id={name}
      name={name}
      defaultChecked={defaultChecked}
      checked={checked}
      readOnly={!onChange}
      onChange={onChange ? (event) => onChange(event.target.checked) : undefined}
      data-test-id={`form-checkbox-${name}`}
    />
    <CheckMark hasError={!!errorMessage} />
    {errorMessage ? <ErrorMessage message={errorMessage} name={name} /> : null}
  </SCheckBox>
));

CheckBox.defaultProps = {
  label: undefined,
  defaultChecked: undefined,
  checked: undefined,
  errorMessage: undefined,
  isRequired: false,
  onChange: undefined,
};

const FormCheckBox = ({ updateAndValidate, validation, value, ...props }: FormCheckBoxProps) => (
  <InputWrapper>
    <CheckBox {...props} isRequired={isFieldRequired(validation)} defaultChecked={value || false} onChange={(checked) => updateAndValidate(props.name, checked)} />
  </InputWrapper>
);

export default FormCheckBox;
