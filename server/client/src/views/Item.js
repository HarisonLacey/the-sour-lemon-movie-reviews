import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const queryString = require("query-string");

const LeftCol = styled(Col)`
  border-right: solid 1px lightgrey;
  height: 1436px;
  @media screen and (min-width: 1376px) {
    border-left: solid 1px lightgrey;
  }
`;

const RightCol = styled(Col)`
  @media screen and (min-width: 1376px) {
    border-right: solid 1px lightgrey;
  }
`;

const SpinnerDiv = styled.div`
  color: black;
`;

const LoadContain = styled.div`
  padding-top: 3%;
`;

const ImageDiv = styled.div`
  padding: 1%;
  margin-top: 2%;
`;

// response color depending on response message
const ResponsePara = styled.p`
  color: ${(props) => (props.color === "Review Submitted!" ? "green" : "red")};
  text-align: center;
`;

const Description = styled.div`
  height: 10em;
`;

// border color depending on rating
const Cards = styled(Card)`
  margin-bottom: 5%;
  border: ${(props) =>
    props.border >= "2.5" ? "solid 2px #a8df65" : "solid 2px #ec524b"};
  box-shadow: 0 5px 10px lightgrey;
`;

const Average = styled.h1`
  text-align: center;
  font-size: ${(props) => (props.font === "large" ? null : "1.5rem")};
`;

// movie title margin
const HeadingTwo = styled.h2`
  margin: 2%;
`;

const Item = () => {
  const [auth, setAuth] = useState("");
  const [user, setUser] = useState("");
  const [movie, setMovie] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [reviewResponse, setReviewResponse] = useState("");
  useEffect(() => {
    const authenticate = async () => {
      try {
        let res = await fetch("/api/authenticate");
        let response = await res.json();
        setAuth(response.message);
        setUser(response.user);
      } catch (err) {
        console.log(err.message);
      }
    };
    authenticate();
    const movieFetch = async () => {
      const query = queryString.parse(window.location.search);
      try {
        let res = await fetch("/api/movie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: query.id,
          }),
        });
        let response = await res.json();
        setMovie(response.message);
      } catch (err) {
        console.log(err.message);
      }
    };
    movieFetch();
  }, []);
  // save review once submitted
  const reviewSave = async (e) => {
    e.preventDefault();
    setReviewResponse(
      <SpinnerDiv>
        <Spinner animation="border" size="sm" /> One Moment...
      </SpinnerDiv>
    );
    try {
      let res = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
          movie: movie,
          review: review,
          rating: rating,
        }),
      });
      let response = await res.json();
      setReviewResponse(response.message);
    } catch (err) {
      setReviewResponse("An Error Occured");
    }
  };
  const reviewChange = (e) => {
    setReview(e.target.value);
  };
  const ratingChange = (e) => {
    setRating(e.target.value);
  };
  // display form to submit review
  const reviewDisplay = () => {
    if (auth === "authenticated") {
      return (
        <Form name="form" onSubmit={reviewSave}>
          <Form.Group name="form" controlId="formBasicEmail">
            <Form.Control
              name="form"
              onChange={reviewChange}
              type="text"
              placeholder="Your review..."
              required
            />
          </Form.Group>
          <Form.Group name="form" controlId="exampleForm.ControlSelect1">
            <Form.Control
              name="form"
              onChange={ratingChange}
              as="select"
              required
            >
              <option>Your rating...</option>
              <option>0</option>
              <option>0.5</option>
              <option>1</option>
              <option>1.5</option>
              <option>2</option>
              <option>2.5</option>
              <option>3</option>
              <option>3.5</option>
              <option>4</option>
              <option>4.5</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group name="form">
            <ResponsePara name="form" color={reviewResponse}>
              {reviewResponse}
            </ResponsePara>
            <Button name="form" variant="info" type="submit" block>
              Submit
            </Button>
          </Form.Group>
        </Form>
      );
    } else {
      return (
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Your review..." disabled />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control as="select" disabled>
              <option>Your rating...</option>
              <option>0</option>
              <option>0.5</option>
              <option>1</option>
              <option>1.5</option>
              <option>2</option>
              <option>2.5</option>
              <option>3</option>
              <option>3.5</option>
              <option>4</option>
              <option>4.5</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Button variant="info" type="submit" disabled block>
              Login or Signup to Leave a Review!
            </Button>
          </Form.Group>
        </Form>
      );
    }
  };
  // display all user reviews
  const userReviewDisplay = () => {
    return movie.reviews.map((e) => (
      <Col sm={6} lg={4}>
        <Cards border={e.rating}>
          <Card.Body>
            <Card.Title>{e.rating}/5</Card.Title>
            <Card.Text>"{e.review}"</Card.Text>
          </Card.Body>
          <Card.Footer>- {e.name}</Card.Footer>
        </Cards>
      </Col>
    ));
  };

  const average = () => {
    let number = 0;
    let array = movie.reviews.map((e) => e.rating);
    array.forEach((e) => (number += parseInt(e)));
    let average = number / array.length;
    if (isNaN(average)) {
      return <Average font="small">No Rating</Average>;
    } else {
      return <Average font="large">{average.toFixed(1)} / 5</Average>;
    }
  };

  // load once movie content recieved
  const contentLoad = () => {
    if (movie === "") {
      return (
        <Layout>
          <Header auth={auth} />
          <Container>
            <Row>
              <LeftCol xs={3}></LeftCol>
              <RightCol xs={9}>
                <Col xs={12}>
                  <LoadContain>
                    <Row>
                      <Col xs={4}></Col>
                      <Col xs={4}>
                        <SpinnerDiv>
                          <Spinner animation="border" size="sm" /> One Moment...
                        </SpinnerDiv>
                      </Col>
                      <Col xs={4}></Col>
                    </Row>
                  </LoadContain>
                </Col>
              </RightCol>
            </Row>
          </Container>
        </Layout>
      );
    } else {
      return (
        <Layout>
          <Header auth={auth} />
          <Container>
            <Row>
              <LeftCol xs={4} lg={3}>
                <ImageDiv>
                  <Image src={movie.image} alt="thumbnail" thumbnail />
                </ImageDiv>
                <hr />
                {average()}
                <hr />
              </LeftCol>
              <RightCol xs={8} lg={9}>
                <HeadingTwo>
                  {movie.title} ({movie.year})
                </HeadingTwo>
                <hr />
                <Description>{movie.description}</Description>
                <hr />
                {reviewDisplay()}
                <hr />
                <Container>
                  <Row>{userReviewDisplay()}</Row>
                </Container>
              </RightCol>
            </Row>
          </Container>
        </Layout>
      );
    }
  };
  return contentLoad();
};

export default Item;
