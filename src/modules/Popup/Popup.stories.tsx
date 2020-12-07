import { storiesOf } from '@storybook/react';
import React from 'react';
import { Popup } from '../../index';

const PopupStory = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <h3>Popup</h3>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open
      </button>

      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        Content
      </Popup>

      <h3>Popup always open</h3>
      <Popup isOpen={true} onClose={console.log}>
        Always shown
      </Popup>
    </div>
  );
};

storiesOf('Popup', module).add('basic usage', () => <PopupStory />);
