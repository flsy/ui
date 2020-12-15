import 'styled-components';
import { ColorPalette } from './createTheme';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    colors: {
      text: string;
      border: string;
      background: string;
      main: ColorPalette;
      info: ColorPalette;
      error: ColorPalette;
      success: ColorPalette;
      warning: ColorPalette;
    };
    background: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  }
}
