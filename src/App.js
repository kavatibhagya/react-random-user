import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios("https://randomuser.me/api/?results=20");

      if (response && response.data) {
        setUsers([...response.data.results]);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Random users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.login.uuid}>
            <img
              src={user.picture.medium}
              width="100px"
              height="100px"
              alt="profile"
            ></img>
            <div>
              {user.name.title} {user.name.first} {user.name.last}
            </div>
            <div>{user.gender}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
