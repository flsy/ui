import { IHeadTr as IMetaHeadTr, ITh as IMetaTh, ITr as IMetaTr } from 'metatable';

export type AllTypes = 'string' | 'number' | 'boolean' | 'timestamp' | 'image';

export type ITh = IMetaTh<AllTypes>;
export type ITr = IMetaTr<any>;
export type IHeadTr = IMetaHeadTr;
