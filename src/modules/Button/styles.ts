import { css } from 'styled-components';
import Color from 'color';
import { Colors } from '../../createTheme';
import { trainsitionTime } from '../../mainStyles';

export const primaryButtonStyles = css<{ disabled: boolean }>`
  border-color: ${({ theme }) => theme.colors.main.primary};
  background-color: ${({ theme }) => theme.colors.main.primary};
  color: ${Colors.textLight};

  &:hover {
    color: ${Colors.textLight};
    background-color: ${({ theme }) => theme.colors.main.dark};
    border-color: ${({ theme }) => theme.colors.main.dark};
  }

  &:active {
    color: ${Colors.textLight};
    border-color: ${({ theme }) => theme.colors.main.darker};
    background-color: ${({ theme }) => theme.colors.main.darker};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      border-color: ${({ theme }) => theme.colors.main.light};
      background-color: ${({ theme }) => theme.colors.main.light};

      &:hover {
        background-color: ${({ theme }) => theme.colors.main.light};
        border-color: ${({ theme }) => theme.colors.main.light};
      }

      &:active {
        border-color: ${({ theme }) => theme.colors.main.light};
        background-color: ${({ theme }) => theme.colors.main.light};
      }
    `}
`;

export const errorButtonStyles = css<{ disabled: boolean }>`
  border-color: ${({ theme }) => theme.colors.error.primary};
  background-color: ${({ theme }) => theme.colors.error.primary};
  color: ${Colors.textLight};

  &:hover {
    color: ${Colors.textLight};
    border-color: ${({ theme }) => theme.colors.error.darker};
    background-color: ${({ theme }) => theme.colors.error.darker};
  }

  &:active {
    color: ${Colors.textLight};
    border-color: ${({ theme }) => theme.colors.error.dark};
    background-color: ${({ theme }) => theme.colors.error.dark};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      border-color: ${({ theme }) => theme.colors.error.lighter};
      background-color: ${({ theme }) => theme.colors.error.lighter};

      &:hover {
        background-color: ${({ theme }) => theme.colors.error.lighter};
        border-color: ${({ theme }) => theme.colors.error.lighter};
      }

      &:active {
        border-color: ${({ theme }) => theme.colors.error.lighter};
        background-color: ${({ theme }) => theme.colors.error.lighter};
      }
    `}
`;

export const linkButtonStyles = css<{ disabled: boolean }>`
  border: 1px solid transparent;
  background: none;
  color: ${({ theme }) => theme.colors.main.primary};

  &:hover,
  & a:hover {
    border: 1px solid transparent;
    background: none;
    color: ${({ theme }) => theme.colors.main.dark};
  }

  &:active,
  & a:active {
    border: 1px solid transparent;
    background: none;
    color: ${({ theme }) => theme.colors.main.darker};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => theme.colors.main.lighter};

      &:hover {
        color: ${({ theme }) => theme.colors.main.lighter};
      }

      &:active {
        color: ${({ theme }) => theme.colors.main.lighter};
      }
    `}
`;

export const defaultButtonStyles = css<{ disabled: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  border-color: ${({ theme }) => theme.colors.border};

  &:hover {
    border-color: ${({ theme }) => theme.colors.main.dark};
    color: ${({ theme }) => theme.colors.main.dark};
    transition: all ${trainsitionTime};
  }

  &:active {
    border-color: ${({ theme }) => theme.colors.main.darker};
    color: ${({ theme }) => theme.colors.main.darker};
    transition: all ${trainsitionTime};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => Color(theme.colors.text).alpha(0.5).rgb().toString()};
      border-color: ${({ theme }) => theme.colors.border};

      &:hover {
        color: ${({ theme }) => Color(theme.colors.text).alpha(0.5).rgb().toString()};
        border-color: ${({ theme }) => theme.colors.border};
      }

      &:active {
        color: ${({ theme }) => Color(theme.colors.text).alpha(0.5).rgb().toString()};
        border-color: ${({ theme }) => theme.colors.border};
      }
    `}
`;
