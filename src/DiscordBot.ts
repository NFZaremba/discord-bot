import { Client, Message } from "discord.js";

export class DiscordBot {
  private static instance: DiscordBot;

  private client: Client = new Client();

  private constructor() {
    this.initializeClient();
  }

  static getInstance(): DiscordBot {
    if (!DiscordBot.instance) {
      DiscordBot.instance = new DiscordBot();
    }

    return DiscordBot.instance;
  }

  async connect(): Promise<void> {
    try {
      const res = this.client.login(process.env.DISCORD_TOKEN);
      if (res) {
        console.log("Connected to Discord");
      }
    } catch (err) {
      console.error(`Could not connect. Error: ${err.message}`);
    }
  }

  private initializeClient(): void {
    if (!this.client) return;

    this.setReadyHandler();
    this.setMessageHandler();
  }

  private setReadyHandler(): void {
    this.client.on("ready", () => {
      console.log(`Logged in as ${this.client?.user?.tag}!`);
    });
  }

  private setMessageHandler(): void {
    this.client.on("message", async (message: Message) => {
      if (message.author.bot) return;

      if (message.content === "ping") {
        await message.reply("Pong!");
      }
    });
  }
}
