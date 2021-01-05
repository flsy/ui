import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Button } from '../../index';
import Badge from './Badge';

export const Basic = (): JSX.Element => (
  <>
    Notifications <Badge value={10} />
  </>
);

export const ButtonBadge = (): JSX.Element => (
  <Badge value={10}>
    <Button>With Badge</Button>
  </Badge>
);

export default {
  title: 'Components/Badge',
  decorators: [withKnobs],
};
