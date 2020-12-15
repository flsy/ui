import CloseOutlined from '@ant-design/icons/CloseOutlined';
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Colours } from '../../mainStyles';
import getColorByType from '../../utils/getColorByType';
import hexToRgb from '../../utils/hexToRgb';
import ButtonIcon from '../Button/ButtonIcon';
import { ColorTypes, ColouredWrapper } from '../../components/ColouredWrapper';
import Flex from '../Layout/Flex';

interface IProps {
  type: ColorTypes;
  text: string;
  description?: string;
  open?: boolean;
  close?: any;
  dismissTimeout?: number;
}

export const MessageWrapper = styled.div<{ hasDismiss: boolean }>`
  padding: 8px 16px ${({ hasDismiss }) => (hasDismiss ? 6 : 8)}px 16px;

  h3 {
    font-size: 1em;
    margin: 8px 0;
  }

  p {
    font-size: 0.9em;
  }
`;

const MessageFlex = styled(Flex)`
  justify-content: space-between;
`;

const SDescription = styled.span`
  color: ${Colours.font};
  font-size: 0.9em;
  font-weight: 500;
`;

const DismissTimeout = styled.div<{ timeout: number; type?: ColorTypes }>`
  height: 2px;

  ${({ type }) => {
    const rgb = hexToRgb(getColorByType(type));
    return css`
      background-color: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8);
    `;
  }}

  animation: ${keyframes`
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  `} ${({ timeout }) => `${timeout}ms linear forwards`};
`;

const Message: React.FC<IProps> = ({ dismissTimeout, type, text, description, children, open, close }) => {
  if (!open) {
    return null;
  }

  return (
    <ColouredWrapper type={type}>
      <MessageWrapper hasDismiss={!!dismissTimeout}>
        <MessageFlex horizontal={true}>
          {text && description && <h3>{text}</h3>}
          {close && <ButtonIcon onClick={close} icon={<CloseOutlined />} />}
        </MessageFlex>
        {text && !description && <SDescription>{text}</SDescription>}
        {description && <SDescription>{description}</SDescription>}
        {children}
      </MessageWrapper>
      {dismissTimeout && <DismissTimeout type={type} timeout={dismissTimeout} />}
    </ColouredWrapper>
  );
};

export default Message;
