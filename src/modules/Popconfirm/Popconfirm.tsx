import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Colours } from '../../mainStyles';
import useClickOutside from '../../utils/useClickOutside';
import Button from '../Button/Button';
import ButtonGroup from '../Layout/ButtonGroup';
import Spacer from '../Layout/Spacer';
import { TooltipText, TooltipWrapper } from '../Tooltip/Tooltip';

const SPopconfirm = styled(TooltipWrapper)`
  cursor: pointer;
`;

const SPopconfirmContent = styled(TooltipText)`
  cursor: initial;
  background: #fff;
  color: ${Colours.font};
  width: 200px;
  margin-left: -110px;
  padding: 12px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

  &:after {
    border-color: #fff transparent transparent transparent;
  }
`;

interface IProps {
  isVisible: boolean;
  children: ReactNode;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  okText: string;
  cancelText: string;
}

const Popconfirm = ({ children, isVisible, okText, cancelText, onCancel, onConfirm, title }: IProps) => {
  const { ref } = useClickOutside(onCancel);

  return (
    <SPopconfirm ref={ref}>
      {children}
      {isVisible && (
        <SPopconfirmContent>
          {title}
          <Spacer size="lg" />
          <ButtonGroup>
            <Button name="popconfirm-ok" size="xs" onClick={onConfirm} primary={true}>
              {okText}
            </Button>
            <Button name="popconfirm-cancel" size="xs" onClick={onCancel}>
              {cancelText}
            </Button>
          </ButtonGroup>
        </SPopconfirmContent>
      )}
    </SPopconfirm>
  );
};

export default Popconfirm;
