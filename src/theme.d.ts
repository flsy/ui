import 'styled-components';
import { ColorPalette } from './createTheme';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    isDark: boolean;
    colors: {
      text: string;
      border: string;
      main: ColorPalette;
      info: ColorPalette;
      error: ColorPalette;
      success: ColorPalette;
      warning: ColorPalette;
    };
    background: {
      default: string;
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  }
}
