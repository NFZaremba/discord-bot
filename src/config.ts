// Group One is 'Gold Crew'
// Group Two is 'Blue Crew'

export interface CCGroupCommonConfig {
  description: string;
  footer: string;
}

export interface CCGroupConfig extends CCGroupCommonConfig {
  name: string;
  color: string;
  title: string;
  role: string;
}

export const groupCommon: CCGroupCommonConfig = {
  description: `-new_team (admins): resets blue and gold teams\n
  -add_team: adds user teams to their respective groups (Gold Crew or Blue Crew)\n
  -update_team: edit your teams\n
  -check_team: checks off the team`,
  footer: "club members have registered",
};

// gold
export const groupOne: CCGroupConfig = {
  name: "gold",
  color: "#817e03",
  title: "Gold Crew",
  description: groupCommon.description,
  role: "gold",
  footer: groupCommon.footer,
};

// blue
export const groupTwo: CCGroupConfig = {
  name: "blue",
  color: "#06057f",
  title: "Blue Crew",
  description: groupCommon.description,
  role: "blue",
  footer: groupCommon.footer,
};
