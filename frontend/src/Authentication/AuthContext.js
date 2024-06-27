import React, { Children, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyContext = createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const login = (name, email, password) => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    setUser({
      name: name,
      email: email,
      password: password,
    });
  };
  const navigate = useNavigate();
  const logout = () => {
    setUser({
      name: "",
      email: "",
      password: "",
    });

    localStorage.setItem("name", "");
    localStorage.setItem("email", "");
    localStorage.setItem("password", "");
    navigate("/login");
  };
  return (
    <MyContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </MyContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(MyContext);
};
