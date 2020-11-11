"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGroupOne = void 0;
class TeamUtils {
    static getUserTeam(message) {
        return exports.isGroupOne(message) ? global.teamGold : global.teamBlue;
    }
}
exports.isGroupOne = (message) => {
    return message.member.roles.cache.find((r) => r.name.toLowerCase().includes("gold"));
};
const getGroup = (message) => {
    return exports.isGroupOne(message) ? global.teamGold : global.teamBlue;
};
exports.default = getGroup;
//# sourceMappingURL=getGroup.js.map