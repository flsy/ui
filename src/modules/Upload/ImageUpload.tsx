import { isRequired } from 'metaforms';
import React, { useState } from 'react';
import { FieldProps } from 'react-metaforms';
import { ErrorMessage, InputWrapper, Label } from '../inputs/sharedStyles';
import DropArea from './DropArea';
import ImagePreview from './ImagePreview';
import { imageReader } from './utils';

export interface IImageUploadProps extends FieldProps<string | string[]> {
  values?: string[];
  multiple?: boolean;
}

const getImage = async (file: File) => {
  const dataUrl = await imageReader(file);
  return dataUrl?.replace(/^data:image.+;base64,/, '');
};

const ImageUpload = ({ name, values, update, label, errorMessage, validation, multiple }: IImageUploadProps) => {
  const [base64, setBase64] = useState<string[]>(values || []);

  const handleRemove = (index: number) => {
    const current = base64.filter((_, i) => index !== i);
    setBase64(current);
    update(name, multiple ? current : base64[0]);
  };

  const handleChange = async (fileList: FileList) => {
    const multiImages = await Promise.all(Array.from(fileList || []).map(async (file) => getImage(file)));
    const filteredMi: string[] = multiImages.filter((mi): mi is string => mi !== undefined);

    if (multiple && filteredMi) {
      setBase64([...base64, ...filteredMi]);
      update(name, filteredMi);
    } else if (filteredMi) {
      setBase64(filteredMi);
      update(name, filteredMi[0]);
    }
  };

  return (
    <InputWrapper>
      {label && <Label fieldId={name} label={label} isRequired={isRequired(validation)} />}
      <DropArea name={name} onChange={handleChange} multiple={multiple} label={label} accept="image/*" />
      {base64 && <ImagePreview onRemove={handleRemove} base64={base64} />}
      {errorMessage ? <ErrorMessage message={errorMessage} name={name} /> : null}
    </InputWrapper>
  );
};

export default ImageUpload;
