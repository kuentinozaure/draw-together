import Ably from "ably";

export default class Communicator {
  ablyClient: Ably.Realtime | null = null;

  channel: Ably.RealtimeChannel | null = null;

  messages: string[] = [];

  constructor(apiKey: string) {
    // TODO - move the API key to .env
    this.ablyClient = new Ably.Realtime(apiKey);

    // TODO - remove the console.log statements
    this.ablyClient.connection.once("connected", () => {
      console.log("Connected to Ably!");
    });

    this.ablyClient.connection.once("closed", () => {
      console.log("Closed the connection to Ably.");
    });
  }

  onCreateChannel(channelName: string) {
    if (this.ablyClient) {
      this.channel = this.ablyClient.channels.get(channelName);

      this.channel.subscribe((message) => {
        console.log("Message received: " + message);
        this.messages.push(message.data);
      });
    }

    // Throw an error if the client is not initialized
  }

  onCloseConnection() {
    if (this.ablyClient) {
      this.ablyClient.connection.close();
    }

    // Throw an error if the client is not initialized
  }

  onSendMessageToChannel(messageName: string, messageData: string) {
    if (this.channel) {
      this.channel.publish(messageName, messageData);
    }

    // Throw an error if the channel is not initialized
  }

  getMessages() {
    return this.messages.toString();
  }
}
