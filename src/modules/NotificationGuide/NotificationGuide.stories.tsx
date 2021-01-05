/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Accordion, Button, Form } from '../../index';
import AccordionPanel from '../Accordion/AccordionPanel';
import { initialState, isCar, reducer } from './reducer';

const form = {
  contact: {
    type: 'group',
    fields: {
      ['object-type']: {
        type: 'select',
        label: 'Objekt',
        value: 'auto',
        options: [{ value: 'auto' }, { value: 'osoba' }],
      },
      name: {
        type: 'text',
        label: 'RZ',
      },
    },
  },
  addObject: {
    type: 'button',
    label: 'Dalsi objekt',
  },
  submit: {
    type: 'submit',
    label: 'Ulozit',
  },
};

const form2 = {
  ignore: {
    type: 'checkbox',
    label: 'Ignorovat',
    value: true,
  },
  od: {
    type: 'datetime-local',
    label: 'Od',
  },
  do: {
    type: 'datetime-local',
    label: 'do',
  },
  submit: {
    type: 'submit',
    label: 'Ulozit',
  },
};

const form3 = {
  name: {
    type: 'text',
    label: 'Nazev notifikace',
    value: 'patrani po...',
  },
  submit: {
    type: 'submit',
    label: 'Dalsi',
  },
};

const NotificationGuideStory = () => {
  const [contacts, addContact] = React.useState([1]);
  const [openId, setOpenId] = React.useState(3);
  const [fields, onFieldsChange] = React.useState<any>(form);
  const [fields2, onFields2Change] = React.useState<any>(form2);
  const [fields3, onFields3Change] = React.useState<any>(form3);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div>
      <h2>Nove notifikacni pravidlo</h2>
      <Accordion>
        <AccordionPanel isOpen={openId === 0} title={state.name ? `1. ${state.name}` : '1. Nazev notifikace'} onOpen={() => setOpenId(0)} onClose={() => setOpenId(1)}>
          <Form<any>
            title="Nazev notifikace"
            form={fields3}
            onFormChange={(form) => onFields3Change(form)}
            onSubmit={({ formData }) => {
              dispatch({ type: 'set-name', name: formData.name });
              setOpenId(1);
            }}
          />
        </AccordionPanel>
        <AccordionPanel isOpen={openId === 1} title="2. Detaily hledanych objektu" onOpen={() => setOpenId(1)} onClose={() => setOpenId(2)}>
          <Form<any>
            title="Detaily hledanych objektu"
            form={fields}
            onSubmit={({ formData }) => {
              const definitions = Object.keys(formData).reduce<any>((all, current) => {
                const [name] = current.split('-');
                if (name === 'name') {
                  return [...all, { rz: (formData as any)[current] }];
                }
                return all;
              }, []);

              dispatch({ type: 'set-definitions', definitions, hitRange: formData.contact.name });
              setOpenId(2);
            }}
            onFormChange={(form) => onFieldsChange(form)}
          />
        </AccordionPanel>
        <AccordionPanel isOpen={openId === 2} title="3. Secifikace data" onOpen={() => setOpenId(2)} onClose={() => setOpenId(3)}>
          <Form
            title="Kdy je notifikacni pravidlo platne?"
            form={fields2}
            onSubmit={() => {
              setOpenId(3);
            }}
            onFormChange={(form) => onFields2Change(form)}
          />
        </AccordionPanel>
        <AccordionPanel isOpen={openId === 3} title="4. Koho notifikovat" onOpen={() => setOpenId(3)} onClose={() => setOpenId(4)}>
          <h2>Koho notifikovat</h2>

          {contacts.map((_, index) => (
            <form className="Form" key={index}>
              <div>
                <input type="radio" name={`radio-${index}`} defaultChecked={true} />
                <label>Kontakt</label>
                <select>
                  <option>Vyberte kontakt</option>
                  <option>Honza Smid</option>
                </select>
              </div>
              <div>
                <input type="radio" name={`radio-${index}`} />
                <label>Skupina kontaku</label>
                <select>
                  <option>Vyberte skupinu</option>
                  <option>Skupina #1</option>
                  <option>Skupina #2</option>
                </select>
              </div>
              <div>
                <label>Beep?</label>
                <input type="checkbox" defaultChecked={true} />
              </div>
              <div>
                <label>SMS</label>
                <input type="checkbox" defaultChecked={false} />
              </div>
              <div>
                <label>Call</label>
                <input type="checkbox" defaultChecked={false} />
              </div>
              <div>
                <label>Email</label>
                <input type="checkbox" defaultChecked={false} />
              </div>
            </form>
          ))}

          <div>
            <br />
            <br />
            <Button onClick={() => addContact([...contacts, 1])}>Add contact</Button>
          </div>
          <div>
            <br />
            <br />
            <br />
            <Button>New contact</Button>
            <Button>Nova group</Button>
          </div>
          <div>
            <br />
            <br />
            <Button onClick={() => setOpenId(4)}>Next</Button>
          </div>
        </AccordionPanel>
        <AccordionPanel isOpen={openId === 4} title="5. Tvar zpravy" onOpen={() => setOpenId(4)} onClose={() => setOpenId(5)}>
          <h2>Tvar zpravy</h2>
          <form className="Form">
            <label>sms</label>
            <input type="text" defaultValue="Vozidlo __RZ__ spatreno ..." />
            <label>email</label>
            <textarea defaultValue={`Dobry den Skupina #1\r\rVozidlo __RZ__ spatreno ...`} rows={6} />
            <Button type="button" onClick={() => setOpenId(5)}>Next</Button>
          </form>
        </AccordionPanel>
        <AccordionPanel isOpen={openId === 5} title="6. Shrnuti" onOpen={() => setOpenId(5)}>
          <h2>Shrnuti</h2>
          <h3>{state.name}</h3>

          <p>Kdyz najdu {state.hitDefinitions.map((r) => (isCar(r) ? r.rz : '')).join(', ')}.</p>
          <p>Poslu:</p>
          <ul>
            <li>
              SMS na 724 440 682 <strong>Honza Smid</strong> ve tvaru: "Vozidlo __RZ__spatreno ..."
            </li>
            <li>
              Email skupine <strong>Skupina #1</strong> ve tvaru "Dobry den..."
            </li>
          </ul>

          <Button type="button" primary={true}>Save</Button>
          <Button type="button" onClick={() => setOpenId(0)}>Cancel</Button>
        </AccordionPanel>
      </Accordion>
    </div>
  );
};

storiesOf('Notification guide', module).add('basic usage', () => <NotificationGuideStory />);
// todo:
// kontrola jestli ve skupine jsou zaane emaily/ sms - tel. cisla
// pri notifikaci zalogovat chybu kdyz neni vyplnen email kam se ma notifikace poslat
