import { ListGroup } from "react-bootstrap";
import { useChatsContext } from "../contexts/ChatsContext";

export default function Chats() {
  const { chats } = useChatsContext();
  return (
    <ListGroup variant="flush">
      {chats?.map((chat) => {
        return (
          <ListGroup.Item key={chat.id}>
            {chat?.recipients?.map((recipient) => recipient.name).join(", ")}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
