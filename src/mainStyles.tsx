import { createGlobalStyle } from 'styled-components';

export enum Colours {
  // General
  font = 'rgba(0,0,0,.85)',
  background = '#fafafa',
  grey = '#555',
  lightGrey = '#ccc',
  border = '#dbdbdb',
  disabled = '#404D62',
  main = '#08979c',
  lightMain = '#0ABCC2',
  lighterMain = '#0BCED5',
  error = '#d93340',
  success = '#45980c',
  // Buttons
  mainHover = '#00878d',
  mainActive = '#006d75',
  errorHover = '#c92e3a',
  errorActive = '#b82b37',
  // Smidgen
  smidgenMain = 'rgba(8,151,156,0.2)',
  smidgenGrey = '#f2f2f2',
  smidgenError = '#ffccc7',
  smidgenWarning = '#ffe58f',
  smidgenInfo = '#91d5ff',
  smidgenSuccess = '#b7eb8f',
  // Tooltip
  tooltipBackground = 'rgba(24,24,24,0.98)',
}

export const trainsitionTime = '0.2s';
export const borderRadius = '2px';

export const calcSize = (size: string, numeric?: boolean, base = 8) => {
  switch (size) {
    case 'xs':
      return numeric ? base : `${base}px`;
    case 'sm':
      return numeric ? base * 1.2 : `${base * 1.2}px`;
    case 'md':
      return numeric ? base * 2 : `${base * 2}px`;
    case 'lg':
      return numeric ? base * 3 : `${base * 3}px`;
    case 'xl':
      return numeric ? base * 4 : `${base * 4}px`;
    default:
      return numeric ? base : `${base}px`;
  }
};

export const GlobalStyle = createGlobalStyle`
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${Colours.font};
  background-color: ${Colours.background};
}

form {
  margin: 0;
}
`;
