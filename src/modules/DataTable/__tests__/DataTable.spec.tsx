import { mount } from 'enzyme';
import React from 'react';
import { Column, Columns } from '../../MetaTable';
import DataTable from '../DataTable';
import { AllTypes } from '../interfaces';

interface IColumns extends Columns<AllTypes> {
  id: Column<'number'>;
  createdAt: Column<'timestamp'>;
  createdBy: {
    name: Column<'string'>;
  };
  attachments: {
    content: Column<'string'>;
    description: Column<'string'>;
  };
  isPublished: Column<'boolean'>;
  content: Column<'string'>;
}

const columns: IColumns = {
  id: {
    type: 'number',
    label: 'Id',
    key: true,
  },
  createdAt: {
    type: 'timestamp',
    label: 'CreatedAt',
  },
  createdBy: {
    name: {
      type: 'string',
      label: 'CreatedBy',
    },
  },
  attachments: {
    content: {
      type: 'string',
      label: 'Attachment content',
    },
    description: {
      type: 'string',
      label: 'Attachment description',
    },
  },
  isPublished: {
    type: 'boolean',
    label: 'Is published',
  },
  content: {
    type: 'string',
    label: 'Content',
  },
};

const data = [...Array(50)].map((_, i) => ({
  id: i,
  content: 'some content',
  createdAt: 1593520437,
  createdBy: { id: 1, name: 'Joe' },
  isPublished: true,
  attachments: [
    { id: 1, content: `an image ${i}1`, description: 'placeholder image' },
    { id: 2, content: `an image ${i}2`, description: 'placeholder image 2' },
  ],
}));

describe('<DataTable />', () => {
  it('renders ths correctly', () => {
    const component = mount(<DataTable<object> columns={columns} data={data} isRowSelected={() => false} onRowSelect={jest.fn} />);
    const ths = component.find('thead').find('th');

    expect(ths.length).toEqual(7);
    expect(ths.at(0).text()).toEqual('Id');
    expect(ths.at(1).text()).toEqual('CreatedAt');
    expect(ths.at(2).text()).toEqual('CreatedBy');
    expect(ths.at(3).text()).toEqual('Attachment content');
    expect(ths.at(4).text()).toEqual('Attachment description');
    expect(ths.at(5).text()).toEqual('Is published');
    expect(ths.at(6).text()).toEqual('Content');
    component.unmount();
  });
  it('renders trs and tds correctly', () => {
    const component = mount(<DataTable<object> columns={columns} data={data} isRowSelected={() => false} onRowSelect={jest.fn} />);
    const trs = component.find('tbody').find('tr');

    expect(trs.length).toEqual(50);

    [...Array(50)].forEach((_, i) => {
      expect(trs.at(i).find('td').length).toEqual(7);
      expect(trs.at(i).find('td').at(0).text()).toEqual(`${i}`);
      expect(trs.at(i).find('td').at(1).text()).toEqual('1593520437');
      expect(trs.at(i).find('td').at(2).text()).toEqual('Joe');
      expect(trs.at(i).find('td').at(3).find('Tag').length).toEqual(2);
      expect(trs.at(i).find('td').at(3).find('Tag').at(0).text()).toEqual(`an image ${i}1`);
      expect(trs.at(i).find('td').at(3).find('Tag').at(1).text()).toEqual(`an image ${i}2`);
      expect(trs.at(i).find('td').at(4).find('Tag').length).toEqual(2);
      expect(trs.at(i).find('td').at(4).find('Tag').at(0).text()).toEqual('placeholder image');
      expect(trs.at(i).find('td').at(4).find('Tag').at(1).text()).toEqual('placeholder image 2');
      expect(trs.at(i).find('td').at(5).find('BoolIcon').prop('value')).toBe(true);
      expect(trs.at(i).find('td').at(6).text()).toEqual('some content');
    });

    component.unmount();
  });
  it('should display default no data placeholder', () => {
    const component = mount(<DataTable<object> columns={columns} data={[]} isRowSelected={() => false} onRowSelect={jest.fn} />);
    expect(component.find('tbody').text()).toBe('No data');
  });
  it('should display custom no data placeholder', () => {
    const component = mount(<DataTable<object> labels={{ empty: 'Yo nothing to see' }} columns={columns} data={[]} isRowSelected={() => false} onRowSelect={jest.fn} />);
    expect(component.find('tbody').text()).toBe('Yo nothing to see');
  });
  describe('isLoading state', () => {
    it('should display loader', () => {
      const component = mount(<DataTable<object> columns={columns} isLoading={true} data={data} isRowSelected={() => false} onRowSelect={jest.fn} />);
      expect(component.find('[data-test="datatable-loader"]').exists()).toBe(true);
    });
    it("shouldn't display loader", () => {
      const component = mount(<DataTable<object> columns={columns} data={data} isRowSelected={() => false} onRowSelect={jest.fn} />);
      expect(component.find('[data-test="datatable-loader"]').exists()).toBe(false);
    });
  });
});
