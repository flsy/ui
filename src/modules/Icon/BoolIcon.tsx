import CheckCircleTwoTone from '@ant-design/icons/CheckCircleTwoTone';
import CloseCircleTwoTone from '@ant-design/icons/CloseCircleTwoTone';
import React from 'react';
import { Colours } from '../../mainStyles';

interface IProps {
  value?: boolean;
}
const BoolIcon = ({ value }: IProps) => (value ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor={Colours.error} />);
export default BoolIcon;
