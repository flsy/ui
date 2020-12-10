import React from 'react';
import styled from 'styled-components';
import { Span } from '../Typography/Typography';
// eslint-disable-next-line import/no-cycle
import { renderValue } from './renderValue';

export interface ILine {
  value: string | boolean | number | null;
  type: 'boolean' | 'base64' | 'date' | 'json' | 'string' | 'number' | 'xml';
}

export type IDataValue = ILine | IData | IData[];
export type IData = { [key: string]: IDataValue };

interface IProps {
  data: IData;
  prevKey?: string;
  index?: number;
}

const Dl = styled.dl`
  margin: 0 0 0 10px;
`;

const Dt = styled.dt`
  display: inline;
`;

const Dd = styled.dd`
  margin-left: 0px;
  display: inline;
  word-wrap: break-word;
`;

const createUniqueKey = (type: string, keyData: Array<number | string | undefined>) => `${type}-${keyData.filter(Boolean).join('-')}`;

const DescriptionList = ({ data, prevKey, index }: IProps) => {
  return (
    <Dl>
      {Object.entries(data).map(
        ([key, value]) =>
          key !== '__typename' && (
            <div key={createUniqueKey('div', [prevKey, index, key])}>
              <Dt key={createUniqueKey('key', [prevKey, index, key])} data-test-id={createUniqueKey('description-list', [prevKey, index, key, 'key'])}>
                <Span>{key}:</Span>
              </Dt>
              <Dd key={createUniqueKey('value', [prevKey, index, key])} data-test-id={createUniqueKey('description-list', [prevKey, index, key, 'value'])}>
                {renderValue(key, value)}
              </Dd>
            </div>
          ),
      )}
    </Dl>
  );
};

DescriptionList.defaultProps = {
  prevKey: undefined,
  index: undefined,
};

export default DescriptionList;
