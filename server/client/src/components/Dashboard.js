import React, { useState, useEffect } from "react";
import DashboardPasswordReset from "./DashboardPasswordReset";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import styled from "styled-components";

const Para = styled.p`
  padding-top: 4%;
  text-align: center;
`;

const Img = styled(Image)`
  width: 30%;
`;

const Heading = styled.h5`
  text-align: center;
`;
// border color depending on rating
const Cards = styled(Card)`
  margin-bottom: 5%;
  border: ${(props) =>
    props.border > "2.5" ? "solid 2px #a8df65" : "solid 2px #ec524b"};
  box-shadow: 0 5px 10px lightgrey;
  text-align: center;
  p {
    margin-top: 1%;
  }
`;

const Dashboard = (props) => {
  const [passwordReset, setPasswordReset] = useState(false);
  const [mainDashboardResponse, setMainDashboardResponse] = useState("");
  const [user, setUser] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  // authenticate and fetch updated reviews when user review state updates
  useEffect(() => {
    const authenticate = async () => {
      try {
        let res = await fetch("/api/authenticate");
        let response = await res.json();
        setUser(response.user);
        setUserReviews(response.user.reviews);
      } catch (err) {
        console.log(err.message);
      }
    };
    authenticate();
  }, [userReviews, mainDashboardResponse]);

  // delete review from user in database
  const deleteReview = async (e) => {
    userReviews.splice(e.target.value, 1);
    setUserReviews(userReviews);
    try {
      let res = await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user._id,
          reviews: userReviews,
        }),
      });
      let response = await res.json();
      setMainDashboardResponse(response.message);
    } catch (err) {
      setMainDashboardResponse("An Error Occured");
    }
  };

  const resetForm = () => {
    if (!passwordReset) {
      return null;
    } else {
      return <DashboardPasswordReset user={user} name="form" />;
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
        window.history.pushState("", "", "/");
        window.location.reload();
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

  // map user's review on their dashboard
  const userReviewsArray = () => {
    if (userReviews !== []) {
      return userReviews.map((e) => (
        <Col name={props.name} xs={12}>
          <Cards border={e.rating} name={props.name}>
            <Card.Header name={props.name}>{e.rating}/5</Card.Header>
            <Card.Body name={props.name}>
              <blockquote name={props.name} className="blockquote mb-0">
                <Img
                  name={props.name}
                  src={e.image}
                  alt="thumbnail"
                  thumbnail
                />
                <p name={props.name}>- "{e.review}"</p>
              </blockquote>
              <hr name={props.name} />
              <Button
                variant="info"
                name={props.name}
                value={userReviews.indexOf(e)}
                onClick={deleteReview}
                block
              >
                Delete
              </Button>
            </Card.Body>
          </Cards>
        </Col>
      ));
    }
  };

  return (
    <div name={props.name}>
      <h4 name={props.name}>Hello, {user.fullName}</h4>
      <hr name={props.name} />
      <Button
        name={props.name}
        onClick={formToggle}
        variant="outline-primary"
        type="submit"
        block
      >
        Change Password
      </Button>
      {resetForm()}
      <Button
        name={props.name}
        onClick={logout}
        variant="info"
        type="submit"
        block
      >
        Logout
      </Button>
      <Para name={props.name}>{mainDashboardResponse}</Para>
      <hr name={props.name} />
      <Heading name={props.name}>Your Reviews</Heading>
      <hr name={props.name} />
      <Container>
        <Row>{userReviewsArray()}</Row>
      </Container>
    </div>
  );
};

export default Dashboard;
