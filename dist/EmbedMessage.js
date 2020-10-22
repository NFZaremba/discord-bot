"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class EmbedMessage {
    constructor(groupConfig, userGroup, teams) {
        this.groupConfig = groupConfig;
        this.userGroup = userGroup;
        this.teams = teams;
    }
    createEmbedMessage() {
        const embedMessage = new discord_js_1.MessageEmbed()
            .setColor(this.groupConfig.color)
            .setTitle(this.groupConfig.title)
            .setURL("https://discord.js.org/")
            .setAuthor("New Club Conquest", "https://i.imgur.com/wSTFkRM.png", "https://discord.js.org")
            .setDescription(this.groupConfig.description)
            .setThumbnail("https://i.imgur.com/wSTFkRM.png")
            .addFields(this.createDataFields(this.teams))
            .setImage("https://i.imgur.com/wSTFkRM.png")
            .setTimestamp()
            .setFooter(`12 ${this.groupConfig.footer}`, "https://i.imgur.com/wSTFkRM.png");
        return embedMessage;
    }
    // create array of data fields to display (user teams)
    createDataFields(cachedTeams) {
        const teams = cachedTeams.map((team) => {
            return {
                name: team.name,
                value: team.value,
            };
        });
        return [{ name: "\u200B", value: "\u200B" }, ...this.userGroup, ...teams];
    }
}
exports.default = EmbedMessage;
//# sourceMappingURL=EmbedMessage.js.map