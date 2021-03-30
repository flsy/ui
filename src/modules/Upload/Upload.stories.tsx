import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import FU from './FileUpload';

// eslint-disable-next-line no-console
export const FileUpload = () => <FU name="fu" type="file-upload" label="Upload" update={console.log} updateAndValidate={console.log} validate={console.log} />;

export default {
  title: 'Components/Upload',
  decorators: [withKnobs],
};
