import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from '../Button/Button';
import ToastProvider from './ToastProvider';
import useToasts from './useToasts';

const ToastStory = () => {
  const { addToast } = useToasts();
  return (
    <>
      <Button onClick={() => addToast.success('success')}>show success toast</Button>
      <Button onClick={() => addToast.info('info')}>show info toast</Button>
      <Button onClick={() => addToast.error('error')}>show error toast</Button>
    </>
  );
};

storiesOf('Toast', module).add('basic usage', () => {
  return (
    <ToastProvider>
      <ToastStory />
    </ToastProvider>
  );
});
