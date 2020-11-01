import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import styled from "styled-components";
const queryString = require("query-string");

const LeftCol = styled(Col)`
  border-right: solid 1px lightgrey;
  height: 1436px;
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

const Item = () => {
  const [auth, setAuth] = useState("");
  const [movie, setMovie] = useState("");
  useEffect(() => {
    const authenticate = async () => {
      try {
        let res = await fetch("/api/authenticate");
        let response = await res.json();
        setAuth(response.message);
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
  const contentLoad = () => {
    if (movie === "") {
      return (
        <Layout>
          <Header auth={auth} />
          <Container>
            <Row>
              <LeftCol xs={3}></LeftCol>
              <Col xs={9}>
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
              </Col>
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
              <LeftCol xs={3}>
                <ImageDiv>
                  <Image src={movie.image} alt="thumbnail" thumbnail />
                </ImageDiv>
                <hr />
              </LeftCol>
              <Col xs={9}>
                <h2>
                  {movie.title} ({movie.year})
                </h2>
              </Col>
            </Row>
          </Container>
        </Layout>
      );
    }
  };
  return contentLoad();
};

export default Item;
