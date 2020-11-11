import { TeamConfig, teamGoldConfig, teamBlueConfig } from "../config";
import { CommandoMessage } from "discord.js-commando";

// This class will handle all operations for managing teams
// ex. parsing, fetching, setting tea, etc.
export default class TeamManager {
  private message: CommandoMessage;
  private messageArgs: string[] | undefined;
  private groupOneConfig: TeamConfig;
  private groupTwoConfig: TeamConfig;

  // pass message object when initializing
  constructor(message: CommandoMessage, args?: string[]) {
    this.message = message;
    this.messageArgs = args;
    this.groupOneConfig = teamGoldConfig;
    this.groupTwoConfig = teamBlueConfig;
  }

  public UpdateTeam() {}
}
