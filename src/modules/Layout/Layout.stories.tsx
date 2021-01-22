import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../../index';
import { Basic } from '../DataTable/DataTable.stories';
import Navigation from '../Navigation/Navigation';
import Layout from './Layout';

export const DatatableAndDrawer = () => {
  return (
    <MemoryRouter>
      <Layout
        version="1.22"
        environment={text('environment', 'development')}
        navigation={
          <Navigation>
            <Navigation.Link to="/">Index</Navigation.Link>
            <Navigation.Link to="/">Second</Navigation.Link>
            <Navigation.Divider>Johnny Doe</Navigation.Divider>
            <Navigation.Link to="/">Settings</Navigation.Link>
            <Navigation.Button onClick={console.log}>Logout</Navigation.Button>
          </Navigation>
        }
      >
        <Container title="List">
          <Basic />
        </Container>
      </Layout>
    </MemoryRouter>
  );
};

const StyledLayout = styled(Layout)`
  grid-template-columns: 300px 2rem auto 2rem;
`;

export const Styled = () => {
  return (
    <MemoryRouter>
      <StyledLayout
        version="1.22"
        environment={text('environment', 'development')}
        navigation={
          <Navigation>
            <Navigation.Link to="/">Index</Navigation.Link>
            <Navigation.Link to="/">Second</Navigation.Link>
            <Navigation.Divider>Johnny Doe</Navigation.Divider>
            <Navigation.Link to="/">Settings</Navigation.Link>
            <Navigation.Button onClick={console.log}>Logout</Navigation.Button>
          </Navigation>
        }
      >
        <Container title="List">
          <Basic />
        </Container>
      </StyledLayout>
    </MemoryRouter>
  );
};

export default {
  title: 'Components/Layout',
  decorators: [withKnobs],
};
