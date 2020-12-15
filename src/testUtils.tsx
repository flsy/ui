import React, { ReactNode } from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import createTheme from './createTheme';

export const mountWithTheme = (c: ReactNode) => mount(<ThemeProvider theme={createTheme({ theme: 'light', main: '#40a9ff' })}>{c}</ThemeProvider>);
