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
exports.DiscordBot = void 0;
const discord_js_commando_1 = require("discord.js-commando");
const path_1 = __importDefault(require("path"));
const defaultTeams_1 = require("./__mock__/defaultTeams");
global.teamGold = defaultTeams_1.teamGold;
global.teamBlue = defaultTeams_1.teamBlue;
global.teamGoldMsgId = null;
global.teamBlueMsgId = null;
class DiscordBot {
    constructor() {
        this.token = process.env.DISCORD_TOKEN;
        this.prefix = process.env.prefix;
        this.client = new discord_js_commando_1.CommandoClient({
            owner: "696291949958922311",
            commandPrefix: this.prefix,
        });
        this.initializeClient();
    }
    static getInstance() {
        if (!DiscordBot.instance) {
            DiscordBot.instance = new DiscordBot();
        }
        return DiscordBot.instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.login(this.token);
                console.log("Connected to Discord");
            }
            catch (err) {
                console.error(`Could not connect. Error: ${err.message}`);
            }
        });
    }
    initializeClient() {
        if (!this.client)
            return;
        this.registerCommands();
        this.setReadyHandler();
        //this.setMessageHandler();
    }
    setReadyHandler() {
        this.client.on("ready", () => {
            var _a, _b;
            console.log(`Logged in as ${(_b = (_a = this.client) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.tag}!`);
        });
    }
    //   private setMessageHandler(): void {
    //     this.client.on("message", async (message: CommandMessage) => {
    //       // filters out requests from bots and other prefixes
    //       if (!message.content.startsWith(this.prefix) || message.author.bot)
    //         return;
    //       let args = message.content.slice(this.prefix?.length).trim().split(" ");
    //       switch (args[0]) {
    //         case "hello":
    //           message.channel.send("Hello friend!");
    //           break;
    //         default:
    //           return null;
    //       }
    //     });
    //   }
    registerCommands() {
        console.log(path_1.default.join(__dirname, "commands"));
        this.client.registry
            // Registers your custom command groups
            .registerGroups([
            ["mod", "mod commands"],
            ["misc", "misc commands"],
            ["team", "team commands"],
        ])
            // Registers all built-in groups, commands, and argument types
            .registerDefaults()
            // Registers all of your commands in the ./commands/ directory
            .registerCommandsIn(path_1.default.join(__dirname, "commands"));
        console.log("Registered commands");
    }
}
exports.DiscordBot = DiscordBot;
//# sourceMappingURL=DiscordBot.js.map