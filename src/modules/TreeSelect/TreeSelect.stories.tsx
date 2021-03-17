import { withKnobs } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import TreeSelect from './TreeSelect';

const data = [
  {
    title: 'Admins',
    value: 'g:admin',
    children: [
      {
        title: 'Joe',
        value: 'u:joe',
      },
    ],
  },
  {
    title: 'Basic users',
    value: 'g:user',
    children: [
      {
        title: 'Dash',
        value: 'u:dash',
      },
      {
        title: 'Bill',
        value: 'u:bill',
      },
      {
        title: 'John',
        value: 'u:john',
      },
    ],
  },
];

export const Basic = (): JSX.Element => {
  const [v, setV] = useState<string[]>([]);
  return <TreeSelect treeData={data} value={v} onChange={setV} />;
};

export default {
  title: 'Components/TreeSelect',
  decorators: [withKnobs],
};
