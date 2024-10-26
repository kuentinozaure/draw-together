import type { MessageType } from "~/enums/message-type";

export interface BaseSocketPayload<T> {
  date: Date;
  roomId: string;
  message: T;
}
