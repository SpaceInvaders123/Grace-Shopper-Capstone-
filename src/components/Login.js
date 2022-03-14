import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useAppContext } from "../contextLib";
import { useHistory } from "react-router-dom";
import LoaderButton from "./LoaderButton";
import "../style/Login.css";

const Login = () => {
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function validateForm() {
    return text.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    //event.onload();
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://grace-shopper-space.herokuapp.com/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: text,
            password: password,
          }),
        }
      );
      const data = await response.json();
      const jotToken = JSON.stringify(data.token);
      localStorage.setItem(`stAuth`, jotToken);
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      alert(e.message + " incorect Username or Password! ");
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="text">
          <Form.Label>Text</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
};

export default Login;
