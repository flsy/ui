import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal/Modal';

const Image = styled.img`
  max-width: 95vw;
  max-height: 95vh;
  height: auto;
`;

const ImageModalWrapper = styled.div`
  display: inline;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

interface IImagePreview {
  src: string;
  previewWidth?: number;
  alt?: string;
}

const ImageModal = ({ src, previewWidth, alt }: IImagePreview) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ImageModalWrapper>
        <Image src={src} width={previewWidth} onClick={() => setIsOpen(true)} alt={alt} />
      </ImageModalWrapper>
      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <Image src={src} alt={alt} />
      </Modal>
    </>
  );
};

ImageModal.defaultProps = {
  previewWidth: 150,
  alt: undefined,
};

export default ImageModal;
