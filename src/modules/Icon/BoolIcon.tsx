import CheckCircleTwoTone from '@ant-design/icons/CheckCircleTwoTone';
import CloseCircleTwoTone from '@ant-design/icons/CloseCircleTwoTone';
import MinusCircleTwoTone from '@ant-design/icons/MinusCircleTwoTone';
import React from 'react';
import { Colours } from '../../mainStyles';

interface IProps {
  value?: boolean;
  showIndeterminate?: boolean;
}

const BoolIcon = ({ value, showIndeterminate }: IProps) => {
  if (showIndeterminate && value === undefined) {
    return <MinusCircleTwoTone twoToneColor="#828282" />;
  }

  return value ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor={Colours.error} />;
};

BoolIcon.defaultProps = {
  value: undefined,
  showIndeterminate: false,
};

export default BoolIcon;
