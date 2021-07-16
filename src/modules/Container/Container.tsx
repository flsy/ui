import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import Flex from '../Layout/Flex';
import { Colours } from '../../mainStyles';

const containerStyles = css<IContainerProps>`
  margin: auto;
  position: relative;
  padding: 1em;
  background: #fff;

  ${({ isCentered }) =>
    isCentered &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}
  ${({ size }) =>
    size === 'xs' &&
    css`
      max-width: 360px;
    `};
  ${({ size }) =>
    size === 'sm' &&
    css`
      max-width: 476px;
    `};
  ${({ size }) =>
    size === 'md' &&
    css`
      max-width: 720px;
    `};
  ${({ size }) =>
    size === 'lg' &&
    css`
      max-width: 960px;
    `};
  ${({ size }) =>
    size === 'xl' &&
    css`
      max-width: 1700px;
    `};
`;

export const SActions = styled(Flex)`
  align-items: center;
  margin-left: auto;

  & > *:not(:first-child) {
    margin-left: 10px;
  }
`;

export const STitle = styled.h1`
  margin: 0;
  font-size: 1.3em;
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: ${Colours.background};
`;

export interface IContainerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  actions?: ReactNode[];
  isSticky?: boolean;
  isCentered?: boolean;
  title?: string;
  className?: string;
}

const Container: React.FC<IContainerProps> = ({ className, children, actions, isSticky, title }) => (
  <div className={className}>
    {!isSticky && (
      <Flex horizontal={true}>
        {title && <STitle>{title}</STitle>}
        {actions && <SActions horizontal={true}>{actions}</SActions>}
      </Flex>
    )}
    <>
      {isSticky && (
        <StickyWrapper>
          <Flex horizontal={true}>
            {title && <STitle>{title}</STitle>}
            {actions && <SActions horizontal={true}>{actions}</SActions>}
          </Flex>
        </StickyWrapper>
      )}
      {children}
    </>
  </div>
);

export default styled(Container)`
  ${containerStyles}
`;
