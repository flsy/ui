import React from 'react';
import styled from 'styled-components';
import UIButton, { ButtonWrapper, IButtonProps } from '../Button/Button';

interface ISubmitProps {
  fullWidth?: boolean;
  onClick?: () => void;
  name?: string;
  type: 'submit';
  label?: string;
  disabled?: boolean;
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
    <UIButton text={props.label} {...props} type="submit" primary={true} />
  </SSubmit>
);

export const Button: React.FC<IButtonProps> = (props) => {
  return <UIButton text={props.value} {...props} type="button" onClick={props.onClick} />;
};
