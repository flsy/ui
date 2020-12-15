export const pad = (n: number): string | number => (n < 10 ? `0${n}` : n);

export const notEmpty = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined;

// DD.MM.YYYY
export const toDateString = (date: Date) => {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

// DD.MM.YYYY hh:mm
export const toDateTimeString = (date: Date) => {
  return `${toDateString(date)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

// DD.MM.YYYY hh:mm:ss
export const toDateTimeSeconds = (date: Date) => {
  return `${toDateString(date)} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

export const dateReadable = (timestamp: number) => toDateString(new Date(timestamp * 1000));
