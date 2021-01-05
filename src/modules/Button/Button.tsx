import React from 'react';
import styled, { css } from 'styled-components';
import { borderRadius, calcSize, Colours, trainsitionTime } from '../../mainStyles';
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
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  isLoading?: boolean;
  children?: string;
}

const SText = styled.div<{ hasIconLeft: boolean; hasIconRight: boolean }>`
  ${({ hasIconLeft }) => hasIconLeft && `margin-left: 13px;`}
  ${({ hasIconRight }) => hasIconRight && ` margin-right: 13px;`}
`;

export const ButtonWrapper = styled.button<Omit<IButtonProps, 'children'>>`
  transition: all ${trainsitionTime};
  border-radius: ${borderRadius};
  white-space: nowrap;
  cursor: pointer;
  background-color: transparent;
  font-size: inherit;
  padding: 4px 10px;
  border: 1px solid ${Colours.grey};

  &:focus {
    outline: none;
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
      padding: ${+calcSize(size, true) / 2}px ${calcSize(size)};
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

    ${({ iconRight, iconLeft }) =>
    (iconRight || iconLeft) &&
    css`
      display: flex;
      align-items: center;
    `}
`;

const Button = ({ className, isLoading, onClick, name, disabled, type, primary, link, size, iconLeft: iconLeftDefault, iconRight, error, children }: IButtonProps) => {
  const iconLeft = isLoading ? <LoadingAnimation size="xs" inverted={primary || error} /> : iconLeftDefault;
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
      iconLeft={iconLeft}
      iconRight={iconRight}
      data-test-id={`button-${name}`}
      error={error}
    >
      {iconLeft}
      <SText hasIconLeft={!!iconLeft} hasIconRight={!!iconRight}>
        {children}
      </SText>
      {iconRight}
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  size: 'md',
  bordered: true,
  className: undefined,
};

export default styled(Button)``;
