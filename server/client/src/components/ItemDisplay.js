import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
const queryString = require("query-string");

const ItemContainer = styled.div`
  margin-top: 5%;
  border-radius: 3%;
  padding: 5%;
  background-color: whitesmoke;
  border: solid 1px lightgrey;
  box-shadow: 0 5px 10px lightgrey;
  &:hover {
    cursor: pointer;
  }
  img + p {
    text-align: center;
    color: black;
    font-weight: bold;
    font-size: 1.1rem;
  }
  p + p {
    text-align: center;
    color: black;
  }
`;
const Contain = styled(Container)`
  z-index: 0;
  position: relative;
  hr {
    width: 0;
  }
`;

const LoadContain = styled(Contain)`
  padding-top: 3%;
`;

const SpinnerDiv = styled.div`
  color: black;
`;

const LinkItem = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const ItemDisplay = () => {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    const itemFetch = async () => {
      try {
        let res = await fetch("/api/items");
        let response = await res.json();
        setDisplay(response.message);
      } catch (err) {
        setDisplay("An Error Occured");
      }
    };
    itemFetch();
    // underline animation effect
    const mouseOverFunction = () => {
      let childArray = document.getElementsByClassName("item-container");
      for (let i = 0; i < childArray.length; i++) {
        childArray[i].onmouseenter = () => {
          let count = 1;
          let widthCount = 10;
          let handle = setInterval(() => {
            widthCount += 10;
            childArray[i].children[3].style.width = `${widthCount}%`;
            childArray[i].children[3].style.border = "solid 1px lightgrey";
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
      let childArray = document.getElementsByClassName("item-container");
      for (let i = 0; i < childArray.length; i++) {
        childArray[i].onmouseleave = () => {
          childArray[i].children[3].style.width = "0";
        };
      }
    };
    setTimeout(mouseOutFunction, 2500);
  }, []);
  const itemDisplay = () => {
    switch (display === "An Error Occured") {
      case true:
        return (
          <Col xs={12}>
            <LoadContain>
              <Row>
                <Col xs={4}></Col>
                <Col xs={4}>
                  <p>{display}</p>
                </Col>
                <Col xs={4}></Col>
              </Row>
            </LoadContain>
          </Col>
        );
      case !true:
        if (display === "") {
          return (
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
          );
        } else {
          // show certain items based on specific category
          const query = queryString.parse(window.location.search);
          if (query.cat) {
            const newArray = display.filter((e) => e.category === query.cat);
            return newArray.map((e) => (
              <Col key={e._id} sm={6} lg={4}>
                <LinkItem name="form" to={`/movie?id=${e._id}`}>
                  <ItemContainer name="form">
                    <div name="form" className="item-container">
                      <Image
                        name="form"
                        src={e.image}
                        alt="thumbnail"
                        thumbnail
                      />
                      <p name="form">{e.title}</p>
                      <p name="form">{e.year}</p>
                      <hr name="form" />
                    </div>
                  </ItemContainer>
                </LinkItem>
              </Col>
            ));
          } else {
            // show items based on all categories
            return display.map((e) => (
              <Col key={e._id} sm={6} lg={4}>
                <LinkItem name="form" to={`/movie?id=${e._id}`}>
                  <ItemContainer name="form">
                    <div name="form" className="item-container">
                      <Image
                        name="form"
                        src={e.image}
                        alt="thumbnail"
                        thumbnail
                      />
                      <p name="form">{e.title}</p>
                      <p name="form">{e.year}</p>
                      <hr name="form" />
                    </div>
                  </ItemContainer>
                </LinkItem>
              </Col>
            ));
          }
        }
      default:
        return null;
    }
  };
  return (
    <Contain>
      <Row>{itemDisplay()}</Row>
    </Contain>
  );
};

export default ItemDisplay;
