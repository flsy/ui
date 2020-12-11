import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Container } from '../../index';
import { Basic } from '../DataTable/DataTable.stories';
import Navigation from '../Navigation/Navigation';
import Layout from './Layout';

const LayoutStory = () => {
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

storiesOf('Layout', module)
  .addDecorator(withKnobs)
  .add('datatable and drawer', () => <LayoutStory />);
