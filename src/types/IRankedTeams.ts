export interface IRankedTeams {
  rank: number;
  score: number;
  scoreColor: string;
  runs: Run[];
  id: number;
  name: string;
  logo: string;
  platoon: {name: string; id: number};
}

export interface Run {
  zoneId: number;
  keystoneRunId: number;
  clearTimeMs: number;
  mythicLevel: number;
  score: number;
  period: number;
  affixes: number[];
  loggedRunId: number;
  numChests: number;
}
