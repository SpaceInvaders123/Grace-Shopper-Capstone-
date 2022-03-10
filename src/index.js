import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components";
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import "./style/index.css";

/* Will's changes; made two small changes here.

1) Use BrowserRouter as our router. 
This uses the browser’s History API to create real URLs 

2) Use the Router to render our App component. 
This will allow us to create the routes we need inside our App component. */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
