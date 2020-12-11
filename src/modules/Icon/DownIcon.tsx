import React from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import styled from 'styled-components';
import { ActiveStyle, ActiveProps } from './styles';

const Icon = styled(DownOutlined)<ActiveProps>`
  ${ActiveStyle}
`;

interface IProps {
  isActive?: boolean;
  onClick?: () => void;
}

const DownIcon = ({ isActive, onClick }: IProps) => <Icon $isActive={isActive} onClick={onClick} />;

DownIcon.defaultProps = {
  onClick: undefined,
  isActive: false,
};

export default DownIcon;
