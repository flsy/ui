import React from 'react';
import styled from 'styled-components';
import LoadingAnimation from './LoadingAnimation';

interface IProps {
  text: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isFullScreen?: boolean;
}

const LoaderWrapper = styled.div<{ isFullScreen?: boolean }>`
  text-align: center;

  ${({ isFullScreen }) =>
    isFullScreen &&
    `
  text-align: center;
  position: fixed;
  height: 7em;
  width: 100%;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  `}
`;

const Loader = ({ text, size, isFullScreen }: IProps) => {
  return (
    <LoaderWrapper isFullScreen={isFullScreen}>
      <LoadingAnimation size={size} />
      {text}
    </LoaderWrapper>
  );
};

Loader.defaultProps = {
  size: 'md',
  isFullScreen: false,
};

export default Loader;
