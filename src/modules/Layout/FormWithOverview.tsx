import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { IContainerProps, SActions, SContainer, STitle } from '../Container/Container';
import Flex from './Flex';
import Spacer from './Spacer';

interface IProps {
  title: IContainerProps['title'];
  actions: IContainerProps['actions'];
  overview?: ReactNode;
  children: ReactNode;
}

const SChildren = styled.div<{ hasOverview: boolean }>`
  width: 100%;
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 2fr ${({ hasOverview }) => (hasOverview ? '1fr' : '')};
`;

const FormWithOverview = ({ title, actions, children, overview }: IProps) => (
  <SContainer size="lg">
    <Spacer />
    <Flex horizontal={true}>
      {title && <STitle>{title}</STitle>}
      {actions && <SActions horizontal={true}>{actions}</SActions>}
    </Flex>
    <SChildren hasOverview={!!overview}>
      <div>{children}</div>
      {overview && <div>{overview}</div>}
    </SChildren>
  </SContainer>
);

FormWithOverview.defaultProps = {
  overview: undefined,
};

export default FormWithOverview;
