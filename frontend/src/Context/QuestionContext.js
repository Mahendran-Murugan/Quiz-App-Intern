import React, { createContext, useContext } from "react";
import { useState } from "react";

const MyContext = createContext();

export const QuestionContext = ({ children }) => {
  const [QID, setQID] = useState(0);
  return (
    <MyContext.Provider value={{ QID, setQID }}>{children}</MyContext.Provider>
  );
};

export const QuestContext = () => {
  return useContext(MyContext);
};
