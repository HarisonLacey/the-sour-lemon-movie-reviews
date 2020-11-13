import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import ItemDisplay from "../components/ItemDisplay";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

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

const UL = styled.ul`
  display: ${(props) => (props.show === true ? "block" : "none")};
  list-style-type: none;
  list-style: none;
  padding-left: 0;
  text-align: center;
  .list-div {
    cursor: pointer;
    border: solid 1px lightgrey;
    height: 3rem;
    border-radius: 3%;
    height: 40px;
    padding-top: 1%;
    border-radius: 0.3rem;
  }
  hr {
    width: 0;
    margin: 0;
  }
  a {
    color: black;
    font-weight: bold;
  }
  a:hover {
    text-decoration: none;
  }
`;

const CategoryButton = styled(Button)`
  margin: 4% 0 0;
`;

const Landing = () => {
  const [auth, setAuth] = useState("");
  const [ulShow, setUlShow] = useState(false);
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
    // underline animation effect
    const mouseOverFunction = () => {
      let childArray = document.getElementsByClassName("list-div");
      for (let i = 0; i < childArray.length; i++) {
        childArray[i].onmouseenter = () => {
          let count = 1;
          let widthCount = 10;
          let handle = setInterval(() => {
            widthCount += 10;
            childArray[i].children[1].style.width = `${widthCount}%`;
            childArray[i].children[1].style.border = "solid 1px lightgrey";
            count++;
            if (count > 9) {
              window.clearInterval(handle);
            }
          }, 20);
        };
      }
    };
    setTimeout(mouseOverFunction, 2500);
    const mouseOutFunction = () => {
      let childArray = document.getElementsByClassName("list-div");
      for (let i = 0; i < childArray.length; i++) {
        childArray[i].onmouseleave = () => {
          childArray[i].children[1].style.width = "0";
        };
      }
    };
    setTimeout(mouseOutFunction, 2500);
  }, []);

  const menu = () => {
    switch (ulShow) {
      case true:
        setUlShow(false);
        break;
      case !true:
        setUlShow(true);
        break;
      default:
        return null;
    }
  };

  // function to map category label names
  const categoryLinks = () => {
    const labels = [
      "all",
      "fantasy",
      "kids",
      "horror",
      "musical",
      "mystery",
      "sport",
      "science fiction",
    ];
    const toCapital = (el) => {
      return el.charAt(0).toUpperCase() + el.slice(1);
    };
    return labels.map((e) => {
      if (e === "all") {
        return (
          <div className="list-div">
            <a name="form" href="/">
              <li>{toCapital(e)}</li>
            </a>
            <hr />
          </div>
        );
      } else {
        return (
          <div className="list-div">
            <a name="form" href={`?cat=${e}`}>
              <li>{toCapital(e)}</li>
            </a>
            <hr />
          </div>
        );
      }
    });
  };
  return (
    <Layout>
      <Header auth={auth} />
      <Container>
        <Row>
          <LeftCol xs={4} lg={3}>
            <CategoryButton variant="info" onClick={menu} block>
              Categories
            </CategoryButton>
            <UL show={ulShow}>{categoryLinks()}</UL>
          </LeftCol>
          <RightCol xs={8} lg={9}>
            <ItemDisplay />
          </RightCol>
        </Row>
      </Container>
    </Layout>
  );
};

export default Landing;
