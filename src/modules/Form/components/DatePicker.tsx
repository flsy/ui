import React from 'react';
import { FieldProps } from 'react-metaforms';
import styled from 'styled-components';
import DatePickerComponent from '../../DatePicker/DatePicker';
import { toISOStringDate, toISOStringDateTime } from '../../DatePicker/utils';
import Input from '../../inputs/Input';
import Popup, { PopupWrapper } from '../../Popup/Popup';

const Wrapper = styled.div`
  width: 100%;

  ${PopupWrapper} {
    margin-top: -1.2em;
  }
`;

export interface IDatePickerProps extends FieldProps<string> {
  withTimePicker?: boolean;
}

const DatePicker = ({ withTimePicker, updateAndValidate, name, value, ...props }: IDatePickerProps) => {
  const [isShown, showDatePicker] = React.useState<boolean>(false);

  const onChange = (date: Date) => {
    return updateAndValidate(name, withTimePicker ? toISOStringDateTime(date) : toISOStringDate(date));
  };

  return (
    <Wrapper>
      <Input {...props} name={name} update={() => {}} updateAndValidate={() => {}} value={value} type="text" onFocus={() => showDatePicker(true)} />
      <Popup
        isOpen={isShown}
        onClose={() => showDatePicker(false)}
        content={<DatePickerComponent value={value ? new Date(value) : undefined} onChange={onChange} withTimePicker={withTimePicker} />}
      />
    </Wrapper>
  );
};

export default DatePicker;
export const DateTimePicker = (props: IDatePickerProps) => <DatePicker {...props} withTimePicker={true} />;
