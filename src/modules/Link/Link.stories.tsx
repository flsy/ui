import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import React, { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import DownIcon from '../Icon/DownIcon';
import Link from './Link';

const sizes = ['xs', 'sm', 'md', 'lg'];

export const Default = (): ReactNode => (
  <MemoryRouter>
    <Link
      to="/a"
      primary={boolean('Primary', false, 'Type')}
      error={boolean('Error', false, 'Type')}
      disabled={boolean('Disabled', false, 'Type')}
      size={select<any>('Size', sizes, 'md', 'Sizes')}
      iconLeft={boolean('Icon left', false, 'Extra') ? <DownIcon /> : undefined}
      iconRight={boolean('Icon right', false, 'Extra') ? <DownIcon /> : undefined}
    >
      hey ho
    </Link>
  </MemoryRouter>
);

export default {
  title: 'Components/Link',
  decorators: [withKnobs],
};
