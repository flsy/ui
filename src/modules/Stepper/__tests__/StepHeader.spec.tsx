import { mount } from 'enzyme';
import React from 'react';
import StepHeader from '../StepHeader';

describe('<StepHeader />', () => {
  it('should display active step header', () => {
    const wrapper = mount(<StepHeader title="test title" isActive={true} isCompleted={false} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should display inactive step header', () => {
    const wrapper = mount(<StepHeader isActive={false} isCompleted={false} title="second test title" />);
    expect(wrapper).toMatchSnapshot();
  });
});
