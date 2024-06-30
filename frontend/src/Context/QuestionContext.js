import React, { createContext, useContext } from "react";
import { useState } from "react";

const MyContext = createContext();

export const QuestionContext = ({ children }) => {
  const [QID, setQID] = useState(0);
  const [min, setMin] = useState(0);
  const [attempt, setAttempt] = useState(0);
  return (
    <MyContext.Provider
      value={{ QID, setQID, min, setMin, setAttempt, attempt }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const QuestContext = () => {
  return useContext(MyContext);
};
