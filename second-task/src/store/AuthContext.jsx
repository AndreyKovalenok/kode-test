import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const initialState = {
    isLoggedIn: false,
  };

  function reducer(auth, { type, payload }) {
    switch (type) {
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