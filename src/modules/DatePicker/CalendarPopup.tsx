import React from 'react';
import styled, { css } from 'styled-components';
import Popup, { IPopupProps } from '../Popup/Popup';

interface ICalendarProps extends IPopupProps {
  isRight?: boolean;
}

const SPopup = styled.div<{ isRight?: boolean }>`
  ${({ isRight }) =>
    isRight &&
    css`
      display: flex;
      justify-content: flex-end;
    `}
`;

const CalendarPopup: React.FC<ICalendarProps> = ({ isRight, ...props }) => {
  return (
    <SPopup isRight={isRight}>
      <Popup {...props} />
    </SPopup>
  );
};

CalendarPopup.defaultProps = {
  isRight: false,
};

export default CalendarPopup;
