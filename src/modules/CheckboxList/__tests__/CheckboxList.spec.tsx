import React from 'react';
import { CheckBox } from '../../inputs/Checkbox';
import { InputStyled } from '../../inputs/Input';
import CheckboxList from '../CheckboxList';
import { mountWithTheme } from '../../../testUtils';

const getOptions = (length: number) => Array.from(Array(length).keys()).map((v) => ({ value: v, label: `option ${v}` }));

describe('<CheckboxList />', () => {
  it('should render empty message without options', () => {
    const component = mountWithTheme(<CheckboxList labels={{ empty: 'this one is empty', search: 'search' }} name="name" onChange={jest.fn} />);
    expect(component.text()).toBe('this one is empty');
  });

  it('should render empty message with empty options', () => {
    const component = mountWithTheme(<CheckboxList labels={{ empty: 'this one is empty', search: 'search' }} name="name" options={[]} onChange={jest.fn} />);
    expect(component.text()).toBe('this one is empty');
  });

  it('should render list of options', () => {
    const component = mountWithTheme(
      <CheckboxList
        labels={{ empty: 'this one is empty', search: 'search' }}
        name="name"
        options={[
          { value: 1, label: 'hey ho' },
          { value: 2, label: 'hello' },
        ]}
        onChange={jest.fn}
      />,
    );
    expect(component.find(CheckBox).length).toBe(2);
    expect(component.find(CheckBox).at(0).text()).toBe('hey ho');
    expect(component.find(CheckBox).at(1).text()).toBe('hello');
  });

  it("shouldn't render search if there is less than 10 items", () => {
    const component = mountWithTheme(<CheckboxList labels={{ empty: 'this one is empty', search: 'search' }} name="name" options={getOptions(9)} onChange={jest.fn} />);
    expect(component.find(InputStyled).exists()).toBe(false);
  });

  it('should render search if there is more than 9 items', () => {
    const component = mountWithTheme(<CheckboxList labels={{ empty: 'this one is empty', search: 'search' }} name="name" options={getOptions(10)} onChange={jest.fn} />);
    expect(component.find(InputStyled).exists()).toBe(true);
  });
});
