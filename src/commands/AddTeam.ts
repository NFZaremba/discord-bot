import { Message, Role } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import { TeamConfig } from "../config";
import EmbedTeamMessage from "../EmbedMessage";
import parseTeams from "../helpers/parseTeams";
import TeamUtils from "../helpers/teamUtils";
import { OffenseTeam } from "../types";

export default class AddTeam extends Command {
  public constructor(client: CommandoClient) {
    super(client, {
      name: "add",
      group: "team",
      memberName: "add",
      description: "Add team to group team",
      argsType: "multiple",
    });
  }

  public async run(
    message: CommandoMessage,
    args: string[]
  ): Promise<Message | Message[] | null> {
    // delete command message
    message.delete();
    const teamUtils = new TeamUtils();

    const userTeam: string = teamUtils.getUserTeam(message);
    const isGroupOne = teamUtils.getUserTeam(message);

    // check if user already registered team
    if (
      global.conquest[userTeam].teams.find((team: OffenseTeam) =>
        team.name.includes(message.author.username)
      )
    ) {
      return message.channel
        .send("You already registered teams. Please use update command.")
        .then((msg) => msg.delete({ timeout: 2000 }));
    }

    // ***Use TeamManager class to update team
    const updatedTeams: OffenseTeam[] = [
      ...global.conquest[userTeam].teams,
      {
        id: message.author.id,
        name: message.author.username,
        value: teamUtils.parseTeams(args),
      },
    ];

    // update global state
    global.conquest[userTeam].teams = updatedTeams;

    // check if global updated

    const groupEmbedd = new EmbedTeamMessage(global.conquest[userTeam]);
    const embeddMessage = groupEmbedd.createEmbedMessage();

    const fetched = await message.channel.messages.fetch(
      `${
        isGroupOne
          ? global.conquest.teamGold.pinnedMsgId
          : global.conquest.teamBlue.pinnedMsgId
      }`
    );

    // update embedd team message with latest data
    fetched.edit(embeddMessage);

    return null;
  }
}
