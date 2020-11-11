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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const config_1 = require("../config");
const EmbedMessage_1 = __importDefault(require("../EmbedMessage"));
class NewTeam extends discord_js_commando_1.Command {
    constructor(client) {
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
    run(message) {
        return __awaiter(this, void 0, void 0, function* () {
            // delete command message
            message.delete();
            if (global.teamGoldMsgId || global.teamBlueMsgId) {
                return message.channel
                    .send("You already created new teams")
                    .then((msg) => msg.delete({ timeout: 1000 }));
            }
            const groupOneEmbedd = new EmbedMessage_1.default(config_1.teamGoldConfig, global.teamGold);
            const groupOneMessage = groupOneEmbedd.createEmbedMessage();
            const groupTwoEmbedd = new EmbedMessage_1.default(config_1.teamBlueConfig, global.teamBlue);
            const groupTwoMessage = groupTwoEmbedd.createEmbedMessage();
            // set pinned message id's to global variable
            message.channel.send(groupOneMessage).then((msg) => {
                global.teamGoldMsgId = msg.id;
                msg.pin();
            });
            message.channel.send(groupTwoMessage).then((msg) => {
                global.teamBlueMsgId = msg.id;
                msg.pin();
            });
            return null;
        });
    }
}
exports.default = NewTeam;
//# sourceMappingURL=NewTeam.js.map