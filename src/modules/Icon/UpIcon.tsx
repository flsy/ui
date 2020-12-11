import React from 'react';
import UpOutlined from '@ant-design/icons/UpOutlined';
import styled from 'styled-components';
import { ActiveStyle, ActiveProps } from './styles';

const Icon = styled(UpOutlined)<ActiveProps>`
  ${ActiveStyle}
`;

interface IProps {
  isActive?: boolean;
  onClick?: () => void;
}

const UpIcon = ({ isActive, onClick }: IProps) => <Icon $isActive={isActive} onClick={onClick} />;

UpIcon.defaultProps = {
  onClick: undefined,
  isActive: false,
};

export default UpIcon;
