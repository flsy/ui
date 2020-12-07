import React from 'react';
import styled from 'styled-components';
import { Span } from '../Typography/Typography';
import { ILine, IProps } from './interfaces';
// eslint-disable-next-line import/no-cycle
import { isNull, renderValue } from './renderValue';

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

const createUniqueKey = (type: string, keyData: Array<number | string>) => `${type}-${keyData.filter(Boolean).join('-')}`;

const render = (data: any, dataKey: ILine, name: any) => {
  if (isNull(dataKey)) {
    return '';
  }
  return data.value || renderValue(dataKey, name);
};

const DescriptionList = ({ data, prevKey, index }: IProps) => {
  return (
    <Dl>
      {Object.keys(data ?? {}).map(
        (key) =>
          key !== '__typename' && (
            // @ts-ignore
            <div key={createUniqueKey('div', [prevKey, index, key])}>
              {/* @ts-ignore */}
              <Dt key={createUniqueKey('key', [prevKey, index, key])} data-test-id={createUniqueKey('description-list', [prevKey, index, key, 'key'])}>
                <Span>{key}: </Span>
              </Dt>
              {/* @ts-ignore */}
              <Dd key={createUniqueKey('value', [prevKey, index, key])} data-test-id={createUniqueKey('description-list', [prevKey, index, key, 'value'])}>
                {/* @ts-ignore */}
                {render(data, data[key], key)}
              </Dd>
            </div>
          ),
      )}
    </Dl>
  );
};

export default DescriptionList;
