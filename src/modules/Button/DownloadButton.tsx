import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { ButtonWrapper } from './Button';

interface IProps {
  fileContent: string;
  fileName: string;
  mimeType?: string;
  text: string;
  icon?: ReactNode;
}

const Button = styled(ButtonWrapper)`
  text-decoration: none;
`;

const SText = styled.div<{ hasIcon?: boolean }>`
  display: inline;
  ${({ hasIcon }) => hasIcon && 'margin-left: 13px;'}
`;

const createUrl = (file: string, type?: string) => {
  const url = window.URL || window.webkitURL;
  const blob = new Blob([file], { type });
  return url.createObjectURL(blob);
};

const DownloadButton = ({ fileContent, fileName, mimeType, text, icon }: IProps) => {
  return (
    <Button size="md" as="a" href={createUrl(fileContent, mimeType)} download={fileName} primary={true}>
      {icon}
      <SText hasIcon={!!icon}>{text}</SText>
    </Button>
  );
};

DownloadButton.defaultProps = {
  mimeType: undefined,
  icon: null,
};

export default DownloadButton;
