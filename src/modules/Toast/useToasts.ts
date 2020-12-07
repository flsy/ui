import { AddToast, useToasts as rtnUseToasts } from 'react-toast-notifications';

export enum ToastAppearance {
  success = 'success',
  error = 'error',
  info = 'info',
}

const useToasts = (maxCount: number | undefined = 5) => {
  const { addToast, toastStack, removeToast } = rtnUseToasts();

  const handleAddToast: AddToast = (content, options, callback) => {
    if (toastStack.length >= maxCount) {
      removeToast(toastStack[0].id, () => addToast(content, options, callback));
    } else {
      addToast(content, options, callback);
    }
  };

  return {
    addToast: {
      success: (message: string) => handleAddToast(message, { appearance: ToastAppearance.success }),
      info: (message: string) => handleAddToast(message, { appearance: ToastAppearance.info }),
      error: (message: string) => handleAddToast(message, { appearance: ToastAppearance.error }),
    },
  };
};

export default useToasts;
