import useLocalStorage from "@/app/hooks/useLocalStorage";
import { createContext, useContext } from "react";
import { IChat } from "./ChatsContext";

export type SelectedChatContextType = {
  selectedChat: IChat | null;
  selectChat: (chat: IChat) => void;
};

const SelectedChatContext = createContext<SelectedChatContextType>(
  {} as SelectedChatContextType
);

export function useSelectedChatContext() {
  return useContext(SelectedChatContext);
}

export const SelectedChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useLocalStorage<IChat | null>(
    "selectedChat",
    null
  );

  function selectChat(chat: IChat) {
    setSelectedChat(chat);
  }

  return (
    <SelectedChatContext.Provider value={{ selectedChat, selectChat }}>
      {children}
    </SelectedChatContext.Provider>
  );
};
