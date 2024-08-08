import React, { useState } from "react";
import "../Register/register.css";
import { Link } from "react-router-dom";
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    console.log(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDetault();
    console.log("firstName", firstName);
    console.log("lastName", lastName);
  };
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="d-flex row">
          <div className="col-md-6">
            <label>First Name</label>
            <input
              className="input_wrapper"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="col-md-6">
            <label>Last Name</label>
            <input
              className="input_wrapper"
              value={lastName}
              type="text"
              onChange={handleLastNameChange}
            />
          </div>
        </div>
        <div className="button_wrapper">
          <Link to="/dashboard">
            {" "}
            <button className="button_style" type="submit">
              Submit
            </button>
          </Link>
        </div>
        {/* <Link to="/dashboard">Click to view our dashboard page</Link> */}
      </form>
    </>
  );
};

export default Register;
