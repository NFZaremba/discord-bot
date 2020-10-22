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
class PruneMessages extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "prune",
            group: "mod",
            memberName: "prune",
            description: "prune messages in channel",
            argsType: "single",
        });
    }
    clear() {
        // clear
        global.groupOne = [];
        global.groupTwo = [];
        global.groupOneMsgId = null;
        global.groupTwoMsgId = null;
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            message.delete();
            if (message.channel.type === "dm")
                return null;
            const fetched = yield message.channel.messages.fetch({
                limit: parseInt(args) || 100,
            });
            return message.channel
                .bulkDelete(fetched)
                .then((messages) => {
                // clear
                this.clear();
                return message.channel
                    .send(`Deleted ${messages.size} messages`)
                    .then((msg) => msg.delete({ timeout: 1000 }));
            })
                .catch((error) => {
                console.log(error);
                return message.channel.send(`Failed to deleted messages`);
            });
        });
    }
}
exports.default = PruneMessages;
//# sourceMappingURL=PruneMessages.js.map