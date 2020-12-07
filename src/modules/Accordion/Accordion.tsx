import React from 'react';
import styled from 'styled-components';

const AccordionWrapper = styled.div`
  margin: 0 auto;
`;

const Accordion: React.FC = ({ children }) => <AccordionWrapper>{children}</AccordionWrapper>;

export default Accordion;
