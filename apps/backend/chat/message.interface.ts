export interface Message {
  sender: "user" | "assistant";
  content: string;
}

export interface InMessage extends Omit<Message, "timestamp"> { sender: "user"; };

export interface OutMessage extends Message {};