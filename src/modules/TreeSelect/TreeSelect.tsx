import React from 'react';
import { ConfigProvider, TreeSelect as AntTreeSelect } from 'antd';
import 'antd/dist/antd.css';
import styled, { css } from 'styled-components';
import locale from 'antd/lib/locale/cs_CZ';

const { SHOW_PARENT } = AntTreeSelect;

export interface ITreeItem {
  title: string;
  value: string;
  children?: ITreeItem[];
}

export type TreeData = ITreeItem[];

interface IProps {
  placeholder?: string;
  treeData: TreeData;
  value: string[];
  onChange: (value: string[]) => void;
}

const StyledTreeSelect = styled(AntTreeSelect)`
  width: 100%;
  ${({ theme }) => css`
    border-color: ${theme.colors.border};

    &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
      border-color: ${theme.colors.main.primary};
      border-right-width: 1px !important;
      outline: 0;
      box-shadow: 0 0 0 2px ${theme.colors.main.lighter};
    }

    &.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
      border-color: ${theme.colors.main.primary};
      border-right-width: 1px !important;
    }
  `}
`;

const DDWrapper = styled.div`
  ${({ theme }) => css`
    .ant-select-tree-checkbox-indeterminate .ant-select-tree-checkbox-inner::after,
    .ant-select-tree-checkbox-checked .ant-select-tree-checkbox-inner {
      background-color: ${theme.colors.main.primary};
      border-color: ${theme.colors.main.primary};
    }

    .ant-select-tree-checkbox-checked::after,
    .ant-select-tree-checkbox-wrapper:hover .ant-select-tree-checkbox-inner,
    .ant-select-tree-checkbox:hover .ant-select-tree-checkbox-inner,
    .ant-select-tree-checkbox-input:focus + .ant-select-tree-checkbox-inner {
      border-color: ${theme.colors.main.dark};
    }
  `}
`;

const TreeSelect = React.forwardRef(({ treeData, placeholder, value, onChange }: IProps, ref: React.Ref<HTMLElement>) => (
  <ConfigProvider locale={locale}>
    <StyledTreeSelect
      ref={ref}
      dropdownRender={(node) => <DDWrapper>{node}</DDWrapper>}
      treeData={treeData}
      value={value}
      onChange={onChange}
      treeCheckable={true}
      showCheckedStrategy={SHOW_PARENT}
      placeholder={placeholder}
    />
  </ConfigProvider>
));

TreeSelect.defaultProps = {
  placeholder: undefined,
};

export default TreeSelect;
