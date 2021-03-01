import React from 'react';
import styled from 'styled-components';

const SInlineGroup = styled.div`
  display: flex;
`;

const InlineGroup = ({ children, hidden }) => <SInlineGroup>{hidden ? null : children}</SInlineGroup>;

InlineGroup.defaultProps = {
  hidden: false,
};

export default InlineGroup;
