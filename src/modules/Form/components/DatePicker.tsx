import React from 'react';
import { FieldProps } from 'react-metaforms';
import styled from 'styled-components';
import DatePickerComponent from '../../DatePicker/DatePicker';
import { getDate, toISOStringDate, toISOStringDateTime } from '../../DatePicker/utils';
import Input from '../../inputs/Input';
import Popup, { PopupWrapper } from '../../Popup/Popup';

const Wrapper = styled.div`
  width: 100%;

  ${PopupWrapper} {
    margin-top: -1.2em;
  }
`;

export interface IDatePickerProps extends FieldProps<number> {
  withTimePicker?: boolean;
}

const toSecondsTimestamp = (date: Date): number => Math.round(date.getTime() / 1000);

const DatePicker = ({ withTimePicker, ...props }: IDatePickerProps) => {
  const [isShown, showDatePicker] = React.useState<boolean>(false);

  const onChange = (date: Date) => {
    props.update(props.name, toSecondsTimestamp(date));
  };

  return (
    <Wrapper>
      <Input
        {...props}
        updateAndValidate={(name, value) => props.updateAndValidate(name, toSecondsTimestamp(new Date(value)))}
        update={(name, value) => props.update(name, toSecondsTimestamp(new Date(value)))}
        value={withTimePicker ? toISOStringDateTime(getDate(props.value)) : toISOStringDate(getDate(props.value))}
        type="text"
        onFocus={() => showDatePicker(true)}
        onBlur={() => null}
      />
      <Popup isOpen={isShown} onClose={() => showDatePicker(false)}>
        <DatePickerComponent value={getDate(props.value)} onChange={onChange} withTimePicker={withTimePicker} />
      </Popup>
    </Wrapper>
  );
};

export default DatePicker;
export const DateTimePicker = (props: IDatePickerProps) => <DatePicker {...props} withTimePicker={true} />;
