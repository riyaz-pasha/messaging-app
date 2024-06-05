import { FormEvent, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";
import { useChatsContext } from "../contexts/ChatsContext";
import { ContactId, useContactsContext } from "../contexts/ContactsContext";

export default function NewChatModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactIds] = useState<ContactId[]>([]);
  const { contacts } = useContactsContext();
  const { createChat } = useChatsContext();

  function handleCheckboxChange(contactId: string) {
    setSelectedContactIds([...selectedContactIds, contactId]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    createChat({
      id: uuidV4(),
      recipientIds: selectedContactIds,
      messages: [],
    });

    closeModal();
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Create New Chat</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Stack gap={3}>
            {contacts.map((contact) => {
              return (
                <Form.Group controlId={contact.id} key={contact.id}>
                  <Form.Check
                    type="checkbox"
                    id={contact.id}
                    label={contact.name}
                    onChange={() => handleCheckboxChange(contact.id)}
                  />
                </Form.Group>
              );
            })}
            <Form.Group>
              <Button type="submit" variant="primary">
                Create
              </Button>
            </Form.Group>
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
