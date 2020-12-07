export interface ILine {
  value: any;
  type: 'boolean' | 'base64' | 'date' | 'json' | 'string' | 'number' | 'xml';
}

export interface IProps {
  data?: object | ILine;
  prevKey?: string;
  index?: number;
}
