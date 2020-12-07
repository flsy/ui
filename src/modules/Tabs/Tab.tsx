import React, { ReactNode } from 'react';

export interface ITabProps {
  id: number | string;
  title: string;
  children: ReactNode;
}

const Tab = ({ children }: ITabProps) => <>{children}</>;

export default Tab;
