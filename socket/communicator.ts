import Ably from "ably";
import { MessageType } from "~/enums/message-type";
import type { BaseSocketPayload } from "~/models/base-socket-payload";

export default class Communicator {
  private static instance: Communicator;

  ablyClient: Ably.Realtime | null = null;
  channel: Ably.RealtimeChannel | null = null;

  private constructor(apiKey: string) {
    this.ablyClient = new Ably.Realtime(apiKey);

    this.ablyClient.connection.once("connected", () => {
      console.log("Connected to Ably!");
    });

    this.ablyClient.connection.once("closed", () => {
      console.log("Closed the connection to Ably.");
    });
  }

  public static getInstance(apiKey: string): Communicator {
    if (!Communicator.instance) {
      Communicator.instance = new Communicator(apiKey);
    }
    return Communicator.instance;
  }

  /**
   * This method creates a channel with the given name
   * @param channelName - The name of the channel to create
   */
  onCreateChannel(channelName: string): Ably.RealtimeChannel | null {
    if (this.ablyClient) {
      this.channel = this.ablyClient.channels.get(channelName);
      return this.channel;
    }

    return null;

    // Throw an error if the client is not initialized
  }

  onCloseConnection() {
    if (this.ablyClient) {
      this.ablyClient.connection.close();
    }

    // Throw an error if the client is not initialized
  }

  onSendHelloMessage(message: BaseSocketPayload<string>) {
    if (this.channel) {
      this.channel.publish(MessageType.HELLO, message);
    }

    // Throw an error if the channel is not initialized
  }

  // Define the other send methods here with the same structure as onSendHelloMessage
}
