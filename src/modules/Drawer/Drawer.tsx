import CloseOutlined from '@ant-design/icons/CloseOutlined';
import React, { ReactNode, useEffect, useState } from 'react';
import { animated, useSpring, useTransition } from 'react-spring';
import styled from 'styled-components';
import Button from '../Button/Button';

interface IDrawerProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  width?: number;
  destroyOnClose?: boolean;
}

const SHeader = styled.div`
  margin: 10px;
`;

const SDrawer = styled(animated.div)<{ width: number }>`
  overflow: scroll;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  width: ${({ width }) => `${width}px`};
  box-shadow: 0px -1px 5px 0px rgba(204, 204, 204, 0.5);
`;

const SOverlay = styled(animated.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const Drawer: React.FC<IDrawerProps> = ({ destroyOnClose, children, isOpen, onClose, width = 400 }) => {
  const [render, setRender] = useState<ReactNode>();

  const props = useSpring({
    right: isOpen ? 0 : -width,
    onRest: (ds) => {
      if (ds.right !== 0 && destroyOnClose) {
        setRender(null);
      }
    },
  });

  useEffect(() => {
    if (isOpen) {
      setRender(children);
    }
  }, [isOpen, children]);

  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {transitions.map(({ item, key, props: overlayProps }) => item && <SOverlay key={key} onClick={() => onClose()} style={overlayProps} />)}
      <SDrawer style={props} width={width}>
        <SHeader>
          <Button onClick={onClose} icon={<CloseOutlined style={{ fontSize: '140%' }} />} hasBorder={false} size="sm" />
        </SHeader>
        <>{render}</>
      </SDrawer>
    </>
  );
};

export default Drawer;
