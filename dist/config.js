"use strict";
// Group One is 'Gold Crew'
// Group Two is 'Blue Crew'
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamBlueConfig = exports.teamGoldConfig = exports.teamCommonConfig = void 0;
exports.teamCommonConfig = {
    description: `-new_team (admins): resets blue and gold teams\n
  -add_team: adds user teams to their respective groups (Gold Crew or Blue Crew)\n
  -update_team: edit your teams\n
  -check_team: checks off the team`,
    footer: "club members have registered",
};
// gold
exports.teamGoldConfig = {
    name: "gold",
    color: "#817e03",
    title: "Gold Crew",
    description: exports.teamCommonConfig.description,
    role: "gold",
    footer: exports.teamCommonConfig.footer,
};
// blue
exports.teamBlueConfig = {
    name: "blue",
    color: "#06057f",
    title: "Blue Crew",
    description: exports.teamCommonConfig.description,
    role: "blue",
    footer: exports.teamCommonConfig.footer,
};
//# sourceMappingURL=config.js.map