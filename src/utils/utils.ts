export const pad = (n: number) => (n < 10 ? `0${n}` : n);

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

export const defaultsTo = <T>(value: T | null | undefined, defaultValue: T) => (notEmpty<T>(value) ? value : defaultValue);

export const defaultsToObject = <T extends object>(value?: T | null): T => defaultsTo(value, {} as T);

export const defaultsToArray = <T>(value?: T[] | null): T[] => defaultsTo(value, []);

export const prop = (property: string, object?: { [key: string]: any }) => (object && Object.prototype.hasOwnProperty.call(object, property) ? object[property] : undefined);
export const propFc = (property: string) => (object?: { [key: string]: any }) => prop(property, object);

export const head = <T>(arr: T[]): T | undefined => (arr ? arr[0] : undefined);

export const has = <T extends object>(property: keyof T) => (obj: T) => !!obj[property];

export const path = <T>(object?: object, ...bits: any[]): T | undefined => {
  const [property, ...rest] = bits;
  if (prop(property, object)) {
    if (head(rest)) {
      return path<T>(prop(property, object), ...rest);
    }
    return prop(property, object);
  }
  return undefined;
};
export const pathFc = <TResult>(bits: string[]) => (object: object): TResult | undefined => path<TResult>(object, ...bits);
