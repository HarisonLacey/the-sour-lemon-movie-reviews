import React from "react";
import styled from "styled-components";

const LayoutContainer = styled.div`
  margin: 8%;
  background-color: whitesmoke;
  height: auto;
  border: solid 1px black;
  border-radius: 1%;
`;

const Layout = (props) => {
  return <LayoutContainer>{props.children}</LayoutContainer>;
};

export default Layout;
