import { createContext } from 'react';

const authState = {
  token: null,
  user: null,
  setToken: (newToken) => {
    authState.token = newToken;
  },
  setUser: (newToken) => {
    authState.token = newToken;
  },
};

export const AuthContext = createContext(authState);
