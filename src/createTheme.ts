import Color from 'color';
import { DefaultTheme } from 'styled-components';

export interface ThemeConfig {
  theme: 'light' | 'dark';
  main: string;
}

export type ColorPalette = {
  darker: string;
  dark: string;
  primary: string;
  light: string;
  lighter: string;
};

const getColorPalette = (color: string): ColorPalette => {
  return {
    darker: Color(color).lighten(0.3).rgb().toString(),
    dark: Color(color).lighten(0.1).rgb().toString(),
    primary: color,
    light: Color(color).darken(0.15).rgb().toString(),
    lighter: Color(color).darken(0.4).rgb().toString(),
  };
};

const isDark = (config: ThemeConfig) => config.theme === 'dark';

const createTheme = (config: ThemeConfig): DefaultTheme => ({
  borderRadius: '2px',
  colors: {
    border: isDark(config) ? 'rgba(255,255,255,.85)' : '#dbdbdb',
    background: isDark(config) ? '#001529' : '#fafafa',
    main: getColorPalette(config.main),
    text: isDark(config) ? '#fdfdfd' : 'rgba(0,0,0,.85)',
  },
});

export default createTheme;
