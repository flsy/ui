import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Loader from './Loader';

interface IProps {
  text: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
  isLoading?: boolean;
}

const SLoaderOverlay = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoaderOverlay = ({ children, size, text, isLoading }: IProps) => {
  return (
    <SLoaderOverlay>
      {isLoading && (
        <Overlay>
          <Loader size={size} text={text} />
        </Overlay>
      )}
      {children}
    </SLoaderOverlay>
  );
};

export default LoaderOverlay;
