"use strict";
// Group One is 'Gold Crew'
// Group Two is 'Blue Crew'
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupTwo = exports.groupOne = exports.groupCommon = void 0;
exports.groupCommon = {
    description: `-new_team (admins): resets blue and gold teams\n
  -add_team: adds user teams to their respective groups (Gold Crew or Blue Crew)\n
  -update_team: edit your teams\n
  -check_team: checks off the team`,
    footer: "club members have registered",
};
// gold
exports.groupOne = {
    name: "gold",
    color: "#817e03",
    title: "Gold Crew",
    description: exports.groupCommon.description,
    role: "gold",
    footer: exports.groupCommon.footer,
};
// blue
exports.groupTwo = {
    name: "blue",
    color: "#06057f",
    title: "Blue Crew",
    description: exports.groupCommon.description,
    role: "blue",
    footer: exports.groupCommon.footer,
};
//# sourceMappingURL=config.js.map