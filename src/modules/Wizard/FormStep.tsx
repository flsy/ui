import React from 'react';
import { Components, Field, FormProps } from 'react-metaforms';
import { Index } from '../../types';
import Form from '../Form/Form';

export interface StepProps<T extends object> {
  title: string;
  name: string;
  form: T;
  errorMessage?: string;
  onSubmit: FormProps<Index<T>>['onSubmit'];
  components?: Components<any>;
}

const FormStep = <T extends object>({ title, form: initialFields, onSubmit, errorMessage, components }: StepProps<T>) => {
  const [fields, onFieldsChange] = React.useState<any>(initialFields);

  return <Form title={title} form={fields} onFormChange={onFieldsChange} message={errorMessage} messageType="error" onSubmit={onSubmit} components={components} />;
};

interface FormStepProps<T extends Field> extends StepProps<T> {
  onFormChange: FormProps<T>['onFormChange'];
}
export const FormStepManual = <T extends Field>({ title, form, onFormChange, onSubmit, errorMessage, components }: FormStepProps<T>) => {
  return <Form title={title} form={form} onFormChange={onFormChange} message={errorMessage} messageType="error" onSubmit={onSubmit} components={components} />;
};

export default FormStep;
