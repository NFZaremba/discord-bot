// Group One is 'Gold Crew'
// Group Two is 'Blue Crew'

import { OffenseTeam } from "./types";
import { teamBlue, teamGold } from "./__mock__/defaultTeams";

export interface TeamEmbeddConfig {
  color: string;
  title: string;
  role: string;
  description: string;
  footer: string;
}

export interface TeamConfig {
  pinnedMsgId: string | null;
  name: string;
  embedd: TeamEmbeddConfig;
  teams: OffenseTeam[];
}

export const teamCommonConfig: Pick<
  TeamEmbeddConfig,
  "description" | "footer"
> = {
  description: `-new_team (admins): resets blue and gold teams\n
  -add_team: adds user teams to their respective groups (Gold Crew or Blue Crew)\n
  -update_team: edit your teams\n
  -check_team: checks off the team`,
  footer: "club members have registered",
};

// gold
export const teamGoldConfig: TeamConfig = {
  pinnedMsgId: null,
  name: "gold",
  embedd: {
    color: "#817e03",
    title: "Gold Crew",
    description: teamCommonConfig.description,
    role: "gold",
    footer: teamCommonConfig.footer,
  },
  teams: teamGold,
};

// blue
export const teamBlueConfig: TeamConfig = {
  pinnedMsgId: null,
  name: "blue",
  embedd: {
    color: "#06057f",
    title: "Blue Crew",
    description: teamCommonConfig.description,
    role: "blue",
    footer: teamCommonConfig.footer,
  },
  teams: teamBlue,
};
