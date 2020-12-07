import { mount } from 'enzyme';
import React from 'react';
import DescriptionList from '../DescriptionList';
import { eventMock } from '../testHelpers';

describe('<DescriptionList />', () => {
  it('renders correctly on new strucuture', () => {
    const component = mount(<DescriptionList data={eventMock} />);

    expect(component.find('dl').exists()).toEqual(true);
    expect(component.find('dt[data-test-id="description-list-externalUid-key"]').text()).toBe('externalUid: ');
    expect(component.find('dd[data-test-id="description-list-externalUid-value"]').text()).toBe('xxx');
    expect(component.find('dt[data-test-id="description-list-randomNumber-key"]').text()).toBe('randomNumber: ');
    expect(component.find('dd[data-test-id="description-list-randomNumber-value"]').text()).toBe('123');
    expect(component.find('dt[data-test-id="description-list-nowTimestamp-key"]').text()).toBe('nowTimestamp: ');
    // expect(component.find('dd[data-test-id="description-list-nowTimestamp-value"]').text()).toBe('14.7.2017 04:40');
    expect(component.find('dt[data-test-id="description-list-boardingCode-class-key"]').text()).toBe('class: ');
    expect(component.find('dd[data-test-id="description-list-boardingCode-class-value"]').text()).toBe('');
    expect(component.find('dt[data-test-id="description-list-boardingCode-firstName-key"]').text()).toBe('firstName: ');
    expect(component.find('dd[data-test-id="description-list-boardingCode-firstName-value"]').text()).toBe('');
    expect(component.find('dt[data-test-id="description-list-attachment-attachmentName-key"]').text()).toBe('attachmentName: ');
    expect(component.find('dd[data-test-id="description-list-attachment-attachmentName-value"]').text()).toBe('attachmentName');
    component.unmount();
  });
});
