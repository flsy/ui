export const pad = (n: number): string | number => (n < 10 ? `0${n}` : n);

// DD.MM.YYYY
export const toDateString = (date: Date): string => {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

// DD.MM.YYYY hh:mm
export const toDateTimeString = (date: Date): string => {
  return `${toDateString(date)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

// DD.MM.YYYY hh:mm:ss
export const toDateTimeSeconds = (date: Date): string => {
  return `${toDateString(date)} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

export const dateReadable = (timestamp: number): string => toDateString(new Date(timestamp * 1000));
