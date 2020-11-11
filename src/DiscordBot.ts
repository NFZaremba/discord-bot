import { CommandoClient } from "discord.js-commando";
import path from "path";
import { teamBlueConfig, teamGoldConfig } from "./config";

// set global variables
// use database in the future
// global.teamGold = teamGoldConfig;
// global.teamBlue = teamBlueConfig;
// global.teamGoldMsgId = null;
// global.teamBlueMsgId = null;

global.conquest = {
  teamGold: teamGoldConfig,
  teamBlue: teamBlueConfig,
};

export class DiscordBot {
  private static instance: DiscordBot;
  private readonly token: string = process.env.DISCORD_TOKEN as string;
  private readonly prefix: string = process.env.prefix as string;
  private client: CommandoClient = new CommandoClient({
    owner: "696291949958922311",
    commandPrefix: this.prefix,
  });

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
      await this.client.login(this.token);
      console.log("Connected to Discord");
    } catch (err) {
      console.error(`Could not connect. Error: ${err.message}`);
    }
  }

  private initializeClient(): void {
    if (!this.client) return;

    this.registerCommands();
    this.setReadyHandler();
    //this.setMessageHandler();
  }

  private setReadyHandler(): void {
    this.client.on("ready", () => {
      console.log(`Logged in as ${this.client?.user?.tag}!`);
    });
  }

  //   private setMessageHandler(): void {
  //     this.client.on("message", async (message: CommandMessage) => {
  //       // filters out requests from bots and other prefixes
  //       if (!message.content.startsWith(this.prefix) || message.author.bot)
  //         return;
  //       let args = message.content.slice(this.prefix?.length).trim().split(" ");
  //       switch (args[0]) {
  //         case "hello":
  //           message.channel.send("Hello friend!");
  //           break;
  //         default:
  //           return null;
  //       }
  //     });
  //   }

  private registerCommands(): void {
    console.log(path.join(__dirname, "commands"));
    this.client.registry
      // Registers your custom command groups
      .registerGroups([
        ["mod", "mod commands"],
        ["misc", "misc commands"],
        ["team", "team commands"],
      ])
      // Registers all built-in groups, commands, and argument types
      .registerDefaults()
      // Registers all of your commands in the ./commands/ directory
      .registerCommandsIn(path.join(__dirname, "commands"));

    console.log("Registered commands");
  }
}
