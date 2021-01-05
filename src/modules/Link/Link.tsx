import React from 'react';
import { Link as RRDLink } from 'react-router-dom';
import styled from 'styled-components';
import Button, { IButtonProps } from '../Button/Button';

interface IProps extends Omit<IButtonProps, 'link' | 'type' | 'onClick'> {
  to: string;
}

const SLink = styled(RRDLink)`
  text-decoration: none;
`;

const Link = ({ to, ...buttonProps }: IProps) => (
  <SLink to={to} data-test-id={`link-${buttonProps.name}`}>
    <Button {...buttonProps} />
  </SLink>
);

export default Link;
