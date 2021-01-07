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
    lighter: Color(color).lighten(0.3).rgb().toString(),
    light: Color(color).lighten(0.1).rgb().toString(),
    primary: color,
    dark: Color(color).darken(0.15).rgb().toString(),
    darker: Color(color).darken(0.4).rgb().toString(),
  };
};

const isDark = (config: ThemeConfig) => config.theme === 'dark';

export enum Colors {
  success = '#52c41a',
  warning = '#fa8c16',
  error = '#f5222d',
  info = '#1890ff',
  textLight = '#fdfdfd',
}

const createTheme = (config: ThemeConfig): DefaultTheme => ({
  borderRadius: '2px',
  isDark: isDark(config),
  colors: {
    border: isDark(config) ? 'rgba(255,255,255,.85)' : '#dbdbdb',
    main: getColorPalette(config.main),
    text: isDark(config) ? '#fdfdfd' : 'rgba(0,0,0,.85)',
    info: getColorPalette(Colors.info),
    error: getColorPalette(Colors.error),
    success: getColorPalette(Colors.success),
    warning: getColorPalette(Colors.warning),
  },
  background: {
    default: isDark(config) ? '#001529' : '#fafafa',
    success: Color(Colors.success).lighten(0.3).alpha(0.3).rgb().toString(),
    info: Color(Colors.info).lighten(0.3).alpha(0.3).rgb().toString(),
    warning: Color(Colors.warning).lighten(0.3).alpha(0.3).rgb().toString(),
    error: Color(Colors.error).lighten(0.3).alpha(0.3).rgb().toString(),
  },
});

export default createTheme;
