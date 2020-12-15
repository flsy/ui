import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Container } from '../../index';
import FormWithOverview from './FormWithOverview';
import Button from '../Button/Button';

const FormWithOverviewStory = () => {
  return (
    <FormWithOverview title="x" actions={[<Button text="Hello" />]} overview={<Container title="List">overview</Container>}>
      xx
    </FormWithOverview>
  );
};

storiesOf('FormWithOverview', module)
  .addDecorator(withKnobs)
  .add('basic', () => <FormWithOverviewStory />);
