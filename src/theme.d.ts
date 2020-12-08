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
    };
  }
}
