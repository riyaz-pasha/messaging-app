"use client";

import Login from "./login/page";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./dashboard/page";
import { ContactsProvider } from "./dashboard/contexts/ContactsContext";

export default function Home() {
  const [id, setId] = useLocalStorage("id", "");

  if (!id) {
    return <Login onIdSubmit={setId} />;
  }

  return (
    <ContactsProvider>
      <Dashboard id={id} />
    </ContactsProvider>
  );
}
