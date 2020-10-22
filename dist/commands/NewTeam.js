"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_commando_1 = require("discord.js-commando");
const config_1 = require("../config");
class NewTeam extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "new_team",
            group: "team",
            memberName: "new_team",
            description: "Create a new groups for CC",
            userPermissions: ["KICK_MEMBERS"],
            clientPermissions: ["KICK_MEMBERS"],
            argsType: "single",
        });
    }
    run(message) {
        return __awaiter(this, void 0, void 0, function* () {
            // delete command message
            message.delete();
            if (global.groupOneMsgId || global.groupTwoMsgId) {
                return message.channel
                    .send("You already created new teams")
                    .then((msg) => msg.delete({ timeout: 1000 }));
            }
            const teamEmbedA = new discord_js_1.MessageEmbed()
                .setColor(config_1.groupOne.color)
                .setTitle(config_1.groupOne.title)
                .setURL("https://discord.js.org/")
                .setAuthor("New Club Conquest", "https://i.imgur.com/wSTFkRM.png", "https://discord.js.org")
                .setDescription(config_1.groupCommon.description)
                .setThumbnail("https://i.imgur.com/wSTFkRM.png")
                .addFields([
                { name: "\u200B", value: "\u200B" },
                { name: "Bob", value: "Line1\nLine2\nLine3" },
                { name: "Ricky", value: "Line1\nLine2\nLine3" },
                { name: "Lars", value: "Line1\nLine2\nLine3" },
            ])
                .setImage("https://i.imgur.com/wSTFkRM.png")
                .setTimestamp()
                .setFooter(`12 ${config_1.groupCommon.footer}`, "https://i.imgur.com/wSTFkRM.png");
            const teamEmbedB = new discord_js_1.MessageEmbed()
                .setColor(config_1.groupTwo.color)
                .setTitle(config_1.groupTwo.title)
                .setURL("https://discord.js.org/")
                .setAuthor("New Club Conquest", "https://i.imgur.com/wSTFkRM.png", "https://discord.js.org")
                .setDescription(config_1.groupCommon.description)
                .setThumbnail("https://i.imgur.com/wSTFkRM.png")
                .addFields([
                { name: "\u200B", value: "\u200B" },
                { name: "Bob", value: "Line1\nLine2\nLine3" },
                { name: "Ricky", value: "Line1\nLine2\nLine3" },
                { name: "Lars", value: "Line1\nLine2\nLine3" },
            ])
                .setImage("https://i.imgur.com/wSTFkRM.png")
                .setTimestamp()
                .setFooter(`7 ${config_1.groupCommon.footer}`, "https://i.imgur.com/wSTFkRM.png");
            // set pinned message id's to global variable
            message.channel.send(teamEmbedA).then((msg) => {
                global.groupOneMsgId = msg.id;
                msg.pin();
            });
            message.channel.send(teamEmbedB).then((msg) => {
                global.groupTwoMsgId = msg.id;
                msg.pin();
            });
            return null;
        });
    }
}
exports.default = NewTeam;
//# sourceMappingURL=NewTeam.js.map