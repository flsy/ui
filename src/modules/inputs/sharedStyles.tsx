import React from 'react';
import styled, { css } from 'styled-components';
import { borderRadius, Colours } from '../../mainStyles';
import Flex from '../Layout/Flex';
import Tooltip from '../Tooltip/Tooltip';

export const Inputs = css<{ hasError?: boolean }>`
  font-size: inherit;
  outline-style: none;
  box-shadow: none;
  border-radius: ${borderRadius};
  padding: 4px;
  margin: 4px 0;
  border: 1px solid ${(props) => (props.hasError ? Colours.error : Colours.lightGrey)};
  width: 100%;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.main.primary};
  }
`;

const LabelStyled = styled.label`
  font-size: smaller;
`;

const AsteriskStyled = styled.span`
  color: ${Colours.error};
  padding-left: 2px;
  cursor: help;
`;

const Asterisk: React.FC = () => (
  <AsteriskStyled>
    <Tooltip text="Povinné pole">*</Tooltip>
  </AsteriskStyled>
);

type Props = {
  fieldId: string;
  label: string;
  isRequired: boolean;
};

export const Label: React.FC<Props> = ({ fieldId, label, isRequired, children }) => (
  <LabelStyled htmlFor={fieldId} data-test-id={`form-label-for-${fieldId}`}>
    {label}
    {isRequired && <Asterisk />}
    {children}
  </LabelStyled>
);

export const InputWrapper = styled(Flex)`
  width: 100%;
  padding-bottom: 1.2em;
  position: relative;
`;

const ErrorMessageStyled = styled.div`
  position: absolute;
  bottom: 0.2em;
  left: 0;
  right: 0;
  color: ${Colours.error};
  font-size: smaller;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ErrorMessage: React.FC<{ message: string; name: string }> = ({ message, name }) => (
  <ErrorMessageStyled data-test-id={`form-error-message-${name}`}>{message}</ErrorMessageStyled>
);
