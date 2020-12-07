import { storiesOf } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Dropdown, List } from '../../index';
import ListItem from '../List/ListItem';

const DropdownStory = () => (
  <MemoryRouter>
    <Dropdown buttonLabel="Dropdown example">
      <List>
        <ListItem>ok</ListItem>
        <ListItem to="/">example link</ListItem>
        <ListItem onClick={() => console.log(789)}>example button</ListItem>
      </List>
    </Dropdown>
  </MemoryRouter>
);

storiesOf('Dropdown', module).add('basic usage', () => <DropdownStory />);
