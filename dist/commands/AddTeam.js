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
const parseTeams_1 = __importDefault(require("../helpers/parseTeams"));
class AddTeam extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "add",
            group: "team",
            memberName: "add",
            description: "Add team to group team",
            argsType: "multiple",
        });
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            // delete command message
            message.delete();
            const userGroup = this.getGroup(message);
            const isGroupOne = this.isGroupOne(message);
            const groupConfig = isGroupOne ? config_1.teamGoldConfig : config_1.teamBlueConfig;
            // check if user already registered team
            if (userGroup.find((team) => team.name.includes(message.author.username))) {
                return message.channel
                    .send("You already registered teams. Please use update command.")
                    .then((msg) => msg.delete({ timeout: 2000 }));
            }
            const payload = [
                ...userGroup,
                {
                    id: message.author.id,
                    name: message.author.username,
                    value: parseTeams_1.default(args),
                },
            ];
            // update global state
            if (isGroupOne) {
                global.teamGold = payload;
            }
            else {
                global.teamBlue = payload;
            }
            const groupEmbedd = new EmbedMessage_1.default(groupConfig, payload);
            const embeddMessage = groupEmbedd.createEmbedMessage();
            const fetched = yield message.channel.messages.fetch(`${isGroupOne ? global.teamGoldMsgId : global.teamBlueMsgId}`);
            // update embedd team message with latest data
            fetched.edit(embeddMessage);
            return null;
        });
    }
    isGroupOne(message) {
        return message.member.roles.cache.find((r) => r.name.toLowerCase().includes("gold"));
    }
    // determine which group the user belongs to
    getGroup(message) {
        return this.isGroupOne(message) ? global.teamGold : global.teamBlue;
    }
}
exports.default = AddTeam;
//# sourceMappingURL=AddTeam.js.map