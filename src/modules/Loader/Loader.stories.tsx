import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Loader } from '../../index';
import { Basic } from '../DataTable/DataTable.stories';
import LoaderOverlay from './LoaderOverlay';

const LoaderOverlayStory = () => {
  return (
    <LoaderOverlay text="Loading something" isLoading={true}>
      <Basic />
    </LoaderOverlay>
  );
};

storiesOf('Loader', module)
  .addDecorator(withKnobs)
  .add('basic usage', () => <Loader text={text('Text', 'Loading ')} isFullScreen={boolean('is full screen', false)} size={select('size', ['xs', 'sm', 'md', 'lg', 'xl'], 'md')} />)
  .add('loader overlay', () => <LoaderOverlayStory />);
