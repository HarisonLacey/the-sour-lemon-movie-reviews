import React from "react";
import styled from "styled-components";
import Credentials from "./Credentials";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HeaderContainer = styled(Container)`
  border-bottom: solid 1px lightgrey;
`;

const Header = (props) => {
  return (
    <HeaderContainer>
      <Row>
        <Col xs={5}></Col>
        <Col xs={5}></Col>
        <Col xs={2}>
          <Credentials
            auth={props.auth}
          />
        </Col>
      </Row>
    </HeaderContainer>
  );
};

export default Header;
