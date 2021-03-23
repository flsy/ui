import React, { useState } from 'react';
import Picker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';
import cs_CZ from 'rc-calendar/lib/locale/cs_CZ';

import moment from 'moment';
import 'moment/locale/cs';
import styled, { css } from 'styled-components';
import { Inputs } from '../inputs/sharedStyles';

moment.locale('cs-CZ');
const now = moment();

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const isValidRange = (v) => v && v[0] && v[1];

const InputStyled = styled.input`
  ${Inputs}
`;

const RangeCalendarStyled = styled(RangeCalendar)`
  ${({ theme }) => css`
    .rc-calendar-header > a:hover,
    .rc-calendar-year-select:hover,
    .rc-calendar-month-select:hover,
    .rc-calendar-day-select:hover,
    .rc-calendar-prev-month-btn:hover,
    .rc-calendar-next-month-btn:hover,
    .rc-calendar-prev-year-btn:hover,
    .rc-calendar-next-year-btn:hover,
    .rc-calendar-today-btn:hover,
    .rc-calendar-ok-btn:hover,
    .rc-calendar-time-picker-btn:hover,
    .rc-calendar-month-panel-header > a:hover,
    .rc-calendar-year-panel-header > a:hover,
    .rc-calendar-decade-panel-header > a:hover {
      color: ${theme.colors.main.primary};
    }
    .rc-calendar-time-input:hover {
      border-color: ${theme.colors.main.primary};
    }
    .rc-calendar-time-input:focus {
      border-color: ${theme.colors.main.primary};
      box-shadow: 0 0 3px ${theme.colors.main.primary};
    }
    .rc-calendar-full-header-switcher-normal:hover {
      border-color: ${theme.colors.main.primary};
      box-shadow: 0 0 2px ${theme.colors.main.primary};
    }
    .rc-calendar-full-header-switcher-focus {
      border-color: ${theme.colors.main.dark};
      background-color: ${theme.colors.main.dark};
    }
    .rc-calendar-today .rc-calendar-date {
      border: 1px solid ${theme.colors.main.dark};
    }
    .rc-calendar-selected-date .rc-calendar-date,
    .rc-calendar-selected-date .rc-calendar-date:hover,
    .rc-calendar-time-panel-selected-cell .rc-calendar-time-panel-time,
    .rc-calendar-time-panel-selected-cell .rc-calendar-time-panel-time:hover,
    .rc-calendar-month-panel-selected-cell .rc-calendar-month-panel-month,
    .rc-calendar-month-panel-selected-cell .rc-calendar-month-panel-month:hover,
    .rc-calendar-year-panel-selected-cell .rc-calendar-year-panel-year,
    .rc-calendar-year-panel-selected-cell .rc-calendar-year-panel-year:hover,
    .rc-calendar-decade-panel-selected-cell .rc-calendar-decade-panel-decade,
    .rc-calendar-decade-panel-selected-cell .rc-calendar-decade-panel-decade:hover {
      background: ${theme.colors.main.dark};
    }
    .rc-calendar-full-header-switcher-focus {
      border-color: ${theme.colors.main.dark};
      background-color: ${theme.colors.main.dark};
    }
    .rc-calendar-fullscreen .rc-calendar-today .rc-calendar-date,
    .rc-calendar-fullscreen .rc-calendar-month-panel-selected-cell .rc-calendar-month-panel-month {
      border-top-color: ${theme.colors.main.dark};
      color: ${theme.colors.main.dark};
    }
    .rc-calendar-selected-day .rc-calendar-date {
      background: ${theme.colors.main.darker};
      color: #fff;
    }
    .rc-calendar-date:hover,
    .rc-calendar-time-panel-time:hover,
    .rc-calendar-month-panel-cell .rc-calendar-month-panel-month:hover,
    .rc-calendar-year-panel-year:hover,
    .rc-calendar-decade-panel-decade:hover {
      background: ${theme.colors.main.light};
    }
    .rc-calendar-fullscreen .rc-calendar-selected-day .rc-calendar-date,
    .rc-calendar-fullscreen .rc-calendar-month-panel-selected-cell .rc-calendar-month-panel-month {
      background-color: ${theme.colors.main.light};
    }
    .rc-calendar-in-range-cell {
      background: ${theme.colors.main.lighter};
    }
  `}
`;

export type RangePickerValue = [string, string];

interface IProps {
  withTimePicker?: boolean;
  placeholder?: string;
  dateInputPlaceholder?: [string, string];
  onChange: (date: RangePickerValue) => void;
  value?: RangePickerValue;
}

const RangePicker = ({ withTimePicker, placeholder, dateInputPlaceholder, value, onChange }: IProps) => {
  const [hoverValue, setHoverValue] = useState([]);

  const formatStr = `DD.MM.YYYY ${withTimePicker ? 'HH:mm' : ''}`;
  const format = (v) => (v ? v.format(formatStr) : '');
  const pickerValue = isValidRange(value) ? [moment(value[0]), moment(value[1])] : [];

  const calendar = (
    <RangeCalendarStyled
      locale={cs_CZ}
      format={formatStr}
      hoverValue={hoverValue}
      onHoverChange={setHoverValue}
      showWeekNumber={false}
      dateInputPlaceholder={dateInputPlaceholder}
      defaultValue={[now, now.clone().add(1, 'months')]}
      timePicker={withTimePicker ? <TimePickerPanel showSecond={false} /> : undefined}
    />
  );

  return (
    <Picker
      value={pickerValue}
      onChange={(v) => {
        const nextValue: RangePickerValue = [moment(v[0]).clone().toISOString(), moment(v[1]).clone().toISOString()];
        return isValidRange(v) ? onChange(nextValue) : [];
      }}
      animation="slide-up"
      calendar={calendar}
    >
      {({ value: v }) => <InputStyled placeholder={placeholder} readOnly={true} value={(isValidRange(value) && `${format(v[0])} - ${format(v[1])}`) || ''} />}
    </Picker>
  );
};

RangePicker.defaultProps = {
  value: undefined,
  withTimePicker: false,
  placeholder: undefined,
  dateInputPlaceholder: ['from', 'to'],
};

export default RangePicker;
