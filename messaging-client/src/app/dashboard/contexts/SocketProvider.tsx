import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { ContactId } from "./ContactsContext";

export enum EventTypes {
  SEND_MESSAGE = "send-message",
  RECEIVE_MESSAGE = "receive-message",
}

type SendMessageRequestBody = {
  chatId: string;
  recipientIds: ContactId[];
  text: string;
};

export type ReceiveMessageRequestBody = {
  chatId: string;
  recipientIds: ContactId[];
  text: string;
  senderId: ContactId;
};

interface ServerToClientEvents {
  [EventTypes.RECEIVE_MESSAGE]: (
    receiveMessageRequestBody: ReceiveMessageRequestBody
  ) => void;
}

interface ClientToServerEvents {
  [EventTypes.SEND_MESSAGE]: (
    sendMessageRequestBody: SendMessageRequestBody
  ) => void;
}

const SocketContext = createContext<
  Socket<ServerToClientEvents, ClientToServerEvents> | undefined
>(undefined);

export function useSocket() {
  return useContext(SocketContext);
}

export const SocketProvider = ({
  id,
  children,
}: {
  id: string;
  children: any;
}) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      "http://localhost:5050",
      { query: { id } }
    );
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
