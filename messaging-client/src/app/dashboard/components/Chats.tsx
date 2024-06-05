import { ListGroup } from "react-bootstrap";
import { useChatsContext } from "../contexts/ChatsContext";
import { useSelectedChatContext } from "../contexts/SelectedChatContext";

export default function Chats() {
  const { chats } = useChatsContext();
  const { selectedChatId, selectChat } = useSelectedChatContext();

  return (
    <ListGroup variant="flush">
      {chats?.map((chat) => {
        return (
          <ListGroup.Item
            key={chat.id}
            onClick={() =>
              selectChat(selectedChatId === chat.id ? null : chat.id)
            }
            active={chat.id === selectedChatId}
            action
          >
            {chat?.recipients?.map((recipient) => recipient.name).join(", ")}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
