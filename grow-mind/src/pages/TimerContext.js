import React, { createContext, useState, useContext } from 'react';

const TimerContext = createContext();

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);

  const startTimer = () => {
    setStartTime(Date.now());
    setElapsedTime(null);
  };

  const stopTimer = () => {
    if (startTime) {
      const endTime = Date.now();
      setElapsedTime(((endTime - startTime) / 1000).toFixed(2)); // in seconds
      setStartTime(null);
    }
  };

  return (
    <TimerContext.Provider value={{ startTimer, stopTimer, elapsedTime }}>
      {children}
    </TimerContext.Provider>
  );
};
