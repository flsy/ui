import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import Button from '../Button/Button';
import Popconfirm from './Popconfirm';

storiesOf('Popconfirm', module).add('basic usage', () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div style={{ marginTop: '150px', marginLeft: '150px' }}>
      <Popconfirm isVisible={isVisible} title="Opravdu smazat?" okText="Ano" cancelText="Ne" onConfirm={action('confirm')} onCancel={action('cancel')}>
        <Button text="Smazat" onClick={() => setIsVisible(!isVisible)} />
      </Popconfirm>
    </div>
  );
});
