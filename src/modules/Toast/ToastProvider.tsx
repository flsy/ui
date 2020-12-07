import React from 'react';
import { ToastProvider as Provider, ToastProviderProps } from 'react-toast-notifications';
import Toasts from './Toasts';

const ToastProvider = (props: ToastProviderProps) => (
  <Provider autoDismiss={true} autoDismissTimeout={5000} placement="bottom-center" transitionDuration={0} components={{ Toast: Toasts.Toast, ToastContainer: Toasts }} {...props} />
);
export default ToastProvider;
