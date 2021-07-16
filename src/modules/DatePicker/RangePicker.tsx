import React, { useState } from 'react';
import Picker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import cs_CZ from 'rc-calendar/lib/locale/cs_CZ';

import moment, { Moment } from 'moment';
import 'moment/locale/cs';
import styled, { css } from 'styled-components';
import Color from 'color';
import { Inputs } from '../inputs/sharedStyles';

moment.locale('cs-CZ');
const now = moment();

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

export const isValidRange = (v?: RangePickerValue | [number, number]) => v && v[0] && v[1];

export const defaultDateFormat = (withTimePicker?: boolean): string => `DD.MM.YYYY${withTimePicker ? ' HH:mm' : ''}`;

const InputStyled = styled.input`
  ${Inputs}
`;

export const RangeCalendarStyled = styled(RangeCalendar)`
  font-family: inherit !important;

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
    .rc-calendar-date:hover,
    .rc-calendar-time-panel-time:hover,
    .rc-calendar-month-panel-cell .rc-calendar-month-panel-month:hover,
    .rc-calendar-year-panel-year:hover,
    .rc-calendar-decade-panel-decade:hover {
      color: ${Color(theme.colors.main.light).isLight() ? '#000' : '#fff'};
    }
    .rc-calendar-fullscreen .rc-calendar-selected-day .rc-calendar-date,
    .rc-calendar-fullscreen .rc-calendar-month-panel-selected-cell .rc-calendar-month-panel-month {
      background-color: ${theme.colors.main.light};
    }
    .rc-calendar-in-range-cell {
      background: ${theme.colors.main.lighter};
    }
    .rc-calendar-in-range-cell .rc-calendar-date {
      color: ${Color(theme.colors.main.lighter).isLight() ? '#000' : '#fff'};
    }
  `}
`;

export type RangePickerValue = [Moment, Moment] | [];

interface IProps {
  name: string;
  withTimePicker?: boolean;
  placeholder?: string;
  dateInputPlaceholder?: [string, string];
  onChange: (date: RangePickerValue) => void;
  value?: RangePickerValue;
  onBlur?: () => void;
  format?: string;
}

const RangePicker = ({ withTimePicker, placeholder, dateInputPlaceholder, value, onChange, onBlur, name, format }: IProps) => {
  const [hoverValue, setHoverValue] = useState([]);
  const formatStr = format || defaultDateFormat(withTimePicker);
  const formatValue = (v) => (v ? v.format(formatStr) : '');

  const calendar = (
    <RangeCalendarStyled
      locale={cs_CZ}
      format={formatStr}
      hoverValue={hoverValue}
      onHoverChange={setHoverValue}
      showWeekNumber={false}
      dateInputPlaceholder={dateInputPlaceholder}
      defaultValue={[now, now.clone().add(1, 'months')]}
      timePicker={withTimePicker ? <TimePickerPanel showSecond={false} defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]} /> : undefined}
    />
  );

  return (
    <Picker value={value} onChange={onChange} animation="slide-up" calendar={calendar}>
      {({ value: v }) => (
        <InputStyled
          onBlur={onBlur}
          placeholder={placeholder}
          readOnly={true}
          name={name}
          id={name}
          value={(isValidRange(value) && `${formatValue(v[0])} - ${formatValue(v[1])}`) || ''}
        />
      )}
    </Picker>
  );
};

RangePicker.defaultProps = {
  value: [],
  withTimePicker: false,
  placeholder: undefined,
  dateInputPlaceholder: ['from', 'to'],
  onBlur: undefined,
  format: undefined,
};

export default RangePicker;
