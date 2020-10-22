import { Message } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";

export default class Kick extends Command {
  public constructor(client: CommandoClient) {
    super(client, {
      name: "kick",
      group: "mod",
      memberName: "kick",
      description: "Kicks a user from the guild",
      userPermissions: ["KICK_MEMBERS"],
      clientPermissions: ["KICK_MEMBERS"],
      argsType: "single",
    });
  }

  public async run(
    commandMsg: CommandoMessage,
    userId: string
  ): Promise<Message | Message> {
    const guild = commandMsg.guild;
    const member = await guild.members.cache.get(userId);
    console.log(member);

    // logic to kick member
    return commandMsg.channel.send(`${member?.user.username} was kicked!`);
  }
}
