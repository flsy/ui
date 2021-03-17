import { isRequired } from 'metaforms';
import React from 'react';
import { FieldProps } from 'react-metaforms';
import { defaultTo } from 'ramda';
import TreeSelect, { TreeData } from '../../TreeSelect/TreeSelect';
import { InputWrapper, Label } from '../../inputs/sharedStyles';

interface IProps extends FieldProps<string[]> {
  treeData: TreeData;
}

const FormTreeSelect = React.forwardRef((props: IProps, ref: React.Ref<HTMLInputElement>) => (
  <InputWrapper>
    {props.label && <Label fieldId={props.name} label={props.label} isRequired={isRequired(props.validation)} />}
    <TreeSelect ref={ref} treeData={defaultTo([], props.treeData)} placeholder={props.placeholder} value={props.value} onChange={(value) => props.update(props.name, value)} />
  </InputWrapper>
));

export default FormTreeSelect;
