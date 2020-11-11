import { CommandoMessage } from "discord.js-commando";
import { TeamConfig } from "../config";
import { OffenseTeam } from "../types";

class TeamUtils {
  public getUserTeam(message: CommandoMessage): string {
    return this.isTeamGold(message) ? "teamGold" : "teamBlue";
  }

  public parseTeams(teams: string[] | undefined) {
    return teams?.reduce((acc, next, i) => {
      const [offenseName, offensePower] = next.split(".");
      return acc + `${i + 1}. ${offenseName} ${offensePower}\n`;
    }, "");
  }

  private isTeamGold(message: CommandoMessage) {
    return message.member.roles.cache.find((r) =>
      r.name.toLowerCase().includes("gold")
    );
  }
}

export default TeamUtils;
