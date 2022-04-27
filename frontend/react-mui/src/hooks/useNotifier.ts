import { SnackbarKey, useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../store';

let displayed: SnackbarKey[] = [];

const useNotifier = () => {
  const dispatch = useDispatch<Dispatch>();
  const snacks = useSelector((state: RootState) => state.snackbar.snacks);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  React.useEffect(() => {
    snacks.forEach(({ key, message, options = {}, dismissed = false }) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key);
        return;
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) return;

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          dispatch.snackbar.removeSnackbar(myKey);
          removeDisplayed(myKey);
        },
      });

      // keep track of snackbars that we've displayed
      storeDisplayed(key);
    });
  }, [snacks, closeSnackbar, enqueueSnackbar, dispatch]);
};

export default useNotifier;
