import React from 'react';
import styled from 'styled-components';
import { ITd } from 'metatable';
import { Colours } from '../../mainStyles';
import BoolIcon from '../Icon/BoolIcon';
import Tags from '../Tags/Tags';
import ImageModal from '../ImageModal/ImageModal';
import { AllTypes } from './interfaces';

export const STd = styled.td`
  padding: 4px 14px;
  border-bottom: 1px solid ${Colours.smidgenGrey};
  height: 2.6em;
`;

const renderValue = (value: unknown | unknown[], type: AllTypes): React.ReactNode => {
  if (typeof value === 'boolean') {
    return <BoolIcon value={value} />;
  }

  if (Array.isArray(value) && type === 'image') {
    return value.map((v) => v.src && <ImageModal previewWidth={80} src={v.src} alt={v.alt} key={v.key} />);
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

const Td: ITd<AllTypes> = ({ value, type }) => {
  return <STd>{renderValue(value, type)}</STd>;
};

export default Td;
