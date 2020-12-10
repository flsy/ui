import { storiesOf } from '@storybook/react';
import React from 'react';
import { Container, DescriptionList } from '../../index';
import Downloader from '../Downloader/Downloader';
import { eventMock } from './testHelpers';
import { isILine } from './renderValue';

const DescriptionListStory = () => {
  return (
    <Container
      title={`Description list ${isILine(eventMock.externalUid) && eventMock.externalUid.value}`}
      isSticky={true}
      actions={[
        <Downloader
          fileContent={`${isILine(eventMock.jsonData) && eventMock.jsonData.value}` || ''}
          fileName={`${isILine(eventMock.externalUid) && eventMock.externalUid.value}` || 'export'}
          mimeType="application/json"
          text="Download"
          hasIcon={true}
        />,
      ]}
    >
      <DescriptionList data={eventMock} />
    </Container>
  );
};

storiesOf('DescriptionList', module).add('basic usage', () => <DescriptionListStory />);
