import React from 'react';
import MetaForm, { Field, FormProps } from 'react-metaforms';
import styled from 'styled-components';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';
import { getComponent } from './getComponent';

interface IProps<F extends Field> {
  form?: F;
  onSubmit: FormProps<F>['onSubmit'];
  onFormChange: FormProps<F>['onFormChange'];
  components?: FormProps<F>['components'];
  className?: string;
  title?: string;
  message?: string;
  messageType?: 'info' | 'error' | 'warning';
  isLoading?: boolean;
  labels?: {
    loading?: string;
  };
}

const Form = <Form extends Field>({ className, title, messageType, message, form, onSubmit, onFormChange, isLoading, components, labels }: IProps<Form>) => {
  return (
    <div className={className}>
      {title && <h2>{title}</h2>}
      {message && <Message type={messageType} text={message} open={true} />}
      {isLoading ? (
        <Loader text={labels?.loading} />
      ) : (
        <MetaForm<Form>
          onSubmit={onSubmit}
          form={form} // todo: disabled when loading ?
          onFormChange={onFormChange}
          components={getComponent(components)}
        />
      )}
    </div>
  );
};

Form.defaultProps = {
  className: undefined,
  components: undefined,
  form: {},
  title: undefined,
  message: undefined,
  messageType: 'info',
  isLoading: false,
  labels: {
    loading: 'Loading form...',
  },
};

export default styled(Form)``;
