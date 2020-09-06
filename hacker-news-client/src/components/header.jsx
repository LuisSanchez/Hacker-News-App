import React, { Component } from "react";
import "../static/css/header.css";
import Container from "@material-ui/core/Container";

class Header extends Component {
  render() {
    return (
      <header className="app-header">
        <Container maxWidth="md">
          <h1>HN Feed</h1>
          <h5>We &lt;3 hacker news!</h5>
        </Container>
      </header>
    );
  }
}

export default Header;
