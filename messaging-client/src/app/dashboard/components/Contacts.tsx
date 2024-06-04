import React from "react";
import { ListGroup } from "react-bootstrap";
import { useContactsContext } from "../contexts/ContactsContext";

export default function Contacts() {
  const { contacts } = useContactsContext();
  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => {
        return <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>;
      })}
    </ListGroup>
  );
}
