import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from '../Button/Button';
import ToastProvider from './ToastProvider';
import useToasts from './useToasts';

const ToastStory = () => {
  const { addToast } = useToasts();
  return (
    <>
      <Button onClick={() => addToast.success('success')} text="show success toast" />
      <Button onClick={() => addToast.info('info')} text="show info toast" />
      <Button onClick={() => addToast.error('error')} text="show error toast" />
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
