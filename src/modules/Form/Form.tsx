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

  title?: string;
  message?: string;
  messageType?: 'info' | 'error' | 'warning';
  isLoading?: boolean;
  labels?: {
    loading?: string;
  };
}

export const FormWrapper = styled.div`
  margin: 8px;
`;

const Form = <Form extends Field>({ title, messageType, message, form, onSubmit, onFormChange, isLoading, components, labels }: IProps<Form>) => {
  return (
    <FormWrapper>
      {title && <h2>{title}</h2>}
      {message && <Message type={messageType || 'info'} text={message} open={true} />}
      {isLoading ? (
        <Loader text={labels?.loading || 'Formulář se načítá'} />
      ) : (
        <MetaForm<Form>
          onSubmit={onSubmit}
          form={form || ({} as Form)} // todo: disabled when loading ?
          onFormChange={onFormChange}
          components={getComponent(components)}
        />
      )}
    </FormWrapper>
  );
};

export default Form;
