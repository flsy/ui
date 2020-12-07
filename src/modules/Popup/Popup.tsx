import React from 'react';
import styled, { css } from 'styled-components';
import { borderRadius, Colours } from '../../mainStyles';
import useClickOutside from '../../utils/useClickOutside';

interface IProps {
  isOpen: boolean;
  isRelative?: boolean;
  styles?: React.CSSProperties;
  onClose: () => void;
}

interface IWrapper {
  isRelative: boolean;
  styles: any;
}

export const PopupWrapper = styled.div<IWrapper>`
  position: absolute;
  background-color: ${Colours.background};
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: ${borderRadius};

  ${({ styles }) => styles && styles}

  ${({ isRelative }) =>
    isRelative &&
    css`
      position: fixed;
      top: 45px;
      right: 10px;
    `}
`;

const Popup: React.FC<IProps> = ({ isOpen, children, onClose, isRelative, styles }) => {
  const { ref } = useClickOutside(onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <PopupWrapper ref={ref} isRelative={isRelative || false} styles={styles}>
      {children}
    </PopupWrapper>
  );
};

export default Popup;
