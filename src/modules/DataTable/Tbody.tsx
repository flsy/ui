import React, { Children, useContext } from 'react';
import styled from 'styled-components';
import { DataTableContext } from './context';
import { STd } from './Td';
import { STr } from './Tr';
import { ITbody } from '../MetaTable/interfaces';

const SCenteredTd = styled(STd)`
  text-align: center;
`;

const Tbody: ITbody = ({ children, columnPaths }) => {
  const { labels, isLoading, expandedRowRender } = useContext(DataTableContext);

  const getContent = () => {
    if (!columnPaths.length || (!Children.count(children) && !isLoading)) {
      return (
        <STr>
          <SCenteredTd colSpan={expandedRowRender ? columnPaths.length + 1 : columnPaths.length}>{labels?.empty || 'No data'}</SCenteredTd>
        </STr>
      );
    }
    return children;
  };

  return <tbody>{getContent()}</tbody>;
};

export default Tbody;
