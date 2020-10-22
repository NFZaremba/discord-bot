import { Message, Role } from "discord.js";
import { CCGroupConfig, groupOne, groupTwo } from "./config";
import { UserTeams } from "./types";
import parseTeams from "./helpers/parseTeams";
import EmbedMessage from "./EmbedMessage";

// This class will handle all operations for managing teams
// ex. parsing, fetching, setting tea, etc.
export default class TeamManager {
  private message: Message;
  private messageArgs: string[];
  private userGroup: UserTeams[];
  private groupOneConfig: CCGroupConfig;
  private groupTwoConfig: CCGroupConfig;

  // pass message object when initializing
  constructor(message: Message, args: string[]) {
    this.message = message;
    this.messageArgs = args;
    this.userGroup = this.setUserGroup();
    this.groupOneConfig = groupOne;
    this.groupTwoConfig = groupTwo;
  }

  public newTeam() {
    if (global.groupOneMsgId || global.groupTwoMsgId) {
      return this.message.channel
        .send("You already created new teams")
        .then((msg) => msg.delete({ timeout: 1000 }));
    }

    const groupOneEmbedd = new EmbedMessage(this.groupOneConfig);
    const groupTwoEmbedd = new EmbedMessage(this.groupTwoConfig);

    // set pinned message id's to global variable
    this.message.channel.send(groupOneEmbedd).then((msg) => {
      global.groupOneMsgId = msg.id;
      msg.pin();
    });

    this.message.channel.send(groupTwoEmbedd).then((msg) => {
      global.groupTwoMsgId = msg.id;
      msg.pin();
    });
  }

  /*
    Adds user team to the CC group affiliated with their role
  */
  public addTeam() {
    console.log(this.userGroup);

    if (
      this.userGroup.find((team) =>
        team.name.includes(this.message.author.username)
      )
    ) {
      return this.message.channel
        .send("You already registered teams. Please use update command.")
        .then((msg) => msg.delete({ timeout: 2000 }));
    }

    const updatedGroup: UserTeams[] = [
      ...this.userGroup,
      {
        id: this.message.author.id,
        name: this.message.author.username,
        value: parseTeams(this.messageArgs),
      },
    ];

    let embed;
    // update global state
    if (this.userIsGroupOne()) {
      global.groupOne = updatedGroup;
      const groupOneEmbedd = new EmbedMessage(this.groupOneConfig);
      //   embed = this.createEmbedMessage(
      //     this.groupOneConfig.color,
      //     groupOne.title,
      //     [...global.groupOne, ...payload]
      //   );
    } else {
      global.groupTwo = updatedGroup;
      const groupTwoEmbedd = new EmbedMessage(this.groupTwoConfig);
      //   embed = this.createEmbedMessage(
      //     this.groupTwoConfig.color,
      //     groupTwo.title,
      //     [...global.groupTwo, ...payload]
      //   );
    }
  }

  /* 
    Updates the current user's team
    should only be called after the user adds a team
  */
  public updateTeam() {}

  //   private createEmbedMessage(
  //     color: string,
  //     title: string,
  //     teams: UserTeams[]
  //   ): MessageEmbed {
  //     const embedMessage: MessageEmbed = new MessageEmbed()
  //       .setColor(color)
  //       .setTitle(title)
  //       .setURL("https://discord.js.org/")
  //       .setAuthor(
  //         "New Club Conquest",
  //         "https://i.imgur.com/wSTFkRM.png",
  //         "https://discord.js.org"
  //       )
  //       .setDescription(groupCommon.description)
  //       .setThumbnail("https://i.imgur.com/wSTFkRM.png")
  //       .addFields(this.createDataFields(teams))
  //       .setImage("https://i.imgur.com/wSTFkRM.png")
  //       .setTimestamp()
  //       .setFooter(`12 ${groupCommon.footer}`, "https://i.imgur.com/wSTFkRM.png");

  //     return embedMessage;
  //   }

  //   // create array of data fields to display (user teams)
  //   private createDataFields(cachedTeams: UserTeams[]): EmbedFieldData[] {
  //     const teams = cachedTeams.map(
  //       (team: UserTeams): EmbedFieldData => {
  //         return {
  //           name: team.name,
  //           value: team.value,
  //         };
  //       }
  //     );
  //     return [{ name: "\u200B", value: "\u200B" }, ...this.userGroup, ...teams];
  //   }

  private userIsGroupOne(): Role | undefined {
    return this.message?.member?.roles?.cache.find((r) =>
      r.name.toLowerCase().includes(groupOne.role)
    );
  }

  private setUserGroup(): UserTeams[] {
    if (this.userIsGroupOne()) {
      return global.groupOne;
    } else {
      return global.groupTwo;
    }
  }
}
