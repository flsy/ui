import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../../index';
import { borderRadius, Colours } from '../../mainStyles';
import DownIcon from '../Icon/DownIcon';
import UpIcon from '../Icon/UpIcon';

interface IProps {
  isOpen: boolean;
  title: string;
  onOpen: () => void;
  className?: string;
  onClose?: () => void;
  children?: ReactNode;
}

const Header = styled.div<{ isOpen: boolean }>`
  background-color: ${Colours.background};
  border: 1px solid ${Colours.border};
  padding: 8px;
  display: flex;
  justify-content: space-between;
  border-radius: ${borderRadius};

  ${({ isOpen }) =>
    isOpen &&
    css`
      border-bottom: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}
`;

const Content = styled.div`
  padding: 1em;
  margin: auto;
  border: 1px solid ${Colours.border};
`;

const AccordionPanel = ({ className, title, isOpen, onClose, onOpen, children }: IProps) => (
  <div className={className}>
    <Header isOpen={isOpen}>
      <Button text={title} link={true} onClick={isOpen ? onClose : onOpen} />
      {onClose && <Button text="" link={true} onClick={isOpen ? onClose : onOpen} iconRight={isOpen ? <UpIcon /> : <DownIcon />} />}
    </Header>
    {isOpen && <Content>{children}</Content>}
  </div>
);

export default styled(AccordionPanel)`
  margin: 8px 4px;
`;
