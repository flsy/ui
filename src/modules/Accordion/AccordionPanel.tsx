import React from 'react';
import styled, { css } from 'styled-components';
import { Button, Container } from '../../index';
import { borderRadius, Colours } from '../../mainStyles';
import DownIcon from '../Icon/DownIcon';
import UpIcon from '../Icon/UpIcon';

interface IProps {
  isOpen: boolean;
  title: string;
  onOpen: () => void;
  onClose?: () => void;
}

const PanelWrapper = styled.div`
  margin: 8px 4px;
`;
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

const AccordionPanel: React.FC<IProps> = ({ title, isOpen, onClose, onOpen, children }) => {
  return (
    <PanelWrapper>
      <Header isOpen={isOpen}>
        <Button text={title} link={true} onClick={onOpen} disabled={isOpen} />
        {onClose && <Button text="" link={true} onClick={isOpen ? onClose : onOpen} iconRight={isOpen ? <UpIcon /> : <DownIcon />} />}
      </Header>
      {isOpen && <Container>{children}</Container>}
    </PanelWrapper>
  );
};

export default AccordionPanel;
