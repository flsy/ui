import { isRequired } from 'metaforms';
import React from 'react';
import { FieldProps } from 'react-metaforms';
import FileTwoTone from '@ant-design/icons/FileTwoTone';
import styled from 'styled-components';
import { ErrorMessage, InputWrapper, Label } from '../inputs/sharedStyles';
import DropArea from './DropArea';
import { fileReader } from './utils';
import ListItem from '../List/ListItem';
import List from '../List/List';

type FieldValue = { name: string; data: string };

export interface IFileUploadProps extends FieldProps<FieldValue> {
  accept?: string;
}

const FileName = styled.span`
  margin-left: 2em;
`;

const FileUpload = ({ name, update, label, errorMessage, validation, accept, value }: IFileUploadProps) => {
  const handleChange = async (fl?: FileList) => {
    if (fl[0]) {
      const frResult = await fileReader(fl[0]);
      const fv = { name: fl[0].name, data: frResult };
      update(name, fv);
    }
  };

  return (
    <InputWrapper>
      {label && <Label fieldId={name} label={label} isRequired={isRequired(validation)} />}
      <DropArea name={name} onChange={handleChange} multiple={false} label={label} accept={accept} />
      {errorMessage ? <ErrorMessage message={errorMessage} name={name} /> : null}
      <List>
        {value?.name && (
          <ListItem>
            <FileTwoTone />
            <FileName>{value.name}</FileName>
          </ListItem>
        )}
      </List>
    </InputWrapper>
  );
};

export default FileUpload;
