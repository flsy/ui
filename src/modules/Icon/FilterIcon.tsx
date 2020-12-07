import FilterFilled from '@ant-design/icons/FilterFilled';
import FilterOutlined from '@ant-design/icons/FilterOutlined';
import React from 'react';
import styled from 'styled-components';
import { Transient } from '../../types';
import { ActiveStyle } from './styles';

const Outlined = styled(FilterOutlined)<Transient<IProps>>`
  size: 8px;
  ${ActiveStyle};
`;

const Filled = styled(FilterFilled)<Transient<IProps>>`
  size: 8px;
  ${ActiveStyle};
`;

interface IProps {
  isActive?: boolean;
  isFilled?: boolean;
}
const FilterIcon = ({ isFilled, isActive }: IProps) => (isFilled ? <Filled $isActive={!!isActive} /> : <Outlined $isActive={!!isActive} />);
export default FilterIcon;
