import React from 'react';
import styled, { css } from 'styled-components';
import Button from '../Button/Button';

interface IProps {
  children: JSX.Element | JSX.Element[];
  // eslint-disable-next-line react/no-unused-prop-types
  isCentered?: boolean;
  className?: string;
}

const ButtonGroup = ({ children, className }: IProps) => <div className={className}>{children}</div>;

ButtonGroup.defaultProps = {
  isCentered: false,
  className: undefined,
};

export default styled(ButtonGroup)`
  display: flex;
  flex-wrap: nowrap;

  ${Button}:not(:first-of-type) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  ${Button}:not(:last-of-type) {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  ${({ isCentered }) =>
    isCentered &&
    css`
      justify-content: center;
    `}
`;
