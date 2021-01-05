import { number, withKnobs } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import Pagination from './Pagination';

export const Default = () => {
  const [page, setPage] = useState(1);

  return <Pagination current={page} total={number('total', 10)} onChange={setPage} />;
};

export default {
  title: 'Components/Pagination',
  decorators: [withKnobs],
};
