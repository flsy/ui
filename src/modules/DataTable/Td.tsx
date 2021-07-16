import React from 'react';
import styled from 'styled-components';
import { Colours } from '../../mainStyles';
import BoolIcon from '../Icon/BoolIcon';
import ImageModal from '../ImageModal/ImageModal';
import Tag from '../Tag/Tag';

export const STd = styled.td`
  padding: 4px 8px;
  border-bottom: 1px solid ${Colours.smidgenGrey};
`;

const TagGroup = styled.div`
  display: flex;
  align-items: center;
`;

const renderValue = <Types extends unknown>(value: unknown | unknown[], type: Types): React.ReactNode => {
  if (typeof value === 'boolean') {
    return <BoolIcon value={value} />;
  }

  if (Array.isArray(value) && type === 'image') {
    return value.map((v) => v.src && <ImageModal previewWidth={80} src={v.src} alt={v.alt} key={v.key} />);
  }

  if (Array.isArray(value)) {
    return (
      <TagGroup>
        {value.map((v) => (
          <Tag key={v} label={v} />
        ))}
      </TagGroup>
    );
  }

  return <>{value}</>;
};

const Td = ({ value, type }) => {
  return <STd>{renderValue(value, type)}</STd>;
};

export default Td;
