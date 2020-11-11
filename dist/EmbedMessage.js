"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class EmbedTeamMessage {
    constructor(groupConfig, group) {
        this.groupConfig = groupConfig;
        this.group = group;
    }
    createEmbedMessage() {
        const embedMessage = new discord_js_1.MessageEmbed()
            .setColor(this.groupConfig.color)
            .setTitle(this.groupConfig.title)
            .setURL("https://discord.js.org/")
            .setAuthor("New Club Conquest", "https://i.imgur.com/wSTFkRM.png", "https://discord.js.org")
            .setDescription(this.groupConfig.description)
            .setThumbnail("https://i.imgur.com/wSTFkRM.png")
            .addFields(this.createDataFields(this.group))
            .setImage("https://i.imgur.com/wSTFkRM.png")
            .setTimestamp()
            .setFooter(`12 ${this.groupConfig.footer}`, "https://i.imgur.com/wSTFkRM.png");
        return embedMessage;
    }
    // create array of data fields to display (user teams)
    createDataFields(updatedGroup) {
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
exports.default = EmbedTeamMessage;
//# sourceMappingURL=EmbedMessage.js.map