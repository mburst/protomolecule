import { createModel } from '@rematch/core';
import { OptionsObject, SnackbarKey } from 'notistack';
import type { RootModel } from '.';

type SnackbarState = {
  snacks: Snackbar[];
};

export type Snackbar = {
  message: string;
  key: SnackbarKey;
  options?: OptionsObject;
  dismissed?: boolean;
};

export const snackbar = createModel<RootModel>()({
  state: {
    snacks: [],
  } as SnackbarState,
  reducers: {
    enqueueSnackbar: (state, payload: Snackbar) => {
      state.snacks.push(payload);
    },
    closeSnackbar: (state, payload: SnackbarKey | undefined) => {
      state.snacks = state.snacks.map((snack) => {
        if (snack.key === payload || payload === undefined) {
          snack.dismissed = true;
        }

        return snack;
      });
    },
    removeSnackbar: (state, payload: SnackbarKey) => {
      state.snacks = state.snacks.filter((snack) => {
        return snack.key !== payload;
      });
    },
  },
});
