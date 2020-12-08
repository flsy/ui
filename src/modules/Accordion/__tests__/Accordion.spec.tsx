import { shallow } from 'enzyme';
import React from 'react';
import Accordion from '../Accordion';
import { AccordionPanel } from '../index';

describe('<Accordion />', () => {
  it('should render', () => {
    const accordion = shallow(
      <Accordion>
        <AccordionPanel isOpen={true} onOpen={() => {}} title="Panel title">
          Panel content
        </AccordionPanel>
      </Accordion>,
    );
    expect(accordion).toMatchSnapshot();
  });
  it('should render panel content', () => {
    const accordion = shallow(
      <Accordion>
        <AccordionPanel isOpen={true} onOpen={() => {}} title="Panel title">
          Panel content
        </AccordionPanel>
      </Accordion>,
    );
    expect(accordion.find(AccordionPanel).children().text()).toBe('Panel content');
  });
});
