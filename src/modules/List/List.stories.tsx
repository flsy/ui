import { action } from '@storybook/addon-actions';
import { number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import List from './List';
import ListItem from './ListItem';

const ListStory = () => (
  <MemoryRouter>
    <List>
      <ListItem to="/google">a</ListItem>
      <ListItem onClick={action('clicked B')}>b</ListItem>
      <ListItem>c</ListItem>
    </List>
  </MemoryRouter>
);

const ListHorizontalStory = () => (
  <MemoryRouter>
    <List horizontal={true}>
      <ListItem>a</ListItem>
      <ListItem>b</ListItem>
      <ListItem>c</ListItem>
    </List>
  </MemoryRouter>
);

const ListNoResultsStory = () => (
  <MemoryRouter>
    <i>Try to set number of items to 0 to see noResultsLabel</i>
    <List horizontal={true} noResultsLabel="Nothing to see">
      {Array(number('Nuber of items', 3, { min: 0 })).fill(<ListItem>yo!</ListItem>)}
    </List>
  </MemoryRouter>
);

storiesOf('List', module)
  .addDecorator(withKnobs)
  .add('vertical', () => <ListStory />)
  .add('horizontal', () => <ListHorizontalStory />)
  .add('with no result text', () => <ListNoResultsStory />);
