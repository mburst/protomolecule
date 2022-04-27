import { createModel } from '@rematch/core';
import type { RootModel } from '.';
import { api } from '../api';

type UserState = {
  isLoaded: boolean;
  email?: string;
};

export type UserRegister = {
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export const user = createModel<RootModel>()({
  state: {
    email: undefined,
  } as UserState,
  reducers: {
    setUser: (state, payload: string | undefined) => {
      state.email = payload;
    },
  },
  effects: (dispatch) => ({
    async loadUser() {
      const user = await api.get('/me', {
        withCredentials: true,
      });
      dispatch.user.setUser(user.data.email);
    },
    async register(payload: UserRegister) {
      await api.post('/register/password', { email: payload.email, password: payload.password }, { withCredentials: true });
      await dispatch.user.loadUser();
    },
    async login(payload: UserLogin) {
      await api.post('/login/password', { email: payload.email, password: payload.password }, { withCredentials: true });
      await dispatch.user.loadUser();
    },
    async logout() {
      await api.post('/logout', {}, { withCredentials: true });
      dispatch.user.setUser(undefined);
    }
  }),
});
