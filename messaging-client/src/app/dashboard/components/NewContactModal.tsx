import { FormEvent, useRef } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { useContactsContext } from "../contexts/ContactsContext";

export default function NewContactModal({ closeModal }) {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContactsContext();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    createContact({ id: idRef?.current?.value, name: nameRef?.current?.value });

    closeModal();
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Create New Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Stack gap={3}>
            <Form.Group>
              <Form.Label>Id</Form.Label>
              <Form.Control type="text" required ref={idRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required ref={nameRef} />
            </Form.Group>
            <Form.Group>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </Form.Group>
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
