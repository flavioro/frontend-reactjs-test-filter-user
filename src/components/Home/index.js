import React from "react";
import { Container, Jumbotron } from "react-bootstrap";

import { Users } from "components";

export default () => (
  <Container className="p-3">
    <Jumbotron>
      <h1 className="header d-flex justify-content-center">
        FRONT-END REACT TEST FILTER USER (name or age)
      </h1>
    </Jumbotron>

    <Users />
  </Container>
);
