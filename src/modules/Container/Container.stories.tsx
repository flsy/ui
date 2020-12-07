import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Container } from '../../index';
import LinkButton from '../Button/LinkButton';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

const ContainerStories = () => <Container size={select<any>('Size', sizes, 'md', 'Sizes')}>Content {select<any>('Size', sizes, 'md', 'Sizes')}</Container>;

const ContainerWithMenu = () => (
  <MemoryRouter>
    <Container size="md" title="Fancy container" actions={[<LinkButton primary={true} to="/a" text="Create" />, <LinkButton to="/b" text="About" />]}>
      Content
    </Container>
  </MemoryRouter>
);

storiesOf('Container', module)
  .addDecorator(withKnobs)
  .add('default', () => <ContainerStories />)
  .add('full width', () => <Container>Content</Container>)
  .add('with menu', () => <ContainerWithMenu />);
