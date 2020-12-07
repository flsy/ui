import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colours } from '../../mainStyles';
import { ListContext } from './List';

export const SListItem = styled.div<{ horizontal: boolean; isClickable?: boolean; isActive?: boolean }>`
  color: ${Colours.font};
  padding: 14px 30px;

  &:hover {
    background: #f0f0f0;
  }

  ${({ horizontal }) =>
    horizontal &&
    `
     &:hover {
      padding: 14px 30px 12px 30px;
      border-bottom: 2px solid #f0f0f0;
     }
    `}

  ${({ horizontal, isActive }) =>
    horizontal &&
    isActive &&
    `
     &, &:hover {
      padding: 14px 30px 12px 30px;
      border-bottom: 2px solid ${Colours.main}
     }
    `}


  ${({ isClickable }) =>
    isClickable &&
    `
     cursor: pointer;
    `}

  ${({ horizontal }) =>
    !horizontal &&
    `
      padding: 10px;
      border-bottom: 1px solid ${Colours.border};
    `}
`;

export const SLink = styled.div`
  & > a {
    color: ${Colours.font};
    text-decoration: none;
  }
`;

interface IListItemProps {
  to?: string;
  onClick?: () => void;
  isActive?: boolean;
  children: React.ReactChild;
}

const ListItem = ({ to, children, onClick, isActive }: IListItemProps) => {
  const listContext = useContext(ListContext);
  const horizontal = listContext?.horizontal;

  if (to) {
    return (
      <SLink>
        <Link to={to}>
          <SListItem horizontal={horizontal} isActive={isActive}>
            {children}
          </SListItem>
        </Link>
      </SLink>
    );
  }

  return (
    <SListItem onClick={onClick} isClickable={!!onClick} horizontal={horizontal} isActive={isActive}>
      {children}
    </SListItem>
  );
};

export default ListItem;
