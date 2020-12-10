import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { borderRadius, Colours } from '../../mainStyles';
import Spacer from '../Layout/Spacer';

interface IProps {
  legend?: string;
  hidden?: boolean;
  children: ReactNode;
}

const SGroup = styled.div`
  border: 1px dashed ${Colours.lightGrey};
  border-radius: ${borderRadius};
  padding: 12px;
`;

const SLegend = styled.div`
  padding: 6px 0;
`;

const Group = ({ legend, hidden, children }: IProps) => {
  if (legend) {
    return (
      <>
        {legend && <SLegend>{legend}</SLegend>}
        <SGroup>{hidden ? null : children}</SGroup>
        <Spacer size="sm" />
      </>
    );
  }

  return <div>{hidden ? null : children}</div>;
};

Group.defaultProps = {
  legend: undefined,
  hidden: false,
};

export default Group;
