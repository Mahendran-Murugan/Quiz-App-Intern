import React, { Children, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyContext = createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    userid: "",
    password: "",
  });

  const login = (id, name, userid, password) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("userid", userid);
    setUser({
      name: name,
      userid: userid,
      password: password,
    });
  };
  const navigate = useNavigate();
  const logout = () => {
    setUser({
      name: "",
      userid: "",
      password: "",
    });

    localStorage.setItem("name", "");
    localStorage.setItem("id", "");
    localStorage.setItem("userid", "");
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
