import useLocalStorage from "@/app/hooks/useLocalStorage";
import { createContext, useContext } from "react";
import { ChatId, IChatWithContact, useChatsContext } from "./ChatsContext";

export type SelectedChatContextType = {
  selectedChat: IChatWithContact | null;
  selectChat: (chatId: ChatId | null) => void;
};

const SelectedChatContext = createContext<SelectedChatContextType>(
  {} as SelectedChatContextType
);

export function useSelectedChatContext() {
  return useContext(SelectedChatContext);
}

export const SelectedChatProvider = ({ children }) => {
  const { chats } = useChatsContext();
  const [selectedChatId, setSelectedChatId] = useLocalStorage<ChatId | null>(
    "selectedChatId",
    null
  );

  const selectedChat =
    (selectedChatId && chats.find((chat) => chat.id === selectedChatId)) ||
    null;

  function selectChat(chatId: ChatId | null) {
    setSelectedChatId(chatId);
  }

  return (
    <SelectedChatContext.Provider value={{ selectedChat, selectChat }}>
      {children}
    </SelectedChatContext.Provider>
  );
};
