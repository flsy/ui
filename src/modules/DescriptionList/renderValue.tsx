import DownOutlined from '@ant-design/icons/DownOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Colours } from '../../mainStyles';
import { toDateTimeString } from '../../utils/utils';
import Button from '../Button/Button';
import { Span } from '../Typography/Typography';
// eslint-disable-next-line import/no-cycle
import DescriptionList from './DescriptionList';
import { ILine } from './interfaces';

const Img = styled.img`
  display: block;
  max-width: 1024px;
`;

const JsonData = styled.pre`
  background-color: ${Colours.background};
  padding: 24px;
  color: ${Colours.font};
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

export const isNull = (value: any): value is null => typeof value === 'object' && !value;
const isObject = (v: any) => v?.constructor === Object && !isNull(v.value) && !v.value;
const renderImage = (img: string, name?: string) => {
  return <Img src={`data:image/jpeg;base64, ${img}`} alt={name || undefined} />;
};

export const renderValue = (value: ILine, name?: any) => {
  const [showRawData, setShowRawData] = useState<boolean>(false);
  if (isNull(value)) {
    return;
  }

  if (value.value === '') {
    return;
  }

  if (value.type === 'boolean') {
    return <Span colour={Colours.grey}>{value.value ? 'true' : 'false'}</Span>;
  }

  if (value.type === 'base64') {
    return renderImage(value.value, name);
  }
  if (value.type === 'date') {
    return <Span colour={Colours.grey}>{toDateTimeString(new Date(value.value * 1000))}</Span>;
  }

  if (value.type === 'xml') {
    return (
      <>
        <Button
          iconLeft={showRawData ? <UpOutlined /> : <DownOutlined />}
          text={showRawData ? 'Skrýt raw data' : 'Zobrazit raw data'}
          onClick={() => setShowRawData(!showRawData)}
        />
        {showRawData && <JsonData>{value.value}</JsonData>}
      </>
    );
  }

  if (isObject(value)) {
    return <DescriptionList data={value} prevKey={name} />;
  }

  if (Array.isArray(value)) {
    // eslint-disable-next-line react/no-array-index-key
    return value.map((obj, index) => <DescriptionList key={`${index}-${name}`} data={obj} prevKey={name} index={index} />);
  }

  return <Span colour={Colours.grey}>{value.value}</Span>;
};
