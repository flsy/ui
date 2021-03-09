export interface IDayDetails {
  index: number;
  isCurrentMonth: boolean;
  year: number;
  month: number;
  day: number;
  date: Date;
}

export const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

// YYY-MM-DD T hh:mm:ss
export const toISOStringDateTime = (date: Date) => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

export const toISOStringDate = (date: Date) => [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(pad).join('-');

// const daysMap = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"];
export const daysMap = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
export const monthMap = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];

const getNumberOfDays = (year: number, month: number): number => 40 - new Date(year, month, 40).getDate();

const getFirstDayInMonth = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  if (firstDay === 0) {
    return 6;
  }

  return firstDay - 1;
};

const toTimestamp = (date: Date = new Date()) => new Date(date).getTime() / 1000;

export const isSameDay = (a: Date, b?: Date) => {
  if (a.getFullYear() !== b?.getFullYear()) return false;
  if (a.getMonth() !== b?.getMonth()) return false;
  return a.getDate() === b?.getDate();
};

export const isToday = (a: Date) => isSameDay(a, new Date());

export const isInRange = (day: Date, dateRange?: { startDate?: Date; endDate?: Date }): boolean => {
  const dayTimestamp = toTimestamp(day);
  const startDate = dateRange?.startDate && toTimestamp(dateRange?.startDate);
  const endDate = dateRange?.endDate && toTimestamp(dateRange?.endDate);

  if (!startDate || !endDate) return false;
  if (startDate <= dayTimestamp && dayTimestamp <= endDate) return true;
  return false;
};

interface IDayDetailsProps {
  index: number;
  numberOfDays: number;
  firstDay: number;
  year: number;
  month: number;
  hasMoreMonths?: boolean;
}

const getDay = (day, hasMoreMonths, isCurrentMonth) => {
  if (hasMoreMonths) {
    return isCurrentMonth && day;
  }
  return day;
};

const getDayDetails = (args: IDayDetailsProps): IDayDetails => {
  const date = args.index - args.firstDay;
  let prevMonth = args.month - 1;
  let nextMonth = args.month + 1;
  let prevYear = args.year;

  if (prevMonth === -1) {
    prevMonth = 11;
    prevYear -= 1;
  }

  if (nextMonth === 12) {
    nextMonth = 0;
  }

  const prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
  const returnDay = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
  const isCurrentMonth = date < 0 ? false : date < args.numberOfDays;
  // eslint-disable-next-line no-nested-ternary
  const monthReal = date < 0 ? prevMonth : date < args.numberOfDays ? args.month : nextMonth;
  // eslint-disable-next-line no-nested-ternary
  const yearReal = nextMonth <= 0 && date >= args.numberOfDays ? args.year + 1 : prevMonth >= 11 && date < 0 ? args.year - 1 : args.year;

  return {
    index: args.index,
    isCurrentMonth,
    year: yearReal,
    month: monthReal,
    day: getDay(returnDay, args.hasMoreMonths, isCurrentMonth),
    date: new Date(yearReal, monthReal, returnDay),
  };
};

export const getMonthDetails = (year: number, month: number, hasMoreMonths?: boolean): IDayDetails[] => {
  const firstDay = getFirstDayInMonth(year, month);
  const numberOfDays = getNumberOfDays(year, month);
  const rows = 6;
  const cols = 7;

  return new Array(rows * cols).fill(0).map((_, i) =>
    getDayDetails({
      index: i,
      numberOfDays,
      firstDay,
      year,
      month,
      hasMoreMonths,
    }),
  );
};
