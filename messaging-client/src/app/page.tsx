"use client";

import { ChatsProvider } from "./dashboard/contexts/ChatsContext";
import { ContactsProvider } from "./dashboard/contexts/ContactsContext";
import { SelectedChatProvider } from "./dashboard/contexts/SelectedChatContext";
import Dashboard from "./dashboard/page";
import useLocalStorage from "./hooks/useLocalStorage";
import Login from "./login/page";

export default function Home() {
  const [id, setId] = useLocalStorage("id", "");

  if (!id) {
    return <Login onIdSubmit={setId} />;
  }

  return (
    <ContactsProvider>
      <ChatsProvider>
        <SelectedChatProvider>
          <Dashboard id={id} />
        </SelectedChatProvider>
      </ChatsProvider>
    </ContactsProvider>
  );
}
