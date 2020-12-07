import CloseOutlined from '@ant-design/icons/CloseOutlined';
import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import Flex from '../Layout/Flex';
import { P } from '../Typography/Typography';

interface IProps {
  title?: string;
  isOpen: boolean;
  close: () => void;
  buttonText?: string;
  text?: string;
  onSubmit?: () => void;
  actions?: React.ReactNode[];
}

const Wrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  left: 50%;
  max-height: 100%;
  max-width: 100%;
  padding: 20px;
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  z-index: 60;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background: rgba(0, 0, 0, 0.7);
`;

const CloseButtonStyles = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 0;
  }
`;

const Body = styled.div`
  padding: 5px;
`;

const Actions = styled.div`
  display: inline-block;
  padding-top: 20px;
  bottom: 20px;
`;

const Title = styled.p`
  font-size: 20px;
`;

const CloseButton: React.FC<{ children?: React.ReactNode; close: () => void }> = ({ children, close }) => (
  <CloseButtonStyles onClick={close}>{children || <CloseOutlined />}</CloseButtonStyles>
);

const Modal: React.FC<IProps> = ({ children, isOpen, close, title, text, onSubmit, actions, buttonText }) => (
  <>
    {isOpen && <ModalOverlay />}
    {isOpen && (
      <Wrapper>
        <CloseButton close={close} />
        <Title>{title && title}</Title>
        <Body>
          {text && <P>{text}</P>}
          {children}
        </Body>
        {actions && (
          <Actions>
            <Flex horizontal={true}>{actions}</Flex>
            {!actions && onSubmit && <Button onClick={onSubmit} primary={true} text={buttonText && buttonText} />}
          </Actions>
        )}
      </Wrapper>
    )}
  </>
);

export default Modal;
