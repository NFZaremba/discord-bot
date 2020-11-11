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
const config_1 = require("../config");
const parseTeams_1 = __importDefault(require("./parseTeams"));
const EmbedMessage_1 = __importDefault(require("../EmbedMessage"));
// This class will handle all operations for managing teams
// ex. parsing, fetching, setting tea, etc.
class TeamManager {
    // pass message object when initializing
    constructor(message, args) {
        this.message = message;
        this.messageArgs = args;
        this.userGroup = this.setUserGroup();
        this.groupOneConfig = config_1.teamGoldConfig;
        this.groupTwoConfig = config_1.teamBlueConfig;
    }
    newTeam() {
        if (global.teamGoldMsgId || global.teamBlueMsgId) {
            return this.message.channel
                .send("You already created new teams")
                .then((msg) => msg.delete({ timeout: 1000 }));
        }
        const groupOneEmbedd = new EmbedMessage_1.default(this.groupOneConfig, global.teamGold);
        const groupTwoEmbedd = new EmbedMessage_1.default(this.groupTwoConfig, global.teamBlue);
        console.log(groupOneEmbedd);
        console.log(groupTwoEmbedd);
        // set pinned message id's to global variable
        this.message.channel.send(groupOneEmbedd).then((msg) => {
            global.teamGoldMsgId = msg.id;
            msg.pin();
        });
        this.message.channel.send(groupTwoEmbedd).then((msg) => {
            global.teamBlueMsgId = msg.id;
            msg.pin();
        });
    }
    /*
      Adds user team to the CC group affiliated with their role
    */
    addTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.userGroup);
            if (this.userGroup.find((team) => team.name.includes(this.message.author.username))) {
                return this.message.channel
                    .send("You already registered teams. Please use update command.")
                    .then((msg) => msg.delete({ timeout: 2000 }));
            }
            const updatedGroup = [
                ...this.userGroup,
                {
                    id: this.message.author.id,
                    name: this.message.author.username,
                    value: parseTeams_1.default(this.messageArgs),
                },
            ];
            let updatedEmbed;
            // update global state
            if (this.userIsGroupOne()) {
                global.teamGold = updatedGroup;
                updatedEmbed = new EmbedMessage_1.default(this.groupOneConfig, global.teamGold);
                //   embed = this.createEmbedMessage(
                //     this.groupOneConfig.color,
                //     groupOne.title,
                //     [...global.groupOne, ...payload]
                //   );
            }
            else {
                global.teamBlue = updatedGroup;
                updatedEmbed = new EmbedMessage_1.default(this.groupTwoConfig, global.teamBlue);
                //   embed = this.createEmbedMessage(
                //     this.groupTwoConfig.color,
                //     groupTwo.title,
                //     [...global.groupTwo, ...payload]
                //   );
            }
            const fetched = yield this.message.channel.messages.fetch(`${this.userIsGroupOne() ? global.teamGoldMsgId : global.teamBlueMsgId}`);
            fetched.edit(updatedEmbed);
        });
    }
    /*
      Updates the current user's team
      should only be called after the user adds a team
    */
    updateTeam() { }
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
    userIsGroupOne() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.message) === null || _a === void 0 ? void 0 : _a.member) === null || _b === void 0 ? void 0 : _b.roles) === null || _c === void 0 ? void 0 : _c.cache.find((r) => r.name.toLowerCase().includes(config_1.teamGoldConfig.role));
    }
    setUserGroup() {
        if (this.userIsGroupOne()) {
            return global.teamGold;
        }
        else {
            return global.teamBlue;
        }
    }
}
exports.default = TeamManager;
//# sourceMappingURL=TeamManager.js.map