import { EmbedFieldData } from "discord.js";
import { UserTeams } from "../types";

const iterateTeams = (cachedTeams: UserTeams[]) => {
  const teams = cachedTeams.map(
    (team: UserTeams): EmbedFieldData => {
      return {
        name: team.name,
        value: team.value,
      };
    }
  );

  return [{ name: "\u200B", value: "\u200B" }, ...teams];
};

export default iterateTeams;
