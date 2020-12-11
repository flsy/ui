import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  className?: string;
  children: ReactNode;
}

const Accordion = ({ className, children }: IProps): JSX.Element => <div className={className}>{children}</div>;

export default styled(Accordion)`
  margin: 0 auto;
`;

Accordion.defaultProps = {
  className: undefined,
};
