import { api, StreamInOut } from "encore.dev/api";
import { Message } from "./message.interface";
import log from "encore.dev/log";

// Map to hold all connected streams
const connectedStreams: Map<
  string,
  StreamInOut<Message, Message>
> = new Map();

// Object sent from the client to the server when establishing a connection
interface HandshakeRequest {
  id: string;
}

export const chat = api.streamInOut<HandshakeRequest, Message, Message>(
  { expose: true, auth: false, path: "/chat" },
  async (handshake, stream) => {
    connectedStreams.set(handshake.id, stream);

    try {
      // The stream object is an AsyncIterator that yields incoming messages.
      // The loop will continue as long as the client keeps the connection open.
      for await (const chatMessage of stream) {
        for (const [key, val] of connectedStreams) {
          try {
            // Send the users message to all connected clients.
            log.trace("Incoming:", chatMessage);
            await val.send(chatMessage);
          } catch (err) {
            // If there is an error sending the message, remove the client from the map.
            connectedStreams.delete(key);
          }
        }
      }
    } catch (err) {
      // If there is an error reading from the stream, remove the client from the map.
      connectedStreams.delete(handshake.id);
    }

    // When the client disconnects, remove them from the map.
    connectedStreams.delete(handshake.id);
  },
);
