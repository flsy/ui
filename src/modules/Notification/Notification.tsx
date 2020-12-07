import React from 'react';
import styled from 'styled-components';
import { Colours } from '../../mainStyles';
import { toDateTimeString } from '../../utils/utils';

const SNotification = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: ${Colours.smidgenGrey};
  }
`;

const SDate = styled.div`
  font-size: 10px;
  color: ${Colours.grey};
`;

const SMessage = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface IProps {
  createdAt?: number;
  message?: string;
  onClick: () => void;
}

const Notification = ({ onClick, createdAt, message }: IProps) => (
  <SNotification onClick={onClick}>
    <SDate>{createdAt && toDateTimeString(new Date(createdAt * 1000))}</SDate>
    <SMessage>{message}</SMessage>
  </SNotification>
);

export default Notification;
