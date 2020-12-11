import { shallow } from 'enzyme';
import React from 'react';
import StyledBadge, { Badge } from '../Badge';

describe('<Badge />', () => {
  it('should render with styles', () => {
    const badge = shallow(<StyledBadge value={1} />);
    expect(badge).toMatchSnapshot();
  });
  it('should render correct value', () => {
    const badge = shallow(<Badge value={69} />);
    expect(badge.text()).toBe('69');
  });
  it('should render children', () => {
    const badge = shallow(
      <Badge value={69}>
        <div data-test-id="child">I am a child!</div>
      </Badge>,
    );
    expect(badge.find('[data-test-id="child"]').text()).toBe('I am a child!');
  });
});
