import React from 'react';
import styled from 'styled-components';
import { Colours } from '../../mainStyles';
import BoolIcon from '../Icon/BoolIcon';
import { ITd } from '../MetaTable';
import Tags from '../Tags/Tags';

export const STd = styled.td`
  padding: 4px 14px;
  border-bottom: 1px solid ${Colours.smidgenGrey};
  height: 2.6em;
`;

const renderValue = (value: any | any[]): React.ReactNode => {
  if (Array.isArray(value)) {
    return (
      <Tags>
        {value.map((v) => (
          <Tags.Tag key={v} label={v} />
        ))}
      </Tags>
    );
  }

  if (typeof value === 'boolean') {
    return <BoolIcon value={value} />;
  }

  return <>{value}</>;
};

const Td: ITd = ({ value }) => {
  return <STd>{renderValue(value)}</STd>;
};

export default Td;
