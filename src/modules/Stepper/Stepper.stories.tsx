import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { IOption } from '../Tags/interfaces';
import FormStep from '../Wizard/FormStep';
import Step from './Step';
import Stepper from './Stepper';

const mockOptions: IOption[] = [
  {
    value: 1,
    label: 'Terminal 1',
    // @ts-ignore
    description: 'oblast terminalu 1',
  },
  {
    value: 2,
    label: 'Hala',
    // @ts-ignore
    description: 'oblast u hlavni haly',
  },
  {
    value: 3,
    label: 'Terminal 2',
  },
  {
    value: 4,
    label: 'Terminal 3',
  },
  {
    value: 5,
    label: 'Recepce',
  },
  {
    value: 17,
    label: 'Gate K asdadasdaadsa Gate K asdadasdaadsaGateKasdadasdaadsaGateKasdadasdaadsaGateK',
  },
  {
    value: 98,
    label: 'Ramp 1',
    // @ts-ignore
    description: 'Departure ramp',
  },
  {
    value: 99,
    label: 'Check-in',
  },
];

const form = {
  areas: {
    type: 'tags',
    label: 'Oblasti',
    options: mockOptions,
  },
  'areas-preselected': {
    type: 'tags',
    label: 'Preselected areas',
    values: [2, 17],
    options: mockOptions,
  },
  submit: {
    type: 'submit',
    label: 'Odeslat',
  },
};

const StepperStory = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  return (
    <Stepper currentStep={currentStep}>
      <Step title="First" name="first">
        {({ isFirst }) => (
          <>
            {`First ${isFirst} content`}
            <button type="button" onClick={() => setCurrentStep(currentStep + 1)}>
              next
            </button>
          </>
        )}
      </Step>
      <Step title="Second" name="second">
        {() => (
          <>
            Second content
            <button type="button" onClick={() => setCurrentStep(currentStep + 1)}>
              next
            </button>
          </>
        )}
      </Step>
      <Step title="Third" name="third">
        {({ isFirst }) => `Second ${isFirst} content`}
      </Step>
    </Stepper>
  );
};

const StepperFormStory = () => {
  return (
    <Stepper currentStep={0} isLoading={false}>
      <FormStep name="step1" title="Step 1" form={form} onSubmit={action('submit')} />
      <FormStep name="step2" title="Step 2" form={form} onSubmit={action('submit')} />
    </Stepper>
  );
};

storiesOf('Stepper', module)
  .add('basic usage', () => <StepperStory />)
  .add('form', () => <StepperFormStory />);
