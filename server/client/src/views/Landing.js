import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import ItemDisplay from "../components/ItemDisplay";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

const LeftCol = styled(Col)`
border-right: solid 1px lightgrey;
height: 1436px;
`

const Landing = () => {
  const [auth, setAuth] = useState("");
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
  }, []);
  return (
    <Layout>
      <Header auth={auth} />
      <Container>
        <Row>
          <LeftCol xs={3}></LeftCol>
          <Col xs={9}>
            <ItemDisplay />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Landing;
