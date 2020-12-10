import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Loader from '../Loader/Loader';
import StepHeader from './StepHeader';

const Wrapper = styled.div`
  display: flex;
`;

const Content = styled.div`
  width: 100%;
  padding: 1em;
`;

const StepContainer = styled.div`
  padding: 1em;
  counter-reset: stepCount;
`;

export interface IStepProps {
  name: string;
  title: string;
  onClick?: (name: string) => void;
  children: (props: StepperContextProps) => any;
}

interface IStepperProps {
  currentStep: number;
  isLoading?: boolean;
  children: ReactElement<IStepProps>[];
}

export interface StepperContextProps {
  isFirst?: boolean;
  isLast?: boolean;
}
export const StepperContext = React.createContext<StepperContextProps>({});

const Stepper = ({ children, currentStep, isLoading }: IStepperProps) => {
  if (!children) {
    return <Loader text="Načítání dat..." />;
  }

  const isLast = currentStep >= children.length - 1;
  const isFirst = currentStep <= 0;

  return (
    <Wrapper>
      <StepContainer>
        {children.map((re, index) => {
          const handleClick = () => {
            if (re.props.onClick) {
              re.props.onClick(re.props.name);
            }
          };
          return <StepHeader key={re.props.name} title={re.props.title} isActive={index === currentStep} isCompleted={index < currentStep} onClick={handleClick} />;
        })}
      </StepContainer>
      <Content>
        <StepperContext.Provider
          value={{
            isFirst,
            isLast,
          }}
        >
          {isLoading ? <Loader text="Načítání dat..." /> : children[currentStep]}
        </StepperContext.Provider>
      </Content>
    </Wrapper>
  );
};

Stepper.defaultProps = {
  isLoading: false,
};

export default Stepper;
