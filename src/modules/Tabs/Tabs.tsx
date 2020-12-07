import React from 'react';
import styled from 'styled-components';
import { Colours } from '../../mainStyles';
import Tab, { ITabProps } from './Tab';

interface ITabsProps {
  children: React.ReactElement<ITabProps>[];
  selected?: string | number;
  onSelect?: (id: string | number) => void;
}

type GetSelected = (selected: ITabsProps['selected'], children: ITabsProps['children']) => React.ReactElement<ITabProps> | undefined;
const getSelectedChild: GetSelected = (selected, children) => children.find((c) => c.props.id === selected);
const getSelectedOrFirstChild: GetSelected = (selected, children) => getSelectedChild(selected, children) || children[0];

const STabPanel = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  padding: 12px 0;
  margin-right: 12px;
  position: relative;
  top: 1px;
  color: ${({ isSelected }) => (isSelected ? Colours.main : Colours.font)};
  ${({ isSelected }) => isSelected && `border-bottom: 2px solid ${Colours.main}`};

  &:hover {
    color: ${Colours.main};
  }
`;

const STabPanels = styled.div`
  display: flex;
  border-bottom: 1px solid ${Colours.smidgenGrey};
`;

const STabContent = styled.div`
  padding: 12px 0;
`;

const Tabs = ({ children, selected, onSelect }: ITabsProps) => {
  const selectedChild = getSelectedChild(selected, children);

  const handleClick = (id: string | number) => {
    if (onSelect) {
      onSelect(id);
    }
  };

  return (
    <>
      <STabPanels>
        {children.map((child, index) => (
          <STabPanel key={`tab-${child.props.id}`} isSelected={selectedChild ? selected === child.props.id : index === 0} onClick={() => handleClick(child.props.id)}>
            {child.props.title}
          </STabPanel>
        ))}
      </STabPanels>
      <STabContent>{getSelectedOrFirstChild(selected, children)}</STabContent>
    </>
  );
};

Tabs.Tab = Tab;

export default Tabs;
