import React from 'react';
import styled from 'styled-components';
import UIButton, { ButtonWrapper } from '../Button/Button';

interface ISubmitProps {
  fullWidth?: boolean;
  onClick?: () => void;
  name?: string;
  type: 'submit';
  label?: string;
  disabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const SSubmit = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  justify-content: flex-end;

  ${({ fullWidth }) =>
    fullWidth &&
    `
    ${ButtonWrapper} {
      width: 100%;
    }
  `}
`;

export const Submit = ({ fullWidth, ...props }: ISubmitProps) => (
  <SSubmit fullWidth={fullWidth}>
    <UIButton {...props} type="submit" primary={true}>
      {props.label}
    </UIButton>
  </SSubmit>
);

Submit.defaultProps = {
  fullWidth: false,
  onClick: undefined,
  name: undefined,
  label: undefined,
  disabled: false,
  size: 'md',
};
