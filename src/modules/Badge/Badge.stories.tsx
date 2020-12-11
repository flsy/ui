import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Button } from '../../index';
import Badge from './Badge';

export const Basic = () => (
  <>
    Notifications <Badge value={10} />
  </>
);

export const ButtonBadge = () => (
  <Badge value={10}>
    <Button text="Abc" />
  </Badge>
);

export default {
  title: 'Components/Badge',
  decorators: [withKnobs],
};
