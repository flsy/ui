import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import Button from '../Button/Button';
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
  cursor: pointer;
  user-select: none;
  background-color: ${({ theme }) => theme.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 8px;
  display: flex;
  justify-content: space-between;

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
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SmallButton = styled(Button)`
  font-size: 10px;
`;

const AccordionPanel = ({ className, title, isOpen, onClose, onOpen, children }: IProps) => (
  <div className={className}>
    <Header isOpen={isOpen} onClick={isOpen ? onClose : onOpen}>
      {title}
      {onClose && <SmallButton text="" link={true} onClick={isOpen ? onClose : onOpen} iconRight={isOpen ? <UpIcon /> : <DownIcon />} />}
    </Header>
    {isOpen && <Content>{children}</Content>}
  </div>
);

AccordionPanel.defaultProps = {
  className: undefined,
  onClose: undefined,
  children: undefined,
};

export default styled(AccordionPanel)`
  margin: 8px 4px;
`;
