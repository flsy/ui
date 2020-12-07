import styled, { css } from 'styled-components';
import { calcSize, Colours } from '../../mainStyles';

interface IProps {
  bold?: boolean;
  colour?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  uppercase?: boolean;
  italic?: boolean;
  subtitle?: boolean;
  lineHeight?: string;
}

export const P = styled.p<IProps>`
  color: ${({ colour }) => colour || Colours.font};
  font-size: ${({ size }) => size && calcSize(size)};
  font-style: ${({ italic }) => italic && 'italic'};
  font-weight: ${({ bold }) => bold && 600};
  line-height: ${({ lineHeight }) => lineHeight || '1.5'};
  text-transform: ${({ uppercase }) => uppercase && 'uppercase'};

  ${({ subtitle }) =>
    subtitle &&
    css`
      letter-spacing: 0.2em;
      font-size: 125%;
    `}
`;

export const Span = styled.span<IProps>`
  color: ${({ colour }) => colour || Colours.font};
  font-size: ${({ size }) => size && calcSize(size)};
  font-style: ${({ italic }) => italic && 'italic'};
  font-weight: ${({ bold }) => bold && 600};
  line-height: ${({ lineHeight }) => lineHeight || '1.5'};
  text-transform: ${({ uppercase }) => uppercase && 'uppercase'};
  letter-spacing: ${({ subtitle }) => subtitle && '.2em'};
`;
