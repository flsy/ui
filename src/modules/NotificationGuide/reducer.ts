export interface Car {
  rz: string;
}

export interface Person {
  firstName?: string;
  lastName?: string;
  photo?: string;
}

export const isCar = (obj: IObjectOfInterest): obj is Car => Object.prototype.isPrototypeOf.call(obj, 'rz');

type IObjectOfInterest = Car | Person;

interface Contact {
  firstName: string;
}

interface ContactGroup {
  name: string;
}

interface ContactOption {
  to: Contact | ContactGroup;
  options: {
    sms: boolean;
    call: boolean;
    email: boolean;
    beep: boolean;
  };
}

interface IState {
  name?: string;
  activeFrom?: Date;
  activeTo?: Date;
  hitDefinitions: IObjectOfInterest[];
  hitRange?: string;
  contacts: ContactOption[];
  messageShape: {
    sms: string;
    email: string;
  };
}

type Action = { type: 'set-name'; name?: string } | { type: 'set-definitions'; definitions: IObjectOfInterest[]; hitRange?: string };

export const initialState: IState = {
  name: 'patrani po...',
  hitDefinitions: [],
  hitRange: '',
  contacts: [],
  messageShape: {
    email: '',
    sms: '',
  },
};

export const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case 'set-name':
      return { ...state, name: action.name };
    case 'set-definitions':
      return { ...state, hitRange: action.hitRange, hitDefinitions: action.definitions };

    default:
      return state;
  }
};
