import useLocalStorage from "@/app/hooks/useLocalStorage";
import { createContext, useContext } from "react";

export interface IContact {
  id: string;
  name: string;
}

export type ContactContextType = {
  contacts: IContact[];
  createContact: (contact: IContact) => void;
};

const ContactsContext = createContext<ContactContextType>({
  contacts: [],
} as unknown as ContactContextType);

export function useContactsContext() {
  return useContext(ContactsContext);
}

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage<IContact[]>("contacts", []);

  function createContact(contact: IContact) {
    setContacts([...contacts, contact]);
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
};
