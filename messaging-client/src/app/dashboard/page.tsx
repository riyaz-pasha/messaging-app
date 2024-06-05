import ChatWindow from "./components/ChatWindow";
import SideBar from "./components/SideBar";
import { useSelectedChatContext } from "./contexts/SelectedChatContext";

export default function Dashboard({ id }) {
  const { selectedChat } = useSelectedChatContext();
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <SideBar id={id} />
      {selectedChat && <ChatWindow selectedChat={selectedChat} />}
    </div>
  );
}
