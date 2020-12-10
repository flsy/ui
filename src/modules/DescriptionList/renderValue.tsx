import React from 'react';
import styled from 'styled-components';
import { Colours } from '../../mainStyles';
import { Span } from '../Typography/Typography';
// eslint-disable-next-line import/no-cycle
import DescriptionList, { IData, IDataValue, ILine } from './DescriptionList';
import { toDateTimeString } from '../../utils/utils';
import { RawData } from './RawData';

const Img = styled.img`
  display: block;
  max-width: 1024px;
`;

export const isNull = (value: any): value is null => typeof value === 'object' && !value;
const isObject = (v: any) => v?.constructor === Object && !isNull(v.value) && !v.value;
const hasProp = (object: object, prop: string) => Object.prototype.hasOwnProperty.call(object, prop);
const isIData = (value: IDataValue): value is IData => isObject(value) && !isNull(value);
const isIDataArray = (value: IDataValue): value is IData[] => Array.isArray(value);
const isBoolean = (value: IDataValue): boolean => !isIDataArray(value) && value.type === 'boolean';
const isEmptyString = (value: IDataValue): boolean => !isIDataArray(value) && value.value === '';
export const isILine = (value: IDataValue): value is ILine => !isIDataArray(value) && !isIData(value) && hasProp(value, 'value') && typeof value.value === 'string';

const renderImage = (img: string, name?: string) => {
  return <Img src={`data:image/jpeg;base64, ${img}`} alt={name || undefined} />;
};

export const renderValue = (key: string, value: IDataValue) => {
  if (isNull(value)) {
    return;
  }

  if (isEmptyString(value)) {
    return;
  }

  if (isIData(value) && !isBoolean(value)) {
    return <DescriptionList data={value} prevKey={key} />;
  }

  if (isIDataArray(value)) {
    // eslint-disable-next-line react/no-array-index-key
    return value.map((obj, index) => <DescriptionList key={`${index}-${key}`} data={obj} prevKey={key} index={index} />);
  }

  switch (value.type) {
    case 'boolean':
      return <Span colour={Colours.grey}>{value.value ? 'true' : 'false'}</Span>;
    case 'base64':
      return renderImage(`${value.value}`, key);
    case 'date':
      return <Span colour={Colours.grey}>{toDateTimeString(new Date(parseInt(`${value.value}`, 10) * 1000))}</Span>;
    case 'xml':
    case 'json':
      return <RawData rawData={value.value} />;
    default:
      return <Span colour={Colours.grey}>{value.value}</Span>;
  }
};
