import React from 'react';
import { GlobalStyle } from '../src/mainStyles';
import { ThemeProvider } from 'styled-components';
import createTheme from "../src/createTheme";
import {select} from "@storybook/addon-knobs";

import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';

export const decorators = [
  Story => (
    <ThemeProvider theme={createTheme({ theme: select('theme', ['light', 'dark'], 'light'), main: '#40a9ff' })}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
