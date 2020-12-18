import { OneOrMany } from 'metatable';

export const renderValue = (value: OneOrMany<string | number | boolean>): string => {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  return value.toString();
};
