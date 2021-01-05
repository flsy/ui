import React from 'react';
import styled, { css } from 'styled-components';
import { borderRadius, calcFontSize, Colours, trainsitionTime } from '../../mainStyles';
import LoadingAnimation from '../Loader/LoadingAnimation';

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
  border-radius: ${borderRadius};
  white-space: nowrap;
  cursor: pointer;
  background-color: transparent;
  font-size: inherit;
  border: none;

  padding: 0;
  display: flex;
  align-items: center;

  ${({ hasBorder }) =>
    hasBorder &&
    css`
      border: 1px solid ${Colours.grey};
    `}

  &:focus {
    outline: none;
  }

  ${Icon} + ${Text} {
    margin-left: 0.5em;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${Colours.border};
      color: ${Colours.disabled};
      cursor: not-allowed;
    `}

  ${({ disabled, link }) =>
    !disabled &&
    !link &&
    css`
      &:hover {
        transition: all ${trainsitionTime};
        border-color: ${Colours.main};
        color: ${Colours.main};
      }

      &:active {
        border-color: ${Colours.mainActive};
        color: ${Colours.mainActive};
      }
    `}

  ${({ size }) =>
    size &&
    css`
      font-size: ${calcFontSize(size)};
      padding: 0.5em 1em;
    `}

  ${({ primary, disabled }) =>
    primary &&
    css`
      border-color: ${Colours.main};
      background-color: ${Colours.main};
      color: ${Colours.background};

      ${!disabled &&
      css`
        &:hover {
          color: ${Colours.background};
          background-color: ${Colours.mainHover};
        }

        &:active {
          border-color: ${Colours.mainActive};
          background-color: ${Colours.mainActive};
        }
      `}
    `}

  ${({ error }) =>
    error &&
    css`
      border-color: ${Colours.error};
      background-color: ${Colours.error};
      color: ${Colours.background};

      &:hover {
        color: ${Colours.background};
        border-color: ${Colours.errorHover};
        background-color: ${Colours.errorHover};
      }

      &:active {
        border-color: ${Colours.errorActive};
        background-color: ${Colours.errorActive};
      }
    `}

      ${({ link }) =>
    link &&
    css`
      border: none;
      background: none;
      color: ${Colours.main};
      padding: 0;

      &:hover,
      & a:hover {
        color: ${Colours.mainHover};
      }

      &:active,
      & a:active {
        color: ${Colours.mainActive};
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
