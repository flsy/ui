import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { borderRadius, Colours } from '../../mainStyles';
import useClickOutside from '../../utils/useClickOutside';

export interface IPopupProps {
  isOpen: boolean;
  isRelative?: boolean;
  styles?: React.CSSProperties;
  onClose: () => void;
  content: ReactNode;
}

interface IWrapper {
  isRelative: boolean;
  styles: any;
}

export const PopupContent = styled.div<IWrapper>`
  position: absolute;
  background-color: ${Colours.background};
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: ${borderRadius};
  min-width: 100%;

  ${({ styles }) => styles && styles}

  ${({ isRelative }) =>
    isRelative &&
    css`
      position: fixed;
      top: 45px;
      right: 10px;
    `}
`;

export const PopupWrapper = styled.div`
  display: contents;
`;

const Popup: React.FC<IPopupProps> = ({ isOpen, children, onClose, isRelative, styles, content }) => {
  const { ref } = useClickOutside(onClose);

  return (
    <PopupWrapper ref={ref}>
      {isOpen && (
        <PopupContent isRelative={isRelative || false} styles={styles}>
          {content}
        </PopupContent>
      )}
      {children}
    </PopupWrapper>
  );
};

export default Popup;
