import React, { useEffect } from "react";
import { Quiz } from "./Quiz";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/quiz");
  },  []);
  return <></>;
};
