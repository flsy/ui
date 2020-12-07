import React from 'react';
import styled from 'styled-components';
import { ColorTypes, ColouredWrapper } from '../ColouredWrapper/ColouredWrapper';

interface IProps {
  type?: ColorTypes;
}

const SLabel = styled.span`
  padding: 4px 8px;
`;

const Label: React.FC<IProps> = ({ children, type }) => {
  return (
    <ColouredWrapper type={type} as="span">
      <SLabel>{children}</SLabel>
    </ColouredWrapper>
  );
};

export default Label;
