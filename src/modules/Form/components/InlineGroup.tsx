import React from 'react';
import styled from 'styled-components';

const SInlineGroup = styled.div`
  display: flex;
`;

const InlineGroup: React.FC = ({ children }) => <SInlineGroup>{children}</SInlineGroup>;

export default InlineGroup;
