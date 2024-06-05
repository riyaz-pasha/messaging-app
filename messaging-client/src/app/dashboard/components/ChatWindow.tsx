import { FormEvent, useCallback, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { IChatWithContact, useChatsContext } from "../contexts/ChatsContext";

export default function ChatWindow({
  selectedChat,
}: {
  selectedChat: IChatWithContact;
}) {
  const { chats, sendMessage } = useChatsContext();
  const [text, setText] = useState("");
  const inputRef = useCallback((node) => {
    if (node) node.scrollIntoView({ smooth: true });
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    sendMessage(selectedChat.id, text);

    setText("");
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className=" d-flex flex-column align-items-start justify-content-end px-4">
          {selectedChat.messages.map((message, index) => {
            return (
              <div
                key={index}
                ref={inputRef}
                className={`my-1 d-flex flex-column ${
                  message.sender.fromMe ? "align-self-end" : ""
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.sender.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.sender.fromMe ? "text-end" : ""
                  }`}
                >
                  {message.sender.fromMe ? "You" : message.sender.id}
                </div>
              </div>
            );
          })}
        </div>
      </div>
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
