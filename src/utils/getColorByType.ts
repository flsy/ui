import { Colours } from '../mainStyles';

const getColorByType = (type?: 'info' | 'warning' | 'error' | 'success') => {
  switch (type) {
    case 'info':
      return Colours.smidgenInfo;
    case 'warning':
      return Colours.smidgenWarning;
    case 'error':
      return Colours.smidgenError;
    case 'success':
      return Colours.smidgenSuccess;
    default:
      return Colours.smidgenGrey;
  }
};

export default getColorByType;
