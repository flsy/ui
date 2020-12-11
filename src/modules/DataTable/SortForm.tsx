import React from 'react';
import { Field } from 'react-metaforms';
import styled from 'styled-components';
import DownIcon from '../Icon/DownIcon';
import UpIcon from '../Icon/UpIcon';
import Flex from '../Layout/Flex';
import DefaultForm from '../Form/Form';
import { Colours } from '../../mainStyles';

interface IProps {
  sortForm: Field;
  path: string[];
  label: string;
  onSubmit: (form: Field) => void;
}

const Form = styled(DefaultForm)`
  margin: 0;

  &,
  & form {
    height: 100%;
  }
`;

const Icons = styled(Flex)`
  margin-left: 6px;
  font-size: 9px;
`;

const Label = styled.span`
  white-space: nowrap;
  user-select: none;
`;

const Sort = styled.div<{ isSortable?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 12px;

  ${({ isSortable }) =>
    isSortable &&
    `
    padding: 0 4px 0 12px;

    &:hover {
      cursor: pointer;
      background: ${Colours.smidgenGrey};
    }
  `}
`;

const SortForm = ({ path, sortForm, label, onSubmit }: IProps) => {
  if (!sortForm) {
    return (
      <Sort>
        <Label data-test-id={`datatable-head-column-label-${String(path.join('-'))}`}>{label}</Label>
      </Sort>
    );
  }

  return (
    <Form
      form={sortForm}
      onSubmit={() => {}}
      onFormChange={onSubmit}
      components={({ component, actions, name, groupChildren }) => {
        if (component?.type === 'sort') {
          return (
            <Sort key={name} isSortable={!!sortForm} onClick={() => actions.update(name, component.value === 'DESC' ? 'ASC' : 'DESC')}>
              <Label data-test-id={`datatable-head-column-label-${String(path.join('-'))}`}>{label}</Label>
              <Icons key={`sort-${path.join('-')}`}>
                <UpIcon isActive={component.value === 'ASC'} />
                <DownIcon isActive={component.value === 'DESC'} />
              </Icons>
            </Sort>
          );
        }

        if (component?.type === 'group') {
          return <React.Fragment key={name}>{groupChildren}</React.Fragment>;
        }

        return;
      }}
    />
  );
};

export default SortForm;
