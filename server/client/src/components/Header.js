import React from "react";
import styled from "styled-components";
import Credentials from "./Credentials";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import lemon from "../images/lemon.png";
import { sizes } from "./deviceSizes";

const HeaderContainer = styled(Container)`
  border-bottom: solid 1px lightgrey;
  @media screen and (min-width: 1376px) {
    border: solid 1px lightgrey;
    border-top: none;
  }
`;

const Logo = styled.img`
  width: 12%;
  margin: 2%;
  @media screen and (max-width: ${sizes.tablet}) {
    margin: 3%;
    width: 50%;
  }
  @media screen and (min-width: ${sizes.tablet}) and (max-width: ${sizes.laptop}) {
    margin: 3%;
    width: 20%;
  }
`;

// grid breakpoints

// xs < 769px
// md >= 769px
// lg >= 992px
// xl >= 1200px

const Header = (props) => {
  return (
    <HeaderContainer>
      <Row>
        <Col xs={3} md={4} lg={5} xl={5}>
          <Logo src={lemon} alt="lemon logo" />
        </Col>
        <Col xs={4} md={5} lg={5} xl={5}></Col>
        <Col xs={5} md={3} lg={2} xl={2}>
          <Credentials auth={props.auth} />
        </Col>
      </Row>
    </HeaderContainer>
  );
};

export default Header;
