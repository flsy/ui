import { storiesOf } from '@storybook/react';
import React from 'react';
import { Container, DescriptionList } from '../../index';
import Downloader from '../Downloader/Downloader';
import { eventMock } from './testHelpers';

const DescriptionListStory = () => {
  return (
    <Container
      title={`Událost ${eventMock.externalUid.value}`}
      isSticky={true}
      actions={[<Downloader fileContent={eventMock.jsonData.value} fileName={eventMock.externalUid.value} mimeType="application/json" text="Stáhnout událost" hasIcon={true} />]}
    >
      <DescriptionList data={eventMock} />
    </Container>
  );
};

storiesOf('DescriptionList', module).add('basic usage', () => <DescriptionListStory />);
