import React, { ReactNode } from 'react';
import { Link as RRDLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Colours } from '../../mainStyles';
import { Transient } from '../../types';
import { Badge } from '../Badge';

const SLogo = styled.div`
  justify-content: center;
  width: 100%;
  display: flex;
  padding: 1em 0;
`;

type SItemProps = Transient<{ isActive: boolean; isSub: boolean }>;
const SItem = css<SItemProps>`
  display: flex;
  align-items: center;
  padding: 0.5em 1em;
  text-decoration: none;
  justify-content: space-between;

  :hover {
    background: ${Colours.smidgenGrey};
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    `
    color: ${theme.colors.main.primary};
    border-right: 2px solid ${theme.colors.main.primary};
  `}

  ${({ $isSub }) =>
    $isSub &&
    `
    padding-left: 2em;
  `}
`;

const SItemChildren = styled.div`
  flex-grow: 1;
`;

const SLink = styled(RRDLink)<SItemProps>`
  ${SItem};
  color: ${({ theme }) => theme.colors.text};
`;

const SButton = styled.div<SItemProps>`
  ${SItem}
  cursor: pointer;
`;

const STitle = styled.div`
  font-weight: 600;
  padding: 0.5em 1em;
  font-size: 90%;
`;

const SIcon = styled.div`
  font-size: 90%;
  margin-right: 1em;
`;

const SDivider = styled(STitle)`
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0.5em 0.5em;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #000;
  }
  &::before {
    margin-right: 0.25em;
  }
  &::after {
    margin-left: 0.25em;
  }
`;

export interface IItemProps {
  children: string;
  icon?: ReactNode;
  badge?: ReactNode;
}

const Item = ({ children, icon, badge }: IItemProps) => (
  <>
    {icon && <SIcon>{icon}</SIcon>}
    <SItemChildren>{children}</SItemChildren>
    {badge !== undefined && <Badge value={badge} />}
  </>
);

export interface ILinkProps extends IItemProps {
  to: string;
  isActive?: boolean;
  isSub?: boolean;
}

const Link = ({ children, to, isActive, icon, badge, isSub }: ILinkProps) => (
  <SLink to={to} $isActive={!!isActive} $isSub={isSub}>
    <Item icon={icon} badge={badge}>
      {children}
    </Item>
  </SLink>
);

interface IButtonProps extends IItemProps {
  onClick: () => void;
  isActive?: boolean;
  isSub?: boolean;
}

const Button = ({ children, onClick, isActive, icon, badge, isSub }: IButtonProps) => (
  <SButton onClick={onClick} $isActive={!!isActive} $isSub={isSub}>
    <Item icon={icon} badge={badge}>
      {children}
    </Item>
  </SButton>
);

Button.defaultProps = {
  isActive: false,
  isSub: false,
};

const Title = ({ children }: { children: string }) => <STitle>{children}</STitle>;
const Divider = ({ children }: { children: string }) => <SDivider>{children}</SDivider>;

interface INavigationProps {
  logo?: React.ReactElement;
  children: ReactNode;
  className?: string;
}

const Navigation = ({ logo, children, className }: INavigationProps) => (
  <div className={className}>
    {logo && <SLogo>{logo}</SLogo>}
    <>{children}</>
  </div>
);

Navigation.defaultProps = {
  logo: undefined,
  className: undefined,
};

Navigation.Divider = Divider;
Navigation.Link = Link;
Navigation.Button = Button;
Navigation.Title = Title;

export default styled(Navigation)`
  font-weight: 300;
`;
