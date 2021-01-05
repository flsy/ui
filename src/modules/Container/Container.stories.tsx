import { select, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../../index';
import { Link } from '../Link';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

export const Basic = () => <Container size={select<any>('Size', sizes, 'md', 'Sizes')}>Content {select<any>('Size', sizes, 'md', 'Sizes')}</Container>;

export const WithActions = () => (
  <MemoryRouter>
    <Container
      size="md"
      title="Fancy container"
      actions={[
        <Link primary={true} to="/a">
          Create
        </Link>,
        <Link to="/b">About</Link>,
      ]}
    >
      Content
    </Container>
  </MemoryRouter>
);

const CustomContainer = styled(Container)`
  background: #abeae9;
`;

export const CustomBackground = () => (
  <MemoryRouter>
    <CustomContainer
      size="md"
      title="Fancy container"
      actions={[
        <Link primary={true} to="/a">
          Create
        </Link>,
        <Link to="/b">About</Link>,
      ]}
    >
      Content
    </CustomContainer>
  </MemoryRouter>
);

export default {
  title: 'Components/Container',
  decorators: [withKnobs],
};
