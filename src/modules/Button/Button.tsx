import React from 'react';
import styled, { css } from 'styled-components';
import { calcFontSize, trainsitionTime } from '../../mainStyles';
import LoadingAnimation from '../Loader/LoadingAnimation';
import { Colors } from '../../createTheme';
import { defaultButtonStyles, errorButtonStyles, linkButtonStyles, primaryButtonStyles } from './styles';

export interface IButtonProps {
  className?: string;
  error?: boolean;
  primary?: boolean;
  link?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  name?: string;
  type?: 'submit' | 'reset' | 'button';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  icon?: React.ReactElement;
  isLoading?: boolean;
  children?: string;
  hasBorder?: boolean;
}

const Icon = styled.span`
  font-size: 70%;
`;

const Text = styled.span``;

export const ButtonWrapper = styled.button<Omit<IButtonProps, 'children'>>`
  transition: all ${trainsitionTime};
  border-radius: ${({ theme }) => theme.borderRadius};
  white-space: nowrap;
  cursor: pointer;
  background-color: transparent;
  font-size: inherit;
  display: flex;
  align-items: center;
  border: 1px solid;

  &:focus {
    outline: none;
  }

  ${Icon} + ${Text} {
    margin-left: 0.5em;
  }

  ${({ size }) =>
    size &&
    css`
      font-size: ${calcFontSize(size)};
      padding: 0.5em 1em;
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}

  ${defaultButtonStyles}
  ${({ primary }) => primary && primaryButtonStyles}
  ${({ error }) => error && errorButtonStyles}
  ${({ link }) => link && linkButtonStyles}

  ${({ hasBorder }) =>
    !hasBorder &&
    css`
      border-color: transparent;

      &:hover {
        border-color: transparent;
      }

      &:active {
        border-color: transparent;
      }
    `}
`;

const Button = ({ className, isLoading, onClick, name, disabled, type, primary, link, size, icon: iconDefault, error, children, hasBorder }: IButtonProps) => {
  const icon = isLoading ? <LoadingAnimation size="xs" inverted={primary || error} /> : iconDefault;
  return (
    <ButtonWrapper
      className={className}
      name={name}
      type={type || 'button'}
      disabled={disabled || isLoading}
      onClick={onClick}
      primary={primary}
      link={link}
      size={size}
      icon={icon}
      data-test-id={`button-${name}`}
      error={error}
      hasBorder={hasBorder}
    >
      {icon && <Icon>{icon}</Icon>}
      {children && <Text>{children}</Text>}
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  size: 'md',
  hasBorder: true,
  className: undefined,
};

export default styled(Button)``;
