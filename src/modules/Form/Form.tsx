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
    </FormWrapper>
  );
};

Form.defaultProps = {
  components: {},
  form: {},
  title: undefined,
  message: undefined,
  messageType: 'info',
  isLoading: false,
  labels: {
    loading: 'Loading form...',
  },
};

export default Form;
