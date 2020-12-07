import React, { useContext } from 'react';
import { IStepProps, StepperContext } from './Stepper';

const Step = ({ children }: IStepProps) => {
  const stepperContext = useContext(StepperContext);

  return <>{children(stepperContext)}</>;
};

export default Step;
