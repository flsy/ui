import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { borderRadius, Colours } from '../../mainStyles';
import Button from '../Button/Button';

const Wrapper = styled.div<{ hovered?: boolean }>`
  border: 1px dashed ${Colours.lightGrey};
  border-radius: ${borderRadius};
  padding: 12px 0;
  margin: 5px 0;
  display: flex;
  justify-content: center;

  ${(props) =>
    props.hovered &&
    `
    border-color: ${props.theme.colors.main.primary};
  `}

  input[type='file'] {
    display: none;
  }
`;

interface DropAreaProps {
  onChange: (fileList?: FileList) => void;
  name: string;
  label: string;
  accept?: string;
  multiple?: boolean;
}

const preventDragDefault = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

const DropArea = ({ name, multiple, label, accept, ...props }: DropAreaProps) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    preventDragDefault(e);
    setHovered(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    preventDragDefault(e);
    setHovered(false);
  };

  const onChange = async (fileList?: FileList) => props.onChange(fileList);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    preventDragDefault(e);
    const fileList = e.dataTransfer.files;
    await onChange(fileList);
    setHovered(false);
  };

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e?.target?.files);

  const handleClick = () => inputEl.current?.click();

  return (
    <Wrapper hovered={hovered} onDragEnter={handleDragEnter} onDrop={handleDrop} onDragLeave={handleDragLeave} onDragOver={preventDragDefault}>
      <Button size="xs" onClick={handleClick}>
        {label}
      </Button>
      <input ref={inputEl} onChange={handleSelectFile} accept={accept} type="file" name={name} multiple={multiple} />
    </Wrapper>
  );
};

DropArea.defaultProps = {
  multiple: false,
  accept: undefined,
};

export default DropArea;
