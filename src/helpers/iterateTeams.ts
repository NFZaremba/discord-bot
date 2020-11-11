import { EmbedFieldData } from "discord.js";
import { OffenseTeam } from "../types";

const iterateTeams = (cachedTeams: OffenseTeam[]) => {
  const teams = cachedTeams.map(
    (team: OffenseTeam): EmbedFieldData => {
      return {
        name: team.name,
        value: team.value,
      };
    }
  );

  return [{ name: "\u200B", value: "\u200B" }, ...teams];
};

export default iterateTeams;
