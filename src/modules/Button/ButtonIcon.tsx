import React from 'react';
import styled from 'styled-components';
import { calcSize, Colours, trainsitionTime } from '../../mainStyles';

type Size = 'xs' | 'sm' | 'md' | 'lg';

interface IButtonIconProps {
  onClick: () => void;
  icon: React.ReactElement;
  id?: string;
  name?: string;
  primary?: boolean;
  size?: Size;
}

export const ButtonIconWrapper = styled.button<{ primary?: boolean; size?: Size }>`
  display: flex;
  align-items: center;
  transition: all ${trainsitionTime};
  background: none;
  border: none;
  cursor: pointer;
  ${({ size }) => `font-size: ${calcSize(size || 'md', false, 8)};`}

  &:focus {
    outline: none;
  }

  &:hover {
    color: ${Colours.grey};
  }

  &:active {
    color: ${Colours.mainActive};
  }

  ${({ primary }) =>
    primary &&
    `
    color: ${Colours.main}
  `}
`;

const ButtonIcon = ({ icon, onClick, id, name, primary, size }: IButtonIconProps) => (
  <ButtonIconWrapper id={id} type="button" name={name} onClick={onClick} primary={primary} size={size}>
    {icon}
  </ButtonIconWrapper>
);

export default ButtonIcon;
