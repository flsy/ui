import { storiesOf } from '@storybook/react';
import React from 'react';
import { Accordion, Container } from '../../index';
import AccordionPanel from './AccordionPanel';

const AccordionPreview = () => {
  const [openId, setOpenId] = React.useState(0);
  return (
    <Container size="xl">
      <Accordion>
        <AccordionPanel isOpen={openId === 0} title="Step 1" onOpen={() => setOpenId(0)} onClose={() => setOpenId(1)}>
          prvni krok
        </AccordionPanel>
        <AccordionPanel isOpen={openId === 1} title="Step 2" onOpen={() => setOpenId(1)} onClose={() => setOpenId(2)}>
          druhy krok
        </AccordionPanel>
        <AccordionPanel isOpen={openId === 2} title="Step 3" onOpen={() => setOpenId(2)}>
          treti krok
        </AccordionPanel>
      </Accordion>
    </Container>
  );
};

storiesOf('Accordion', module).add('basic usage', () => <AccordionPreview />);
