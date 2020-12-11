import React from 'react';
import styled from 'styled-components';
import { ITd } from 'metatable';
import { Colours } from '../../mainStyles';
import BoolIcon from '../Icon/BoolIcon';
import Tags from '../Tags/Tags';
import ImageModal from '../ImageModal/ImageModal';

export const STd = styled.td`
  padding: 4px 14px;
  border-bottom: 1px solid ${Colours.smidgenGrey};
  height: 2.6em;
`;

const renderValue = (value: any | any[], type: string): React.ReactNode => {
  if (typeof value === 'boolean') {
    return <BoolIcon value={value} />;
  }
  if (Array.isArray(value) && type === 'imageList') {
    return value.map((v: IImageTd) => v.image && <ImageModal src={`data:image/jpeg;base64,${v.image}`} alt={v.alt} key={v.key} />);
  }

  if (Array.isArray(value)) {
    return (
      <Tags>
        {value.map((v) => (
          <Tags.Tag key={v} label={v} />
        ))}
      </Tags>
    );
  }
  return <>{value}</>;
};

const Td: ITd = ({ value, type }) => {
  return <STd>{renderValue(value, type)}</STd>;
};

export default Td;
