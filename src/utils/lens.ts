import { has, pathFc, prop, propFc } from './utils';

type LensGet = (value: any) => any;
type LensSet = (key: any) => (value: any) => any;

interface ILens {
  get: LensGet;
  set: LensSet;
}
export const lens = (get: LensGet) => (set: LensSet): ILens => ({ get, set });
export const view = <T>(l: ILens) => (obj: T) => l.get(obj);
export const set = <T, V>(l: ILens) => (value: V) => (object: T) => l.set(value)(object);
export const assoc = <TValue, TObject>(key: keyof TObject) => (value: TValue) => (object: TObject): TObject => ({ ...object, [key]: value });

export const assocPath = <TValue, TObject extends object>(p: Array<keyof TObject>) => (value: TValue) => (obj: TObject): TValue | TObject => {
  if (p.length === 0) {
    return value;
  }
  const [h, ...t] = p;
  if (t.length) {
    const nextObj = has<TObject>(h)(obj) ? prop(h.toString(), obj) : {};
    const nextValue = assocPath<TValue, TObject>(t)(value)(nextObj);
    // TODO: remove "as TValue".
    return assoc<TValue, TObject>(h)(nextValue as TValue)(obj);
  }
  return assoc<TValue, TObject>(h)(value)(obj);
};

export const lensProp = (key: string) => lens(propFc(key))(assoc(key));
export const lensPath = (key: string[]) => lens(pathFc(key))(assocPath(key));
