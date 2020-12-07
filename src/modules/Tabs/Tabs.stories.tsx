import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import Tabs from './Tabs';

storiesOf('Tabs', module).add('basic usage', () => {
  const [selected, setSelected] = useState<string | number>();
  return (
    <Tabs selected={selected} onSelect={(id) => setSelected(id)}>
      <Tabs.Tab id={1} title="Tab 1">
        I am first content
      </Tabs.Tab>
      <Tabs.Tab id={2} title="Tab 2">
        I am second content
      </Tabs.Tab>
      <Tabs.Tab id={3} title="Tab 3">
        I am third content
      </Tabs.Tab>
    </Tabs>
  );
});
