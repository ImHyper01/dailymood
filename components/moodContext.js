import React, { createContext, useState } from 'react';

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [moodData, setMoodData] = useState({});
  
  return (
    <MoodContext.Provider value={{ moodData, setMoodData }}>
      {children}
    </MoodContext.Provider>
  );
};
