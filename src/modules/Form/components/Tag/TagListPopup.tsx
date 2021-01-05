import EditOutlined from '@ant-design/icons/EditOutlined';
import React, { useState } from 'react';
import styled from 'styled-components';
import { borderRadius, Colours } from '../../../../mainStyles';
import Button from '../../../Button/Button';
import CheckboxList from '../../../CheckboxList/CheckboxList';
import Popup from '../../../Popup/Popup';

export interface IAddTagProps {
  onCreateClick?: () => void;
  labels: { empty: string; addButton: string; editButton: string; search: string };
  options: Array<{
    value: number;
    label: string;
  }>;
  name: string;
  values: number[];
  onChange: (values: IAddTagProps['values']) => void;
}

export const Tag = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 6px;
  color: ${Colours.font};
  background-color: ${Colours.background};
  border: 1px dashed ${Colours.border};
  border-radius: ${borderRadius};
  width: 80px;
  margin-top: 10px;

  &:hover {
    color: ${Colours.mainHover};
    border-color: ${Colours.mainHover};
    cursor: pointer;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TagListPopup = ({ labels, options, values, onChange, onCreateClick, name }: IAddTagProps) => {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  return (
    <div>
      <Tag onClick={() => setIsListOpen(true)} data-test-id={`input-tags-${name}-edit-button`}>
        <EditOutlined />
        {labels.editButton}
      </Tag>

      <Popup isOpen={isListOpen} onClose={() => setIsListOpen(false)}>
        <CheckboxList labels={labels} options={options} values={values} onChange={onChange} name={name} />
        {onCreateClick && (
          <ButtonWrapper>
            <Button
              size="xs"
              onClick={() => {
                setIsListOpen(false);
                onCreateClick();
              }}
            >
              {labels.addButton}
            </Button>
          </ButtonWrapper>
        )}
      </Popup>
    </div>
  );
};

export default TagListPopup;
