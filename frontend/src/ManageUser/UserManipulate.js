import axios from "axios";
import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import { USER_SERVER } from '../data';
export const UserManipulate = () => {
  const [users, setUsers] = useState([]);
  const AsyncFunction = async function () {
    const result = await axios.get(USER_SERVER + "/list");
    setUsers(result.data);
  };

  useEffect(() => {
    AsyncFunction();
  });

  return <UserTable rows={users} />;
};
