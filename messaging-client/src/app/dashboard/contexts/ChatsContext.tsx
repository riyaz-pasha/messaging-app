import useLocalStorage from "@/app/hooks/useLocalStorage";
import { createContext, useCallback, useContext, useEffect } from "react";
import { ContactId, IContact, useContactsContext } from "./ContactsContext";
import {
  EventTypes,
  ReceiveMessageRequestBody,
  useSocket,
} from "./SocketProvider";

export type ChatId = string;

export interface Message {
  text: string;
  senderId: ContactId;
}
export interface MessageWithContact {
  text: string;
  sender: IContact & { fromMe: boolean };
}

export interface IChat {
  id: ChatId;
  recipientIds: ContactId[];
  messages: Message[];
}

export interface IChatWithContact {
  id: ChatId;
  recipients: IContact[];
  messages: MessageWithContact[];
}

export type ChatContextType = {
  chats: IChatWithContact[];
  createChat: (contact: IChat) => void;
  sendMessage: (chatId: ChatId, text: string) => void;
};

const ChatsContext = createContext<ChatContextType>({} as ChatContextType);

export function useChatsContext() {
  return useContext(ChatsContext);
}

export const ChatsProvider = ({ id, children }) => {
  const [chats, setChats] = useLocalStorage<IChat[]>("chats", []);
  const { contacts } = useContactsContext();
  const socket = useSocket();

  const chatsWithContactsInfo = chats.map((chat) => {
    const recipients = chat.recipientIds.map((recipientId) => {
      const contact = contacts.find((contact) => contact.id === recipientId)!;
      return {
        ...contact,
        name: contact?.name || recipientId,
      } satisfies IContact as IContact;
    });

    const messages = chat.messages.map((message) => {
      const contact = contacts.find(
        (contact) => contact.id === message.senderId
      )!;
      return {
        ...message,
        sender: { ...contact, fromMe: id === message.senderId },
      } satisfies MessageWithContact as MessageWithContact;
    });

    return {
      ...chat,
      recipients,
      messages,
    } satisfies IChatWithContact as IChatWithContact;
  });

  function createChat(contact: IChat) {
    setChats([...chats, contact]);
  }

  function addMessageToTheChat(
    chatId: ChatId,
    text: string,
    senderId: ContactId
  ) {
    const updatedChats = chats.map((chat) => {
      if (chat.id !== chatId) return chat;
      socket?.emit(EventTypes.SEND_MESSAGE, {
        chatId,
        recipientIds: chat.recipientIds,
        text,
      });
      const updatedChat = {
        ...chat,
        messages: [...chat.messages, { text: text, senderId: senderId }],
      } satisfies IChat as IChat;
      return updatedChat;
    });
    setChats(updatedChats);
  }

  function sendMessage(chatId: ChatId, text: string) {
    addMessageToTheChat(chatId, text, id);
  }

  const addReceivedMessageToTheChat = useCallback(
    ({ chatId, recipientIds, text, senderId }: ReceiveMessageRequestBody) => {
      const chat = chats.find((chat) => chat.id === chatId);
      if (!chat) {
        setChats([
          ...chats,
          { id: chatId, recipientIds, messages: [{ text, senderId }] },
        ]);
      } else {
        const updatedChats = chats.map((chat) => {
          if (chat.id !== chatId) return chat;
          const updatedChat = {
            ...chat,
            messages: [...chat.messages, { text: text, senderId: senderId }],
          } satisfies IChat as IChat;
          return updatedChat;
        });
        setChats(updatedChats);
      }
    },
    [chats, setChats]
  );

  useEffect(() => {
    if (!socket) return;
    socket.on(EventTypes.RECEIVE_MESSAGE, addReceivedMessageToTheChat);

    return () => {
      socket.off(EventTypes.RECEIVE_MESSAGE);
    };
  }, [socket, addReceivedMessageToTheChat]);

  return (
    <ChatsContext.Provider
      value={{ chats: chatsWithContactsInfo, createChat, sendMessage }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
