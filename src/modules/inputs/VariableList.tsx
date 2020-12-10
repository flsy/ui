import { isRequired } from 'metaforms';
import React from 'react';
import { FieldProps } from 'react-metaforms';
import styled from 'styled-components';
import Flex from '../Layout/Flex';
import { ErrorMessage, InputWrapper, Label } from './sharedStyles';
import { TextareaStyled } from './Textarea';

const StyledLeftDiv = styled.div`
  margin: 4px;
  flex-grow: 2;
`;

const StyledRightDiv = styled.div`
  margin: 4px;
  flex-grow: 1;
`;

const Pre = styled.pre`
  margin: 4px;
  display: inline-block;
`;

const Textarea = styled(TextareaStyled)`
  width: 100%;
  box-sizing: border-box;
  font: inherit;
`;

interface IProps extends FieldProps<string> {
  disabled?: boolean;
  variables: { name: string; description: string }[];
}

const VariableList = React.forwardRef((props: IProps, ref: React.Ref<HTMLTextAreaElement>) => {
  return (
    <InputWrapper>
      {props.label && <Label fieldId={props.name} label={props.label} isRequired={isRequired(props.validation)} />}
      <Flex horizontal={true}>
        <StyledLeftDiv>
          <Textarea
            ref={ref}
            id={props.name}
            name={props.name}
            placeholder={props.placeholder}
            defaultValue={props.value as string}
            disabled={props.disabled}
            onChange={(e) => props.update(props.name, e.target.value)}
            onBlur={() => props.validate(props.name)}
            hasError={!!props.errorMessage}
          />
        </StyledLeftDiv>
        <StyledRightDiv>
          <div>Seznam proměnných</div>
          {props.variables.map(({ name, description }) => (
            <div key={name}>
              <Pre>{name}</Pre> - {description}
            </div>
          ))}
        </StyledRightDiv>
      </Flex>
      {props.errorMessage ? <ErrorMessage message={props.errorMessage} name={props.name} /> : null}
    </InputWrapper>
  );
});

VariableList.defaultProps = {
  disabled: false,
};

export default VariableList;
