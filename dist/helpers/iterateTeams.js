"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iterateTeams = (cachedTeams) => {
    const teams = cachedTeams.map((team) => {
        return {
            name: team.name,
            value: team.value,
        };
    });
    return [{ name: "\u200B", value: "\u200B" }, ...teams];
};
exports.default = iterateTeams;
//# sourceMappingURL=iterateTeams.js.map