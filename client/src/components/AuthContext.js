import React, { useState, createContext } from 'react';
import axios from 'axios';
export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({ authenticated: false, name: null });

  async function getLoginStatus() {
    let response = await axios('/api/auth/isAuthenticated');
    if (response.data.authenticated) {
      setAuth(response.data);
    }
  }

  return (
    <AuthContext.Provider value={{ getLoginStatus, auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};
