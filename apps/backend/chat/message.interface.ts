export interface Message {
  id: string;
  userId: number;
  userName: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface InMessage extends Omit<Message, "timestamp"> { sender: "user"; };

export interface OutMessage extends Message {};