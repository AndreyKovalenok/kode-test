import React, { createContext, useReducer } from 'react';

import { SET_AUTH } from './ACTION_TYPES';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const initialState = {
    isLoggedIn: false,
    users: [
      {
        login: 'kode@kode.ru',
        password: 'Enk0deng',
      }
    ],
  };

  function reducer(auth, { type, payload }) {
    switch (type) {
      case SET_AUTH: 
        return {
          ...auth,
          isLoggedIn: payload,
        }
      default:
        return auth;
    }
  }

  const [auth, authDispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={[auth, authDispatch]}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthProvider;