import { EmbedFieldData, MessageEmbed } from "discord.js";
import { CCGroupConfig } from "./config";
import { UserTeams } from "./types";

class EmbedMessage {
  private groupConfig: CCGroupConfig;
  //   private userGroup: UserTeams[];

  constructor(groupConfig: CCGroupConfig) {
    this.groupConfig = groupConfig;
    // this.userGroup = userGroup;
  }

  public createEmbedMessage(updatedGroup: UserTeams[]): MessageEmbed {
    const embedMessage: MessageEmbed = new MessageEmbed()
      .setColor(this.groupConfig.color)
      .setTitle(this.groupConfig.title)
      .setURL("https://discord.js.org/")
      .setAuthor(
        "New Club Conquest",
        "https://i.imgur.com/wSTFkRM.png",
        "https://discord.js.org"
      )
      .setDescription(this.groupConfig.description)
      .setThumbnail("https://i.imgur.com/wSTFkRM.png")
      .addFields(this.createDataFields(updatedGroup))
      .setImage("https://i.imgur.com/wSTFkRM.png")
      .setTimestamp()
      .setFooter(
        `12 ${this.groupConfig.footer}`,
        "https://i.imgur.com/wSTFkRM.png"
      );

    return embedMessage;
  }

  // create array of data fields to display (user teams)
  private createDataFields(updatedGroup: UserTeams[]): EmbedFieldData[] {
    // const teams = updatedGroup.map(
    //   (team: UserTeams): EmbedFieldData => {
    //     return {
    //       name: team.name,
    //       value: team.value,
    //     };
    //   }
    // );
    return [{ name: "\u200B", value: "\u200B" }, ...updatedGroup];
  }
}

export default EmbedMessage;
