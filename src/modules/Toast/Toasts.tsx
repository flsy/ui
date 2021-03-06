import React, { ReactNode } from 'react';
import { DefaultToastContainer, ToastContainerProps, ToastProps } from 'react-toast-notifications';
import styled from 'styled-components';
import Message from '../Message/Message';

const SToast = styled.div`
  width: 400px;
`;

const SToasts = styled.div`
  ${SToast} + ${SToast} {
    margin-top: 6px;
  }
`;

interface IToastProps extends ToastProps {
  // TODO: react-toast-notifications doesn't support custom props in default props (event though in reality it is passed)
  // eslint-disable-next-line react/require-default-props
  description?: string;
  children: ReactNode;
}

const Toast = ({ children, appearance, description, autoDismissTimeout }: IToastProps) => (
  <SToast>
    <Message dismissTimeout={autoDismissTimeout} open={true} type={appearance} text={`${children}`}>
      {description}
    </Message>
  </SToast>
);

const Toasts = ({ children, ...props }: ToastContainerProps) => (
  <DefaultToastContainer {...props}>
    <SToasts>{children}</SToasts>
  </DefaultToastContainer>
);

Toasts.Toast = Toast;

export default Toasts;
