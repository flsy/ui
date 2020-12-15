import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Colours } from '../../mainStyles';
import Time from '../Time/Time';

const SLayout = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 200px 2rem auto 2rem;
  grid-template-rows: 2rem auto 2rem;
  height: 100vh;
  overflow: hidden;
`;

const SContent = styled.div`
  grid-row: 2 / 3;
  grid-column: 3 / 3;
  overflow: auto;
`;

// TODO: better color definition for dark theme
const SNavigation = styled.div`
  background: ${({ theme }) => (theme.isDark ? '#000' : '#fff')};
  border-right: 1px solid ${Colours.smidgenGrey};
  grid-row: 1 / 4;
  height: 100%;
  overflow: auto;
`;

const SFoot = styled.div`
  font-size: small;
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-row: 3 / 4;
  grid-column: 3 / 3;
`;

const SEnv = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: ${Colours.smidgenWarning};
  grid-row: 1 / 1;
  grid-column: 3 / 3;
`;

interface ILayoutProps {
  children: ReactNode;
  navigation: ReactNode;
  version?: string;
  environment?: string;
}

const Layout = ({ navigation, children, version, environment }: ILayoutProps) => {
  return (
    <SLayout>
      {environment && <SEnv>{environment}</SEnv>}
      <SNavigation>{navigation}</SNavigation>
      <SContent>{children}</SContent>
      <SFoot>
        <Time />
        {version && <div>{version}</div>}
      </SFoot>
    </SLayout>
  );
};

Layout.defaultProps = {
  version: undefined,
  environment: undefined,
};

export default Layout;
