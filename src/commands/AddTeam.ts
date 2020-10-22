import { Message, MessageEmbed, Role } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import { groupOne, groupTwo, groupCommon } from "../config";
import iterateTeams from "../helpers/iterateTeams";
import parseTeams from "../helpers/parseTeams";
import { UserTeams } from "../types";

export default class AddTeam extends Command {
  private groupOne: UserTeams[];
  private groupTwo: UserTeams[];
  public constructor(client: CommandoClient) {
    super(client, {
      name: "add_team",
      group: "team",
      memberName: "add_team",
      description: "Add team to group team",
      argsType: "multiple",
    });

    this.groupOne = global.groupOne;
    this.groupTwo = global.groupTwo;
  }

  public async run(
    message: CommandoMessage,
    args: string[]
  ): Promise<Message | Message[] | null> {
    // delete command message
    message.delete();

    // check team
    const isGroupOne: Role | undefined = message.member.roles.cache.find(
      (r) => r.name.toLowerCase().includes("gold") || false
    );

    // set team
    const teamGroup = isGroupOne ? this.groupOne : this.groupTwo;

    // check if user already registered team
    if (teamGroup.find((team) => team.name.includes(message.author.username))) {
      return message.channel
        .send("You already registered teams. Please use update command.")
        .then((msg) => msg.delete({ timeout: 2000 }));
    }

    const payload: UserTeams[] = [
      ...teamGroup,
      {
        id: message.author.id,
        name: message.author.username,
        value: parseTeams(args),
      },
    ];
    console.log(payload);

    // update global state
    if (isGroupOne) {
      global.groupOne = payload;
    } else {
      global.groupTwo = payload;
    }

    const newEmbed: MessageEmbed = new MessageEmbed()
      .setColor(`${isGroupOne ? groupOne.color : groupTwo.color}`)
      .setTitle(`${isGroupOne ? groupOne.title : groupTwo.title}`)
      .setURL("https://discord.js.org/")
      .setAuthor(
        "New Club Conquest",
        "https://i.imgur.com/wSTFkRM.png",
        "https://discord.js.org"
      )
      .setDescription(groupCommon.description)
      .setThumbnail("https://i.imgur.com/wSTFkRM.png")
      .addFields(iterateTeams(isGroupOne ? global.groupOne : global.groupTwo))
      .setImage("https://i.imgur.com/wSTFkRM.png")
      .setTimestamp()
      .setFooter(`12 ${groupCommon.footer}`, "https://i.imgur.com/wSTFkRM.png");

    const fetched = await message.channel.messages.fetch(
      `${isGroupOne ? global.groupOneMsgId : global.groupTwoMsgId}`
    );
    fetched.edit(newEmbed);
    return null;
  }
}
