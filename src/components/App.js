import React, { useState } from "react"; // getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import "../style/App.css";
import Navbar from "react-bootstrap/Navbar";
import Routes from "../Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import Footer from "./Footer";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContext } from "../contextLib";

const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  function handleLogout() {
    userHasAuthenticated(false);
  }
  return (
    <Router>
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <img href="./" src={require("../style/socks4you.png")} height="50" />
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}></Nav>
            <Nav>
              {isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link href="/signup">Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link href="/login">Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/API">
                    <Nav.Link href="/API">API</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
