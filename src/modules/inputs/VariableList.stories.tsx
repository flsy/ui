import { storiesOf } from '@storybook/react';
import React from 'react';
import Container from '../Container/Container';
import Form from '../Form/Form';
import VariableList from './VariableList';

const form = {
  'variable-list-example': {
    type: 'variable-list',
    label: 'Variables',
    options: [],
  },
  submit: {
    type: 'submit',
    label: 'Submit',
  },
};

const variables = [
  { name: '{{RULE_NAME}}', description: 'Nazev pravidla' },
  { name: '{{TIME}}', description: 'Cas' },
];

const VariableListStory = () => {
  const [fields, setFields] = React.useState<any>(form);
  return (
    <>
      <Container size="md">
        <h2>VariableList</h2>
        <VariableList
          variables={variables}
          key="example"
          name="example"
          type="variable-list"
          update={console.log}
          validate={console.log}
          updateAndValidate={console.log}
          value={`Ahoj ${variables[0].name} , jak je?`}
        />
      </Container>

      <Container size="md">
        <h2>VariableList in a form</h2>
        <Form
          form={fields}
          onFormChange={setFields}
          onSubmit={console.log}
          components={({ name, component, actions }) => {
            if (component.type === 'variable-list') {
              return <VariableList name={name} {...component} {...actions} key="variable-list" type="variable-list" variables={variables} />;
            }

            return;
          }}
        />
      </Container>
    </>
  );
};

storiesOf('VariableList', module).add('basic usage', () => <VariableListStory />);
