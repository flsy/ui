import { boolean, number, text, withKnobs, select } from '@storybook/addon-knobs';
import React from 'react';
import Tag from './Tag';

export const OneTag = () => (
  <Tag
    type={select('type', ['default', 'success', 'warning', 'error', 'info'], 'default')}
    isLoading={boolean('is loading', false)}
    label={text('label', 'Tag 1')}
    description={text('description', '')}
  />
);

export const TagList = () => (
  <>
    {Array.from(Array(number('number of tags', 10, { min: 0 })).keys()).map((v) => (
      <Tag isLoading={boolean('is loading', false)} label={`Tag ${v}`} description={`description ${v}`} />
    ))}
  </>
);

export default {
  title: 'Components/Tag',
  decorators: [withKnobs],
};
