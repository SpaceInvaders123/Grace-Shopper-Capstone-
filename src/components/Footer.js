import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "../style/FooterStyle";

const Footer = () => {
  return (
    <Box>
      <h1 style={{ color: "red", textAlign: "center", marginTop: "0px" }}>
      <img href="./" src={require("../style/socks4youX.png")} width="15%" />
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>Products</Heading>
            <FooterLink>No Show</FooterLink>
            <FooterLink>Quarter</FooterLink>
            <FooterLink>Knee High</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">Email</FooterLink>
            <FooterLink href="#">Phone</FooterLink>
            <FooterLink href="#">Location</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="#">
              <i className="facebook">
                <span style={{ marginLeft: "10px" }}>Facebook</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="instagram">
                <span style={{ marginLeft: "10px" }}>Instagram</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="twitter">
                <span style={{ marginLeft: "10px" }}>Twitter</span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};

export default Footer;
