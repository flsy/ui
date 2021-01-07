import React from 'react';
import DescriptionList from '../DescriptionList';
import { eventMock } from '../testHelpers';
import { mountWithTheme } from '../../../testUtils';

describe('<DescriptionList />', () => {
  it('renders correctly on new strucuture', () => {
    const component = mountWithTheme(<DescriptionList data={eventMock} />);

    expect(component.find('dl').exists()).toBe(true);
    expect(component.find('dt[data-test-id="description-list-externalUid-key"]').text()).toBe('externalUid:');
    expect(component.find('dd[data-test-id="description-list-externalUid-value"]').text()).toBe('xxx');
    expect(component.find('dt[data-test-id="description-list-randomNumber-key"]').text()).toBe('randomNumber:');
    expect(component.find('dd[data-test-id="description-list-randomNumber-value"]').text()).toBe('123');
    expect(component.find('dt[data-test-id="description-list-nowTimestamp-key"]').text()).toBe('nowTimestamp:');
    // expect(component.find('dd[data-test-id="description-list-nowTimestamp-value"]').text()).toBe('14.7.2017 04:40');
    expect(component.find('dt[data-test-id="description-list-nest-firstName-key"]').text()).toBe('firstName:');
    expect(component.find('dd[data-test-id="description-list-nest-firstName-value"]').text()).toBe('');
    expect(component.find('dt[data-test-id="description-list-attachmentArray-attachmentName-key"]').text()).toBe('attachmentName:');
    expect(component.find('dd[data-test-id="description-list-attachmentArray-attachmentName-value"]').text()).toBe('attachmentName');
    component.unmount();
  });
});
