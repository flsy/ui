export type Index<TObject, TValue = any> = TObject & { [key: string]: TValue };

export type Transient<T> = {
  [K in keyof T as `$${string & K}`]: T[K];
};
