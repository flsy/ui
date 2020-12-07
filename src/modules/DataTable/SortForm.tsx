import React from 'react';
import MetaForm, { Field } from 'react-metaforms';
import styled from 'styled-components';
import { lensPath, view } from '../../utils/lens';
import DownIcon from '../Icon/DownIcon';
import UpIcon from '../Icon/UpIcon';
import Flex from '../Layout/Flex';

interface IProps {
  sortForm: Field;
  path: string[];
}

const SIcons = styled(Flex)`
  margin-left: 6px;
  font-size: 9px;
`;

const SortForm = ({ path, sortForm }: IProps) => {
  const valueLens = lensPath([...path, 'value']);
  const [formFields, setFormFields] = React.useState(sortForm);
  const value = view(valueLens)(sortForm);

  return (
    <MetaForm
      form={formFields}
      onSubmit={() => {}}
      onFormChange={setFormFields}
      components={({ component }) => {
        if (component?.type === 'sort') {
          return (
            <SIcons key={`sort-${path.join('-')}`}>
              <UpIcon isActive={value === 'ASC'} />
              <DownIcon isActive={value === 'DESC'} />
            </SIcons>
          );
        }

        return;
      }}
    />
  );
};

export default SortForm;
