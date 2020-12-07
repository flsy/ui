import CloseOutlined from '@ant-design/icons/CloseOutlined';
import React, { ReactNode } from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import ButtonIcon from '../Button/ButtonIcon';
import Flex from '../Layout/Flex';

interface IDrawerProps {
  close?: () => void;
  height: number;
  isOpen?: boolean;
  content?: ReactNode;
}

const DrawerWrapper = styled(animated.div)`
  background-color: #fff;
  width: 100%;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0px -1px 5px 0px rgba(204, 204, 204, 0.5);
`;

const DrawerHeader = styled(Flex)`
  flex-direction: row;
  justify-content: flex-end;
  margin: 10px;
`;

const DrawerContent = styled.div`
  overflow: auto;
  height: calc(100% - 30px);
  margin: 0px 10px 10px 10px;
`;

const SDrawer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SDrawerChildren = styled.div`
  height: 100%;
  overflow: auto;
`;

const FixedDrawer: React.FC<IDrawerProps> = ({ children, content, close, height: defaultHeight, isOpen }) => {
  const height = isOpen ? defaultHeight : 0;
  const props = useSpring({ height, minHeight: height });

  return (
    <SDrawer>
      <SDrawerChildren>{children}</SDrawerChildren>
      <DrawerWrapper style={props}>
        <DrawerHeader>{close && <ButtonIcon onClick={() => close()} icon={<CloseOutlined />} />}</DrawerHeader>
        <DrawerContent>{content}</DrawerContent>
      </DrawerWrapper>
    </SDrawer>
  );
};

export default FixedDrawer;
