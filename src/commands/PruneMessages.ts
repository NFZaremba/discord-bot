import { Message } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";

export default class PruneMessages extends Command {
  public constructor(client: CommandoClient) {
    super(client, {
      name: "prune",
      group: "mod",
      memberName: "prune",
      description: "prune messages in channel",
      argsType: "single",
    });
  }

  public clear() {
    // clear
    global.groupOne = [];
    global.groupTwo = [];
    global.groupOneMsgId = null;
    global.groupTwoMsgId = null;
  }

  public async run(
    message: CommandoMessage,
    args: string
  ): Promise<Message | Message[] | null> {
    message.delete();

    if (message.channel.type === "dm") return null;

    const fetched = await message.channel.messages.fetch({
      limit: parseInt(args) || 100,
    });

    return message.channel
      .bulkDelete(fetched)
      .then((messages) => {
        // clear
        this.clear();

        return message.channel
          .send(`Deleted ${messages.size} messages`)
          .then((msg) => msg.delete({ timeout: 1000 }));
      })
      .catch((error) => {
        console.log(error);
        return message.channel.send(`Failed to deleted messages`);
      });
  }
}
