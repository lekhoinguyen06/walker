import { api, StreamInOut } from "encore.dev/api";
import { Message } from "./message.interface";
import log from "encore.dev/log";
import claude from "./claude";

const connectedStreams: Map<
  string,
  StreamInOut<Message, Message>
> = new Map();

interface HandshakeRequest {
  id: string;
}

export const chat = api.streamInOut<HandshakeRequest, Message, Message>(
  { expose: true, auth: false, path: "/chat" },
  async (handshake, stream) => {
    connectedStreams.set(handshake.id, stream);

    log.info("Stream connected:", stream);
    try {
      // The stream object is an AsyncIterator that yields incoming messages.
      // The loop will continue as long as the client keeps the connection open.
      for await (const chatMessage of stream) {
        for (const [key, val] of connectedStreams) {
          try {
            const res = await claude.invoke(chatMessage.content);
            await val.send({ ...chatMessage, sender: "assistant", content: res.content.toString(), timestamp: new Date() });
          } catch (err) {
            connectedStreams.delete(key);
          }
        }
      }
    } catch (err) {
      connectedStreams.delete(handshake.id);
    }
    connectedStreams.delete(handshake.id);
  },
);
