import { Message } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import { teamBlue, teamGold } from "../__mock__/defaultTeams";

/*
  Reset Teams

  This command will reset the teams to default values and delete all messages inlcuding pinned messages
*/
export default class ResetTeams extends Command {
  public constructor(client: CommandoClient) {
    super(client, {
      name: "reset",
      group: "mod",
      memberName: "reset",
      description: "reset teams and deletes all messages in channel",
      argsType: "single",
    });
  }

  public clear() {
    // clear
    global.teamGold.teams = teamGold;
    global.teamBlue.teams = teamBlue;
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
