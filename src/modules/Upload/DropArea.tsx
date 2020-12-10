import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { borderRadius, Colours } from '../../mainStyles';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { readAsDataURL } from './utils';

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
    border-color: ${Colours.main};
  `}

  input[type='file'] {
    display: none;
  }
`;

interface DropAreaProps {
  onChange: (b64?: string[]) => void;
  name: string;
  multiple?: boolean;
}

const preventDragDefault = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

const getImage = async (file: File) => {
  const dataUrl = await readAsDataURL(file);
  return dataUrl?.replace(/^data:image.+;base64,/, '');
};

const DropArea = (props: DropAreaProps) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    preventDragDefault(e);
    setHovered(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    preventDragDefault(e);
    setHovered(false);
  };

  const onChange = async (fileList?: FileList) => {
    const multiImages = await Promise.all(Array.from(fileList || []).map(async (file) => getImage(file)));
    const filteredMi: string[] = multiImages.filter((mi): mi is string => mi !== undefined);
    props.onChange(filteredMi);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    preventDragDefault(e);
    const fileList = e.dataTransfer.files;
    if (!props.multiple && fileList.length > 1) {
      setIsModalOpen(true);
      return;
    }
    await onChange(fileList);
    setHovered(false);
  };

  const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await onChange(e?.target?.files ?? undefined);
  };

  const handleClick = () => {
    inputEl.current?.click();
  };

  return (
    <Wrapper hovered={hovered} onDragEnter={handleDragEnter} onDrop={handleDrop} onDragLeave={handleDragLeave} onDragOver={preventDragDefault}>
      <Button size="xs" onClick={handleClick} text="Vyberte obrázek" />
      <input ref={inputEl} onChange={handleSelectFile} type="file" accept="image/*" name={props.name} multiple={props.multiple} />
      <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)} title="Chyba při nahrávání" text="Nelze nahrát více obrázků." />
    </Wrapper>
  );
};

DropArea.defaultProps = {
  multiple: false,
};

export default DropArea;
