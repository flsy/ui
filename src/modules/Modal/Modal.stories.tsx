import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../../index';
import Modal from './Modal';

const ModalStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onSubmit = () => {
    console.log('submitted!');
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        title="Title modal"
        text="lorem ipsum bla bla lorem ipsum bla bla lorem ipsum bla bla lorem ipsum bla bla lorem ipsum bla bla lorem ipsum bla bla"
        close={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        buttonText="Confirm"
        actions={[
          <Button onClick={() => onSubmit()} primary={true}>
            OK
          </Button>,
          <Button onClick={() => onSubmit()} error={true}>
            Error
          </Button>,
        ]}
      >
        <Button>In a modal</Button>
      </Modal>

      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
    </>
  );
};

storiesOf('Modal', module).add('basic usage', () => <ModalStory />);
