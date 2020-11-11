import { Message, MessageEmbed, Role } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import { teamGoldConfig, teamBlueConfig, teamCommonConfig } from "../config";
import iterateTeams from "../helpers/iterateTeams";
import parseTeams from "../helpers/parseTeams";
import { OffenseTeam } from "../types";

export default class UpdateTeam extends Command {
  public constructor(client: CommandoClient) {
    super(client, {
      name: "update",
      group: "team",
      memberName: "update",
      description: "Update team",
      argsType: "multiple",
    });
  }

  public async run(
    message: CommandoMessage,
    args: string[]
  ): Promise<Message | Message[] | null> {
    // delete command message
    message.delete();

    // check team
    const isGroupOne: Role | undefined = message.member.roles.cache.find((r) =>
      r.name.toLowerCase().includes("gold")
    );

    // set team
    const teamGroup = isGroupOne ? global.teamGold : global.teamBlue;

    // check if user already registered team
    if (
      teamGroup.find((team) => team.userName.includes(message.author.username))
    ) {
      return message.channel
        .send("You already registered teams")
        .then((msg) => msg.delete({ timeout: 1000 }));
    }

    const payload: OffenseTeam[] = [
      ...teamGroup,
      {
        id: message.author.id,
        userName: message.author.username,
        teams: parseTeams(args),
      },
    ];

    // update global state
    if (isGroupOne) {
      global.teamGold = payload;
    } else {
      global.teamBlue = payload;
    }

    const newEmbed: MessageEmbed = new MessageEmbed()
      .setColor(`${isGroupOne ? teamGoldConfig.color : teamBlueConfig.color}`)
      .setTitle(`${isGroupOne ? teamGoldConfig.title : teamBlueConfig.title}`)
      .setURL("https://discord.js.org/")
      .setAuthor(
        "New Club Conquest",
        "https://i.imgur.com/wSTFkRM.png",
        "https://discord.js.org"
      )
      .setDescription(teamCommonConfig.description)
      .setThumbnail("https://i.imgur.com/wSTFkRM.png")
      .addFields(iterateTeams(isGroupOne ? global.teamGold : global.teamBlue))
      .setImage("https://i.imgur.com/wSTFkRM.png")
      .setTimestamp()
      .setFooter(
        `12 ${teamCommonConfig.footer}`,
        "https://i.imgur.com/wSTFkRM.png"
      );

    const fetched = await message.channel.messages.fetch(
      `${isGroupOne ? global.teamGoldMsgId : global.teamBlueMsgId}`
    );
    fetched.edit(newEmbed);

    return null;
  }
}
