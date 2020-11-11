import { EmbedFieldData, MessageEmbed } from "discord.js";
import { TeamConfig } from "./config";
import { OffenseTeam } from "./types";

class EmbedTeamMessage {
  private team: TeamConfig;

  constructor(team: TeamConfig) {
    this.team = team;
  }

  public createEmbedMessage(): MessageEmbed {
    const embedMessage: MessageEmbed = new MessageEmbed()
      .setColor(this.team.embedd.color)
      .setTitle(this.team.embedd.title)
      .setURL("https://discord.js.org/")
      .setAuthor(
        "New Club Conquest",
        "https://i.imgur.com/wSTFkRM.png",
        "https://discord.js.org"
      )
      .setDescription(this.team.embedd.description)
      .setThumbnail("https://i.imgur.com/wSTFkRM.png")
      .addFields(this.createDataFields(this.team.teams))
      .setImage("https://i.imgur.com/wSTFkRM.png")
      .setTimestamp()
      .setFooter(
        `12 ${this.team.embedd.footer}`,
        "https://i.imgur.com/wSTFkRM.png"
      );

    return embedMessage;
  }

  // create array of data fields to display (user teams)
  private createDataFields(updatedGroup: OffenseTeam[]): EmbedFieldData[] {
    return [{ name: "\u200B", value: "\u200B" }, ...updatedGroup];
  }
}

export default EmbedTeamMessage;
