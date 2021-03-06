import { Message } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";

/*
  Prune Messages

  This command will delete all or a specified number of messages
  it will not however delete any pinned messages
*/
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
    // global.groupOne = [];
    // global.groupTwo = [];
    global.teamGoldMsgId = null;
    global.teamBlueMsgId = null;
  }

  public async run(
    message: CommandoMessage,
    args: string
  ): Promise<Message | Message[] | null> {
    message.delete();

    if (message.channel.type === "dm") return null;

    // fetch messages
    const fetched = await message.channel.messages.fetch({
      limit: parseInt(args) || 100,
    });

    // filter out pinned messages
    const notPinned = fetched.filter((msg) => !msg.pinned);

    return message.channel
      .bulkDelete(notPinned)
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
