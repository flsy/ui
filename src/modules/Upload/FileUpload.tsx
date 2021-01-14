import { isRequired } from 'metaforms';
import React, { useState } from 'react';
import { FieldProps } from 'react-metaforms';
import FileTwoTone from '@ant-design/icons/FileTwoTone';
import styled from 'styled-components';
import { ErrorMessage, InputWrapper, Label } from '../inputs/sharedStyles';
import DropArea from './DropArea';
import { fileReader } from './utils';
import ListItem from '../List/ListItem';
import List from '../List/List';

export interface IFileUploadProps extends FieldProps<string | string[]> {
  accept?: string;
}

const FileName = styled.span`
  margin-left: 2em;
`;

const FileUpload = ({ name, update, label, errorMessage, validation, accept }: IFileUploadProps) => {
  const [file, setFile] = useState<File>(undefined);

  const handleChange = async (fl?: FileList) => {
    if (fl[0]) {
      const frResult = await fileReader(fl[0]);
      update(name, frResult);
      setFile(fl[0]);
    }
  };

  return (
    <InputWrapper>
      {label && <Label fieldId={name} label={label} isRequired={isRequired(validation)} />}
      <DropArea name={name} onChange={handleChange} multiple={false} label={label} accept={accept} />
      {errorMessage ? <ErrorMessage message={errorMessage} name={name} /> : null}
      <List>
        {file && (
          <ListItem>
            <FileTwoTone />
            <FileName>{file.name}</FileName>
          </ListItem>
        )}
      </List>
    </InputWrapper>
  );
};

export default FileUpload;
