import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { Button, Container, FixedDrawer } from '../../index';
import Drawer from './Drawer';

const FixedDrawerStory = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Container>
        <Button onClick={() => setIsOpen(!isOpen)} text="Open Drawer" />
      </Container>
      {isOpen && (
        <FixedDrawer height={100} close={() => setIsOpen(false)}>
          <h2>Drawer</h2>
        </FixedDrawer>
      )}
    </>
  );
};

const Content = () => {
  return (
    <>
      Ut bibendum orci neque, eget dictum velit dapibus id. Nullam et ipsum rutrum, porttitor ipsum id, mattis leo. Quisque vitae massa tellus. Nullam fringilla porttitor ligula,
      ut accumsan eros lobortis ac. Fusce tristique eu justo vel lacinia. Praesent ornare convallis lectus, quis volutpat neque. Ut nunc mauris, consequat id neque quis, luctus
      accumsan eros. Phasellus tincidunt tempor arcu, sit amet rhoncus massa vulputate eu.
    </>
  );
};

const DrawerStory = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <>
      <Container>
        <Button onClick={() => setIsOpen(!isOpen)} text="Open Drawer" />
      </Container>
      <Drawer destroyOnClose={boolean('destroy on close', false)} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Content />
      </Drawer>
    </>
  );
};

storiesOf('Drawer', module)
  .addDecorator(withKnobs)
  .add('drawer', () => <DrawerStory />)
  .add('fixed drawer', () => <FixedDrawerStory />);
