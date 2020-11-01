import React, { useState, useEffect } from "react";
import DashboardPasswordReset from "./DashboardPasswordReset";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const Para = styled.p`
  padding-top: 4%;
`;

const Dashboard = (props) => {
  const [passwordReset, setPasswordReset] = useState(false);
  const [mainDashboardResponse, setMainDashboardResponse] = useState("");
  const [user, setUser] = useState([]);
  useEffect(() => {
    const authenticate = async () => {
      try {
      let res = await fetch("/api/authenticate");
      let response = await res.json();
      setUser(response.user)
      } catch(err) {
        console.log(err.message);
      }
     }
    authenticate();
  }, [])
  const resetForm = () => {
    if (!passwordReset) {
      return null;
    } else {
      return (
        <DashboardPasswordReset
          user={user}
          name="form"
        />
      );
    }
  };
const logout = async () => {
    try {
      let res = await fetch("/api/logout");
      let response = await res.json();
      setMainDashboardResponse(
        <div>
          <Spinner animation="border" size="sm" /> {response.message}
        </div>
      );
      if (response.message === "Logging Out...") {
        setTimeout(() => {
          window.history.pushState("", "", "/");
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      setMainDashboardResponse("An Error Occured");
    }
  };

  const formToggle = () => {
    switch (passwordReset) {
      case false:
        setPasswordReset(true);
        break;
      case true:
        setPasswordReset(false);
        break;
      default:
        return null;
    }
  };

  return (
    <div name={props.name}>
      <h4 name={props.name}>Hello, {user.fullName} </h4>
      <hr name={props.name} />
      <Button
        name={props.name}
        onClick={formToggle}
        variant="primary"
        type="submit"
        block
      >
        Change Password
      </Button>
      {resetForm()}
      <Button
        name={props.name}
        onClick={logout}
        variant="primary"
        type="submit"
        block
      >
        Logout
      </Button>
      <Para name={props.name}>{mainDashboardResponse}</Para>
    </div>
  );
};

export default Dashboard;
