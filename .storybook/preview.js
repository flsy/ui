import React from 'react';
import { GlobalStyle } from '../src/mainStyles';

export const parameters = {
  backgrounds: {
    values: [
      {
        name: 'ibsng',
        value: '#fafafa'
      },
    ],
  }
}

export const decorators = [
  Story => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
];
