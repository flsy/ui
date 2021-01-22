import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import { Navigation } from '../../index';

export const Basic = (): JSX.Element => {
  return (
    <Navigation>
      <Navigation.Title>Buttons</Navigation.Title>
      <Navigation.Button onClick={action('clicked')}>Button 1</Navigation.Button>
      <Navigation.Button onClick={action('clicked')}>Button 2</Navigation.Button>
    </Navigation>
  );
};

const StyledNavigation = styled(Navigation)`
  font-weight: 500;
  font-size: 120%;
`;

export const Styled = (): JSX.Element => {
  return (
    <StyledNavigation>
      <Navigation.Title>Buttons</Navigation.Title>
      <Navigation.Button onClick={action('clicked')}>Button 1</Navigation.Button>
      <Navigation.Button onClick={action('clicked')}>Button 2</Navigation.Button>
    </StyledNavigation>
  );
};

export default {
  title: 'Components/Navigation',
  decorators: [withKnobs],
};
