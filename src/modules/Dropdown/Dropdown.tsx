import DownOutlined from '@ant-design/icons/DownOutlined';
import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import Popup, { PopupWrapper } from '../Popup/Popup';

interface IProps {
  buttonLabel: string;
}

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;

  ${PopupWrapper} {
    width: 100%;
  }
`;

const Dropdown: React.FC<IProps> = ({ children, buttonLabel }) => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <DropdownWrapper>
      <Button text={buttonLabel} onClick={() => setOpen(true)} iconRight={<DownOutlined />} />
      <Popup onClose={() => setOpen(false)} isOpen={isOpen}>
        {children}
      </Popup>
    </DropdownWrapper>
  );
};

export default Dropdown;
