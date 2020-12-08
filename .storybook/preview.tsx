import React from 'react';
import { GlobalStyle } from '../src/mainStyles';
import { ThemeProvider } from 'styled-components';
import createTheme from "../src/createTheme";
import {select} from "@storybook/addon-knobs";

export const decorators = [
  Story => (
    <ThemeProvider theme={createTheme({ theme: select('theme', ['light', 'dark'], 'light'), main: '#40a9ff' })}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
