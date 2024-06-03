"use client";

import { useRef } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

export default function Login({ onIdSubmit }) {
  const idRef = useRef("");

  function handleSubmit(e) {
    e?.preventDefault();

    onIdSubmit(idRef?.current?.value);
  }

  function createNewId() {
    onIdSubmit(uuidV4());
  }

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter your id</Form.Label>
          <Form.Control type="text" ref={idRef} required></Form.Control>
        </Form.Group>
        <Stack direction="horizontal" className="mt-2">
          <Button type="submit">Login</Button>
          <Button variant="secondary" className="ms-2" onClick={createNewId}>
            Create new id
          </Button>
        </Stack>
      </Form>
    </Container>
  );
}
