import { useState } from "react";
import {
  Button,
  Card,
  Modal,
  Nav,
  NavItem,
  NavLink,
  TabContainer,
  TabContent,
  TabPane,
} from "react-bootstrap";
import Chats from "./Chats";
import Contacts from "./Contacts";
import NewChatModal from "./NewChatModal";
import NewContactModal from "./NewContactModal";

const Tabs = {
  Chats: "Chats",
  Contacts: "Contacts",
};

export default function SideBar({ id }) {
  const [activeTab, setActiveTab] = useState(Tabs.Chats);
  const [modelOpen, setModelOpen] = useState(false);
  const chatsOpen = activeTab === Tabs.Chats;

  function closeModal() {
    setModelOpen(false);
  }

  return (
    <div className="d-flex flex-column ps-4 pb-4">
      <TabContainer activeKey={activeTab} onSelect={setActiveTab}>
        <Nav variant="tabs" className="justify-content-center">
          <NavItem>
            <NavLink eventKey={Tabs.Chats}>{Tabs.Chats}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey={Tabs.Contacts}>{Tabs.Contacts}</NavLink>
          </NavItem>
        </Nav>
        <TabContent className="border overflow-auto flex-grow-1">
          <TabPane eventKey={Tabs.Chats}>
            <Chats />
          </TabPane>
          <TabPane eventKey={Tabs.Contacts}>
            <Contacts />
          </TabPane>
        </TabContent>
        <Card className="mt-4">
          <Card.Body>
            <Card.Text>
              Your Id
              <span className="text-muted"> {id}</span>
            </Card.Text>
            <Button onClick={() => setModelOpen(true)}>
              New {chatsOpen ? "Chat" : "Contact"}
            </Button>
          </Card.Body>
        </Card>
      </TabContainer>

      <Modal show={modelOpen} onHide={closeModal}>
        {chatsOpen ? (
          <NewChatModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
