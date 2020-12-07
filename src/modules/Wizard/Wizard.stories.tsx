import { storiesOf } from '@storybook/react';
import { getFormData } from 'metaforms';
import React from 'react';
import Step from '../Stepper/Step';
import Stepper from '../Stepper/Stepper';
import FormStep from './FormStep';

const stepper = [
  { name: 'first', title: 'First' },
  { name: 'second', title: 'Second' },
  { name: 'third', title: 'Third' },
];

const backend = (stepName = 'first', values?: { name?: string; companyName?: string }) => {
  switch (stepName) {
    case 'first':
      return {
        stepper: stepper.map((step, index) => (index === 0 ? { ...step, isActive: true } : step)),
        form: [
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            value: values?.name || null,
          },
          {
            name: 'submit',
            label: 'Continue',
            type: 'submit',
          },
        ],
      };
    case 'second':
      return {
        stepper: [
          { name: 'first', title: 'First', canVisit: true },
          { name: 'second', title: 'Second', isActive: true, errorMessage: 'whut?' },
          { name: 'third', title: 'Third' },
        ],
        form: [
          {
            name: 'companyName',
            label: 'Company Name',
            type: 'text',
            value: values?.companyName || 'banana',
          },
          {
            name: 'submit',
            label: 'Continue',
            type: 'submit',
          },
        ],
      };
    case 'third':
      return {
        form: [],
        stepper: [
          { name: 'first', title: 'First', canVisit: true },
          { name: 'second', title: 'Second', canVisit: true },
          { name: 'third', title: 'Third', isActive: true },
        ],
      };

    default:
      return {
        stepper: [],
        form: [],
      };
  }
};

const request = (stepName?: string, values?: object): Promise<any> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(backend(stepName, values));
    }, 500);
  });

const WizardStory = () => {
  const [values, setValues] = React.useState([]);
  const [data, setData] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(false);

  const load = async (stepName: string, vals: object = {}) => {
    setIsLoading(true);

    setData(await request(stepName, vals));
    setIsLoading(false);
  };

  React.useEffect(() => {
    load('first');
  }, []);

  const onSubmit = async (f: any, index: any) => {
    const vals = { ...values, ...getFormData(f) };
    setValues(vals);
    await load(stepper[index].name, vals);
  };

  const currentStep = data?.stepper.findIndex(({ isActive }: any) => isActive);

  return (
    <Stepper currentStep={currentStep} isLoading={isLoading}>
      {data?.stepper.map((r: any, index: any) =>
        data.form ? (
          <FormStep
            name={r.name}
            title={r.title}
            form={data.form}
            {...(r.canVisit ? { onClick: load } : {})}
            onSubmit={(f) => onSubmit(f, index + 1)}
            errorMessage={r.errorMessage}
          />
        ) : (
          <Step title={r.title} {...(r.canVisit ? { onClick: (name) => load(name, values) } : {})} name={r.name}>
            {() => (
              <div>
                <h1>Done</h1>
                <p>{JSON.stringify(values)}</p>
                <p>Submit button would go here</p>
              </div>
            )}
          </Step>
        ),
      )}
    </Stepper>
  );
};

storiesOf('Wizard', module).add('basic usage', () => <WizardStory />);
