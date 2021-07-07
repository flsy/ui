import React from 'react';
import { ComponentProps, Components, Field } from 'react-metaforms';
import FormCheckboxList from '../CheckboxList/FormCheckboxList';
import { Submit } from '../inputs/Button';
import Checkbox from '../inputs/Checkbox';
import Group from '../inputs/Group';
import Input from '../inputs/Input';
import NumberInput from '../inputs/NumberInput';
import Select from '../inputs/Select';
import Textarea from '../inputs/Textarea';
import ButtonGroup from '../Layout/ButtonGroup';
import ImageUpload from '../Upload/ImageUpload';
import DatePicker, { DateTimePicker } from './components/DatePicker';
import { FormTags } from './components/Tag';
import FileUpload from '../Upload/FileUpload';
import DateRangePicker from './components/DateRangePicker';
import { InputWrapper } from '../inputs/sharedStyles';
import Message from '../Message/Message';
import DateRangePickerCalendar from './components/DateRangePickerCalendar';

export const getComponent = <T extends Field>(parentGetComponent?: Components<T>, isSubmitting?: boolean) => (componentProps: ComponentProps<T>) => {
  if (parentGetComponent) {
    const found = parentGetComponent(componentProps);
    if (found) {
      return found;
    }
  }

  const { name, component, ref, actions, groupChildren } = componentProps;
  // todo: fix this
  // @ts-ignore
  const props: any = { ...component, ...actions, name };

  switch (component.type) {
    case 'number':
      return <NumberInput key={props.name} {...props} ref={ref} />;
    case 'text':
    case 'password':
      return <Input key={props.name} {...props} ref={ref} />;
    case 'select':
      return <Select key={props.name} {...props} ref={ref} />;
    case 'textarea':
      return <Textarea key={props.name} {...props} ref={ref} />;
    case 'checkbox':
      return <Checkbox key={props.name} {...props} />;
    case 'tags':
    case 'string-tags':
      return <FormTags key={props.name} {...props} />;
    case 'submit':
      return <Submit key={props.name} {...props} isLoading={isSubmitting} />;
    case 'date':
      return <DatePicker key={props.name} {...props} />;
    case 'image':
      return <ImageUpload key={props.name} {...props} multiple={true} />;
    case 'csv':
      return <FileUpload key={props.name} {...props} accept=".csv" />;
    case 'upload':
      return <FileUpload key={props.name} {...props} />;
    case 'datetime-local':
      return <DateTimePicker key={props.name} {...props} />;
    case 'dateRange':
      return <DateRangePicker key={props.name} {...props} />;
    case 'dateRangeCalendar':
      return <DateRangePickerCalendar key={props.name} {...props} />;
    case 'button-group':
      return <ButtonGroup key={props.name}>{groupChildren}</ButtonGroup>;
    case 'multiselect':
      return <FormCheckboxList key={props.name} {...props} labels={{ search: 'Hledat', empty: 'Žádný záznam' }} />;
    case 'message':
      return (
        <InputWrapper key={props.name}>
          <Message {...props} type={props.messageType} open={true} />
        </InputWrapper>
      );
    case 'group':
      return (
        <Group key={props.name} legend={component.legend} hidden={component.hidden}>
          {groupChildren}
        </Group>
      );
    default:
      return;
  }
};
