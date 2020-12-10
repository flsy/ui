import React, { ReactNode, ReactNodeArray } from 'react';
import { Link as RRDLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Colours } from '../../mainStyles';
import { Transient } from '../../types';

export const SNavigation = styled.div`
  background-color: #fff;
`;

const SLogo = styled.div`
  justify-content: center;
  width: 100%;
  display: flex;
  padding: 1em 0;
`;

type SItemProps = Transient<{ isActive: boolean; hasIcon: boolean; hasBadge: boolean }>;
const SItem = css<SItemProps>`
  color: ${Colours.font};
  font-weight: 300;
  display: grid;
  align-items: center;
  grid-template-columns: auto;
  padding: 0.5em 1em;
  text-decoration: none;

  ${({ $hasBadge }) =>
    $hasBadge &&
    `
    grid-template-columns: auto 30px;
  `}

  ${({ $hasIcon }) =>
    $hasIcon &&
    `
    grid-template-columns: 30px auto;
  `}

  ${({ $hasIcon, $hasBadge }) =>
    $hasIcon &&
    $hasBadge &&
    `
    grid-template-columns: 30px auto 30px;
  `}

  :hover {
    background: ${Colours.smidgenGrey};
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    color: ${Colours.main};
    border-right: 2px solid ${Colours.main};
  `}
`;

const SLink = styled(RRDLink)<SItemProps>`
  ${SItem}
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

export interface ILinkProps {
  children: string;
  to: string;
  isActive?: boolean;
  icon?: ReactNode;
  badge?: ReactNode;
}

const Link = ({ children, to, isActive, icon, badge }: ILinkProps) => {
  return (
    <SLink to={to} $isActive={!!isActive} $hasIcon={!!icon} $hasBadge={!!badge}>
      {icon && <SIcon>{icon}</SIcon>}
      <div>{children}</div>
      {badge && <div>{badge}</div>}
    </SLink>
  );
};

interface IButtonProps {
  children: string;
  onClick: () => void;
  isActive?: boolean;
  icon?: ReactNode;
  badge?: ReactNode;
}

const Button = ({ children, onClick, isActive, icon, badge }: IButtonProps) => {
  return (
    <SButton onClick={onClick} $isActive={!!isActive} $hasIcon={!!icon} $hasBadge={!!badge}>
      {icon && <SIcon>{icon}</SIcon>}
      <div>{children}</div>
      {badge && <div>{badge}</div>}
    </SButton>
  );
};

Button.defaultProps = {
  isActive: false,
  icon: undefined,
  badge: undefined,
};

const Title = ({ children }: { children: string }) => <STitle>{children}</STitle>;
const Divider = ({ children }: { children: string }) => <SDivider>{children}</SDivider>;

interface INavigationProps {
  logo?: React.ReactElement;
  children: ReactNodeArray;
}

const Navigation = ({ logo, children }: INavigationProps) => (
  <SNavigation>
    {logo && <SLogo>{logo}</SLogo>}
    <>{children}</>
  </SNavigation>
);

Navigation.defaultProps = {
  logo: undefined,
};

Navigation.Divider = Divider;
Navigation.Link = Link;
Navigation.Button = Button;
Navigation.Title = Title;
export default Navigation;
