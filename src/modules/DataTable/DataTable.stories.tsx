import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { Column, Columns } from '../MetaTable';
import DataTable from './DataTable';
import { AllTypes } from './interfaces';

export interface IColumns extends Columns<AllTypes> {
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

export const columns: IColumns = {
  id: {
    type: 'number',
    label: 'Id',
    key: true,
    sortForm: {
      id: {
        type: 'sort',
        value: 'ASC',
      },
    },
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
    sortForm: {
      content: {
        type: 'sort',
        value: 'ASC',
      },
    },
    filterForm: {
      content: {
        label: 'Kontent',
        type: 'text',
        value: null,
        placeholder: 'Obsah',
        errorMessage: null,
      },
      submit: {
        type: 'submit',
        label: 'Uložit',
      },
    },
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

export const DataTableStory = () => {
  const [selected, setSelected] = useState<number>();
  return (
    <DataTable
      columns={columns}
      data={data}
      onRowSelect={(row) => (row.id === selected ? setSelected(undefined) : setSelected(row.id))}
      isRowSelected={(row) => selected === row.id}
      isKeyboardSelect={boolean('keyboard selection', true)}
      isLoading={boolean('loading', false)}
      {...(boolean('row expanding', false)
        ? {
            expandedRowRender: (row) => (row.id % 2 ? <div>yo</div> : undefined),
          }
        : {})}
    />
  );
};

const NoDataStory = () => {
  const [selected, setSelected] = useState<number>();
  return (
    <DataTable
      columns={boolean('no columns', true) ? {} : columns}
      data={boolean('no data', true) ? [] : data}
      labels={{
        empty: text('empty label', ''),
      }}
      isLoading={boolean('loading', false)}
      onRowSelect={(row) => (row.id === selected ? setSelected(undefined) : setSelected(row.id))}
      isRowSelected={(row) => selected === row.id}
      {...(boolean('row expanding', false)
        ? {
            expandedRowRender: (row) => (row.id % 2 ? <div>yo</div> : undefined),
          }
        : {})}
    />
  );
};

storiesOf('Data table new', module)
  .addDecorator(withKnobs)
  .add('basic usage', () => <DataTableStory />)
  .add('no data', () => <NoDataStory />);
