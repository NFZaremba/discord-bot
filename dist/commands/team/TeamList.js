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
const discord_js_commando_1 = require("discord.js-commando");
class TeamList extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "team_list",
            group: "team",
            memberName: "team_list",
            description: "Display list of team",
            argsType: "single",
        });
    }
    run(commandMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            return commandMsg.channel.send(`${global.teamA}`);
        });
    }
}
exports.default = TeamList;
//# sourceMappingURL=TeamList.js.map