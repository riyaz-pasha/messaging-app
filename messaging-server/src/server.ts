import { Server } from "socket.io";

enum EventTypes {
    SEND_MESSAGE = "send-message",
    RECEIVE_MESSAGE = "receive-message",
}

type ContactId = string;

type SendMessageRequestBody = {
    chatId: string;
    recipientIds: ContactId[];
    text: string;
}

export type ReceiveMessageRequestBody = {
    chatId: string;
    recipientIds: ContactId[];
    text: string;
    senderId: ContactId;
};
interface ServerToClientEvents {
    [EventTypes.RECEIVE_MESSAGE]: (receiveMessageRequestBody: ReceiveMessageRequestBody) => void;
}

interface ClientToServerEvents {
    [EventTypes.SEND_MESSAGE]: (sendMessageRequestBody: SendMessageRequestBody) => void;
}

interface InterServerEvents {
}

interface SocketData {
}

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>({
    cors: {
        origin: "http://localhost:3000"
    }
});
io.listen(5050);

io.on("connection", socket => {
    const id = socket.handshake.query.id;

    if (Array.isArray(id) || typeof id !== 'string') {
        console.error("Invalid ID");
        return new Error("Invalid ID");
    }

    socket.join(id);

    socket.on(EventTypes.SEND_MESSAGE, ({ chatId, recipientIds, text }) => {
        recipientIds.forEach(recipientId => {
            const newRecipients: ContactId[] = recipientIds.filter(rId => rId !== recipientId);
            newRecipients.push(id);

            socket.broadcast.to(recipientId).emit(EventTypes.RECEIVE_MESSAGE, {
                chatId,
                recipientIds: newRecipients,
                text: text,
                senderId: id,
            })
        })
    })
});
