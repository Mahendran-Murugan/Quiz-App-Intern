import axios from "axios";
import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
export const UserManipulate = () => {
  const [users, setUsers] = useState([]);
  const AsyncFunction = async function () {
    const result = await axios.get("http://localhost:8000/api/user/list");
    setUsers(result.data);
  };

  useEffect(() => {
    AsyncFunction();
  });

  return <UserTable rows={users} />;
};
