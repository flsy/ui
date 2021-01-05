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

export const calcFontSize = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string => {
  switch (size) {
    case 'xs':
      return '0.8em';
    case 'sm':
      return '0.9em';
    case 'lg':
      return '1.2em';
    case 'xl':
      return '1.4em';
    default:
      return '1em';
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
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.background.default};
}

form {
  margin: 0;
}
`;
