import { Message, MessageEmbed } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import { groupOne, groupTwo, groupCommon } from "../config";

export default class NewTeam extends Command {
  public constructor(client: CommandoClient) {
    super(client, {
      name: "new_team",
      group: "team",
      memberName: "new_team",
      description: "Create a new groups for CC",
      userPermissions: ["KICK_MEMBERS"],
      clientPermissions: ["KICK_MEMBERS"],
      argsType: "single",
    });
  }

  public async run(
    message: CommandoMessage
  ): Promise<Message | Message[] | null> {
    // delete command message
    message.delete();

    if (global.groupOneMsgId || global.groupTwoMsgId) {
      return message.channel
        .send("You already created new teams")
        .then((msg) => msg.delete({ timeout: 1000 }));
    }

    const teamEmbedA: MessageEmbed = new MessageEmbed()
      .setColor(groupOne.color)
      .setTitle(groupOne.title)
      .setURL("https://discord.js.org/")
      .setAuthor(
        "New Club Conquest",
        "https://i.imgur.com/wSTFkRM.png",
        "https://discord.js.org"
      )
      .setDescription(groupCommon.description)
      .setThumbnail("https://i.imgur.com/wSTFkRM.png")
      .addFields([
        { name: "\u200B", value: "\u200B" },
        { name: "Bob", value: "Line1\nLine2\nLine3" },
        { name: "Ricky", value: "Line1\nLine2\nLine3" },
        { name: "Lars", value: "Line1\nLine2\nLine3" },
      ])
      .setImage("https://i.imgur.com/wSTFkRM.png")
      .setTimestamp()
      .setFooter(`12 ${groupCommon.footer}`, "https://i.imgur.com/wSTFkRM.png");

    const teamEmbedB: MessageEmbed = new MessageEmbed()
      .setColor(groupTwo.color)
      .setTitle(groupTwo.title)
      .setURL("https://discord.js.org/")
      .setAuthor(
        "New Club Conquest",
        "https://i.imgur.com/wSTFkRM.png",
        "https://discord.js.org"
      )
      .setDescription(groupCommon.description)
      .setThumbnail("https://i.imgur.com/wSTFkRM.png")
      .addFields([
        { name: "\u200B", value: "\u200B" },
        { name: "Bob", value: "Line1\nLine2\nLine3" },
        { name: "Ricky", value: "Line1\nLine2\nLine3" },
        { name: "Lars", value: "Line1\nLine2\nLine3" },
      ])
      .setImage("https://i.imgur.com/wSTFkRM.png")
      .setTimestamp()
      .setFooter(`7 ${groupCommon.footer}`, "https://i.imgur.com/wSTFkRM.png");

    // set pinned message id's to global variable
    message.channel.send(teamEmbedA).then((msg) => {
      global.groupOneMsgId = msg.id;
      msg.pin();
    });

    message.channel.send(teamEmbedB).then((msg) => {
      global.groupTwoMsgId = msg.id;
      msg.pin();
    });

    return null;
  }
}
