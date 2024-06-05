import useLocalStorage from "@/app/hooks/useLocalStorage";
import { createContext, useContext } from "react";
import { IContact } from "./ContactsContext";

export interface IChat {
  id: string;
  recipients: IContact[];
  messages: string[];
}

export type ChatContextType = {
  chats: IChat[];
  createChat: (contact: IChat) => void;
};

const ChatsContext = createContext<ChatContextType>({} as ChatContextType);

export function useChatsContext() {
  return useContext(ChatsContext);
}

export const ChatsProvider = ({ children }) => {
  const [chats, setChats] = useLocalStorage<IChat[]>("chats", []);

  function createChat(contact: IChat) {
    setChats([...chats, contact]);
  }

  return (
    <ChatsContext.Provider value={{ chats, createChat }}>
      {children}
    </ChatsContext.Provider>
  );
};
