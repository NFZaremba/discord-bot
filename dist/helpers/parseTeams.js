"use strict";
// teams - ex. ["teamA.power", "teamB.power", "teamC.power"]
Object.defineProperty(exports, "__esModule", { value: true });
const parseTeams = (teams) => {
    return teams.reduce((acc, next, i) => {
        const [teamName, teamPower] = next.split(".");
        return acc + `${i + 1}. ${teamName} ${teamPower}\n`;
    }, "");
};
exports.default = parseTeams;
//# sourceMappingURL=parseTeams.js.map