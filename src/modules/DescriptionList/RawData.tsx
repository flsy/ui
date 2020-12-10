import React, { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Button from '../Button/Button';
import { Colours } from '../../mainStyles';

const CodeBlock = styled.pre`
  background-color: ${Colours.smidgenGrey};
  padding: 24px;
  color: ${Colours.font};
  overflow-wrap: break-word;
  white-space: pre-wrap;
  border-radius: 8px;
`;

interface IProps {
  rawData: string | number | unknown;
}

export const RawData = ({ rawData }: IProps) => {
  const [showData, setShowData] = useState<boolean>(false);
  return (
    <>
      <Button iconLeft={showData ? <UpOutlined /> : <DownOutlined />} text={showData ? 'Skrýt raw data' : 'Zobrazit raw data'} onClick={() => setShowData(!showData)} />
      {showData && <CodeBlock>{rawData}</CodeBlock>}
    </>
  );
};
