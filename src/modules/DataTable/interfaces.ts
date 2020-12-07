import { IHeadTr as IMetaHeadTr, ITh as IMetaTh, ITr as IMetaTr } from '../MetaTable';

export type AllTypes = 'string' | 'number' | 'boolean' | 'timestamp';

export type ITh = IMetaTh<AllTypes>;
export type ITr = IMetaTr<any>;
export type IHeadTr = IMetaHeadTr;
