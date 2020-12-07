import React from 'react';
import styled from 'styled-components';
import { Colours } from '../../mainStyles';
import Button, { ButtonWrapper } from '../Button/Button';

const Circle = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 1.5em;
  height: 1.5em;
  border-radius: 100%;
  text-align: center;
  box-shadow: 0 0 0 3px #fff;

  color: #fff;
  background: ${Colours.lightGrey};
  border: 1px solid ${Colours.lightGrey};

  ${(props) =>
    props.isCompleted &&
    `
    background: #fff;
    color: ${Colours.main};
    border: 1px solid ${Colours.main};
  `}

  ${(props) =>
    props.isActive &&
    `
    background: ${Colours.main};
    border: 1px solid ${Colours.main};
  `}

  &::before {
    counter-increment: stepCount;
    content: counter(stepCount);
  }

  &::after {
    content: ' ';
    position: absolute;
    display: block;
    top: 4px;
    right: 50%;
    left: 50%;
    height: 100%;
    width: 1px;
    transform: scale(1, 2);
    transform-origin: 50% -100%;
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const Title = styled.div<{ isActive: boolean }>`
  ${ButtonWrapper} {
    color: ${Colours.font};
    font-weight: 300;
    line-height: 1.5em;
    ${(props) => props.isActive && `font-weight: 500;`}
  }
`;

const Wrapper = styled.div<{ active?: boolean }>`
  display: grid;
  grid-template-columns: 1.5em auto;
  grid-column-gap: 1em;
  margin-bottom: 1.5em;
  align-items: center;

  &:last-child ${Circle}:after {
    display: none;
  }
`;

interface Props {
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick?: () => void;
}

const StepHeader = ({ isActive, isCompleted, title, onClick }: Props) => (
  <Wrapper>
    <Circle isActive={isActive} isCompleted={isCompleted} />
    {onClick ? (
      <Title isActive={isActive}>
        <Button link={true} onClick={onClick} type="button" text={title} />
      </Title>
    ) : (
      <Title isActive={isActive}>{title}</Title>
    )}
  </Wrapper>
);

export default StepHeader;
