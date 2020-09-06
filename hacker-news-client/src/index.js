import React from "react";
import ReactDOM from "react-dom";
import Hits from "./components/hits";
import "./static/css/index.css";
import * as serviceWorker from "./serviceWorker";
import Container from "@material-ui/core/Container";
import Header from "./components/header";

ReactDOM.render(
  <React.StrictMode>
    <Header></Header>
    <Container maxWidth="md">
      <Hits />
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
