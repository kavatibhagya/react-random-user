import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [gender, setGender] = useState("");
  const [users, setUsers] = useState([]);

  async function fetchData(param) {
    let url = "https://randomuser.me/api/?results=100";

    if (param) {
      url = `${url}&gender=${param}`;
    }
    const response = await axios(url);

    if (response && response.data) {
      setUsers([...response.data.results]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filterusers = (e) => {
    e.preventDefault();

    fetchData(gender);
  };

  const genderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div className="App">
      <h1>Random users</h1>
      <h4>Filter by gender</h4>
      <form onSubmit={filterusers} className="filter-form">
        <p>
          <label>Male</label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={genderChange}
          />
        </p>
        <p>
          <label>Female</label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={genderChange}
          />
        </p>
        <button type="submit">Filter</button>
      </form>
      <ul class="list-container">
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
