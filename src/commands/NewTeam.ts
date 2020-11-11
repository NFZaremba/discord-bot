import { Message } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import EmbedTeamMessage from "../EmbedMessage";

export default class NewTeam extends Command {
  public constructor(client: CommandoClient) {
    super(client, {
      name: "new",
      group: "team",
      memberName: "new",
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

    // check
    if (
      global.conquest.teamGold.pinnedMsgId ||
      global.conquest.teamBlue.pinnedMsgId
    ) {
      return message.channel
        .send("You already created new teams")
        .then((msg) => msg.delete({ timeout: 1000 }));
    }

    const groupOneEmbedd: EmbedTeamMessage = new EmbedTeamMessage(
      global.conquest.teamGold
    );
    const groupOneMessage = groupOneEmbedd.createEmbedMessage();

    const groupTwoEmbedd: EmbedTeamMessage = new EmbedTeamMessage(
      global.conquest.teamBlue
    );
    const groupTwoMessage = groupTwoEmbedd.createEmbedMessage();

    // set pinned message id's to global variable
    message.channel.send(groupOneMessage).then((msg) => {
      global.conquest.teamGold.pinnedMsgId = msg.id;
      msg.pin();
    });

    message.channel.send(groupTwoMessage).then((msg) => {
      global.conquest.teamBlue.pinnedMsgId = msg.id;
      msg.pin();
    });

    return null;
  }
}
