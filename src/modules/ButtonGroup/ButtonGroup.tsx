import React from 'react';
import styled, { css } from 'styled-components';
import { ButtonWrapper } from '../Button/Button';

interface IProps {
  children: JSX.Element | JSX.Element[];
  isCentered?: boolean;
}

const Styled = styled.div<IProps>`
  ${ButtonWrapper}:not(:first-of-type) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  ${ButtonWrapper}:not(:last-of-type) {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  ${({ isCentered }) =>
    isCentered &&
    css`
      text-align: center;
    `}
`;

const ButtonGroup = (props: IProps) => {
  return <Styled {...props}>{props.children}</Styled>;
};

ButtonGroup.defaultProps = {
  isCentered: false,
};

export default ButtonGroup;
