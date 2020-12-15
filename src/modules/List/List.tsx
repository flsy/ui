import React from 'react';
import Flex from '../Layout/Flex';

interface IProps {
  horizontal?: boolean;
  noResultsLabel?: string;
}

export const ListContext = React.createContext({ horizontal: false });

const List: React.FC<IProps> = ({ horizontal, children, noResultsLabel }) => (
  <ListContext.Provider value={{ horizontal: !!horizontal }}>
    {React.Children.count(children) || !noResultsLabel ? <Flex horizontal={horizontal}>{children}</Flex> : <p>{noResultsLabel}</p>}
  </ListContext.Provider>
);

export default List;
