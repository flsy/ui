import React from 'react';
import Flex from '../Layout/Flex';
import { P } from '../Typography/Typography';

interface IProps {
  horizontal?: boolean;
  noResultsLabel?: string;
}

export const ListContext = React.createContext({ horizontal: false });

const List: React.FC<IProps> = ({ horizontal, children, noResultsLabel }) => (
  <ListContext.Provider value={{ horizontal: !!horizontal }}>
    {React.Children.count(children) || !noResultsLabel ? <Flex horizontal={horizontal}>{children}</Flex> : <P>{noResultsLabel}</P>}
  </ListContext.Provider>
);

export default List;
