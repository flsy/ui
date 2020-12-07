import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import React from 'react';
import styled from 'styled-components';
import { ButtonWrapper } from '../Button/Button';

interface IProps {
  fileContent: string;
  fileName: string;
  mimeType?: string;
  text: string;
  hasIcon?: boolean;
}

const SLink = styled(ButtonWrapper)`
  text-decoration: none;
`;

const SText = styled.div<{ hasIcon?: boolean }>`
  display: inline;
  ${({ hasIcon }) => hasIcon && 'margin-left: 13px;'}
`;

const Downloader = ({ fileContent, fileName, mimeType, text, hasIcon }: IProps) => {
  const createUrl = (file: string, type?: string) => {
    const url = window.URL || window.webkitURL;
    const blob = new Blob([file], { type });
    return url.createObjectURL(blob);
  };

  return (
    <SLink as="a" href={createUrl(fileContent, mimeType)} download={fileName} primary={true}>
      {hasIcon && <DownloadOutlined />}
      <SText hasIcon={hasIcon}>{text}</SText>
    </SLink>
  );
};
export default Downloader;
