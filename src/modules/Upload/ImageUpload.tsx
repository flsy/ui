import { isRequired } from 'metaforms';
import React, { useState } from 'react';
import { FieldProps } from 'react-metaforms';
import { ErrorMessage, InputWrapper, Label } from '../inputs/sharedStyles';
import DropArea from './DropArea';
import ImagePreview from './ImagePreview';

export interface IImageUploadProps extends FieldProps<string | string[]> {
  values?: string[];
  multiple?: boolean;
}

const ImageUpload = ({ name, values, update, label, errorMessage, validation, multiple }: IImageUploadProps) => {
  const [base64, setBase64] = useState<string[]>(values || []);

  const handleRemove = (index: number) => {
    const current = base64.filter((_, i) => index !== i);
    setBase64(current);
    update(name, multiple ? current : base64[0]);
  };

  const handleChange = (b64?: string[]) => {
    if (multiple && b64) {
      setBase64([...base64, ...b64]);
      update(name, b64);
    } else if (b64) {
      setBase64(b64);
      update(name, b64[0]);
    }
  };

  return (
    <InputWrapper>
      {label && <Label fieldId={name} label={label} isRequired={isRequired(validation)} />}
      <DropArea name={name} onChange={handleChange} multiple={multiple} />
      {base64 && <ImagePreview onRemove={handleRemove} base64={base64} />}
      {errorMessage ? <ErrorMessage message={errorMessage} name={name} /> : null}
    </InputWrapper>
  );
};

export default ImageUpload;
