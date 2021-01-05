import React from 'react';
import styled from 'styled-components';
import { Colours } from '../../mainStyles';
import Button from '../Button/Button';

interface ImagePreviewProps {
  base64: string[];
  onRemove: (index: number) => void;
}

const ImageWrapper = styled.div`
  position: relative;
  border: 2px solid ${Colours.lightGrey};
  margin: 4px 0;
`;

export const Image = styled.img`
  width: 100%;
  opacity: 1;
  display: block;
  transition: 0.5s ease;
  backface-visibility: hidden;
`;

const ButtonWrapper = styled.div`
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
  position: relative;
  width: 100%;

  &:hover ${Image} {
    opacity: 0.3;
  }

  &:hover ${ButtonWrapper} {
    opacity: 1;
  }
`;

const ImagePreview = ({ base64, onRemove }: ImagePreviewProps) => (
  <>
    {base64.map((b64, index) => (
      <Container key={b64}>
        <ImageWrapper>
          <Image src={`data:image/jpeg;base64,${b64}`} alt="preview" />
          <ButtonWrapper>
            <Button onClick={() => onRemove(index)}>Odstranit</Button>
          </ButtonWrapper>
        </ImageWrapper>
      </Container>
    ))}
  </>
);

export default ImagePreview;
