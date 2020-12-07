import { storiesOf } from '@storybook/react';
import React from 'react';
import Descriptions from './Descriptions';

const DescriptionsStory = () => (
  <Descriptions title="Descriptions example">
    <Descriptions.Item label="First">First value</Descriptions.Item>
    <Descriptions.Title label="Group" />
    <Descriptions.Item label="Second">Second value</Descriptions.Item>
    <Descriptions.Item label="Third">Third value</Descriptions.Item>
  </Descriptions>
);

storiesOf('Descriptions', module).add('basic usage', () => <DescriptionsStory />);
