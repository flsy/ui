import 'styled-components';

declare module 'styled-components' {
  export interface ITooltipProps {
    children: React.ReactNode;
    text: string;
    bgColour?: string;
    colour?: string;
  }

  export interface ITooltipTextProps {
    children: React.ReactNode;
    bgColour?: string;
    colour?: string;
  }
}
