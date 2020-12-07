import { storiesOf } from '@storybook/react';
import React from 'react';
import { Message } from '../../index';

const MessageStory = () => (
  <div>
    <h2>Info</h2>
    <Message type="info" text="Info" />
    <Message type="info" text="Info" description="with short description" open={true} />
    <Message type="info" close={() => ({})} text="Info" description="with short description" open={true} />

    <h2>Success</h2>
    <Message type="success" text="Success message" open={true} />
    <Message type="success" text="Success" description="with short description" open={true} />
    <Message type="success" close={() => ({})} text="Info" description="with short description" open={true} />

    <h2>Warning</h2>
    <Message type="warning" text="Warning message" open={true} />
    <Message type="warning" text="Warning" description="with short description" open={true} />
    <Message type="warning" close={() => ({})} text="Info" description="with short description" open={true} />

    <h2>Error</h2>
    <Message type="error" text="Error message" open={true} />
    <Message type="error" text="Error" description="with short description" open={true} />
    <Message type="error" close={() => ({})} text="Info" description="with short description" open={true} />
  </div>
);

const ProgressStory = () => (
  <>
    <Message type="success" text="Message" description="with short description" open={true} dismissTimeout={5000} />
    <br />
    <Message type="warning" text="Message" description="with short description" open={true} dismissTimeout={3000} />
    <br />
    <Message type="error" close={() => ({})} text="Info" description="with short description" open={true} dismissTimeout={1000} />
  </>
);

storiesOf('Message', module)
  .add('basic usage', () => <MessageStory />)
  .add('progress', () => <ProgressStory />);
