import { FormEvent, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export default function ChatWindow() {
  const [text, setText] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">ChatWindow</div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-4">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit">Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
