import React, { useState, createContext, Children } from 'react';

export const DisplayContext = createContext();

export const DisplayProvider = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showHighScore, setShowHighScore] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRecentVisitors, setShowRecentVisitors] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showReset, setShowReset] = useState(false);

  return (
    <DisplayContext.Provider
      value={{
        showDashboard,
        setShowDashboard,
        showRecentVisitors,
        setShowRecentVisitors,
        showDatePicker,
        setShowDatePicker,
        showRegister,
        setShowRegister,
        showLogin,
        setShowLogin,
        setShowHighScore,
        showHighScore,
        setShowReset,
        showReset,
      }}
    >
      {props.children}
    </DisplayContext.Provider>
  );
};
