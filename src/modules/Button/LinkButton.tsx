import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button, { IButtonProps } from './Button';

interface IProps extends Omit<IButtonProps, 'link' | 'type' | 'onClick'> {
  to: string;
}

const SLink = styled(Link)`
  text-decoration: none;
`;

const LinkButton = ({ to, ...buttonProps }: IProps) => (
  <SLink to={to} data-test-id={`link-${buttonProps.name}`}>
    <Button {...buttonProps} />
  </SLink>
);

export default LinkButton;
