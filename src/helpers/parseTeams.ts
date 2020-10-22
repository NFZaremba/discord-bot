// teams - ex. ["teamA.power", "teamB.power", "teamC.power"]

const parseTeams = (teams: string[]) => {
  return teams.reduce((acc, next, i) => {
    const [teamName, teamPower] = next.split(".");
    return acc + `${i + 1}. ${teamName} ${teamPower}\n`;
  }, "");
};

export default parseTeams;
