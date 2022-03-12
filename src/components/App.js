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
import { Store } from "./Cart";

const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  function handleLogout() {
    userHasAuthenticated(false);
  }
  return (
    <Router>
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <LinkContainer to="/">
            <Nav.Link>
              <img
                href="./"
                src={require("../style/socks4you.png")}
                height="50"
              />
            </Nav.Link>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}></Nav>
            <Nav>
              {isAuthenticated ? (
                <>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>

                  <LinkContainer to="/profile">
                    <Nav.Link href="/profile">Profile</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link href="/signup">Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link href="/login">Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
        <Store />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
