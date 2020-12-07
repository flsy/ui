import { storiesOf } from '@storybook/react';
import React from 'react';
import { Container } from '../../index';
import Downloader from './Downloader';
import { mockFile } from './mockFile';

const DownloaderStory = () => {
  return (
    <Container>
      <Downloader fileContent={mockFile} fileName="rawData.json" mimeType="application/json" text="Stahnout" hasIcon={true} />
    </Container>
  );
};

storiesOf('Downloader', module).add('basic usage', () => <DownloaderStory />);
