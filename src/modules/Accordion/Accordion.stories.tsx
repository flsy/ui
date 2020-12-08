import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { Accordion, Container } from '../../index';
import AccordionPanel from './AccordionPanel';

const AccordionContent = ({ openId, setOpenId }) => (
  <>
    <AccordionPanel isOpen={openId === 0} title="Step 1" onOpen={() => setOpenId(0)} onClose={() => setOpenId()}>
      first content
    </AccordionPanel>
    <AccordionPanel isOpen={openId === 1} title="Step 2" onOpen={() => setOpenId(1)} onClose={() => setOpenId()}>
      second content
    </AccordionPanel>
    <AccordionPanel isOpen={openId === 2} title="Step 3" onOpen={() => setOpenId(2)} onClose={() => setOpenId()}>
      third content
    </AccordionPanel>
  </>
);

const AccordionPreview = () => {
  const [openId, setOpenId] = React.useState(0);
  return (
    <Container size="xl">
      <Accordion>
        <AccordionContent openId={openId} setOpenId={setOpenId} />
      </Accordion>
    </Container>
  );
};

const StyledAccordion = styled(Accordion)`
  color: red;
`;

const StyledAccordionPreview = () => {
  const [openId, setOpenId] = React.useState(0);
  return (
    <Container size="xl">
      <StyledAccordion>
        <AccordionContent openId={openId} setOpenId={setOpenId} />
      </StyledAccordion>
    </Container>
  );
};

storiesOf('Accordion', module)
  .add('basic usage', () => <AccordionPreview />)
  .add('styled', () => <StyledAccordionPreview />);
