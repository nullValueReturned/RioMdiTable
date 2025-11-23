import { useCallback } from "react";
import RunInfo from "./RunInfo";
import type { IRankedTeams, Run } from "../types/IRankedTeams";

type TDungeon = "Ara-kara" | "HoA" | "PSF" | "Floodgate" | "Streets" | "Gambit";
const AllDungeons: TDungeon[] = [
  "Ara-kara",
  "HoA",
  "PSF",
  "Floodgate",
  "Streets",
  "Gambit",
];

const zoneIdToName: (zoneId: number) => TDungeon | "Unknown" = (
  zoneId: number
) => {
  switch (zoneId) {
    case 15093:
      return "Ara-kara";
    case 12831:
      return "HoA";
    case 14954:
      return "PSF";
    case 15452:
      return "Floodgate";
    case 1000000:
      return "Streets";
    case 1000001:
      return "Gambit";
    default:
      return "Unknown";
  }
};
// function to convert milliseconds to mm:ss format
const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const platoonNameToImageUrl = (platoonName: string): string => {
  switch (platoonName) {
    case "Missed Count":
      return "https://u-wowretail.raiderio.net/108f/2024/11/01/Iz8Re3wCULNVFwt9Yokoe92YaE/image.png";
    case "Liquid":
      return "https://u-wowretail.raiderio.net/28d1/2025/02/24/NfQeWujdaKUAKUVS8eUQuDeo3H/image.png";
    case "HOLY Method":
      return "https://u-wowretail.raiderio.net/4bb8/2025/05/01/8XmQJ2e3Aqb4HpxSUGkJLSFVSh/image.png";
    case "Mandatory":
      return "https://u-wowretail.raiderio.net/29e1/2025/01/30/Svy71yjICAP2DH7cU5CKK8P7Sa/image.png";
    case "Identity":
      return "https://u-wowretail.raiderio.net/d068/2025/11/20/Jf4nAP8eTgPCJjLJNfjzATyG32/image.png";
    case "Antticlockwise":
      return "https://u-wowretail.raiderio.net/d76f/2025/10/25/9XusCNXtdMsiB30r1MialBUMSG/image.png";
    case "Interrupt":
      return "https://u-wowretail.raiderio.net/fb5d/2025/11/20/rzDlgdg5MzNvHuC4T5uwTAzCKz/image.png";
    case "Scaffolding":
      return "https://u-wowretail.raiderio.net/45dd/2025/10/30/m1vXffu9GubIhpWjAGnQHQ45t2/image.png";
    default:
      return "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
  }
};

const getDungeonRunFromRun = (runs: Run[], dungeonName: string) => {
  return runs.find((run) => zoneIdToName(run.zoneId) === dungeonName);
};

const getDungeonScoreAndTimeFromRun = (run: Run | undefined) => {
  if (!run) return { dungeonScore: null, formattedTime: null };
  const dungeonScore = run.mythicLevel;
  const formattedTime = formatTime(run.clearTimeMs);
  return { dungeonScore, formattedTime };
};

type MyCompProps = {
  myData: IRankedTeams[];
};

const MyComp = ({ myData }: MyCompProps) => {
  // check if the given run is the global best run for the dungeon for all teams
  const isGlobalBestRunForDungeon = useCallback(
    (run: Run, dungeonName: TDungeon) => {
      const dungeonRunsForDugeon = myData
        .map((team) => getDungeonRunFromRun(team.runs, dungeonName))
        .filter((r) => r !== undefined) as Run[];
      const bestRun = dungeonRunsForDugeon.reduce((best, current) => {
        return current.mythicLevel > best.mythicLevel ||
          (current.mythicLevel === best.mythicLevel &&
            current.clearTimeMs < best.clearTimeMs)
          ? current
          : best;
      }, dungeonRunsForDugeon[0]);
      return run.loggedRunId === bestRun.loggedRunId;
    },
    [myData]
  );
  return (
    <div className="mdiTableWrapper">
      <h3>MDI standings</h3>
      {
        <table className="mdiTable">
          <thead>
            <tr>
              <th className="rankRow">#</th>
              <th>Team</th>
              {AllDungeons.map((dungeon) => (
                <th key={dungeon}>{dungeon}</th>
              ))}
              <th>Score</th>
              <th>Total time</th>
            </tr>
          </thead>
          <tbody>
            {myData.map((team) => (
              <tr key={team.id}>
                <td>{team.rank}</td>
                <td className="imageTd">
                  <img
                    src={platoonNameToImageUrl(team.platoon.name)}
                    alt={team.platoon.name}
                    className="teamImg"
                  />
                  {team.platoon.name}
                </td>
                {AllDungeons.map((dungeon) => {
                  const run = getDungeonRunFromRun(team.runs, dungeon);
                  const { dungeonScore, formattedTime } =
                    getDungeonScoreAndTimeFromRun(run);
                  const isBestRun = run
                    ? isGlobalBestRunForDungeon(run, dungeon)
                    : false;
                  return (
                    <td key={dungeon}>
                      <RunInfo
                        dungeonScore={dungeonScore}
                        formattedTime={formattedTime}
                        isBestRun={isBestRun}
                      />
                    </td>
                  );
                })}
                <td>{Math.round(team.score)}</td>
                <td>
                  {formatTime(
                    team.runs.reduce((acc, run) => acc + run.clearTimeMs, 0)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default MyComp;
