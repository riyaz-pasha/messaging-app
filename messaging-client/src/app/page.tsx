"use client";

import { ChatsProvider } from "./dashboard/contexts/ChatsContext";
import { ContactsProvider } from "./dashboard/contexts/ContactsContext";
import { SelectedChatProvider } from "./dashboard/contexts/SelectedChatContext";
import { SocketProvider } from "./dashboard/contexts/SocketProvider";
import Dashboard from "./dashboard/page";
import useLocalStorage from "./hooks/useLocalStorage";
import Login from "./login/page";

export default function Home() {
  const [id, setId] = useLocalStorage("id", "");

  if (!id) {
    return <Login onIdSubmit={setId} />;
  }

  return (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ChatsProvider id={id}>
          <SelectedChatProvider>
            <Dashboard id={id} />
          </SelectedChatProvider>
        </ChatsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
}
