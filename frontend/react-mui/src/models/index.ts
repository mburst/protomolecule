import { Models } from '@rematch/core';
import { user } from './user';
import { snackbar } from './snackbar'

export interface RootModel extends Models<RootModel> {
  user: typeof user;
  snackbar: typeof snackbar;
}

export const models: RootModel = { user, snackbar };
