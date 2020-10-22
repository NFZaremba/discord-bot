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
const discord_js_1 = require("discord.js");
const discord_js_commando_1 = require("discord.js-commando");
const config_1 = require("../config");
const iterateTeams_1 = __importDefault(require("../helpers/iterateTeams"));
const parseTeams_1 = __importDefault(require("../helpers/parseTeams"));
class AddTeam extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "add_team",
            group: "team",
            memberName: "add_team",
            description: "Add team to group team",
            argsType: "multiple",
        });
        this.groupOne = global.groupOne;
        this.groupTwo = global.groupTwo;
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            // delete command message
            message.delete();
            // check team
            const isGroupOne = message.member.roles.cache.find((r) => r.name.toLowerCase().includes("gold") || false);
            // set team
            const teamGroup = isGroupOne ? this.groupOne : this.groupTwo;
            console.log(teamGroup);
            // check if user already registered team
            if (teamGroup.find((team) => team.name.includes(message.author.username))) {
                return message.channel
                    .send("You already registered teams. Please use update command.")
                    .then((msg) => msg.delete({ timeout: 2000 }));
            }
            const payload = [
                ...teamGroup,
                {
                    id: message.author.id,
                    name: message.author.username,
                    value: parseTeams_1.default(args),
                },
            ];
            console.log(payload);
            // update global state
            if (isGroupOne) {
                global.groupOne = payload;
            }
            else {
                global.groupTwo = payload;
            }
            const newEmbed = new discord_js_1.MessageEmbed()
                .setColor(`${isGroupOne ? config_1.groupOne.color : config_1.groupTwo.color}`)
                .setTitle(`${isGroupOne ? config_1.groupOne.title : config_1.groupTwo.title}`)
                .setURL("https://discord.js.org/")
                .setAuthor("New Club Conquest", "https://i.imgur.com/wSTFkRM.png", "https://discord.js.org")
                .setDescription(config_1.groupCommon.description)
                .setThumbnail("https://i.imgur.com/wSTFkRM.png")
                .addFields(iterateTeams_1.default(isGroupOne ? global.groupOne : global.groupTwo))
                .setImage("https://i.imgur.com/wSTFkRM.png")
                .setTimestamp()
                .setFooter(`12 ${config_1.groupCommon.footer}`, "https://i.imgur.com/wSTFkRM.png");
            const fetched = yield message.channel.messages.fetch(`${isGroupOne ? global.groupOneMsgId : global.groupTwoMsgId}`);
            fetched.edit(newEmbed);
            return null;
        });
    }
}
exports.default = AddTeam;
//# sourceMappingURL=AddTeam.js.map