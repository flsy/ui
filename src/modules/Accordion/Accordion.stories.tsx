import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import styled from 'styled-components';
import { Accordion } from '../../index';
import AccordionPanel from './AccordionPanel';

const AccordionContent = ({ openId, setOpenId }): JSX.Element => (
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

export const Basic = (): JSX.Element => {
  const [openId, setOpenId] = React.useState(0);
  return (
    <Accordion>
      <AccordionContent openId={openId} setOpenId={setOpenId} />
    </Accordion>
  );
};

const StyledAccordion = styled(Accordion)`
  color: red;
`;

export const Styled = (): JSX.Element => {
  const [openId, setOpenId] = React.useState(0);
  return (
    <StyledAccordion>
      <AccordionContent openId={openId} setOpenId={setOpenId} />
    </StyledAccordion>
  );
};

export default {
  title: 'Components/Accordion',
  decorators: [withKnobs],
};
